import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { assignFilters, FILTERS, rawQuery } from 'common/query.utils';
import { Userz } from './schema/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Userz.name)
    private readonly usersModel: Model<Userz>,
  ) {}

  async _find(query = {}): Promise<any> {
    const filters = assignFilters({}, query, FILTERS, {});
    const searchQuery = rawQuery(query);

    const q = this.usersModel.find(searchQuery);

    // managing $select
    if (Array.isArray(filters.$select)) {
      q.select(
        filters.$select.reduce(
          (res, key) =>
            Object.assign(res, {
              [key]: 1,
            }),
          {},
        ),
      );
    } else if (
      typeof filters.$select === 'string' ||
      typeof filters.$select === 'object'
    ) {
      q.select(filters.$select);
    }

    // managing $sort
    if (filters.$sort) {
      q.sort(filters.$sort);
    }

    // managing $limit
    if (typeof filters.$limit !== 'undefined') {
      q.limit(filters.$limit);
    }

    //managing $skip
    if (filters.$skip) {
      q.skip(filters.$skip);
    }

    // managing $populate
    if (filters.$populate) {
      q.populate(filters.$populate);
    }

    return q.exec();
  }

  async _create(data) {
    /*v2 feature*/ const isMulti = false;
    return this.usersModel.create(data);
  }

  async _patch(id: string | null, patchUserDto: Partial<Userz>, query = {}) {
    const filters = assignFilters({}, query, FILTERS, {});
    const searchQuery = id ? { _id: id, ...rawQuery(query) } : rawQuery(query);

    // Check if this is a single update or batch update
    const isSingleUpdate = Boolean(id);
    let q;

    if (isSingleUpdate) {
      q = this.usersModel.findOneAndUpdate(searchQuery, patchUserDto, {
        new: true,
      });
    } else {
      q = this.usersModel.updateMany(searchQuery, patchUserDto);
    }

    if (isSingleUpdate) {
      // Managing $select
      if (Array.isArray(filters.$select)) {
        q.select(
          filters.$select.reduce(
            (res, key) =>
              Object.assign(res, {
                [key]: 1,
              }),
            {},
          ),
        );
      } else if (
        typeof filters.$select === 'string' ||
        typeof filters.$select === 'object'
      ) {
        q.select(filters.$select);
      }

      // Managing $sort
      if (filters.$sort) {
        q.sort(filters.$sort);
      }

      // Managing $limit
      if (typeof filters.$limit !== 'undefined') {
        q.limit(filters.$limit);
      }

      // Managing $skip
      if (filters.$skip) {
        q.skip(filters.$skip);
      }

      // Managing $populate
      if (filters.$populate) {
        q.populate(filters.$populate);
      }
    }

    // Execute the query and return the result
    return q.exec();
  }

  async _get(id, query = {}) {
    const filters = assignFilters({}, query, FILTERS, {});
    const searchQuery = rawQuery(query);

    // @ts-ignore
    searchQuery._id = id;
    let q = this.usersModel.findOne(searchQuery);

    // Handle $populate
    if (filters.$populate) {
      q = q.populate(filters.$populate);
    }

    // Handle $select
    if (filters.$select && filters.$select.length) {
      const fields = { _id: 1 };

      for (const key of filters.$select) {
        fields[key] = 1;
      }

      q.select(fields);
    } else if (filters.$select && typeof filters.$select === 'object') {
      q.select(filters.$select);
    }

    return q.exec();
  }

  async _remove(id: string | null, query = {}): Promise<any> {
    const searchQuery = id ? { _id: id, ...rawQuery(query) } : rawQuery(query);

    const data = await this._get(id, query);

    if (id) {
      await this.usersModel.deleteOne(searchQuery).exec();
    } else {
      await this.usersModel.deleteMany(searchQuery).exec();
    }

    return data;
  }
}
