export interface IMap<T = any> {
  [name: string]: T;
}

export interface IAuditable {
  id: string;
  created_at: number;
  updated_at: number;
}

export interface IItem {
  name: string;
  value: any;
}
