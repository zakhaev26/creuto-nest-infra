import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request as ExRequest } from 'express-serve-static-core';
import { UserzDocument } from 'src/users/schema/users.schema';

declare type Request = {
  user: UserzDocument;
} & ExRequest;

declare type ModifyBodyFn = (request: Request) => Request;

export const setCreatedBy =
  (key = 'createdBy'): ModifyBodyFn =>
  (request: Request) => {
    request.body[key] = '6720e8899a6f9ad246cd94d2';
    return request;
  };

  export const handleSoftDelete =
  (key = 'deleted', deletedByKey = 'deletedBy', deletedAtKey = 'deletedAt'): ModifyBodyFn =>
  (request: Request) => {
    if (request.method.toLowerCase() === 'get' || request.method.toLowerCase() === 'find') {
      // Set the query to exclude deleted items
      // request.query[key] = { $ne: true }; // Adjust the query for GET requests
    } else {
      // Mark as deleted and set deleted info
      request.body[key] = true; // Mark as deleted
      request.body[deletedByKey] = request.user._id; // Set the user who deleted it
      request.body[deletedAtKey] = new Date(); // Set the current date/time
    }
    return request;
  };


export const ModifyBody = createParamDecorator(
  (fn: undefined | ModifyBodyFn | ModifyBodyFn[], ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (Array.isArray(fn)) {
      fn.forEach((f) => f?.(request));
    } else {
      fn?.(request);
    }
    return request.body;
  },
);