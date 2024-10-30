import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery, UpdateQuery } from 'mongoose';
import { assignFilters, FILTERS, rawQuery } from 'src/common/query.utils';
import { Userz, UserzDocument } from './schema/users.schema';
import { PaginatedResponse } from 'types/PaginatedResponse';
import { CreateUserDTO, PatchUserDTO } from './dto/user.dto';
import { Options } from 'types/Options';
import { featherify } from 'src/common/featherify';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Userz.name) private readonly usersModel: Model<UserzDocument>,
    @Inject('OPTIONS') private readonly options: Options,
  ) {}

  async _find(
    query: Record<string, any> = {},
  ): Promise<PaginatedResponse<Userz> | Userz[]> {
    const filters = assignFilters({}, query, FILTERS, {});
    const searchQuery = rawQuery(query);
    console.log(query);
    const isPaginationDisabled =
      query.$paginate === false || query.$paginate === 'false';

    let q = this.usersModel.find(searchQuery);
    featherify(q, filters, this.options, isPaginationDisabled);

    if (isPaginationDisabled) {
      return await q.exec();
    }

    const [data, total] = await Promise.all([
      q.exec(),
      this.usersModel.countDocuments({ deleted: { $ne: true } }),
    ]);

    return {
      total,
      $limit: Number(filters.$limit) || this.options.defaultLimit,
      $skip: Number(filters.$skip) || this.options.defaultSkip,
      data,
    };
  }

  async _create(data: CreateUserDTO): Promise<Userz | Userz[]> {
    const multi = this.options.multi;

    if (multi) {
      if (!Array.isArray(data)) {
        throw new BadRequestException(
          'Bulk creation requires an array of users.',
        );
      }
      // @ts-expect-error
      return this.usersModel.insertMany(data);
    }
    if (Array.isArray(data)) {
      throw new BadRequestException(
        'Single creation expects a single user object, not an array.',
      );
    }
    return this.usersModel.create(data);
  }

  async _patch(
    id: string | null,
    data: PatchUserDTO,
    query: Record<string, any> = {},
  ): Promise<Userz | Userz[] | null> {
    const filters = assignFilters({}, query, FILTERS, {});
    const searchQuery: FilterQuery<UserzDocument> = id
      ? { _id: id, ...rawQuery(query) }
      : rawQuery(query);

    const isSingleUpdate = Boolean(id);
    const q = this._getOrFind(isSingleUpdate, searchQuery, data);

    if (isSingleUpdate) {
      featherify(q, filters, this.options, isSingleUpdate);
      // @ts-expect-error
      return q.exec();
    }
    const result = await q.exec();

    // @ts-expect-error
    if (result.modifiedCount > 0) {
      return this.usersModel.find(searchQuery).exec();
    }
    return [];
  }

  async _get(
    id: string,
    query: Record<string, any> = {},
  ): Promise<Userz | null> {
    const filters = assignFilters({}, query, FILTERS, {});
    const searchQuery: FilterQuery<UserzDocument> = {
      ...rawQuery(query),
      _id: id,
    };

    let q = this.usersModel.findOne(searchQuery);
    const isSingleOperation = true;
    featherify(q, filters, this.options, isSingleOperation);

    return q.exec();
  }

  async _remove(
    id: string | null,
    query: Record<string, any> = {},
  ): Promise<Userz | Userz[]> {
    const searchQuery: FilterQuery<UserzDocument> = id
      ? { _id: id, ...rawQuery(query) }
      : rawQuery(query);

    const data = await this._get(id, query);

    if (id) {
      await this.usersModel.deleteOne(searchQuery).exec();
    } else {
      await this.usersModel.deleteMany(searchQuery).exec();
    }

    return data;
  }

  private _getOrFind(
    isSingleUpdate: boolean,
    searchQuery: FilterQuery<UserzDocument>,
    data: UpdateQuery<UserzDocument>,
  ) {
    if (isSingleUpdate) {
      return this.usersModel.findOneAndUpdate(searchQuery, data, { new: true });
    }
    return this.usersModel.updateMany(searchQuery, data);
  }
}
