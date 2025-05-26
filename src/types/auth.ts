export interface IAuthTokens {
  id: string;
  access: string;
  refresh: string;
}

type TUserRole = "admin" | "review_moderator";

export interface IAuthUser {
  id: string;
  full_name: string;
  role: TUserRole;
  avatar_url: null | string;
}

export interface IAccess {
  id: string;
}

export interface IOneId {
  one_id_url: string;
}
