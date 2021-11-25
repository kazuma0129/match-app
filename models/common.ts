export type Uid = string;

export type CreatedA = number;
export type UpdatedAt = number;

export type Data = {
  _uid: Uid;
  createdAt: CreatedA;
  updatedAt?: UpdatedAt;
  createdBy?: Uid;
  updatedBy?: Uid;
};

export type List<T> = {
  list: T[];
  currentPage: number;
  totalCount: number;
};
