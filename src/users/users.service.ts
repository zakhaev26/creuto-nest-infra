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

  async _find(query = {}) {
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

    return await q.exec();
  }

  async _create(data) {
    /*v2 feature*/ const isMulti = false;
    return await this.usersModel.create(data);
  }

  async _get(id, query = {}) {
    const filters = assignFilters({}, query, FILTERS, {});
    const searchQuery = rawQuery(query);

    // @ts-ignore
    searchQuery._id = id;
    let q = this.usersModel.findOne(searchQuery);
    console.log({ searchQuery, filters });
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

    return await q.exec();
  }

  async _patch() {}
  async _remove() {}
}
