import { Request } from "express";
import { UserViewDTO } from "../modules/users/dto/users.response.dto";

declare global {
  namespace Express {
    export interface Request {
      user?: UserViewDTO;
    }
  }
}

export type RequestBody<T> = Request<{}, {}, T>;
export type RequestParams<T> = Request<T>;
export type RequestQuery<T> = Request<{}, {}, {}, T>;
export type RequestBodyParams<TBody, TParams> = Request<TParams, {}, TBody>;

export type ErrorResponse = {
  message: string;
};

export enum HttpStatuses {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}
