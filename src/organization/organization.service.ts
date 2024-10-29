import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Organization } from './schema/organization.schema';
import { assignFilters, FILTERS, rawQuery } from 'common/query.utils';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectModel(Organization.name)
    private readonly organizationModel: Model<Organization>,
  ) {}

  async _find(query = {}) {
    const filters = assignFilters({}, query, FILTERS, {});
    const searchQuery = rawQuery(query);

    const q = this.organizationModel.find(searchQuery);

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
    return await this.organizationModel.create(data);
  }

  async _get() {}
  async _patch() {}
  async _remove() {}
}
