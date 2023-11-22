import { Prisma } from "../generated/client";

export interface IPaginationParams {
  page: number;
  rows: number;
  sort?: string;
  direction?: string;
  search?: string;
}

export interface IPaginationRes {
  total: number;
  rows: number;
  page: number;
  data: {}[];
}

export const getRows = (rows?: string) => (rows ? +rows : 10);

export const getPage = (page?: string) => (page ? +page : 1);

export const getDirection = (dir?: string) =>
  dir ? (dir as Prisma.SortOrder) : Prisma.SortOrder.asc;
