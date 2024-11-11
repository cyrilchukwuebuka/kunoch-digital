// import { NextRouter } from 'next/router'
import { ReadonlyURLSearchParams } from "next/navigation";

export enum URL_QUERIES {}

export enum URL_QUERY_VALUES {}

export enum OPERATION_STATUS {}

export const updatedSearchParams = (
  searchParams: ReadonlyURLSearchParams,
  query: string,
  value: string
): string => {
  const current = new URLSearchParams(Array.from(searchParams.entries()));

  if (!value) {
    current.delete(query);
  } else {
    current.set(query, value);
  }

  const params = current.toString();
  return params ? `?${params}` : "";
};

export const createQueryString = (
  name: string,
  value: string,
  searchParams: URLSearchParams
) => {
  const params = new URLSearchParams(searchParams);
  params.set(name, value);

  return "?" + params.toString();
};
