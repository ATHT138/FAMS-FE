export interface User {
  userId?: string | null;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  dob?: string | null;
  gender?: boolean | null | undefined;
  role?: number | null;
  status?: boolean | null;
  createdBy?: string | null;
  createdDate?: string | null;
  modifiedBy?: string | null;
  modifiedDate?: string | null;
  password?: string | null;
}

export interface ListParamsUser{
  pageNumber?: number;
  pageSize?: number;
  searchTerms?: string[];
}

export interface ListParamsCreateUser {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  dob?: Date | null;
  gender?: boolean | null;
  role?: number | null;
  status?: boolean | null;
  password?: string | null;
}
export interface ListParamsUpdateUser {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  dob?: Date | null;
  gender?: boolean | null;
  role?: number | null;
  status?: boolean | null;
  password?: string | null;
}
