import { BadRequestException } from "@nestjs/common";
const _ = require('lodash');

export const FILTERS = {
    $sort: (value) => convertSort(value),
    $limit: (value, options) => getLimit(parse(value), options?.paginate),
    $skip: (value) => parse(value),
    $select: (value) => value,
    $populate: (value) => value,
};

export function parse (number) {
    if (typeof number !== 'undefined') {
      return Math.abs(parseInt(number, 10));
    }
  
    return undefined;
};

function getLimit (limit, paginate) {
    if (paginate && paginate.default) {
      const lower = typeof limit === 'number' && !isNaN(limit) ? limit : paginate.default;
      const upper = typeof paginate.max === 'number' ? paginate.max : Number.MAX_VALUE;
      
      return Math.min(lower, upper);
    }
  
    return limit;
}

export const rawQuery = (query) => {
  const rawQ = {};
  
  for (const key in query) {
    if (query.hasOwnProperty(key)) {  
      if (key.startsWith('$')) {
        const filterKey = key.slice(1);  // part after '$'
        // if (!FILTERS[filterKey]) {
        //   throw new BadRequestException('Invalid Search Query Parameter!');
        // }
      } else {
        rawQ[key] = query[key];
      }
    }
  }
  // console.log(rawQ)
  return rawQ;
};


function convertSort (sort) {
    if (typeof sort !== 'object' || Array.isArray(sort)) {
      return sort;
    }
  
    return Object.keys(sort).reduce((result, key) => {
      result[key] = typeof sort[key] === 'object'
        ? sort[key] : parseInt(sort[key], 10);
  
      return result;
    }, {});
  }

export const OPERATORS = ['$in', '$nin', '$lt', '$lte', '$gt', '$gte', '$ne', '$or'];


export const filterQuery = (query,options = {}) => {
    console.log('aya!');
    // @ts-ignore
    const {filters : additionalFilters = {}, operators: additionalOperators = []} = options;

    const result = {
        filters: {},
        query: {}
    };

    result.filters = assignFilters({},query,FILTERS,options);
    result.filters = assignFilters(result.filters, query, additionalFilters, options);
    result.query = cleanQuery(query, OPERATORS.concat(additionalOperators), result.filters);

    return result;
}

export const assignFilters = (object, query, filters, options) => {
    if (Array.isArray(filters)) {
      _.forEach(filters, key => {
        if (query[key] !== undefined) {
          object[key] = query[key];
        }
      });
    } else {
      _.forEach(filters, (converter, key) => {
        const converted = converter(query[key], options);
        if (converted !== undefined) {
          object[key] = converted;
        }
      });
    }
    return object;
}

export const cleanQuery = (query, operators, filters) =>  {
    if (Array.isArray(query)) {
      return query.map(value => cleanQuery(value, operators, filters));
    } else if (_.isPlainObject(query)) {
      const result = {};

      _.forEach(query, (value, key) => {
        if (key.startsWith('$')) {
          if (filters[key] === undefined && !operators.includes(key)) {
            throw new BadRequestException(`Invalid query parameter: ${key}`, query);
          }
        }
        result[key] = cleanQuery(value, operators, filters);
      });

      Object.getOwnPropertySymbols(query).forEach((symbol) => {
        result[symbol] = query[symbol];
      });

      return result;
    }

    return query;
}



// const Q = {
//   $sort: { createdAt: -1 },
//   $limit: '50',
//   $skip: '2',
// };


// const options = {
//     paginate: { default: 10, max: 50 },
//     operators: ['$contains'],
// };

// async function main() {
//     try {
//         const conn = await mongoose.connect(
//             'mongodb+srv://root:root@cluster0.hnyq3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
//         );
//         console.log('Connected to the database!');


//         const { filters, query, paginate} = filterQuery(Q, options);

//         const model = conn.connection.collection('wallets');
//         console.log({filters, query,paginate})
//         const q = model.find({});

//         if (Array.isArray(filters.$select)) {
//           q.select(filters.$select.reduce((res, key) => Object.assign(res, {
//             [key]: 1
//           }), {}));
//         } else if (typeof filters.$select === 'string' || typeof filters.$select === 'object') {
//           q.select(filters.$select);
//         }

//         if (filters.$sort) {
//           q.sort(filters.$sort);
//         }

//         if (typeof filters.$limit !== 'undefined') {
//           q.limit(filters.$limit);
//         }

//         if (filters.$skip) {
//           q.skip(filters.$skip);
//         }

//         if (filters.$populate ) {
//           q.populate(filters.$populate);
//         }

//         const ans = await q.toArray();
//         console.log(ans);
        
//         // // Access the 'wallets' collection
//         // const walletCollection = conn.connection.collection('wallets');

//         // // Extract filters and query from the filterQuery output
//         // const { filters, query: queryConditions } = data;

//         // const sort = filters.$sort || {};  // Apply sorting
//         // const limit = filters.$limit || 10;  // Apply limit
//         // const skip = filters.$skip || 0;  // Apply skip (optional)

//         // // Use the extracted query conditions and filters with the Mongoose query
//         // const wallets = await walletCollection
//         //     .find(queryConditions)  // Apply query conditions
//         //     .sort(sort)
//         //     .limit(limit)
//         //     .skip(skip)
//         //     .toArray();

//         // console.log('Wallets:', wallets);
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

// main();



// const queryParser = () => {

//   const string = '%24populate=meta.room&%24limit=5&%24sort=';
//   const d = qP(string);
//   console.log(d);

//   for (const [key, value] of Object.entries(d)) {
//     if (key.includes('[') && key.includes(']')) {
//       // Extract the main key and subkey (e.g., $sort and createdAt)
//       const [mainKey, subKey] = key.split(/\[|\]/).filter(Boolean);
//       d[mainKey] = d[mainKey] || {};
//       d[mainKey][subKey] = value;
//     } else if (Array.isArray(value)) {
//       // Handle multiple values (e.g., $populate=user&$populate=cart)
//       d[key] = value;
//     } else {
//       // Handle regular keys
//       d[key] = value;
//     }
//   }

//   console.log(d);
// }

// queryParser()