declare namespace Type {
  export interface Obj<T = any> {
    [key: string]: T;
  }

  export interface Err<E = number, M = string> {
    errno: E;
    errmsg: M;
  }

  export type JsonErr<E = number, M = string> = Err<E, M>;
  export type Exception<E = number, M = string> = Err<E, M>;
  export type Res<S = Obj, E extends Err = Err, F = never> = {
    timestamp: Alias.Timestamp;
  } & (
    | ({
        status: true;
        result: S;
      } & Err<0, "">)
    | ({ status: false; result: F } & E)
  );

  export type PromiseRes<S = Obj, E extends Err = Err, F = never> = Promise<
    Res<S, E, F>
  >;

  export type ListApi<T, S = undefined> = {
    total: number;
    pageSize: number;
    list: T[];
  } & S;
}

declare namespace Alias {
  export type Price = number;
  export type Json = string;
  export type Timestamp = number;
  export type ID = string | number;
  export type Url = string;
  export type Status = number;
  export type Image = string;
  export type HTML = string;
  export type Query = Type.Obj<string>;
  export type Timer = NodeJS.Timeout;
  export type Style = Partial<CSSStyleDeclaration>;
  export type Empty = {};
  export type UnknownStr = "";
}
