export type TClassName =
  | string
  | string[]
  | Record<string, boolean>
  | Record<string, boolean>[];

export interface IFetchOptions {
  search?: string;
  force?: boolean;
  merge?: boolean;
  returnOnly?: boolean;
  limit: string | number;
}
