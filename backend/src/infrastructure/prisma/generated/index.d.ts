
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Company
 * 
 */
export type Company = $Result.DefaultSelection<Prisma.$CompanyPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model UserGroup
 * 
 */
export type UserGroup = $Result.DefaultSelection<Prisma.$UserGroupPayload>
/**
 * Model UserGroupMember
 * 
 */
export type UserGroupMember = $Result.DefaultSelection<Prisma.$UserGroupMemberPayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model Table
 * 
 */
export type Table = $Result.DefaultSelection<Prisma.$TablePayload>
/**
 * Model Order
 * 
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>
/**
 * Model OrderItem
 * 
 */
export type OrderItem = $Result.DefaultSelection<Prisma.$OrderItemPayload>
/**
 * Model CashierSession
 * 
 */
export type CashierSession = $Result.DefaultSelection<Prisma.$CashierSessionPayload>
/**
 * Model CashierMovement
 * 
 */
export type CashierMovement = $Result.DefaultSelection<Prisma.$CashierMovementPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  ADMIN: 'ADMIN',
  STAFF: 'STAFF'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Companies
 * const companies = await prisma.company.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Companies
   * const companies = await prisma.company.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.company`: Exposes CRUD operations for the **Company** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Companies
    * const companies = await prisma.company.findMany()
    * ```
    */
  get company(): Prisma.CompanyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userGroup`: Exposes CRUD operations for the **UserGroup** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserGroups
    * const userGroups = await prisma.userGroup.findMany()
    * ```
    */
  get userGroup(): Prisma.UserGroupDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userGroupMember`: Exposes CRUD operations for the **UserGroupMember** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserGroupMembers
    * const userGroupMembers = await prisma.userGroupMember.findMany()
    * ```
    */
  get userGroupMember(): Prisma.UserGroupMemberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.table`: Exposes CRUD operations for the **Table** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tables
    * const tables = await prisma.table.findMany()
    * ```
    */
  get table(): Prisma.TableDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orders
    * const orders = await prisma.order.findMany()
    * ```
    */
  get order(): Prisma.OrderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.orderItem`: Exposes CRUD operations for the **OrderItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrderItems
    * const orderItems = await prisma.orderItem.findMany()
    * ```
    */
  get orderItem(): Prisma.OrderItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cashierSession`: Exposes CRUD operations for the **CashierSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CashierSessions
    * const cashierSessions = await prisma.cashierSession.findMany()
    * ```
    */
  get cashierSession(): Prisma.CashierSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cashierMovement`: Exposes CRUD operations for the **CashierMovement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CashierMovements
    * const cashierMovements = await prisma.cashierMovement.findMany()
    * ```
    */
  get cashierMovement(): Prisma.CashierMovementDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.3.0
   * Query Engine version: 9d6ad21cbbceab97458517b147a6a09ff43aa735
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Company: 'Company',
    User: 'User',
    UserGroup: 'UserGroup',
    UserGroupMember: 'UserGroupMember',
    Product: 'Product',
    Category: 'Category',
    Table: 'Table',
    Order: 'Order',
    OrderItem: 'OrderItem',
    CashierSession: 'CashierSession',
    CashierMovement: 'CashierMovement'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "company" | "user" | "userGroup" | "userGroupMember" | "product" | "category" | "table" | "order" | "orderItem" | "cashierSession" | "cashierMovement"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Company: {
        payload: Prisma.$CompanyPayload<ExtArgs>
        fields: Prisma.CompanyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompanyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompanyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findFirst: {
            args: Prisma.CompanyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompanyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findMany: {
            args: Prisma.CompanyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          create: {
            args: Prisma.CompanyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          createMany: {
            args: Prisma.CompanyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompanyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          delete: {
            args: Prisma.CompanyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          update: {
            args: Prisma.CompanyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          deleteMany: {
            args: Prisma.CompanyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompanyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CompanyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          upsert: {
            args: Prisma.CompanyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          aggregate: {
            args: Prisma.CompanyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompany>
          }
          groupBy: {
            args: Prisma.CompanyGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompanyGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompanyCountArgs<ExtArgs>
            result: $Utils.Optional<CompanyCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      UserGroup: {
        payload: Prisma.$UserGroupPayload<ExtArgs>
        fields: Prisma.UserGroupFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserGroupFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserGroupFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupPayload>
          }
          findFirst: {
            args: Prisma.UserGroupFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserGroupFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupPayload>
          }
          findMany: {
            args: Prisma.UserGroupFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupPayload>[]
          }
          create: {
            args: Prisma.UserGroupCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupPayload>
          }
          createMany: {
            args: Prisma.UserGroupCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserGroupCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupPayload>[]
          }
          delete: {
            args: Prisma.UserGroupDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupPayload>
          }
          update: {
            args: Prisma.UserGroupUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupPayload>
          }
          deleteMany: {
            args: Prisma.UserGroupDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserGroupUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserGroupUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupPayload>[]
          }
          upsert: {
            args: Prisma.UserGroupUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupPayload>
          }
          aggregate: {
            args: Prisma.UserGroupAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserGroup>
          }
          groupBy: {
            args: Prisma.UserGroupGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserGroupCountArgs<ExtArgs>
            result: $Utils.Optional<UserGroupCountAggregateOutputType> | number
          }
        }
      }
      UserGroupMember: {
        payload: Prisma.$UserGroupMemberPayload<ExtArgs>
        fields: Prisma.UserGroupMemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserGroupMemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupMemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserGroupMemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupMemberPayload>
          }
          findFirst: {
            args: Prisma.UserGroupMemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupMemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserGroupMemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupMemberPayload>
          }
          findMany: {
            args: Prisma.UserGroupMemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupMemberPayload>[]
          }
          create: {
            args: Prisma.UserGroupMemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupMemberPayload>
          }
          createMany: {
            args: Prisma.UserGroupMemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserGroupMemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupMemberPayload>[]
          }
          delete: {
            args: Prisma.UserGroupMemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupMemberPayload>
          }
          update: {
            args: Prisma.UserGroupMemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupMemberPayload>
          }
          deleteMany: {
            args: Prisma.UserGroupMemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserGroupMemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserGroupMemberUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupMemberPayload>[]
          }
          upsert: {
            args: Prisma.UserGroupMemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupMemberPayload>
          }
          aggregate: {
            args: Prisma.UserGroupMemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserGroupMember>
          }
          groupBy: {
            args: Prisma.UserGroupMemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupMemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserGroupMemberCountArgs<ExtArgs>
            result: $Utils.Optional<UserGroupMemberCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      Table: {
        payload: Prisma.$TablePayload<ExtArgs>
        fields: Prisma.TableFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TableFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TableFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload>
          }
          findFirst: {
            args: Prisma.TableFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TableFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload>
          }
          findMany: {
            args: Prisma.TableFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload>[]
          }
          create: {
            args: Prisma.TableCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload>
          }
          createMany: {
            args: Prisma.TableCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TableCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload>[]
          }
          delete: {
            args: Prisma.TableDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload>
          }
          update: {
            args: Prisma.TableUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload>
          }
          deleteMany: {
            args: Prisma.TableDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TableUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TableUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload>[]
          }
          upsert: {
            args: Prisma.TableUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload>
          }
          aggregate: {
            args: Prisma.TableAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTable>
          }
          groupBy: {
            args: Prisma.TableGroupByArgs<ExtArgs>
            result: $Utils.Optional<TableGroupByOutputType>[]
          }
          count: {
            args: Prisma.TableCountArgs<ExtArgs>
            result: $Utils.Optional<TableCountAggregateOutputType> | number
          }
        }
      }
      Order: {
        payload: Prisma.$OrderPayload<ExtArgs>
        fields: Prisma.OrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findFirst: {
            args: Prisma.OrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findMany: {
            args: Prisma.OrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          create: {
            args: Prisma.OrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          createMany: {
            args: Prisma.OrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          delete: {
            args: Prisma.OrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          update: {
            args: Prisma.OrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          deleteMany: {
            args: Prisma.OrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          upsert: {
            args: Prisma.OrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          aggregate: {
            args: Prisma.OrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrder>
          }
          groupBy: {
            args: Prisma.OrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderCountArgs<ExtArgs>
            result: $Utils.Optional<OrderCountAggregateOutputType> | number
          }
        }
      }
      OrderItem: {
        payload: Prisma.$OrderItemPayload<ExtArgs>
        fields: Prisma.OrderItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findFirst: {
            args: Prisma.OrderItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findMany: {
            args: Prisma.OrderItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          create: {
            args: Prisma.OrderItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          createMany: {
            args: Prisma.OrderItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          delete: {
            args: Prisma.OrderItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          update: {
            args: Prisma.OrderItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          deleteMany: {
            args: Prisma.OrderItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          upsert: {
            args: Prisma.OrderItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          aggregate: {
            args: Prisma.OrderItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrderItem>
          }
          groupBy: {
            args: Prisma.OrderItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderItemCountArgs<ExtArgs>
            result: $Utils.Optional<OrderItemCountAggregateOutputType> | number
          }
        }
      }
      CashierSession: {
        payload: Prisma.$CashierSessionPayload<ExtArgs>
        fields: Prisma.CashierSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CashierSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashierSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CashierSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashierSessionPayload>
          }
          findFirst: {
            args: Prisma.CashierSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashierSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CashierSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashierSessionPayload>
          }
          findMany: {
            args: Prisma.CashierSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashierSessionPayload>[]
          }
          create: {
            args: Prisma.CashierSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashierSessionPayload>
          }
          createMany: {
            args: Prisma.CashierSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CashierSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashierSessionPayload>[]
          }
          delete: {
            args: Prisma.CashierSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashierSessionPayload>
          }
          update: {
            args: Prisma.CashierSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashierSessionPayload>
          }
          deleteMany: {
            args: Prisma.CashierSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CashierSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CashierSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashierSessionPayload>[]
          }
          upsert: {
            args: Prisma.CashierSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashierSessionPayload>
          }
          aggregate: {
            args: Prisma.CashierSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCashierSession>
          }
          groupBy: {
            args: Prisma.CashierSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<CashierSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.CashierSessionCountArgs<ExtArgs>
            result: $Utils.Optional<CashierSessionCountAggregateOutputType> | number
          }
        }
      }
      CashierMovement: {
        payload: Prisma.$CashierMovementPayload<ExtArgs>
        fields: Prisma.CashierMovementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CashierMovementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashierMovementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CashierMovementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashierMovementPayload>
          }
          findFirst: {
            args: Prisma.CashierMovementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashierMovementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CashierMovementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashierMovementPayload>
          }
          findMany: {
            args: Prisma.CashierMovementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashierMovementPayload>[]
          }
          create: {
            args: Prisma.CashierMovementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashierMovementPayload>
          }
          createMany: {
            args: Prisma.CashierMovementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CashierMovementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashierMovementPayload>[]
          }
          delete: {
            args: Prisma.CashierMovementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashierMovementPayload>
          }
          update: {
            args: Prisma.CashierMovementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashierMovementPayload>
          }
          deleteMany: {
            args: Prisma.CashierMovementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CashierMovementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CashierMovementUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashierMovementPayload>[]
          }
          upsert: {
            args: Prisma.CashierMovementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashierMovementPayload>
          }
          aggregate: {
            args: Prisma.CashierMovementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCashierMovement>
          }
          groupBy: {
            args: Prisma.CashierMovementGroupByArgs<ExtArgs>
            result: $Utils.Optional<CashierMovementGroupByOutputType>[]
          }
          count: {
            args: Prisma.CashierMovementCountArgs<ExtArgs>
            result: $Utils.Optional<CashierMovementCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    company?: CompanyOmit
    user?: UserOmit
    userGroup?: UserGroupOmit
    userGroupMember?: UserGroupMemberOmit
    product?: ProductOmit
    category?: CategoryOmit
    table?: TableOmit
    order?: OrderOmit
    orderItem?: OrderItemOmit
    cashierSession?: CashierSessionOmit
    cashierMovement?: CashierMovementOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CompanyCountOutputType
   */

  export type CompanyCountOutputType = {
    users: number
    userGroups: number
    tables: number
    categories: number
    products: number
    cashierSessions: number
  }

  export type CompanyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | CompanyCountOutputTypeCountUsersArgs
    userGroups?: boolean | CompanyCountOutputTypeCountUserGroupsArgs
    tables?: boolean | CompanyCountOutputTypeCountTablesArgs
    categories?: boolean | CompanyCountOutputTypeCountCategoriesArgs
    products?: boolean | CompanyCountOutputTypeCountProductsArgs
    cashierSessions?: boolean | CompanyCountOutputTypeCountCashierSessionsArgs
  }

  // Custom InputTypes
  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCountOutputType
     */
    select?: CompanyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountUserGroupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserGroupWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountTablesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TableWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountCategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountCashierSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CashierSessionWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    groupMembers: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    groupMembers?: boolean | UserCountOutputTypeCountGroupMembersArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountGroupMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserGroupMemberWhereInput
  }


  /**
   * Count Type UserGroupCountOutputType
   */

  export type UserGroupCountOutputType = {
    members: number
  }

  export type UserGroupCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | UserGroupCountOutputTypeCountMembersArgs
  }

  // Custom InputTypes
  /**
   * UserGroupCountOutputType without action
   */
  export type UserGroupCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroupCountOutputType
     */
    select?: UserGroupCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserGroupCountOutputType without action
   */
  export type UserGroupCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserGroupMemberWhereInput
  }


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    orderItems: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orderItems?: boolean | ProductCountOutputTypeCountOrderItemsArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountOrderItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    products: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | CategoryCountOutputTypeCountProductsArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
  }


  /**
   * Count Type TableCountOutputType
   */

  export type TableCountOutputType = {
    orders: number
  }

  export type TableCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | TableCountOutputTypeCountOrdersArgs
  }

  // Custom InputTypes
  /**
   * TableCountOutputType without action
   */
  export type TableCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TableCountOutputType
     */
    select?: TableCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TableCountOutputType without action
   */
  export type TableCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }


  /**
   * Count Type OrderCountOutputType
   */

  export type OrderCountOutputType = {
    items: number
  }

  export type OrderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | OrderCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderCountOutputType
     */
    select?: OrderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
  }


  /**
   * Count Type CashierSessionCountOutputType
   */

  export type CashierSessionCountOutputType = {
    movements: number
  }

  export type CashierSessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    movements?: boolean | CashierSessionCountOutputTypeCountMovementsArgs
  }

  // Custom InputTypes
  /**
   * CashierSessionCountOutputType without action
   */
  export type CashierSessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashierSessionCountOutputType
     */
    select?: CashierSessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CashierSessionCountOutputType without action
   */
  export type CashierSessionCountOutputTypeCountMovementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CashierMovementWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Company
   */

  export type AggregateCompany = {
    _count: CompanyCountAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  export type CompanyMinAggregateOutputType = {
    uuid: string | null
    name: string | null
    menuTheme: string | null
    soundOnOrderReady: boolean | null
    createdAt: Date | null
  }

  export type CompanyMaxAggregateOutputType = {
    uuid: string | null
    name: string | null
    menuTheme: string | null
    soundOnOrderReady: boolean | null
    createdAt: Date | null
  }

  export type CompanyCountAggregateOutputType = {
    uuid: number
    name: number
    menuTheme: number
    soundOnOrderReady: number
    createdAt: number
    _all: number
  }


  export type CompanyMinAggregateInputType = {
    uuid?: true
    name?: true
    menuTheme?: true
    soundOnOrderReady?: true
    createdAt?: true
  }

  export type CompanyMaxAggregateInputType = {
    uuid?: true
    name?: true
    menuTheme?: true
    soundOnOrderReady?: true
    createdAt?: true
  }

  export type CompanyCountAggregateInputType = {
    uuid?: true
    name?: true
    menuTheme?: true
    soundOnOrderReady?: true
    createdAt?: true
    _all?: true
  }

  export type CompanyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Company to aggregate.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Companies
    **/
    _count?: true | CompanyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanyMaxAggregateInputType
  }

  export type GetCompanyAggregateType<T extends CompanyAggregateArgs> = {
        [P in keyof T & keyof AggregateCompany]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompany[P]>
      : GetScalarType<T[P], AggregateCompany[P]>
  }




  export type CompanyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyWhereInput
    orderBy?: CompanyOrderByWithAggregationInput | CompanyOrderByWithAggregationInput[]
    by: CompanyScalarFieldEnum[] | CompanyScalarFieldEnum
    having?: CompanyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanyCountAggregateInputType | true
    _min?: CompanyMinAggregateInputType
    _max?: CompanyMaxAggregateInputType
  }

  export type CompanyGroupByOutputType = {
    uuid: string
    name: string
    menuTheme: string | null
    soundOnOrderReady: boolean
    createdAt: Date
    _count: CompanyCountAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  type GetCompanyGroupByPayload<T extends CompanyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompanyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanyGroupByOutputType[P]>
            : GetScalarType<T[P], CompanyGroupByOutputType[P]>
        }
      >
    >


  export type CompanySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    uuid?: boolean
    name?: boolean
    menuTheme?: boolean
    soundOnOrderReady?: boolean
    createdAt?: boolean
    users?: boolean | Company$usersArgs<ExtArgs>
    userGroups?: boolean | Company$userGroupsArgs<ExtArgs>
    tables?: boolean | Company$tablesArgs<ExtArgs>
    categories?: boolean | Company$categoriesArgs<ExtArgs>
    products?: boolean | Company$productsArgs<ExtArgs>
    cashierSessions?: boolean | Company$cashierSessionsArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["company"]>

  export type CompanySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    uuid?: boolean
    name?: boolean
    menuTheme?: boolean
    soundOnOrderReady?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["company"]>

  export type CompanySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    uuid?: boolean
    name?: boolean
    menuTheme?: boolean
    soundOnOrderReady?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["company"]>

  export type CompanySelectScalar = {
    uuid?: boolean
    name?: boolean
    menuTheme?: boolean
    soundOnOrderReady?: boolean
    createdAt?: boolean
  }

  export type CompanyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"uuid" | "name" | "menuTheme" | "soundOnOrderReady" | "createdAt", ExtArgs["result"]["company"]>
  export type CompanyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Company$usersArgs<ExtArgs>
    userGroups?: boolean | Company$userGroupsArgs<ExtArgs>
    tables?: boolean | Company$tablesArgs<ExtArgs>
    categories?: boolean | Company$categoriesArgs<ExtArgs>
    products?: boolean | Company$productsArgs<ExtArgs>
    cashierSessions?: boolean | Company$cashierSessionsArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CompanyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CompanyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CompanyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Company"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
      userGroups: Prisma.$UserGroupPayload<ExtArgs>[]
      tables: Prisma.$TablePayload<ExtArgs>[]
      categories: Prisma.$CategoryPayload<ExtArgs>[]
      products: Prisma.$ProductPayload<ExtArgs>[]
      cashierSessions: Prisma.$CashierSessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      uuid: string
      name: string
      menuTheme: string | null
      soundOnOrderReady: boolean
      createdAt: Date
    }, ExtArgs["result"]["company"]>
    composites: {}
  }

  type CompanyGetPayload<S extends boolean | null | undefined | CompanyDefaultArgs> = $Result.GetResult<Prisma.$CompanyPayload, S>

  type CompanyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CompanyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompanyCountAggregateInputType | true
    }

  export interface CompanyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Company'], meta: { name: 'Company' } }
    /**
     * Find zero or one Company that matches the filter.
     * @param {CompanyFindUniqueArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompanyFindUniqueArgs>(args: SelectSubset<T, CompanyFindUniqueArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Company that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CompanyFindUniqueOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompanyFindUniqueOrThrowArgs>(args: SelectSubset<T, CompanyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompanyFindFirstArgs>(args?: SelectSubset<T, CompanyFindFirstArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompanyFindFirstOrThrowArgs>(args?: SelectSubset<T, CompanyFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Companies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Companies
     * const companies = await prisma.company.findMany()
     * 
     * // Get first 10 Companies
     * const companies = await prisma.company.findMany({ take: 10 })
     * 
     * // Only select the `uuid`
     * const companyWithUuidOnly = await prisma.company.findMany({ select: { uuid: true } })
     * 
     */
    findMany<T extends CompanyFindManyArgs>(args?: SelectSubset<T, CompanyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Company.
     * @param {CompanyCreateArgs} args - Arguments to create a Company.
     * @example
     * // Create one Company
     * const Company = await prisma.company.create({
     *   data: {
     *     // ... data to create a Company
     *   }
     * })
     * 
     */
    create<T extends CompanyCreateArgs>(args: SelectSubset<T, CompanyCreateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Companies.
     * @param {CompanyCreateManyArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompanyCreateManyArgs>(args?: SelectSubset<T, CompanyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Companies and returns the data saved in the database.
     * @param {CompanyCreateManyAndReturnArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Companies and only return the `uuid`
     * const companyWithUuidOnly = await prisma.company.createManyAndReturn({
     *   select: { uuid: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompanyCreateManyAndReturnArgs>(args?: SelectSubset<T, CompanyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Company.
     * @param {CompanyDeleteArgs} args - Arguments to delete one Company.
     * @example
     * // Delete one Company
     * const Company = await prisma.company.delete({
     *   where: {
     *     // ... filter to delete one Company
     *   }
     * })
     * 
     */
    delete<T extends CompanyDeleteArgs>(args: SelectSubset<T, CompanyDeleteArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Company.
     * @param {CompanyUpdateArgs} args - Arguments to update one Company.
     * @example
     * // Update one Company
     * const company = await prisma.company.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompanyUpdateArgs>(args: SelectSubset<T, CompanyUpdateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Companies.
     * @param {CompanyDeleteManyArgs} args - Arguments to filter Companies to delete.
     * @example
     * // Delete a few Companies
     * const { count } = await prisma.company.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompanyDeleteManyArgs>(args?: SelectSubset<T, CompanyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompanyUpdateManyArgs>(args: SelectSubset<T, CompanyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies and returns the data updated in the database.
     * @param {CompanyUpdateManyAndReturnArgs} args - Arguments to update many Companies.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Companies and only return the `uuid`
     * const companyWithUuidOnly = await prisma.company.updateManyAndReturn({
     *   select: { uuid: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CompanyUpdateManyAndReturnArgs>(args: SelectSubset<T, CompanyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Company.
     * @param {CompanyUpsertArgs} args - Arguments to update or create a Company.
     * @example
     * // Update or create a Company
     * const company = await prisma.company.upsert({
     *   create: {
     *     // ... data to create a Company
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Company we want to update
     *   }
     * })
     */
    upsert<T extends CompanyUpsertArgs>(args: SelectSubset<T, CompanyUpsertArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyCountArgs} args - Arguments to filter Companies to count.
     * @example
     * // Count the number of Companies
     * const count = await prisma.company.count({
     *   where: {
     *     // ... the filter for the Companies we want to count
     *   }
     * })
    **/
    count<T extends CompanyCountArgs>(
      args?: Subset<T, CompanyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompanyAggregateArgs>(args: Subset<T, CompanyAggregateArgs>): Prisma.PrismaPromise<GetCompanyAggregateType<T>>

    /**
     * Group by Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompanyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanyGroupByArgs['orderBy'] }
        : { orderBy?: CompanyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompanyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Company model
   */
  readonly fields: CompanyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Company.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompanyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Company$usersArgs<ExtArgs> = {}>(args?: Subset<T, Company$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    userGroups<T extends Company$userGroupsArgs<ExtArgs> = {}>(args?: Subset<T, Company$userGroupsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tables<T extends Company$tablesArgs<ExtArgs> = {}>(args?: Subset<T, Company$tablesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    categories<T extends Company$categoriesArgs<ExtArgs> = {}>(args?: Subset<T, Company$categoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    products<T extends Company$productsArgs<ExtArgs> = {}>(args?: Subset<T, Company$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    cashierSessions<T extends Company$cashierSessionsArgs<ExtArgs> = {}>(args?: Subset<T, Company$cashierSessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CashierSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Company model
   */
  interface CompanyFieldRefs {
    readonly uuid: FieldRef<"Company", 'String'>
    readonly name: FieldRef<"Company", 'String'>
    readonly menuTheme: FieldRef<"Company", 'String'>
    readonly soundOnOrderReady: FieldRef<"Company", 'Boolean'>
    readonly createdAt: FieldRef<"Company", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Company findUnique
   */
  export type CompanyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findUniqueOrThrow
   */
  export type CompanyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findFirst
   */
  export type CompanyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findFirstOrThrow
   */
  export type CompanyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findMany
   */
  export type CompanyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Companies to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company create
   */
  export type CompanyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to create a Company.
     */
    data: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
  }

  /**
   * Company createMany
   */
  export type CompanyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Company createManyAndReturn
   */
  export type CompanyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Company update
   */
  export type CompanyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to update a Company.
     */
    data: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
    /**
     * Choose, which Company to update.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company updateMany
   */
  export type CompanyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Companies.
     */
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to update.
     */
    limit?: number
  }

  /**
   * Company updateManyAndReturn
   */
  export type CompanyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * The data used to update Companies.
     */
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to update.
     */
    limit?: number
  }

  /**
   * Company upsert
   */
  export type CompanyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The filter to search for the Company to update in case it exists.
     */
    where: CompanyWhereUniqueInput
    /**
     * In case the Company found by the `where` argument doesn't exist, create a new Company with this data.
     */
    create: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
    /**
     * In case the Company was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
  }

  /**
   * Company delete
   */
  export type CompanyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter which Company to delete.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company deleteMany
   */
  export type CompanyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Companies to delete
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to delete.
     */
    limit?: number
  }

  /**
   * Company.users
   */
  export type Company$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Company.userGroups
   */
  export type Company$userGroupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroup
     */
    select?: UserGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroup
     */
    omit?: UserGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupInclude<ExtArgs> | null
    where?: UserGroupWhereInput
    orderBy?: UserGroupOrderByWithRelationInput | UserGroupOrderByWithRelationInput[]
    cursor?: UserGroupWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserGroupScalarFieldEnum | UserGroupScalarFieldEnum[]
  }

  /**
   * Company.tables
   */
  export type Company$tablesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null
    where?: TableWhereInput
    orderBy?: TableOrderByWithRelationInput | TableOrderByWithRelationInput[]
    cursor?: TableWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TableScalarFieldEnum | TableScalarFieldEnum[]
  }

  /**
   * Company.categories
   */
  export type Company$categoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    cursor?: CategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Company.products
   */
  export type Company$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    cursor?: ProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Company.cashierSessions
   */
  export type Company$cashierSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashierSession
     */
    select?: CashierSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CashierSession
     */
    omit?: CashierSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashierSessionInclude<ExtArgs> | null
    where?: CashierSessionWhereInput
    orderBy?: CashierSessionOrderByWithRelationInput | CashierSessionOrderByWithRelationInput[]
    cursor?: CashierSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CashierSessionScalarFieldEnum | CashierSessionScalarFieldEnum[]
  }

  /**
   * Company without action
   */
  export type CompanyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    uuid: string | null
    email: string | null
    passwordHash: string | null
    name: string | null
    role: $Enums.UserRole | null
    companyUuid: string | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    uuid: string | null
    email: string | null
    passwordHash: string | null
    name: string | null
    role: $Enums.UserRole | null
    companyUuid: string | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    uuid: number
    email: number
    passwordHash: number
    name: number
    role: number
    companyUuid: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    uuid?: true
    email?: true
    passwordHash?: true
    name?: true
    role?: true
    companyUuid?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    uuid?: true
    email?: true
    passwordHash?: true
    name?: true
    role?: true
    companyUuid?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    uuid?: true
    email?: true
    passwordHash?: true
    name?: true
    role?: true
    companyUuid?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    uuid: string
    email: string
    passwordHash: string
    name: string
    role: $Enums.UserRole
    companyUuid: string
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    uuid?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    role?: boolean
    companyUuid?: boolean
    createdAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    groupMembers?: boolean | User$groupMembersArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    uuid?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    role?: boolean
    companyUuid?: boolean
    createdAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    uuid?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    role?: boolean
    companyUuid?: boolean
    createdAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    uuid?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    role?: boolean
    companyUuid?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"uuid" | "email" | "passwordHash" | "name" | "role" | "companyUuid" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    groupMembers?: boolean | User$groupMembersArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
      groupMembers: Prisma.$UserGroupMemberPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      uuid: string
      email: string
      passwordHash: string
      name: string
      role: $Enums.UserRole
      companyUuid: string
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `uuid`
     * const userWithUuidOnly = await prisma.user.findMany({ select: { uuid: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `uuid`
     * const userWithUuidOnly = await prisma.user.createManyAndReturn({
     *   select: { uuid: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `uuid`
     * const userWithUuidOnly = await prisma.user.updateManyAndReturn({
     *   select: { uuid: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    groupMembers<T extends User$groupMembersArgs<ExtArgs> = {}>(args?: Subset<T, User$groupMembersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGroupMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly uuid: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly companyUuid: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.groupMembers
   */
  export type User$groupMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroupMember
     */
    select?: UserGroupMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroupMember
     */
    omit?: UserGroupMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupMemberInclude<ExtArgs> | null
    where?: UserGroupMemberWhereInput
    orderBy?: UserGroupMemberOrderByWithRelationInput | UserGroupMemberOrderByWithRelationInput[]
    cursor?: UserGroupMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserGroupMemberScalarFieldEnum | UserGroupMemberScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model UserGroup
   */

  export type AggregateUserGroup = {
    _count: UserGroupCountAggregateOutputType | null
    _min: UserGroupMinAggregateOutputType | null
    _max: UserGroupMaxAggregateOutputType | null
  }

  export type UserGroupMinAggregateOutputType = {
    uuid: string | null
    name: string | null
    companyUuid: string | null
    createdAt: Date | null
  }

  export type UserGroupMaxAggregateOutputType = {
    uuid: string | null
    name: string | null
    companyUuid: string | null
    createdAt: Date | null
  }

  export type UserGroupCountAggregateOutputType = {
    uuid: number
    name: number
    permissions: number
    companyUuid: number
    createdAt: number
    _all: number
  }


  export type UserGroupMinAggregateInputType = {
    uuid?: true
    name?: true
    companyUuid?: true
    createdAt?: true
  }

  export type UserGroupMaxAggregateInputType = {
    uuid?: true
    name?: true
    companyUuid?: true
    createdAt?: true
  }

  export type UserGroupCountAggregateInputType = {
    uuid?: true
    name?: true
    permissions?: true
    companyUuid?: true
    createdAt?: true
    _all?: true
  }

  export type UserGroupAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserGroup to aggregate.
     */
    where?: UserGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserGroups to fetch.
     */
    orderBy?: UserGroupOrderByWithRelationInput | UserGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserGroups
    **/
    _count?: true | UserGroupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserGroupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserGroupMaxAggregateInputType
  }

  export type GetUserGroupAggregateType<T extends UserGroupAggregateArgs> = {
        [P in keyof T & keyof AggregateUserGroup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserGroup[P]>
      : GetScalarType<T[P], AggregateUserGroup[P]>
  }




  export type UserGroupGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserGroupWhereInput
    orderBy?: UserGroupOrderByWithAggregationInput | UserGroupOrderByWithAggregationInput[]
    by: UserGroupScalarFieldEnum[] | UserGroupScalarFieldEnum
    having?: UserGroupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserGroupCountAggregateInputType | true
    _min?: UserGroupMinAggregateInputType
    _max?: UserGroupMaxAggregateInputType
  }

  export type UserGroupGroupByOutputType = {
    uuid: string
    name: string
    permissions: string[]
    companyUuid: string
    createdAt: Date
    _count: UserGroupCountAggregateOutputType | null
    _min: UserGroupMinAggregateOutputType | null
    _max: UserGroupMaxAggregateOutputType | null
  }

  type GetUserGroupGroupByPayload<T extends UserGroupGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupGroupByOutputType[P]>
        }
      >
    >


  export type UserGroupSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    uuid?: boolean
    name?: boolean
    permissions?: boolean
    companyUuid?: boolean
    createdAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    members?: boolean | UserGroup$membersArgs<ExtArgs>
    _count?: boolean | UserGroupCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userGroup"]>

  export type UserGroupSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    uuid?: boolean
    name?: boolean
    permissions?: boolean
    companyUuid?: boolean
    createdAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userGroup"]>

  export type UserGroupSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    uuid?: boolean
    name?: boolean
    permissions?: boolean
    companyUuid?: boolean
    createdAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userGroup"]>

  export type UserGroupSelectScalar = {
    uuid?: boolean
    name?: boolean
    permissions?: boolean
    companyUuid?: boolean
    createdAt?: boolean
  }

  export type UserGroupOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"uuid" | "name" | "permissions" | "companyUuid" | "createdAt", ExtArgs["result"]["userGroup"]>
  export type UserGroupInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    members?: boolean | UserGroup$membersArgs<ExtArgs>
    _count?: boolean | UserGroupCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserGroupIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type UserGroupIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $UserGroupPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserGroup"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
      members: Prisma.$UserGroupMemberPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      uuid: string
      name: string
      /**
       * * Códigos de área do painel (ex.: PRODUCTS, ORDERS). Uniao nos grupos do usuario define o acesso de STAFF.
       */
      permissions: string[]
      companyUuid: string
      createdAt: Date
    }, ExtArgs["result"]["userGroup"]>
    composites: {}
  }

  type UserGroupGetPayload<S extends boolean | null | undefined | UserGroupDefaultArgs> = $Result.GetResult<Prisma.$UserGroupPayload, S>

  type UserGroupCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserGroupFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserGroupCountAggregateInputType | true
    }

  export interface UserGroupDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserGroup'], meta: { name: 'UserGroup' } }
    /**
     * Find zero or one UserGroup that matches the filter.
     * @param {UserGroupFindUniqueArgs} args - Arguments to find a UserGroup
     * @example
     * // Get one UserGroup
     * const userGroup = await prisma.userGroup.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserGroupFindUniqueArgs>(args: SelectSubset<T, UserGroupFindUniqueArgs<ExtArgs>>): Prisma__UserGroupClient<$Result.GetResult<Prisma.$UserGroupPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserGroup that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserGroupFindUniqueOrThrowArgs} args - Arguments to find a UserGroup
     * @example
     * // Get one UserGroup
     * const userGroup = await prisma.userGroup.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserGroupFindUniqueOrThrowArgs>(args: SelectSubset<T, UserGroupFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserGroupClient<$Result.GetResult<Prisma.$UserGroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserGroup that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupFindFirstArgs} args - Arguments to find a UserGroup
     * @example
     * // Get one UserGroup
     * const userGroup = await prisma.userGroup.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserGroupFindFirstArgs>(args?: SelectSubset<T, UserGroupFindFirstArgs<ExtArgs>>): Prisma__UserGroupClient<$Result.GetResult<Prisma.$UserGroupPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserGroup that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupFindFirstOrThrowArgs} args - Arguments to find a UserGroup
     * @example
     * // Get one UserGroup
     * const userGroup = await prisma.userGroup.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserGroupFindFirstOrThrowArgs>(args?: SelectSubset<T, UserGroupFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserGroupClient<$Result.GetResult<Prisma.$UserGroupPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserGroups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserGroups
     * const userGroups = await prisma.userGroup.findMany()
     * 
     * // Get first 10 UserGroups
     * const userGroups = await prisma.userGroup.findMany({ take: 10 })
     * 
     * // Only select the `uuid`
     * const userGroupWithUuidOnly = await prisma.userGroup.findMany({ select: { uuid: true } })
     * 
     */
    findMany<T extends UserGroupFindManyArgs>(args?: SelectSubset<T, UserGroupFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserGroup.
     * @param {UserGroupCreateArgs} args - Arguments to create a UserGroup.
     * @example
     * // Create one UserGroup
     * const UserGroup = await prisma.userGroup.create({
     *   data: {
     *     // ... data to create a UserGroup
     *   }
     * })
     * 
     */
    create<T extends UserGroupCreateArgs>(args: SelectSubset<T, UserGroupCreateArgs<ExtArgs>>): Prisma__UserGroupClient<$Result.GetResult<Prisma.$UserGroupPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserGroups.
     * @param {UserGroupCreateManyArgs} args - Arguments to create many UserGroups.
     * @example
     * // Create many UserGroups
     * const userGroup = await prisma.userGroup.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserGroupCreateManyArgs>(args?: SelectSubset<T, UserGroupCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserGroups and returns the data saved in the database.
     * @param {UserGroupCreateManyAndReturnArgs} args - Arguments to create many UserGroups.
     * @example
     * // Create many UserGroups
     * const userGroup = await prisma.userGroup.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserGroups and only return the `uuid`
     * const userGroupWithUuidOnly = await prisma.userGroup.createManyAndReturn({
     *   select: { uuid: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserGroupCreateManyAndReturnArgs>(args?: SelectSubset<T, UserGroupCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGroupPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserGroup.
     * @param {UserGroupDeleteArgs} args - Arguments to delete one UserGroup.
     * @example
     * // Delete one UserGroup
     * const UserGroup = await prisma.userGroup.delete({
     *   where: {
     *     // ... filter to delete one UserGroup
     *   }
     * })
     * 
     */
    delete<T extends UserGroupDeleteArgs>(args: SelectSubset<T, UserGroupDeleteArgs<ExtArgs>>): Prisma__UserGroupClient<$Result.GetResult<Prisma.$UserGroupPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserGroup.
     * @param {UserGroupUpdateArgs} args - Arguments to update one UserGroup.
     * @example
     * // Update one UserGroup
     * const userGroup = await prisma.userGroup.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserGroupUpdateArgs>(args: SelectSubset<T, UserGroupUpdateArgs<ExtArgs>>): Prisma__UserGroupClient<$Result.GetResult<Prisma.$UserGroupPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserGroups.
     * @param {UserGroupDeleteManyArgs} args - Arguments to filter UserGroups to delete.
     * @example
     * // Delete a few UserGroups
     * const { count } = await prisma.userGroup.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserGroupDeleteManyArgs>(args?: SelectSubset<T, UserGroupDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserGroups
     * const userGroup = await prisma.userGroup.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserGroupUpdateManyArgs>(args: SelectSubset<T, UserGroupUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserGroups and returns the data updated in the database.
     * @param {UserGroupUpdateManyAndReturnArgs} args - Arguments to update many UserGroups.
     * @example
     * // Update many UserGroups
     * const userGroup = await prisma.userGroup.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserGroups and only return the `uuid`
     * const userGroupWithUuidOnly = await prisma.userGroup.updateManyAndReturn({
     *   select: { uuid: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserGroupUpdateManyAndReturnArgs>(args: SelectSubset<T, UserGroupUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGroupPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserGroup.
     * @param {UserGroupUpsertArgs} args - Arguments to update or create a UserGroup.
     * @example
     * // Update or create a UserGroup
     * const userGroup = await prisma.userGroup.upsert({
     *   create: {
     *     // ... data to create a UserGroup
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserGroup we want to update
     *   }
     * })
     */
    upsert<T extends UserGroupUpsertArgs>(args: SelectSubset<T, UserGroupUpsertArgs<ExtArgs>>): Prisma__UserGroupClient<$Result.GetResult<Prisma.$UserGroupPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupCountArgs} args - Arguments to filter UserGroups to count.
     * @example
     * // Count the number of UserGroups
     * const count = await prisma.userGroup.count({
     *   where: {
     *     // ... the filter for the UserGroups we want to count
     *   }
     * })
    **/
    count<T extends UserGroupCountArgs>(
      args?: Subset<T, UserGroupCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserGroupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserGroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserGroupAggregateArgs>(args: Subset<T, UserGroupAggregateArgs>): Prisma.PrismaPromise<GetUserGroupAggregateType<T>>

    /**
     * Group by UserGroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserGroup model
   */
  readonly fields: UserGroupFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserGroup.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserGroupClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    members<T extends UserGroup$membersArgs<ExtArgs> = {}>(args?: Subset<T, UserGroup$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGroupMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserGroup model
   */
  interface UserGroupFieldRefs {
    readonly uuid: FieldRef<"UserGroup", 'String'>
    readonly name: FieldRef<"UserGroup", 'String'>
    readonly permissions: FieldRef<"UserGroup", 'String[]'>
    readonly companyUuid: FieldRef<"UserGroup", 'String'>
    readonly createdAt: FieldRef<"UserGroup", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserGroup findUnique
   */
  export type UserGroupFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroup
     */
    select?: UserGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroup
     */
    omit?: UserGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupInclude<ExtArgs> | null
    /**
     * Filter, which UserGroup to fetch.
     */
    where: UserGroupWhereUniqueInput
  }

  /**
   * UserGroup findUniqueOrThrow
   */
  export type UserGroupFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroup
     */
    select?: UserGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroup
     */
    omit?: UserGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupInclude<ExtArgs> | null
    /**
     * Filter, which UserGroup to fetch.
     */
    where: UserGroupWhereUniqueInput
  }

  /**
   * UserGroup findFirst
   */
  export type UserGroupFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroup
     */
    select?: UserGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroup
     */
    omit?: UserGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupInclude<ExtArgs> | null
    /**
     * Filter, which UserGroup to fetch.
     */
    where?: UserGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserGroups to fetch.
     */
    orderBy?: UserGroupOrderByWithRelationInput | UserGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserGroups.
     */
    cursor?: UserGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserGroups.
     */
    distinct?: UserGroupScalarFieldEnum | UserGroupScalarFieldEnum[]
  }

  /**
   * UserGroup findFirstOrThrow
   */
  export type UserGroupFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroup
     */
    select?: UserGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroup
     */
    omit?: UserGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupInclude<ExtArgs> | null
    /**
     * Filter, which UserGroup to fetch.
     */
    where?: UserGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserGroups to fetch.
     */
    orderBy?: UserGroupOrderByWithRelationInput | UserGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserGroups.
     */
    cursor?: UserGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserGroups.
     */
    distinct?: UserGroupScalarFieldEnum | UserGroupScalarFieldEnum[]
  }

  /**
   * UserGroup findMany
   */
  export type UserGroupFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroup
     */
    select?: UserGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroup
     */
    omit?: UserGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupInclude<ExtArgs> | null
    /**
     * Filter, which UserGroups to fetch.
     */
    where?: UserGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserGroups to fetch.
     */
    orderBy?: UserGroupOrderByWithRelationInput | UserGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserGroups.
     */
    cursor?: UserGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserGroups.
     */
    skip?: number
    distinct?: UserGroupScalarFieldEnum | UserGroupScalarFieldEnum[]
  }

  /**
   * UserGroup create
   */
  export type UserGroupCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroup
     */
    select?: UserGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroup
     */
    omit?: UserGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupInclude<ExtArgs> | null
    /**
     * The data needed to create a UserGroup.
     */
    data: XOR<UserGroupCreateInput, UserGroupUncheckedCreateInput>
  }

  /**
   * UserGroup createMany
   */
  export type UserGroupCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserGroups.
     */
    data: UserGroupCreateManyInput | UserGroupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserGroup createManyAndReturn
   */
  export type UserGroupCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroup
     */
    select?: UserGroupSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroup
     */
    omit?: UserGroupOmit<ExtArgs> | null
    /**
     * The data used to create many UserGroups.
     */
    data: UserGroupCreateManyInput | UserGroupCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserGroup update
   */
  export type UserGroupUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroup
     */
    select?: UserGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroup
     */
    omit?: UserGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupInclude<ExtArgs> | null
    /**
     * The data needed to update a UserGroup.
     */
    data: XOR<UserGroupUpdateInput, UserGroupUncheckedUpdateInput>
    /**
     * Choose, which UserGroup to update.
     */
    where: UserGroupWhereUniqueInput
  }

  /**
   * UserGroup updateMany
   */
  export type UserGroupUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserGroups.
     */
    data: XOR<UserGroupUpdateManyMutationInput, UserGroupUncheckedUpdateManyInput>
    /**
     * Filter which UserGroups to update
     */
    where?: UserGroupWhereInput
    /**
     * Limit how many UserGroups to update.
     */
    limit?: number
  }

  /**
   * UserGroup updateManyAndReturn
   */
  export type UserGroupUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroup
     */
    select?: UserGroupSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroup
     */
    omit?: UserGroupOmit<ExtArgs> | null
    /**
     * The data used to update UserGroups.
     */
    data: XOR<UserGroupUpdateManyMutationInput, UserGroupUncheckedUpdateManyInput>
    /**
     * Filter which UserGroups to update
     */
    where?: UserGroupWhereInput
    /**
     * Limit how many UserGroups to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserGroup upsert
   */
  export type UserGroupUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroup
     */
    select?: UserGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroup
     */
    omit?: UserGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupInclude<ExtArgs> | null
    /**
     * The filter to search for the UserGroup to update in case it exists.
     */
    where: UserGroupWhereUniqueInput
    /**
     * In case the UserGroup found by the `where` argument doesn't exist, create a new UserGroup with this data.
     */
    create: XOR<UserGroupCreateInput, UserGroupUncheckedCreateInput>
    /**
     * In case the UserGroup was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserGroupUpdateInput, UserGroupUncheckedUpdateInput>
  }

  /**
   * UserGroup delete
   */
  export type UserGroupDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroup
     */
    select?: UserGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroup
     */
    omit?: UserGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupInclude<ExtArgs> | null
    /**
     * Filter which UserGroup to delete.
     */
    where: UserGroupWhereUniqueInput
  }

  /**
   * UserGroup deleteMany
   */
  export type UserGroupDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserGroups to delete
     */
    where?: UserGroupWhereInput
    /**
     * Limit how many UserGroups to delete.
     */
    limit?: number
  }

  /**
   * UserGroup.members
   */
  export type UserGroup$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroupMember
     */
    select?: UserGroupMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroupMember
     */
    omit?: UserGroupMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupMemberInclude<ExtArgs> | null
    where?: UserGroupMemberWhereInput
    orderBy?: UserGroupMemberOrderByWithRelationInput | UserGroupMemberOrderByWithRelationInput[]
    cursor?: UserGroupMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserGroupMemberScalarFieldEnum | UserGroupMemberScalarFieldEnum[]
  }

  /**
   * UserGroup without action
   */
  export type UserGroupDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroup
     */
    select?: UserGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroup
     */
    omit?: UserGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupInclude<ExtArgs> | null
  }


  /**
   * Model UserGroupMember
   */

  export type AggregateUserGroupMember = {
    _count: UserGroupMemberCountAggregateOutputType | null
    _min: UserGroupMemberMinAggregateOutputType | null
    _max: UserGroupMemberMaxAggregateOutputType | null
  }

  export type UserGroupMemberMinAggregateOutputType = {
    userUuid: string | null
    groupUuid: string | null
  }

  export type UserGroupMemberMaxAggregateOutputType = {
    userUuid: string | null
    groupUuid: string | null
  }

  export type UserGroupMemberCountAggregateOutputType = {
    userUuid: number
    groupUuid: number
    _all: number
  }


  export type UserGroupMemberMinAggregateInputType = {
    userUuid?: true
    groupUuid?: true
  }

  export type UserGroupMemberMaxAggregateInputType = {
    userUuid?: true
    groupUuid?: true
  }

  export type UserGroupMemberCountAggregateInputType = {
    userUuid?: true
    groupUuid?: true
    _all?: true
  }

  export type UserGroupMemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserGroupMember to aggregate.
     */
    where?: UserGroupMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserGroupMembers to fetch.
     */
    orderBy?: UserGroupMemberOrderByWithRelationInput | UserGroupMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserGroupMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserGroupMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserGroupMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserGroupMembers
    **/
    _count?: true | UserGroupMemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserGroupMemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserGroupMemberMaxAggregateInputType
  }

  export type GetUserGroupMemberAggregateType<T extends UserGroupMemberAggregateArgs> = {
        [P in keyof T & keyof AggregateUserGroupMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserGroupMember[P]>
      : GetScalarType<T[P], AggregateUserGroupMember[P]>
  }




  export type UserGroupMemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserGroupMemberWhereInput
    orderBy?: UserGroupMemberOrderByWithAggregationInput | UserGroupMemberOrderByWithAggregationInput[]
    by: UserGroupMemberScalarFieldEnum[] | UserGroupMemberScalarFieldEnum
    having?: UserGroupMemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserGroupMemberCountAggregateInputType | true
    _min?: UserGroupMemberMinAggregateInputType
    _max?: UserGroupMemberMaxAggregateInputType
  }

  export type UserGroupMemberGroupByOutputType = {
    userUuid: string
    groupUuid: string
    _count: UserGroupMemberCountAggregateOutputType | null
    _min: UserGroupMemberMinAggregateOutputType | null
    _max: UserGroupMemberMaxAggregateOutputType | null
  }

  type GetUserGroupMemberGroupByPayload<T extends UserGroupMemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupMemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupMemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupMemberGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupMemberGroupByOutputType[P]>
        }
      >
    >


  export type UserGroupMemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userUuid?: boolean
    groupUuid?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    group?: boolean | UserGroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userGroupMember"]>

  export type UserGroupMemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userUuid?: boolean
    groupUuid?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    group?: boolean | UserGroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userGroupMember"]>

  export type UserGroupMemberSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userUuid?: boolean
    groupUuid?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    group?: boolean | UserGroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userGroupMember"]>

  export type UserGroupMemberSelectScalar = {
    userUuid?: boolean
    groupUuid?: boolean
  }

  export type UserGroupMemberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userUuid" | "groupUuid", ExtArgs["result"]["userGroupMember"]>
  export type UserGroupMemberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    group?: boolean | UserGroupDefaultArgs<ExtArgs>
  }
  export type UserGroupMemberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    group?: boolean | UserGroupDefaultArgs<ExtArgs>
  }
  export type UserGroupMemberIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    group?: boolean | UserGroupDefaultArgs<ExtArgs>
  }

  export type $UserGroupMemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserGroupMember"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      group: Prisma.$UserGroupPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userUuid: string
      groupUuid: string
    }, ExtArgs["result"]["userGroupMember"]>
    composites: {}
  }

  type UserGroupMemberGetPayload<S extends boolean | null | undefined | UserGroupMemberDefaultArgs> = $Result.GetResult<Prisma.$UserGroupMemberPayload, S>

  type UserGroupMemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserGroupMemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserGroupMemberCountAggregateInputType | true
    }

  export interface UserGroupMemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserGroupMember'], meta: { name: 'UserGroupMember' } }
    /**
     * Find zero or one UserGroupMember that matches the filter.
     * @param {UserGroupMemberFindUniqueArgs} args - Arguments to find a UserGroupMember
     * @example
     * // Get one UserGroupMember
     * const userGroupMember = await prisma.userGroupMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserGroupMemberFindUniqueArgs>(args: SelectSubset<T, UserGroupMemberFindUniqueArgs<ExtArgs>>): Prisma__UserGroupMemberClient<$Result.GetResult<Prisma.$UserGroupMemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserGroupMember that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserGroupMemberFindUniqueOrThrowArgs} args - Arguments to find a UserGroupMember
     * @example
     * // Get one UserGroupMember
     * const userGroupMember = await prisma.userGroupMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserGroupMemberFindUniqueOrThrowArgs>(args: SelectSubset<T, UserGroupMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserGroupMemberClient<$Result.GetResult<Prisma.$UserGroupMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserGroupMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupMemberFindFirstArgs} args - Arguments to find a UserGroupMember
     * @example
     * // Get one UserGroupMember
     * const userGroupMember = await prisma.userGroupMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserGroupMemberFindFirstArgs>(args?: SelectSubset<T, UserGroupMemberFindFirstArgs<ExtArgs>>): Prisma__UserGroupMemberClient<$Result.GetResult<Prisma.$UserGroupMemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserGroupMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupMemberFindFirstOrThrowArgs} args - Arguments to find a UserGroupMember
     * @example
     * // Get one UserGroupMember
     * const userGroupMember = await prisma.userGroupMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserGroupMemberFindFirstOrThrowArgs>(args?: SelectSubset<T, UserGroupMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserGroupMemberClient<$Result.GetResult<Prisma.$UserGroupMemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserGroupMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserGroupMembers
     * const userGroupMembers = await prisma.userGroupMember.findMany()
     * 
     * // Get first 10 UserGroupMembers
     * const userGroupMembers = await prisma.userGroupMember.findMany({ take: 10 })
     * 
     * // Only select the `userUuid`
     * const userGroupMemberWithUserUuidOnly = await prisma.userGroupMember.findMany({ select: { userUuid: true } })
     * 
     */
    findMany<T extends UserGroupMemberFindManyArgs>(args?: SelectSubset<T, UserGroupMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGroupMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserGroupMember.
     * @param {UserGroupMemberCreateArgs} args - Arguments to create a UserGroupMember.
     * @example
     * // Create one UserGroupMember
     * const UserGroupMember = await prisma.userGroupMember.create({
     *   data: {
     *     // ... data to create a UserGroupMember
     *   }
     * })
     * 
     */
    create<T extends UserGroupMemberCreateArgs>(args: SelectSubset<T, UserGroupMemberCreateArgs<ExtArgs>>): Prisma__UserGroupMemberClient<$Result.GetResult<Prisma.$UserGroupMemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserGroupMembers.
     * @param {UserGroupMemberCreateManyArgs} args - Arguments to create many UserGroupMembers.
     * @example
     * // Create many UserGroupMembers
     * const userGroupMember = await prisma.userGroupMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserGroupMemberCreateManyArgs>(args?: SelectSubset<T, UserGroupMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserGroupMembers and returns the data saved in the database.
     * @param {UserGroupMemberCreateManyAndReturnArgs} args - Arguments to create many UserGroupMembers.
     * @example
     * // Create many UserGroupMembers
     * const userGroupMember = await prisma.userGroupMember.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserGroupMembers and only return the `userUuid`
     * const userGroupMemberWithUserUuidOnly = await prisma.userGroupMember.createManyAndReturn({
     *   select: { userUuid: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserGroupMemberCreateManyAndReturnArgs>(args?: SelectSubset<T, UserGroupMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGroupMemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserGroupMember.
     * @param {UserGroupMemberDeleteArgs} args - Arguments to delete one UserGroupMember.
     * @example
     * // Delete one UserGroupMember
     * const UserGroupMember = await prisma.userGroupMember.delete({
     *   where: {
     *     // ... filter to delete one UserGroupMember
     *   }
     * })
     * 
     */
    delete<T extends UserGroupMemberDeleteArgs>(args: SelectSubset<T, UserGroupMemberDeleteArgs<ExtArgs>>): Prisma__UserGroupMemberClient<$Result.GetResult<Prisma.$UserGroupMemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserGroupMember.
     * @param {UserGroupMemberUpdateArgs} args - Arguments to update one UserGroupMember.
     * @example
     * // Update one UserGroupMember
     * const userGroupMember = await prisma.userGroupMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserGroupMemberUpdateArgs>(args: SelectSubset<T, UserGroupMemberUpdateArgs<ExtArgs>>): Prisma__UserGroupMemberClient<$Result.GetResult<Prisma.$UserGroupMemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserGroupMembers.
     * @param {UserGroupMemberDeleteManyArgs} args - Arguments to filter UserGroupMembers to delete.
     * @example
     * // Delete a few UserGroupMembers
     * const { count } = await prisma.userGroupMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserGroupMemberDeleteManyArgs>(args?: SelectSubset<T, UserGroupMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserGroupMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserGroupMembers
     * const userGroupMember = await prisma.userGroupMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserGroupMemberUpdateManyArgs>(args: SelectSubset<T, UserGroupMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserGroupMembers and returns the data updated in the database.
     * @param {UserGroupMemberUpdateManyAndReturnArgs} args - Arguments to update many UserGroupMembers.
     * @example
     * // Update many UserGroupMembers
     * const userGroupMember = await prisma.userGroupMember.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserGroupMembers and only return the `userUuid`
     * const userGroupMemberWithUserUuidOnly = await prisma.userGroupMember.updateManyAndReturn({
     *   select: { userUuid: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserGroupMemberUpdateManyAndReturnArgs>(args: SelectSubset<T, UserGroupMemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGroupMemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserGroupMember.
     * @param {UserGroupMemberUpsertArgs} args - Arguments to update or create a UserGroupMember.
     * @example
     * // Update or create a UserGroupMember
     * const userGroupMember = await prisma.userGroupMember.upsert({
     *   create: {
     *     // ... data to create a UserGroupMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserGroupMember we want to update
     *   }
     * })
     */
    upsert<T extends UserGroupMemberUpsertArgs>(args: SelectSubset<T, UserGroupMemberUpsertArgs<ExtArgs>>): Prisma__UserGroupMemberClient<$Result.GetResult<Prisma.$UserGroupMemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserGroupMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupMemberCountArgs} args - Arguments to filter UserGroupMembers to count.
     * @example
     * // Count the number of UserGroupMembers
     * const count = await prisma.userGroupMember.count({
     *   where: {
     *     // ... the filter for the UserGroupMembers we want to count
     *   }
     * })
    **/
    count<T extends UserGroupMemberCountArgs>(
      args?: Subset<T, UserGroupMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserGroupMemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserGroupMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserGroupMemberAggregateArgs>(args: Subset<T, UserGroupMemberAggregateArgs>): Prisma.PrismaPromise<GetUserGroupMemberAggregateType<T>>

    /**
     * Group by UserGroupMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupMemberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupMemberGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupMemberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserGroupMember model
   */
  readonly fields: UserGroupMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserGroupMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserGroupMemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    group<T extends UserGroupDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserGroupDefaultArgs<ExtArgs>>): Prisma__UserGroupClient<$Result.GetResult<Prisma.$UserGroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserGroupMember model
   */
  interface UserGroupMemberFieldRefs {
    readonly userUuid: FieldRef<"UserGroupMember", 'String'>
    readonly groupUuid: FieldRef<"UserGroupMember", 'String'>
  }
    

  // Custom InputTypes
  /**
   * UserGroupMember findUnique
   */
  export type UserGroupMemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroupMember
     */
    select?: UserGroupMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroupMember
     */
    omit?: UserGroupMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupMemberInclude<ExtArgs> | null
    /**
     * Filter, which UserGroupMember to fetch.
     */
    where: UserGroupMemberWhereUniqueInput
  }

  /**
   * UserGroupMember findUniqueOrThrow
   */
  export type UserGroupMemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroupMember
     */
    select?: UserGroupMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroupMember
     */
    omit?: UserGroupMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupMemberInclude<ExtArgs> | null
    /**
     * Filter, which UserGroupMember to fetch.
     */
    where: UserGroupMemberWhereUniqueInput
  }

  /**
   * UserGroupMember findFirst
   */
  export type UserGroupMemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroupMember
     */
    select?: UserGroupMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroupMember
     */
    omit?: UserGroupMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupMemberInclude<ExtArgs> | null
    /**
     * Filter, which UserGroupMember to fetch.
     */
    where?: UserGroupMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserGroupMembers to fetch.
     */
    orderBy?: UserGroupMemberOrderByWithRelationInput | UserGroupMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserGroupMembers.
     */
    cursor?: UserGroupMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserGroupMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserGroupMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserGroupMembers.
     */
    distinct?: UserGroupMemberScalarFieldEnum | UserGroupMemberScalarFieldEnum[]
  }

  /**
   * UserGroupMember findFirstOrThrow
   */
  export type UserGroupMemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroupMember
     */
    select?: UserGroupMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroupMember
     */
    omit?: UserGroupMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupMemberInclude<ExtArgs> | null
    /**
     * Filter, which UserGroupMember to fetch.
     */
    where?: UserGroupMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserGroupMembers to fetch.
     */
    orderBy?: UserGroupMemberOrderByWithRelationInput | UserGroupMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserGroupMembers.
     */
    cursor?: UserGroupMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserGroupMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserGroupMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserGroupMembers.
     */
    distinct?: UserGroupMemberScalarFieldEnum | UserGroupMemberScalarFieldEnum[]
  }

  /**
   * UserGroupMember findMany
   */
  export type UserGroupMemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroupMember
     */
    select?: UserGroupMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroupMember
     */
    omit?: UserGroupMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupMemberInclude<ExtArgs> | null
    /**
     * Filter, which UserGroupMembers to fetch.
     */
    where?: UserGroupMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserGroupMembers to fetch.
     */
    orderBy?: UserGroupMemberOrderByWithRelationInput | UserGroupMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserGroupMembers.
     */
    cursor?: UserGroupMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserGroupMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserGroupMembers.
     */
    skip?: number
    distinct?: UserGroupMemberScalarFieldEnum | UserGroupMemberScalarFieldEnum[]
  }

  /**
   * UserGroupMember create
   */
  export type UserGroupMemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroupMember
     */
    select?: UserGroupMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroupMember
     */
    omit?: UserGroupMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupMemberInclude<ExtArgs> | null
    /**
     * The data needed to create a UserGroupMember.
     */
    data: XOR<UserGroupMemberCreateInput, UserGroupMemberUncheckedCreateInput>
  }

  /**
   * UserGroupMember createMany
   */
  export type UserGroupMemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserGroupMembers.
     */
    data: UserGroupMemberCreateManyInput | UserGroupMemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserGroupMember createManyAndReturn
   */
  export type UserGroupMemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroupMember
     */
    select?: UserGroupMemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroupMember
     */
    omit?: UserGroupMemberOmit<ExtArgs> | null
    /**
     * The data used to create many UserGroupMembers.
     */
    data: UserGroupMemberCreateManyInput | UserGroupMemberCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupMemberIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserGroupMember update
   */
  export type UserGroupMemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroupMember
     */
    select?: UserGroupMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroupMember
     */
    omit?: UserGroupMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupMemberInclude<ExtArgs> | null
    /**
     * The data needed to update a UserGroupMember.
     */
    data: XOR<UserGroupMemberUpdateInput, UserGroupMemberUncheckedUpdateInput>
    /**
     * Choose, which UserGroupMember to update.
     */
    where: UserGroupMemberWhereUniqueInput
  }

  /**
   * UserGroupMember updateMany
   */
  export type UserGroupMemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserGroupMembers.
     */
    data: XOR<UserGroupMemberUpdateManyMutationInput, UserGroupMemberUncheckedUpdateManyInput>
    /**
     * Filter which UserGroupMembers to update
     */
    where?: UserGroupMemberWhereInput
    /**
     * Limit how many UserGroupMembers to update.
     */
    limit?: number
  }

  /**
   * UserGroupMember updateManyAndReturn
   */
  export type UserGroupMemberUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroupMember
     */
    select?: UserGroupMemberSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroupMember
     */
    omit?: UserGroupMemberOmit<ExtArgs> | null
    /**
     * The data used to update UserGroupMembers.
     */
    data: XOR<UserGroupMemberUpdateManyMutationInput, UserGroupMemberUncheckedUpdateManyInput>
    /**
     * Filter which UserGroupMembers to update
     */
    where?: UserGroupMemberWhereInput
    /**
     * Limit how many UserGroupMembers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupMemberIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserGroupMember upsert
   */
  export type UserGroupMemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroupMember
     */
    select?: UserGroupMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroupMember
     */
    omit?: UserGroupMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupMemberInclude<ExtArgs> | null
    /**
     * The filter to search for the UserGroupMember to update in case it exists.
     */
    where: UserGroupMemberWhereUniqueInput
    /**
     * In case the UserGroupMember found by the `where` argument doesn't exist, create a new UserGroupMember with this data.
     */
    create: XOR<UserGroupMemberCreateInput, UserGroupMemberUncheckedCreateInput>
    /**
     * In case the UserGroupMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserGroupMemberUpdateInput, UserGroupMemberUncheckedUpdateInput>
  }

  /**
   * UserGroupMember delete
   */
  export type UserGroupMemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroupMember
     */
    select?: UserGroupMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroupMember
     */
    omit?: UserGroupMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupMemberInclude<ExtArgs> | null
    /**
     * Filter which UserGroupMember to delete.
     */
    where: UserGroupMemberWhereUniqueInput
  }

  /**
   * UserGroupMember deleteMany
   */
  export type UserGroupMemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserGroupMembers to delete
     */
    where?: UserGroupMemberWhereInput
    /**
     * Limit how many UserGroupMembers to delete.
     */
    limit?: number
  }

  /**
   * UserGroupMember without action
   */
  export type UserGroupMemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroupMember
     */
    select?: UserGroupMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroupMember
     */
    omit?: UserGroupMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupMemberInclude<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    price: number | null
  }

  export type ProductSumAggregateOutputType = {
    price: number | null
  }

  export type ProductMinAggregateOutputType = {
    uuid: string | null
    name: string | null
    price: number | null
    active: boolean | null
    description: string | null
    categoryUuid: string | null
    companyUuid: string | null
  }

  export type ProductMaxAggregateOutputType = {
    uuid: string | null
    name: string | null
    price: number | null
    active: boolean | null
    description: string | null
    categoryUuid: string | null
    companyUuid: string | null
  }

  export type ProductCountAggregateOutputType = {
    uuid: number
    name: number
    price: number
    active: number
    description: number
    categoryUuid: number
    companyUuid: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    price?: true
  }

  export type ProductSumAggregateInputType = {
    price?: true
  }

  export type ProductMinAggregateInputType = {
    uuid?: true
    name?: true
    price?: true
    active?: true
    description?: true
    categoryUuid?: true
    companyUuid?: true
  }

  export type ProductMaxAggregateInputType = {
    uuid?: true
    name?: true
    price?: true
    active?: true
    description?: true
    categoryUuid?: true
    companyUuid?: true
  }

  export type ProductCountAggregateInputType = {
    uuid?: true
    name?: true
    price?: true
    active?: true
    description?: true
    categoryUuid?: true
    companyUuid?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    uuid: string
    name: string
    price: number
    active: boolean
    description: string
    categoryUuid: string
    companyUuid: string
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    uuid?: boolean
    name?: boolean
    price?: boolean
    active?: boolean
    description?: boolean
    categoryUuid?: boolean
    companyUuid?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    orderItems?: boolean | Product$orderItemsArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    uuid?: boolean
    name?: boolean
    price?: boolean
    active?: boolean
    description?: boolean
    categoryUuid?: boolean
    companyUuid?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    uuid?: boolean
    name?: boolean
    price?: boolean
    active?: boolean
    description?: boolean
    categoryUuid?: boolean
    companyUuid?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    uuid?: boolean
    name?: boolean
    price?: boolean
    active?: boolean
    description?: boolean
    categoryUuid?: boolean
    companyUuid?: boolean
  }

  export type ProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"uuid" | "name" | "price" | "active" | "description" | "categoryUuid" | "companyUuid", ExtArgs["result"]["product"]>
  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    orderItems?: boolean | Product$orderItemsArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type ProductIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      category: Prisma.$CategoryPayload<ExtArgs>
      company: Prisma.$CompanyPayload<ExtArgs>
      orderItems: Prisma.$OrderItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      uuid: string
      name: string
      price: number
      active: boolean
      description: string
      categoryUuid: string
      companyUuid: string
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `uuid`
     * const productWithUuidOnly = await prisma.product.findMany({ select: { uuid: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `uuid`
     * const productWithUuidOnly = await prisma.product.createManyAndReturn({
     *   select: { uuid: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products and returns the data updated in the database.
     * @param {ProductUpdateManyAndReturnArgs} args - Arguments to update many Products.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Products and only return the `uuid`
     * const productWithUuidOnly = await prisma.product.updateManyAndReturn({
     *   select: { uuid: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    orderItems<T extends Product$orderItemsArgs<ExtArgs> = {}>(args?: Subset<T, Product$orderItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Product model
   */
  interface ProductFieldRefs {
    readonly uuid: FieldRef<"Product", 'String'>
    readonly name: FieldRef<"Product", 'String'>
    readonly price: FieldRef<"Product", 'Float'>
    readonly active: FieldRef<"Product", 'Boolean'>
    readonly description: FieldRef<"Product", 'String'>
    readonly categoryUuid: FieldRef<"Product", 'String'>
    readonly companyUuid: FieldRef<"Product", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product updateManyAndReturn
   */
  export type ProductUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to delete.
     */
    limit?: number
  }

  /**
   * Product.orderItems
   */
  export type Product$orderItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    cursor?: OrderItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryMinAggregateOutputType = {
    uuid: string | null
    name: string | null
    companyUuid: string | null
  }

  export type CategoryMaxAggregateOutputType = {
    uuid: string | null
    name: string | null
    companyUuid: string | null
  }

  export type CategoryCountAggregateOutputType = {
    uuid: number
    name: number
    companyUuid: number
    _all: number
  }


  export type CategoryMinAggregateInputType = {
    uuid?: true
    name?: true
    companyUuid?: true
  }

  export type CategoryMaxAggregateInputType = {
    uuid?: true
    name?: true
    companyUuid?: true
  }

  export type CategoryCountAggregateInputType = {
    uuid?: true
    name?: true
    companyUuid?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    uuid: string
    name: string
    companyUuid: string
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    uuid?: boolean
    name?: boolean
    companyUuid?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    products?: boolean | Category$productsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    uuid?: boolean
    name?: boolean
    companyUuid?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    uuid?: boolean
    name?: boolean
    companyUuid?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    uuid?: boolean
    name?: boolean
    companyUuid?: boolean
  }

  export type CategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"uuid" | "name" | "companyUuid", ExtArgs["result"]["category"]>
  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    products?: boolean | Category$productsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
      products: Prisma.$ProductPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      uuid: string
      name: string
      companyUuid: string
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `uuid`
     * const categoryWithUuidOnly = await prisma.category.findMany({ select: { uuid: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `uuid`
     * const categoryWithUuidOnly = await prisma.category.createManyAndReturn({
     *   select: { uuid: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories and returns the data updated in the database.
     * @param {CategoryUpdateManyAndReturnArgs} args - Arguments to update many Categories.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categories and only return the `uuid`
     * const categoryWithUuidOnly = await prisma.category.updateManyAndReturn({
     *   select: { uuid: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, CategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    products<T extends Category$productsArgs<ExtArgs> = {}>(args?: Subset<T, Category$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Category model
   */
  interface CategoryFieldRefs {
    readonly uuid: FieldRef<"Category", 'String'>
    readonly name: FieldRef<"Category", 'String'>
    readonly companyUuid: FieldRef<"Category", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category updateManyAndReturn
   */
  export type CategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to delete.
     */
    limit?: number
  }

  /**
   * Category.products
   */
  export type Category$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    cursor?: ProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model Table
   */

  export type AggregateTable = {
    _count: TableCountAggregateOutputType | null
    _avg: TableAvgAggregateOutputType | null
    _sum: TableSumAggregateOutputType | null
    _min: TableMinAggregateOutputType | null
    _max: TableMaxAggregateOutputType | null
  }

  export type TableAvgAggregateOutputType = {
    number: number | null
  }

  export type TableSumAggregateOutputType = {
    number: number | null
  }

  export type TableMinAggregateOutputType = {
    uuid: string | null
    number: number | null
    qrCode: string | null
    description: string | null
    companyUuid: string | null
  }

  export type TableMaxAggregateOutputType = {
    uuid: string | null
    number: number | null
    qrCode: string | null
    description: string | null
    companyUuid: string | null
  }

  export type TableCountAggregateOutputType = {
    uuid: number
    number: number
    qrCode: number
    description: number
    companyUuid: number
    _all: number
  }


  export type TableAvgAggregateInputType = {
    number?: true
  }

  export type TableSumAggregateInputType = {
    number?: true
  }

  export type TableMinAggregateInputType = {
    uuid?: true
    number?: true
    qrCode?: true
    description?: true
    companyUuid?: true
  }

  export type TableMaxAggregateInputType = {
    uuid?: true
    number?: true
    qrCode?: true
    description?: true
    companyUuid?: true
  }

  export type TableCountAggregateInputType = {
    uuid?: true
    number?: true
    qrCode?: true
    description?: true
    companyUuid?: true
    _all?: true
  }

  export type TableAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Table to aggregate.
     */
    where?: TableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tables to fetch.
     */
    orderBy?: TableOrderByWithRelationInput | TableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tables
    **/
    _count?: true | TableCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TableAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TableSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TableMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TableMaxAggregateInputType
  }

  export type GetTableAggregateType<T extends TableAggregateArgs> = {
        [P in keyof T & keyof AggregateTable]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTable[P]>
      : GetScalarType<T[P], AggregateTable[P]>
  }




  export type TableGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TableWhereInput
    orderBy?: TableOrderByWithAggregationInput | TableOrderByWithAggregationInput[]
    by: TableScalarFieldEnum[] | TableScalarFieldEnum
    having?: TableScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TableCountAggregateInputType | true
    _avg?: TableAvgAggregateInputType
    _sum?: TableSumAggregateInputType
    _min?: TableMinAggregateInputType
    _max?: TableMaxAggregateInputType
  }

  export type TableGroupByOutputType = {
    uuid: string
    number: number
    qrCode: string
    description: string
    companyUuid: string
    _count: TableCountAggregateOutputType | null
    _avg: TableAvgAggregateOutputType | null
    _sum: TableSumAggregateOutputType | null
    _min: TableMinAggregateOutputType | null
    _max: TableMaxAggregateOutputType | null
  }

  type GetTableGroupByPayload<T extends TableGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TableGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TableGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TableGroupByOutputType[P]>
            : GetScalarType<T[P], TableGroupByOutputType[P]>
        }
      >
    >


  export type TableSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    uuid?: boolean
    number?: boolean
    qrCode?: boolean
    description?: boolean
    companyUuid?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    orders?: boolean | Table$ordersArgs<ExtArgs>
    _count?: boolean | TableCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["table"]>

  export type TableSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    uuid?: boolean
    number?: boolean
    qrCode?: boolean
    description?: boolean
    companyUuid?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["table"]>

  export type TableSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    uuid?: boolean
    number?: boolean
    qrCode?: boolean
    description?: boolean
    companyUuid?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["table"]>

  export type TableSelectScalar = {
    uuid?: boolean
    number?: boolean
    qrCode?: boolean
    description?: boolean
    companyUuid?: boolean
  }

  export type TableOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"uuid" | "number" | "qrCode" | "description" | "companyUuid", ExtArgs["result"]["table"]>
  export type TableInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    orders?: boolean | Table$ordersArgs<ExtArgs>
    _count?: boolean | TableCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TableIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type TableIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $TablePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Table"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
      orders: Prisma.$OrderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      uuid: string
      number: number
      qrCode: string
      description: string
      companyUuid: string
    }, ExtArgs["result"]["table"]>
    composites: {}
  }

  type TableGetPayload<S extends boolean | null | undefined | TableDefaultArgs> = $Result.GetResult<Prisma.$TablePayload, S>

  type TableCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TableFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TableCountAggregateInputType | true
    }

  export interface TableDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Table'], meta: { name: 'Table' } }
    /**
     * Find zero or one Table that matches the filter.
     * @param {TableFindUniqueArgs} args - Arguments to find a Table
     * @example
     * // Get one Table
     * const table = await prisma.table.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TableFindUniqueArgs>(args: SelectSubset<T, TableFindUniqueArgs<ExtArgs>>): Prisma__TableClient<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Table that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TableFindUniqueOrThrowArgs} args - Arguments to find a Table
     * @example
     * // Get one Table
     * const table = await prisma.table.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TableFindUniqueOrThrowArgs>(args: SelectSubset<T, TableFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TableClient<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Table that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableFindFirstArgs} args - Arguments to find a Table
     * @example
     * // Get one Table
     * const table = await prisma.table.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TableFindFirstArgs>(args?: SelectSubset<T, TableFindFirstArgs<ExtArgs>>): Prisma__TableClient<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Table that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableFindFirstOrThrowArgs} args - Arguments to find a Table
     * @example
     * // Get one Table
     * const table = await prisma.table.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TableFindFirstOrThrowArgs>(args?: SelectSubset<T, TableFindFirstOrThrowArgs<ExtArgs>>): Prisma__TableClient<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tables that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tables
     * const tables = await prisma.table.findMany()
     * 
     * // Get first 10 Tables
     * const tables = await prisma.table.findMany({ take: 10 })
     * 
     * // Only select the `uuid`
     * const tableWithUuidOnly = await prisma.table.findMany({ select: { uuid: true } })
     * 
     */
    findMany<T extends TableFindManyArgs>(args?: SelectSubset<T, TableFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Table.
     * @param {TableCreateArgs} args - Arguments to create a Table.
     * @example
     * // Create one Table
     * const Table = await prisma.table.create({
     *   data: {
     *     // ... data to create a Table
     *   }
     * })
     * 
     */
    create<T extends TableCreateArgs>(args: SelectSubset<T, TableCreateArgs<ExtArgs>>): Prisma__TableClient<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tables.
     * @param {TableCreateManyArgs} args - Arguments to create many Tables.
     * @example
     * // Create many Tables
     * const table = await prisma.table.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TableCreateManyArgs>(args?: SelectSubset<T, TableCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tables and returns the data saved in the database.
     * @param {TableCreateManyAndReturnArgs} args - Arguments to create many Tables.
     * @example
     * // Create many Tables
     * const table = await prisma.table.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tables and only return the `uuid`
     * const tableWithUuidOnly = await prisma.table.createManyAndReturn({
     *   select: { uuid: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TableCreateManyAndReturnArgs>(args?: SelectSubset<T, TableCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Table.
     * @param {TableDeleteArgs} args - Arguments to delete one Table.
     * @example
     * // Delete one Table
     * const Table = await prisma.table.delete({
     *   where: {
     *     // ... filter to delete one Table
     *   }
     * })
     * 
     */
    delete<T extends TableDeleteArgs>(args: SelectSubset<T, TableDeleteArgs<ExtArgs>>): Prisma__TableClient<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Table.
     * @param {TableUpdateArgs} args - Arguments to update one Table.
     * @example
     * // Update one Table
     * const table = await prisma.table.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TableUpdateArgs>(args: SelectSubset<T, TableUpdateArgs<ExtArgs>>): Prisma__TableClient<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tables.
     * @param {TableDeleteManyArgs} args - Arguments to filter Tables to delete.
     * @example
     * // Delete a few Tables
     * const { count } = await prisma.table.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TableDeleteManyArgs>(args?: SelectSubset<T, TableDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tables.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tables
     * const table = await prisma.table.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TableUpdateManyArgs>(args: SelectSubset<T, TableUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tables and returns the data updated in the database.
     * @param {TableUpdateManyAndReturnArgs} args - Arguments to update many Tables.
     * @example
     * // Update many Tables
     * const table = await prisma.table.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tables and only return the `uuid`
     * const tableWithUuidOnly = await prisma.table.updateManyAndReturn({
     *   select: { uuid: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TableUpdateManyAndReturnArgs>(args: SelectSubset<T, TableUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Table.
     * @param {TableUpsertArgs} args - Arguments to update or create a Table.
     * @example
     * // Update or create a Table
     * const table = await prisma.table.upsert({
     *   create: {
     *     // ... data to create a Table
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Table we want to update
     *   }
     * })
     */
    upsert<T extends TableUpsertArgs>(args: SelectSubset<T, TableUpsertArgs<ExtArgs>>): Prisma__TableClient<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tables.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableCountArgs} args - Arguments to filter Tables to count.
     * @example
     * // Count the number of Tables
     * const count = await prisma.table.count({
     *   where: {
     *     // ... the filter for the Tables we want to count
     *   }
     * })
    **/
    count<T extends TableCountArgs>(
      args?: Subset<T, TableCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TableCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Table.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TableAggregateArgs>(args: Subset<T, TableAggregateArgs>): Prisma.PrismaPromise<GetTableAggregateType<T>>

    /**
     * Group by Table.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TableGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TableGroupByArgs['orderBy'] }
        : { orderBy?: TableGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TableGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTableGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Table model
   */
  readonly fields: TableFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Table.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TableClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    orders<T extends Table$ordersArgs<ExtArgs> = {}>(args?: Subset<T, Table$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Table model
   */
  interface TableFieldRefs {
    readonly uuid: FieldRef<"Table", 'String'>
    readonly number: FieldRef<"Table", 'Int'>
    readonly qrCode: FieldRef<"Table", 'String'>
    readonly description: FieldRef<"Table", 'String'>
    readonly companyUuid: FieldRef<"Table", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Table findUnique
   */
  export type TableFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null
    /**
     * Filter, which Table to fetch.
     */
    where: TableWhereUniqueInput
  }

  /**
   * Table findUniqueOrThrow
   */
  export type TableFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null
    /**
     * Filter, which Table to fetch.
     */
    where: TableWhereUniqueInput
  }

  /**
   * Table findFirst
   */
  export type TableFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null
    /**
     * Filter, which Table to fetch.
     */
    where?: TableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tables to fetch.
     */
    orderBy?: TableOrderByWithRelationInput | TableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tables.
     */
    cursor?: TableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tables.
     */
    distinct?: TableScalarFieldEnum | TableScalarFieldEnum[]
  }

  /**
   * Table findFirstOrThrow
   */
  export type TableFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null
    /**
     * Filter, which Table to fetch.
     */
    where?: TableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tables to fetch.
     */
    orderBy?: TableOrderByWithRelationInput | TableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tables.
     */
    cursor?: TableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tables.
     */
    distinct?: TableScalarFieldEnum | TableScalarFieldEnum[]
  }

  /**
   * Table findMany
   */
  export type TableFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null
    /**
     * Filter, which Tables to fetch.
     */
    where?: TableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tables to fetch.
     */
    orderBy?: TableOrderByWithRelationInput | TableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tables.
     */
    cursor?: TableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tables.
     */
    skip?: number
    distinct?: TableScalarFieldEnum | TableScalarFieldEnum[]
  }

  /**
   * Table create
   */
  export type TableCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null
    /**
     * The data needed to create a Table.
     */
    data: XOR<TableCreateInput, TableUncheckedCreateInput>
  }

  /**
   * Table createMany
   */
  export type TableCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tables.
     */
    data: TableCreateManyInput | TableCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Table createManyAndReturn
   */
  export type TableCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * The data used to create many Tables.
     */
    data: TableCreateManyInput | TableCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Table update
   */
  export type TableUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null
    /**
     * The data needed to update a Table.
     */
    data: XOR<TableUpdateInput, TableUncheckedUpdateInput>
    /**
     * Choose, which Table to update.
     */
    where: TableWhereUniqueInput
  }

  /**
   * Table updateMany
   */
  export type TableUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tables.
     */
    data: XOR<TableUpdateManyMutationInput, TableUncheckedUpdateManyInput>
    /**
     * Filter which Tables to update
     */
    where?: TableWhereInput
    /**
     * Limit how many Tables to update.
     */
    limit?: number
  }

  /**
   * Table updateManyAndReturn
   */
  export type TableUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * The data used to update Tables.
     */
    data: XOR<TableUpdateManyMutationInput, TableUncheckedUpdateManyInput>
    /**
     * Filter which Tables to update
     */
    where?: TableWhereInput
    /**
     * Limit how many Tables to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Table upsert
   */
  export type TableUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null
    /**
     * The filter to search for the Table to update in case it exists.
     */
    where: TableWhereUniqueInput
    /**
     * In case the Table found by the `where` argument doesn't exist, create a new Table with this data.
     */
    create: XOR<TableCreateInput, TableUncheckedCreateInput>
    /**
     * In case the Table was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TableUpdateInput, TableUncheckedUpdateInput>
  }

  /**
   * Table delete
   */
  export type TableDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null
    /**
     * Filter which Table to delete.
     */
    where: TableWhereUniqueInput
  }

  /**
   * Table deleteMany
   */
  export type TableDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tables to delete
     */
    where?: TableWhereInput
    /**
     * Limit how many Tables to delete.
     */
    limit?: number
  }

  /**
   * Table.orders
   */
  export type Table$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Table without action
   */
  export type TableDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TableInclude<ExtArgs> | null
  }


  /**
   * Model Order
   */

  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  export type OrderMinAggregateOutputType = {
    uuid: string | null
    tableUuid: string | null
    status: string | null
    createdAt: Date | null
  }

  export type OrderMaxAggregateOutputType = {
    uuid: string | null
    tableUuid: string | null
    status: string | null
    createdAt: Date | null
  }

  export type OrderCountAggregateOutputType = {
    uuid: number
    tableUuid: number
    status: number
    createdAt: number
    _all: number
  }


  export type OrderMinAggregateInputType = {
    uuid?: true
    tableUuid?: true
    status?: true
    createdAt?: true
  }

  export type OrderMaxAggregateInputType = {
    uuid?: true
    tableUuid?: true
    status?: true
    createdAt?: true
  }

  export type OrderCountAggregateInputType = {
    uuid?: true
    tableUuid?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type OrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Order to aggregate.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Orders
    **/
    _count?: true | OrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderMaxAggregateInputType
  }

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
        [P in keyof T & keyof AggregateOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>
  }




  export type OrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithAggregationInput | OrderOrderByWithAggregationInput[]
    by: OrderScalarFieldEnum[] | OrderScalarFieldEnum
    having?: OrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderCountAggregateInputType | true
    _min?: OrderMinAggregateInputType
    _max?: OrderMaxAggregateInputType
  }

  export type OrderGroupByOutputType = {
    uuid: string
    tableUuid: string
    status: string
    createdAt: Date
    _count: OrderCountAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderGroupByOutputType[P]>
            : GetScalarType<T[P], OrderGroupByOutputType[P]>
        }
      >
    >


  export type OrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    uuid?: boolean
    tableUuid?: boolean
    status?: boolean
    createdAt?: boolean
    table?: boolean | TableDefaultArgs<ExtArgs>
    items?: boolean | Order$itemsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    uuid?: boolean
    tableUuid?: boolean
    status?: boolean
    createdAt?: boolean
    table?: boolean | TableDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    uuid?: boolean
    tableUuid?: boolean
    status?: boolean
    createdAt?: boolean
    table?: boolean | TableDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectScalar = {
    uuid?: boolean
    tableUuid?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type OrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"uuid" | "tableUuid" | "status" | "createdAt", ExtArgs["result"]["order"]>
  export type OrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    table?: boolean | TableDefaultArgs<ExtArgs>
    items?: boolean | Order$itemsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    table?: boolean | TableDefaultArgs<ExtArgs>
  }
  export type OrderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    table?: boolean | TableDefaultArgs<ExtArgs>
  }

  export type $OrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Order"
    objects: {
      table: Prisma.$TablePayload<ExtArgs>
      items: Prisma.$OrderItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      uuid: string
      tableUuid: string
      status: string
      createdAt: Date
    }, ExtArgs["result"]["order"]>
    composites: {}
  }

  type OrderGetPayload<S extends boolean | null | undefined | OrderDefaultArgs> = $Result.GetResult<Prisma.$OrderPayload, S>

  type OrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderCountAggregateInputType | true
    }

  export interface OrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Order'], meta: { name: 'Order' } }
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderFindUniqueArgs>(args: SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Order that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderFindFirstArgs>(args?: SelectSubset<T, OrderFindFirstArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     * 
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     * 
     * // Only select the `uuid`
     * const orderWithUuidOnly = await prisma.order.findMany({ select: { uuid: true } })
     * 
     */
    findMany<T extends OrderFindManyArgs>(args?: SelectSubset<T, OrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     * 
     */
    create<T extends OrderCreateArgs>(args: SelectSubset<T, OrderCreateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Orders.
     * @param {OrderCreateManyArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderCreateManyArgs>(args?: SelectSubset<T, OrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Orders and returns the data saved in the database.
     * @param {OrderCreateManyAndReturnArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Orders and only return the `uuid`
     * const orderWithUuidOnly = await prisma.order.createManyAndReturn({
     *   select: { uuid: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     * 
     */
    delete<T extends OrderDeleteArgs>(args: SelectSubset<T, OrderDeleteArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderUpdateArgs>(args: SelectSubset<T, OrderUpdateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderDeleteManyArgs>(args?: SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderUpdateManyArgs>(args: SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders and returns the data updated in the database.
     * @param {OrderUpdateManyAndReturnArgs} args - Arguments to update many Orders.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Orders and only return the `uuid`
     * const orderWithUuidOnly = await prisma.order.updateManyAndReturn({
     *   select: { uuid: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
     */
    upsert<T extends OrderUpsertArgs>(args: SelectSubset<T, OrderUpsertArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
    **/
    count<T extends OrderCountArgs>(
      args?: Subset<T, OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderAggregateArgs>(args: Subset<T, OrderAggregateArgs>): Prisma.PrismaPromise<GetOrderAggregateType<T>>

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs['orderBy'] }
        : { orderBy?: OrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Order model
   */
  readonly fields: OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    table<T extends TableDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TableDefaultArgs<ExtArgs>>): Prisma__TableClient<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    items<T extends Order$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Order$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Order model
   */
  interface OrderFieldRefs {
    readonly uuid: FieldRef<"Order", 'String'>
    readonly tableUuid: FieldRef<"Order", 'String'>
    readonly status: FieldRef<"Order", 'String'>
    readonly createdAt: FieldRef<"Order", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Order findUnique
   */
  export type OrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findUniqueOrThrow
   */
  export type OrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findFirst
   */
  export type OrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findFirstOrThrow
   */
  export type OrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findMany
   */
  export type OrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order create
   */
  export type OrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to create a Order.
     */
    data: XOR<OrderCreateInput, OrderUncheckedCreateInput>
  }

  /**
   * Order createMany
   */
  export type OrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Order createManyAndReturn
   */
  export type OrderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Order update
   */
  export type OrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to update a Order.
     */
    data: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
    /**
     * Choose, which Order to update.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order updateMany
   */
  export type OrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
  }

  /**
   * Order updateManyAndReturn
   */
  export type OrderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Order upsert
   */
  export type OrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The filter to search for the Order to update in case it exists.
     */
    where: OrderWhereUniqueInput
    /**
     * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
     */
    create: XOR<OrderCreateInput, OrderUncheckedCreateInput>
    /**
     * In case the Order was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
  }

  /**
   * Order delete
   */
  export type OrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter which Order to delete.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order deleteMany
   */
  export type OrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orders to delete
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to delete.
     */
    limit?: number
  }

  /**
   * Order.items
   */
  export type Order$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    cursor?: OrderItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * Order without action
   */
  export type OrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
  }


  /**
   * Model OrderItem
   */

  export type AggregateOrderItem = {
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  export type OrderItemAvgAggregateOutputType = {
    quantity: number | null
    unitPrice: number | null
  }

  export type OrderItemSumAggregateOutputType = {
    quantity: number | null
    unitPrice: number | null
  }

  export type OrderItemMinAggregateOutputType = {
    uuid: string | null
    orderUuid: string | null
    productUuid: string | null
    quantity: number | null
    unitPrice: number | null
  }

  export type OrderItemMaxAggregateOutputType = {
    uuid: string | null
    orderUuid: string | null
    productUuid: string | null
    quantity: number | null
    unitPrice: number | null
  }

  export type OrderItemCountAggregateOutputType = {
    uuid: number
    orderUuid: number
    productUuid: number
    quantity: number
    unitPrice: number
    _all: number
  }


  export type OrderItemAvgAggregateInputType = {
    quantity?: true
    unitPrice?: true
  }

  export type OrderItemSumAggregateInputType = {
    quantity?: true
    unitPrice?: true
  }

  export type OrderItemMinAggregateInputType = {
    uuid?: true
    orderUuid?: true
    productUuid?: true
    quantity?: true
    unitPrice?: true
  }

  export type OrderItemMaxAggregateInputType = {
    uuid?: true
    orderUuid?: true
    productUuid?: true
    quantity?: true
    unitPrice?: true
  }

  export type OrderItemCountAggregateInputType = {
    uuid?: true
    orderUuid?: true
    productUuid?: true
    quantity?: true
    unitPrice?: true
    _all?: true
  }

  export type OrderItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItem to aggregate.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrderItems
    **/
    _count?: true | OrderItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderItemMaxAggregateInputType
  }

  export type GetOrderItemAggregateType<T extends OrderItemAggregateArgs> = {
        [P in keyof T & keyof AggregateOrderItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderItem[P]>
      : GetScalarType<T[P], AggregateOrderItem[P]>
  }




  export type OrderItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithAggregationInput | OrderItemOrderByWithAggregationInput[]
    by: OrderItemScalarFieldEnum[] | OrderItemScalarFieldEnum
    having?: OrderItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderItemCountAggregateInputType | true
    _avg?: OrderItemAvgAggregateInputType
    _sum?: OrderItemSumAggregateInputType
    _min?: OrderItemMinAggregateInputType
    _max?: OrderItemMaxAggregateInputType
  }

  export type OrderItemGroupByOutputType = {
    uuid: string
    orderUuid: string
    productUuid: string
    quantity: number
    unitPrice: number
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  type GetOrderItemGroupByPayload<T extends OrderItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
            : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
        }
      >
    >


  export type OrderItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    uuid?: boolean
    orderUuid?: boolean
    productUuid?: boolean
    quantity?: boolean
    unitPrice?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    uuid?: boolean
    orderUuid?: boolean
    productUuid?: boolean
    quantity?: boolean
    unitPrice?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    uuid?: boolean
    orderUuid?: boolean
    productUuid?: boolean
    quantity?: boolean
    unitPrice?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectScalar = {
    uuid?: boolean
    orderUuid?: boolean
    productUuid?: boolean
    quantity?: boolean
    unitPrice?: boolean
  }

  export type OrderItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"uuid" | "orderUuid" | "productUuid" | "quantity" | "unitPrice", ExtArgs["result"]["orderItem"]>
  export type OrderItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type OrderItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type OrderItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $OrderItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrderItem"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      uuid: string
      orderUuid: string
      productUuid: string
      quantity: number
      unitPrice: number
    }, ExtArgs["result"]["orderItem"]>
    composites: {}
  }

  type OrderItemGetPayload<S extends boolean | null | undefined | OrderItemDefaultArgs> = $Result.GetResult<Prisma.$OrderItemPayload, S>

  type OrderItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderItemCountAggregateInputType | true
    }

  export interface OrderItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrderItem'], meta: { name: 'OrderItem' } }
    /**
     * Find zero or one OrderItem that matches the filter.
     * @param {OrderItemFindUniqueArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderItemFindUniqueArgs>(args: SelectSubset<T, OrderItemFindUniqueArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrderItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderItemFindUniqueOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderItemFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderItemFindFirstArgs>(args?: SelectSubset<T, OrderItemFindFirstArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderItemFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrderItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderItems
     * const orderItems = await prisma.orderItem.findMany()
     * 
     * // Get first 10 OrderItems
     * const orderItems = await prisma.orderItem.findMany({ take: 10 })
     * 
     * // Only select the `uuid`
     * const orderItemWithUuidOnly = await prisma.orderItem.findMany({ select: { uuid: true } })
     * 
     */
    findMany<T extends OrderItemFindManyArgs>(args?: SelectSubset<T, OrderItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrderItem.
     * @param {OrderItemCreateArgs} args - Arguments to create a OrderItem.
     * @example
     * // Create one OrderItem
     * const OrderItem = await prisma.orderItem.create({
     *   data: {
     *     // ... data to create a OrderItem
     *   }
     * })
     * 
     */
    create<T extends OrderItemCreateArgs>(args: SelectSubset<T, OrderItemCreateArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrderItems.
     * @param {OrderItemCreateManyArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderItemCreateManyArgs>(args?: SelectSubset<T, OrderItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OrderItems and returns the data saved in the database.
     * @param {OrderItemCreateManyAndReturnArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OrderItems and only return the `uuid`
     * const orderItemWithUuidOnly = await prisma.orderItem.createManyAndReturn({
     *   select: { uuid: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderItemCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OrderItem.
     * @param {OrderItemDeleteArgs} args - Arguments to delete one OrderItem.
     * @example
     * // Delete one OrderItem
     * const OrderItem = await prisma.orderItem.delete({
     *   where: {
     *     // ... filter to delete one OrderItem
     *   }
     * })
     * 
     */
    delete<T extends OrderItemDeleteArgs>(args: SelectSubset<T, OrderItemDeleteArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrderItem.
     * @param {OrderItemUpdateArgs} args - Arguments to update one OrderItem.
     * @example
     * // Update one OrderItem
     * const orderItem = await prisma.orderItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderItemUpdateArgs>(args: SelectSubset<T, OrderItemUpdateArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrderItems.
     * @param {OrderItemDeleteManyArgs} args - Arguments to filter OrderItems to delete.
     * @example
     * // Delete a few OrderItems
     * const { count } = await prisma.orderItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderItemDeleteManyArgs>(args?: SelectSubset<T, OrderItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderItems
     * const orderItem = await prisma.orderItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderItemUpdateManyArgs>(args: SelectSubset<T, OrderItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderItems and returns the data updated in the database.
     * @param {OrderItemUpdateManyAndReturnArgs} args - Arguments to update many OrderItems.
     * @example
     * // Update many OrderItems
     * const orderItem = await prisma.orderItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OrderItems and only return the `uuid`
     * const orderItemWithUuidOnly = await prisma.orderItem.updateManyAndReturn({
     *   select: { uuid: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderItemUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OrderItem.
     * @param {OrderItemUpsertArgs} args - Arguments to update or create a OrderItem.
     * @example
     * // Update or create a OrderItem
     * const orderItem = await prisma.orderItem.upsert({
     *   create: {
     *     // ... data to create a OrderItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderItem we want to update
     *   }
     * })
     */
    upsert<T extends OrderItemUpsertArgs>(args: SelectSubset<T, OrderItemUpsertArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemCountArgs} args - Arguments to filter OrderItems to count.
     * @example
     * // Count the number of OrderItems
     * const count = await prisma.orderItem.count({
     *   where: {
     *     // ... the filter for the OrderItems we want to count
     *   }
     * })
    **/
    count<T extends OrderItemCountArgs>(
      args?: Subset<T, OrderItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderItemAggregateArgs>(args: Subset<T, OrderItemAggregateArgs>): Prisma.PrismaPromise<GetOrderItemAggregateType<T>>

    /**
     * Group by OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderItemGroupByArgs['orderBy'] }
        : { orderBy?: OrderItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrderItem model
   */
  readonly fields: OrderItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OrderItem model
   */
  interface OrderItemFieldRefs {
    readonly uuid: FieldRef<"OrderItem", 'String'>
    readonly orderUuid: FieldRef<"OrderItem", 'String'>
    readonly productUuid: FieldRef<"OrderItem", 'String'>
    readonly quantity: FieldRef<"OrderItem", 'Int'>
    readonly unitPrice: FieldRef<"OrderItem", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * OrderItem findUnique
   */
  export type OrderItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findUniqueOrThrow
   */
  export type OrderItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findFirst
   */
  export type OrderItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findFirstOrThrow
   */
  export type OrderItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findMany
   */
  export type OrderItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItems to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem create
   */
  export type OrderItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The data needed to create a OrderItem.
     */
    data: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
  }

  /**
   * OrderItem createMany
   */
  export type OrderItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrderItem createManyAndReturn
   */
  export type OrderItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderItem update
   */
  export type OrderItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The data needed to update a OrderItem.
     */
    data: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
    /**
     * Choose, which OrderItem to update.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem updateMany
   */
  export type OrderItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrderItems.
     */
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyInput>
    /**
     * Filter which OrderItems to update
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to update.
     */
    limit?: number
  }

  /**
   * OrderItem updateManyAndReturn
   */
  export type OrderItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * The data used to update OrderItems.
     */
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyInput>
    /**
     * Filter which OrderItems to update
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderItem upsert
   */
  export type OrderItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The filter to search for the OrderItem to update in case it exists.
     */
    where: OrderItemWhereUniqueInput
    /**
     * In case the OrderItem found by the `where` argument doesn't exist, create a new OrderItem with this data.
     */
    create: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
    /**
     * In case the OrderItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
  }

  /**
   * OrderItem delete
   */
  export type OrderItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter which OrderItem to delete.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem deleteMany
   */
  export type OrderItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItems to delete
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to delete.
     */
    limit?: number
  }

  /**
   * OrderItem without action
   */
  export type OrderItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
  }


  /**
   * Model CashierSession
   */

  export type AggregateCashierSession = {
    _count: CashierSessionCountAggregateOutputType | null
    _avg: CashierSessionAvgAggregateOutputType | null
    _sum: CashierSessionSumAggregateOutputType | null
    _min: CashierSessionMinAggregateOutputType | null
    _max: CashierSessionMaxAggregateOutputType | null
  }

  export type CashierSessionAvgAggregateOutputType = {
    openingBalance: number | null
    closingBalance: number | null
  }

  export type CashierSessionSumAggregateOutputType = {
    openingBalance: number | null
    closingBalance: number | null
  }

  export type CashierSessionMinAggregateOutputType = {
    uuid: string | null
    companyUuid: string | null
    openedAt: Date | null
    closedAt: Date | null
    openingBalance: number | null
    closingBalance: number | null
    status: string | null
  }

  export type CashierSessionMaxAggregateOutputType = {
    uuid: string | null
    companyUuid: string | null
    openedAt: Date | null
    closedAt: Date | null
    openingBalance: number | null
    closingBalance: number | null
    status: string | null
  }

  export type CashierSessionCountAggregateOutputType = {
    uuid: number
    companyUuid: number
    openedAt: number
    closedAt: number
    openingBalance: number
    closingBalance: number
    status: number
    _all: number
  }


  export type CashierSessionAvgAggregateInputType = {
    openingBalance?: true
    closingBalance?: true
  }

  export type CashierSessionSumAggregateInputType = {
    openingBalance?: true
    closingBalance?: true
  }

  export type CashierSessionMinAggregateInputType = {
    uuid?: true
    companyUuid?: true
    openedAt?: true
    closedAt?: true
    openingBalance?: true
    closingBalance?: true
    status?: true
  }

  export type CashierSessionMaxAggregateInputType = {
    uuid?: true
    companyUuid?: true
    openedAt?: true
    closedAt?: true
    openingBalance?: true
    closingBalance?: true
    status?: true
  }

  export type CashierSessionCountAggregateInputType = {
    uuid?: true
    companyUuid?: true
    openedAt?: true
    closedAt?: true
    openingBalance?: true
    closingBalance?: true
    status?: true
    _all?: true
  }

  export type CashierSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CashierSession to aggregate.
     */
    where?: CashierSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CashierSessions to fetch.
     */
    orderBy?: CashierSessionOrderByWithRelationInput | CashierSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CashierSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CashierSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CashierSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CashierSessions
    **/
    _count?: true | CashierSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CashierSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CashierSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CashierSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CashierSessionMaxAggregateInputType
  }

  export type GetCashierSessionAggregateType<T extends CashierSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateCashierSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCashierSession[P]>
      : GetScalarType<T[P], AggregateCashierSession[P]>
  }




  export type CashierSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CashierSessionWhereInput
    orderBy?: CashierSessionOrderByWithAggregationInput | CashierSessionOrderByWithAggregationInput[]
    by: CashierSessionScalarFieldEnum[] | CashierSessionScalarFieldEnum
    having?: CashierSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CashierSessionCountAggregateInputType | true
    _avg?: CashierSessionAvgAggregateInputType
    _sum?: CashierSessionSumAggregateInputType
    _min?: CashierSessionMinAggregateInputType
    _max?: CashierSessionMaxAggregateInputType
  }

  export type CashierSessionGroupByOutputType = {
    uuid: string
    companyUuid: string
    openedAt: Date
    closedAt: Date | null
    openingBalance: number
    closingBalance: number | null
    status: string
    _count: CashierSessionCountAggregateOutputType | null
    _avg: CashierSessionAvgAggregateOutputType | null
    _sum: CashierSessionSumAggregateOutputType | null
    _min: CashierSessionMinAggregateOutputType | null
    _max: CashierSessionMaxAggregateOutputType | null
  }

  type GetCashierSessionGroupByPayload<T extends CashierSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CashierSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CashierSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CashierSessionGroupByOutputType[P]>
            : GetScalarType<T[P], CashierSessionGroupByOutputType[P]>
        }
      >
    >


  export type CashierSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    uuid?: boolean
    companyUuid?: boolean
    openedAt?: boolean
    closedAt?: boolean
    openingBalance?: boolean
    closingBalance?: boolean
    status?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    movements?: boolean | CashierSession$movementsArgs<ExtArgs>
    _count?: boolean | CashierSessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cashierSession"]>

  export type CashierSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    uuid?: boolean
    companyUuid?: boolean
    openedAt?: boolean
    closedAt?: boolean
    openingBalance?: boolean
    closingBalance?: boolean
    status?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cashierSession"]>

  export type CashierSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    uuid?: boolean
    companyUuid?: boolean
    openedAt?: boolean
    closedAt?: boolean
    openingBalance?: boolean
    closingBalance?: boolean
    status?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cashierSession"]>

  export type CashierSessionSelectScalar = {
    uuid?: boolean
    companyUuid?: boolean
    openedAt?: boolean
    closedAt?: boolean
    openingBalance?: boolean
    closingBalance?: boolean
    status?: boolean
  }

  export type CashierSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"uuid" | "companyUuid" | "openedAt" | "closedAt" | "openingBalance" | "closingBalance" | "status", ExtArgs["result"]["cashierSession"]>
  export type CashierSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    movements?: boolean | CashierSession$movementsArgs<ExtArgs>
    _count?: boolean | CashierSessionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CashierSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type CashierSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $CashierSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CashierSession"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
      movements: Prisma.$CashierMovementPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      uuid: string
      companyUuid: string
      openedAt: Date
      closedAt: Date | null
      openingBalance: number
      closingBalance: number | null
      status: string
    }, ExtArgs["result"]["cashierSession"]>
    composites: {}
  }

  type CashierSessionGetPayload<S extends boolean | null | undefined | CashierSessionDefaultArgs> = $Result.GetResult<Prisma.$CashierSessionPayload, S>

  type CashierSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CashierSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CashierSessionCountAggregateInputType | true
    }

  export interface CashierSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CashierSession'], meta: { name: 'CashierSession' } }
    /**
     * Find zero or one CashierSession that matches the filter.
     * @param {CashierSessionFindUniqueArgs} args - Arguments to find a CashierSession
     * @example
     * // Get one CashierSession
     * const cashierSession = await prisma.cashierSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CashierSessionFindUniqueArgs>(args: SelectSubset<T, CashierSessionFindUniqueArgs<ExtArgs>>): Prisma__CashierSessionClient<$Result.GetResult<Prisma.$CashierSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CashierSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CashierSessionFindUniqueOrThrowArgs} args - Arguments to find a CashierSession
     * @example
     * // Get one CashierSession
     * const cashierSession = await prisma.cashierSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CashierSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, CashierSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CashierSessionClient<$Result.GetResult<Prisma.$CashierSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CashierSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashierSessionFindFirstArgs} args - Arguments to find a CashierSession
     * @example
     * // Get one CashierSession
     * const cashierSession = await prisma.cashierSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CashierSessionFindFirstArgs>(args?: SelectSubset<T, CashierSessionFindFirstArgs<ExtArgs>>): Prisma__CashierSessionClient<$Result.GetResult<Prisma.$CashierSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CashierSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashierSessionFindFirstOrThrowArgs} args - Arguments to find a CashierSession
     * @example
     * // Get one CashierSession
     * const cashierSession = await prisma.cashierSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CashierSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, CashierSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__CashierSessionClient<$Result.GetResult<Prisma.$CashierSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CashierSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashierSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CashierSessions
     * const cashierSessions = await prisma.cashierSession.findMany()
     * 
     * // Get first 10 CashierSessions
     * const cashierSessions = await prisma.cashierSession.findMany({ take: 10 })
     * 
     * // Only select the `uuid`
     * const cashierSessionWithUuidOnly = await prisma.cashierSession.findMany({ select: { uuid: true } })
     * 
     */
    findMany<T extends CashierSessionFindManyArgs>(args?: SelectSubset<T, CashierSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CashierSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CashierSession.
     * @param {CashierSessionCreateArgs} args - Arguments to create a CashierSession.
     * @example
     * // Create one CashierSession
     * const CashierSession = await prisma.cashierSession.create({
     *   data: {
     *     // ... data to create a CashierSession
     *   }
     * })
     * 
     */
    create<T extends CashierSessionCreateArgs>(args: SelectSubset<T, CashierSessionCreateArgs<ExtArgs>>): Prisma__CashierSessionClient<$Result.GetResult<Prisma.$CashierSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CashierSessions.
     * @param {CashierSessionCreateManyArgs} args - Arguments to create many CashierSessions.
     * @example
     * // Create many CashierSessions
     * const cashierSession = await prisma.cashierSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CashierSessionCreateManyArgs>(args?: SelectSubset<T, CashierSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CashierSessions and returns the data saved in the database.
     * @param {CashierSessionCreateManyAndReturnArgs} args - Arguments to create many CashierSessions.
     * @example
     * // Create many CashierSessions
     * const cashierSession = await prisma.cashierSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CashierSessions and only return the `uuid`
     * const cashierSessionWithUuidOnly = await prisma.cashierSession.createManyAndReturn({
     *   select: { uuid: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CashierSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, CashierSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CashierSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CashierSession.
     * @param {CashierSessionDeleteArgs} args - Arguments to delete one CashierSession.
     * @example
     * // Delete one CashierSession
     * const CashierSession = await prisma.cashierSession.delete({
     *   where: {
     *     // ... filter to delete one CashierSession
     *   }
     * })
     * 
     */
    delete<T extends CashierSessionDeleteArgs>(args: SelectSubset<T, CashierSessionDeleteArgs<ExtArgs>>): Prisma__CashierSessionClient<$Result.GetResult<Prisma.$CashierSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CashierSession.
     * @param {CashierSessionUpdateArgs} args - Arguments to update one CashierSession.
     * @example
     * // Update one CashierSession
     * const cashierSession = await prisma.cashierSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CashierSessionUpdateArgs>(args: SelectSubset<T, CashierSessionUpdateArgs<ExtArgs>>): Prisma__CashierSessionClient<$Result.GetResult<Prisma.$CashierSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CashierSessions.
     * @param {CashierSessionDeleteManyArgs} args - Arguments to filter CashierSessions to delete.
     * @example
     * // Delete a few CashierSessions
     * const { count } = await prisma.cashierSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CashierSessionDeleteManyArgs>(args?: SelectSubset<T, CashierSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CashierSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashierSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CashierSessions
     * const cashierSession = await prisma.cashierSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CashierSessionUpdateManyArgs>(args: SelectSubset<T, CashierSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CashierSessions and returns the data updated in the database.
     * @param {CashierSessionUpdateManyAndReturnArgs} args - Arguments to update many CashierSessions.
     * @example
     * // Update many CashierSessions
     * const cashierSession = await prisma.cashierSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CashierSessions and only return the `uuid`
     * const cashierSessionWithUuidOnly = await prisma.cashierSession.updateManyAndReturn({
     *   select: { uuid: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CashierSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, CashierSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CashierSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CashierSession.
     * @param {CashierSessionUpsertArgs} args - Arguments to update or create a CashierSession.
     * @example
     * // Update or create a CashierSession
     * const cashierSession = await prisma.cashierSession.upsert({
     *   create: {
     *     // ... data to create a CashierSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CashierSession we want to update
     *   }
     * })
     */
    upsert<T extends CashierSessionUpsertArgs>(args: SelectSubset<T, CashierSessionUpsertArgs<ExtArgs>>): Prisma__CashierSessionClient<$Result.GetResult<Prisma.$CashierSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CashierSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashierSessionCountArgs} args - Arguments to filter CashierSessions to count.
     * @example
     * // Count the number of CashierSessions
     * const count = await prisma.cashierSession.count({
     *   where: {
     *     // ... the filter for the CashierSessions we want to count
     *   }
     * })
    **/
    count<T extends CashierSessionCountArgs>(
      args?: Subset<T, CashierSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CashierSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CashierSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashierSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CashierSessionAggregateArgs>(args: Subset<T, CashierSessionAggregateArgs>): Prisma.PrismaPromise<GetCashierSessionAggregateType<T>>

    /**
     * Group by CashierSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashierSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CashierSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CashierSessionGroupByArgs['orderBy'] }
        : { orderBy?: CashierSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CashierSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCashierSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CashierSession model
   */
  readonly fields: CashierSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CashierSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CashierSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    movements<T extends CashierSession$movementsArgs<ExtArgs> = {}>(args?: Subset<T, CashierSession$movementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CashierMovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CashierSession model
   */
  interface CashierSessionFieldRefs {
    readonly uuid: FieldRef<"CashierSession", 'String'>
    readonly companyUuid: FieldRef<"CashierSession", 'String'>
    readonly openedAt: FieldRef<"CashierSession", 'DateTime'>
    readonly closedAt: FieldRef<"CashierSession", 'DateTime'>
    readonly openingBalance: FieldRef<"CashierSession", 'Float'>
    readonly closingBalance: FieldRef<"CashierSession", 'Float'>
    readonly status: FieldRef<"CashierSession", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CashierSession findUnique
   */
  export type CashierSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashierSession
     */
    select?: CashierSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CashierSession
     */
    omit?: CashierSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashierSessionInclude<ExtArgs> | null
    /**
     * Filter, which CashierSession to fetch.
     */
    where: CashierSessionWhereUniqueInput
  }

  /**
   * CashierSession findUniqueOrThrow
   */
  export type CashierSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashierSession
     */
    select?: CashierSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CashierSession
     */
    omit?: CashierSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashierSessionInclude<ExtArgs> | null
    /**
     * Filter, which CashierSession to fetch.
     */
    where: CashierSessionWhereUniqueInput
  }

  /**
   * CashierSession findFirst
   */
  export type CashierSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashierSession
     */
    select?: CashierSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CashierSession
     */
    omit?: CashierSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashierSessionInclude<ExtArgs> | null
    /**
     * Filter, which CashierSession to fetch.
     */
    where?: CashierSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CashierSessions to fetch.
     */
    orderBy?: CashierSessionOrderByWithRelationInput | CashierSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CashierSessions.
     */
    cursor?: CashierSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CashierSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CashierSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CashierSessions.
     */
    distinct?: CashierSessionScalarFieldEnum | CashierSessionScalarFieldEnum[]
  }

  /**
   * CashierSession findFirstOrThrow
   */
  export type CashierSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashierSession
     */
    select?: CashierSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CashierSession
     */
    omit?: CashierSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashierSessionInclude<ExtArgs> | null
    /**
     * Filter, which CashierSession to fetch.
     */
    where?: CashierSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CashierSessions to fetch.
     */
    orderBy?: CashierSessionOrderByWithRelationInput | CashierSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CashierSessions.
     */
    cursor?: CashierSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CashierSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CashierSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CashierSessions.
     */
    distinct?: CashierSessionScalarFieldEnum | CashierSessionScalarFieldEnum[]
  }

  /**
   * CashierSession findMany
   */
  export type CashierSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashierSession
     */
    select?: CashierSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CashierSession
     */
    omit?: CashierSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashierSessionInclude<ExtArgs> | null
    /**
     * Filter, which CashierSessions to fetch.
     */
    where?: CashierSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CashierSessions to fetch.
     */
    orderBy?: CashierSessionOrderByWithRelationInput | CashierSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CashierSessions.
     */
    cursor?: CashierSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CashierSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CashierSessions.
     */
    skip?: number
    distinct?: CashierSessionScalarFieldEnum | CashierSessionScalarFieldEnum[]
  }

  /**
   * CashierSession create
   */
  export type CashierSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashierSession
     */
    select?: CashierSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CashierSession
     */
    omit?: CashierSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashierSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a CashierSession.
     */
    data: XOR<CashierSessionCreateInput, CashierSessionUncheckedCreateInput>
  }

  /**
   * CashierSession createMany
   */
  export type CashierSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CashierSessions.
     */
    data: CashierSessionCreateManyInput | CashierSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CashierSession createManyAndReturn
   */
  export type CashierSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashierSession
     */
    select?: CashierSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CashierSession
     */
    omit?: CashierSessionOmit<ExtArgs> | null
    /**
     * The data used to create many CashierSessions.
     */
    data: CashierSessionCreateManyInput | CashierSessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashierSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CashierSession update
   */
  export type CashierSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashierSession
     */
    select?: CashierSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CashierSession
     */
    omit?: CashierSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashierSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a CashierSession.
     */
    data: XOR<CashierSessionUpdateInput, CashierSessionUncheckedUpdateInput>
    /**
     * Choose, which CashierSession to update.
     */
    where: CashierSessionWhereUniqueInput
  }

  /**
   * CashierSession updateMany
   */
  export type CashierSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CashierSessions.
     */
    data: XOR<CashierSessionUpdateManyMutationInput, CashierSessionUncheckedUpdateManyInput>
    /**
     * Filter which CashierSessions to update
     */
    where?: CashierSessionWhereInput
    /**
     * Limit how many CashierSessions to update.
     */
    limit?: number
  }

  /**
   * CashierSession updateManyAndReturn
   */
  export type CashierSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashierSession
     */
    select?: CashierSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CashierSession
     */
    omit?: CashierSessionOmit<ExtArgs> | null
    /**
     * The data used to update CashierSessions.
     */
    data: XOR<CashierSessionUpdateManyMutationInput, CashierSessionUncheckedUpdateManyInput>
    /**
     * Filter which CashierSessions to update
     */
    where?: CashierSessionWhereInput
    /**
     * Limit how many CashierSessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashierSessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CashierSession upsert
   */
  export type CashierSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashierSession
     */
    select?: CashierSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CashierSession
     */
    omit?: CashierSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashierSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the CashierSession to update in case it exists.
     */
    where: CashierSessionWhereUniqueInput
    /**
     * In case the CashierSession found by the `where` argument doesn't exist, create a new CashierSession with this data.
     */
    create: XOR<CashierSessionCreateInput, CashierSessionUncheckedCreateInput>
    /**
     * In case the CashierSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CashierSessionUpdateInput, CashierSessionUncheckedUpdateInput>
  }

  /**
   * CashierSession delete
   */
  export type CashierSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashierSession
     */
    select?: CashierSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CashierSession
     */
    omit?: CashierSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashierSessionInclude<ExtArgs> | null
    /**
     * Filter which CashierSession to delete.
     */
    where: CashierSessionWhereUniqueInput
  }

  /**
   * CashierSession deleteMany
   */
  export type CashierSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CashierSessions to delete
     */
    where?: CashierSessionWhereInput
    /**
     * Limit how many CashierSessions to delete.
     */
    limit?: number
  }

  /**
   * CashierSession.movements
   */
  export type CashierSession$movementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashierMovement
     */
    select?: CashierMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CashierMovement
     */
    omit?: CashierMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashierMovementInclude<ExtArgs> | null
    where?: CashierMovementWhereInput
    orderBy?: CashierMovementOrderByWithRelationInput | CashierMovementOrderByWithRelationInput[]
    cursor?: CashierMovementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CashierMovementScalarFieldEnum | CashierMovementScalarFieldEnum[]
  }

  /**
   * CashierSession without action
   */
  export type CashierSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashierSession
     */
    select?: CashierSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CashierSession
     */
    omit?: CashierSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashierSessionInclude<ExtArgs> | null
  }


  /**
   * Model CashierMovement
   */

  export type AggregateCashierMovement = {
    _count: CashierMovementCountAggregateOutputType | null
    _avg: CashierMovementAvgAggregateOutputType | null
    _sum: CashierMovementSumAggregateOutputType | null
    _min: CashierMovementMinAggregateOutputType | null
    _max: CashierMovementMaxAggregateOutputType | null
  }

  export type CashierMovementAvgAggregateOutputType = {
    amount: number | null
  }

  export type CashierMovementSumAggregateOutputType = {
    amount: number | null
  }

  export type CashierMovementMinAggregateOutputType = {
    uuid: string | null
    sessionUuid: string | null
    type: string | null
    amount: number | null
    description: string | null
    createdAt: Date | null
  }

  export type CashierMovementMaxAggregateOutputType = {
    uuid: string | null
    sessionUuid: string | null
    type: string | null
    amount: number | null
    description: string | null
    createdAt: Date | null
  }

  export type CashierMovementCountAggregateOutputType = {
    uuid: number
    sessionUuid: number
    type: number
    amount: number
    description: number
    createdAt: number
    _all: number
  }


  export type CashierMovementAvgAggregateInputType = {
    amount?: true
  }

  export type CashierMovementSumAggregateInputType = {
    amount?: true
  }

  export type CashierMovementMinAggregateInputType = {
    uuid?: true
    sessionUuid?: true
    type?: true
    amount?: true
    description?: true
    createdAt?: true
  }

  export type CashierMovementMaxAggregateInputType = {
    uuid?: true
    sessionUuid?: true
    type?: true
    amount?: true
    description?: true
    createdAt?: true
  }

  export type CashierMovementCountAggregateInputType = {
    uuid?: true
    sessionUuid?: true
    type?: true
    amount?: true
    description?: true
    createdAt?: true
    _all?: true
  }

  export type CashierMovementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CashierMovement to aggregate.
     */
    where?: CashierMovementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CashierMovements to fetch.
     */
    orderBy?: CashierMovementOrderByWithRelationInput | CashierMovementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CashierMovementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CashierMovements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CashierMovements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CashierMovements
    **/
    _count?: true | CashierMovementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CashierMovementAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CashierMovementSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CashierMovementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CashierMovementMaxAggregateInputType
  }

  export type GetCashierMovementAggregateType<T extends CashierMovementAggregateArgs> = {
        [P in keyof T & keyof AggregateCashierMovement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCashierMovement[P]>
      : GetScalarType<T[P], AggregateCashierMovement[P]>
  }




  export type CashierMovementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CashierMovementWhereInput
    orderBy?: CashierMovementOrderByWithAggregationInput | CashierMovementOrderByWithAggregationInput[]
    by: CashierMovementScalarFieldEnum[] | CashierMovementScalarFieldEnum
    having?: CashierMovementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CashierMovementCountAggregateInputType | true
    _avg?: CashierMovementAvgAggregateInputType
    _sum?: CashierMovementSumAggregateInputType
    _min?: CashierMovementMinAggregateInputType
    _max?: CashierMovementMaxAggregateInputType
  }

  export type CashierMovementGroupByOutputType = {
    uuid: string
    sessionUuid: string
    type: string
    amount: number
    description: string | null
    createdAt: Date
    _count: CashierMovementCountAggregateOutputType | null
    _avg: CashierMovementAvgAggregateOutputType | null
    _sum: CashierMovementSumAggregateOutputType | null
    _min: CashierMovementMinAggregateOutputType | null
    _max: CashierMovementMaxAggregateOutputType | null
  }

  type GetCashierMovementGroupByPayload<T extends CashierMovementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CashierMovementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CashierMovementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CashierMovementGroupByOutputType[P]>
            : GetScalarType<T[P], CashierMovementGroupByOutputType[P]>
        }
      >
    >


  export type CashierMovementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    uuid?: boolean
    sessionUuid?: boolean
    type?: boolean
    amount?: boolean
    description?: boolean
    createdAt?: boolean
    session?: boolean | CashierSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cashierMovement"]>

  export type CashierMovementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    uuid?: boolean
    sessionUuid?: boolean
    type?: boolean
    amount?: boolean
    description?: boolean
    createdAt?: boolean
    session?: boolean | CashierSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cashierMovement"]>

  export type CashierMovementSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    uuid?: boolean
    sessionUuid?: boolean
    type?: boolean
    amount?: boolean
    description?: boolean
    createdAt?: boolean
    session?: boolean | CashierSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cashierMovement"]>

  export type CashierMovementSelectScalar = {
    uuid?: boolean
    sessionUuid?: boolean
    type?: boolean
    amount?: boolean
    description?: boolean
    createdAt?: boolean
  }

  export type CashierMovementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"uuid" | "sessionUuid" | "type" | "amount" | "description" | "createdAt", ExtArgs["result"]["cashierMovement"]>
  export type CashierMovementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | CashierSessionDefaultArgs<ExtArgs>
  }
  export type CashierMovementIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | CashierSessionDefaultArgs<ExtArgs>
  }
  export type CashierMovementIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | CashierSessionDefaultArgs<ExtArgs>
  }

  export type $CashierMovementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CashierMovement"
    objects: {
      session: Prisma.$CashierSessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      uuid: string
      sessionUuid: string
      type: string
      amount: number
      description: string | null
      createdAt: Date
    }, ExtArgs["result"]["cashierMovement"]>
    composites: {}
  }

  type CashierMovementGetPayload<S extends boolean | null | undefined | CashierMovementDefaultArgs> = $Result.GetResult<Prisma.$CashierMovementPayload, S>

  type CashierMovementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CashierMovementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CashierMovementCountAggregateInputType | true
    }

  export interface CashierMovementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CashierMovement'], meta: { name: 'CashierMovement' } }
    /**
     * Find zero or one CashierMovement that matches the filter.
     * @param {CashierMovementFindUniqueArgs} args - Arguments to find a CashierMovement
     * @example
     * // Get one CashierMovement
     * const cashierMovement = await prisma.cashierMovement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CashierMovementFindUniqueArgs>(args: SelectSubset<T, CashierMovementFindUniqueArgs<ExtArgs>>): Prisma__CashierMovementClient<$Result.GetResult<Prisma.$CashierMovementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CashierMovement that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CashierMovementFindUniqueOrThrowArgs} args - Arguments to find a CashierMovement
     * @example
     * // Get one CashierMovement
     * const cashierMovement = await prisma.cashierMovement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CashierMovementFindUniqueOrThrowArgs>(args: SelectSubset<T, CashierMovementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CashierMovementClient<$Result.GetResult<Prisma.$CashierMovementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CashierMovement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashierMovementFindFirstArgs} args - Arguments to find a CashierMovement
     * @example
     * // Get one CashierMovement
     * const cashierMovement = await prisma.cashierMovement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CashierMovementFindFirstArgs>(args?: SelectSubset<T, CashierMovementFindFirstArgs<ExtArgs>>): Prisma__CashierMovementClient<$Result.GetResult<Prisma.$CashierMovementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CashierMovement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashierMovementFindFirstOrThrowArgs} args - Arguments to find a CashierMovement
     * @example
     * // Get one CashierMovement
     * const cashierMovement = await prisma.cashierMovement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CashierMovementFindFirstOrThrowArgs>(args?: SelectSubset<T, CashierMovementFindFirstOrThrowArgs<ExtArgs>>): Prisma__CashierMovementClient<$Result.GetResult<Prisma.$CashierMovementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CashierMovements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashierMovementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CashierMovements
     * const cashierMovements = await prisma.cashierMovement.findMany()
     * 
     * // Get first 10 CashierMovements
     * const cashierMovements = await prisma.cashierMovement.findMany({ take: 10 })
     * 
     * // Only select the `uuid`
     * const cashierMovementWithUuidOnly = await prisma.cashierMovement.findMany({ select: { uuid: true } })
     * 
     */
    findMany<T extends CashierMovementFindManyArgs>(args?: SelectSubset<T, CashierMovementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CashierMovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CashierMovement.
     * @param {CashierMovementCreateArgs} args - Arguments to create a CashierMovement.
     * @example
     * // Create one CashierMovement
     * const CashierMovement = await prisma.cashierMovement.create({
     *   data: {
     *     // ... data to create a CashierMovement
     *   }
     * })
     * 
     */
    create<T extends CashierMovementCreateArgs>(args: SelectSubset<T, CashierMovementCreateArgs<ExtArgs>>): Prisma__CashierMovementClient<$Result.GetResult<Prisma.$CashierMovementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CashierMovements.
     * @param {CashierMovementCreateManyArgs} args - Arguments to create many CashierMovements.
     * @example
     * // Create many CashierMovements
     * const cashierMovement = await prisma.cashierMovement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CashierMovementCreateManyArgs>(args?: SelectSubset<T, CashierMovementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CashierMovements and returns the data saved in the database.
     * @param {CashierMovementCreateManyAndReturnArgs} args - Arguments to create many CashierMovements.
     * @example
     * // Create many CashierMovements
     * const cashierMovement = await prisma.cashierMovement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CashierMovements and only return the `uuid`
     * const cashierMovementWithUuidOnly = await prisma.cashierMovement.createManyAndReturn({
     *   select: { uuid: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CashierMovementCreateManyAndReturnArgs>(args?: SelectSubset<T, CashierMovementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CashierMovementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CashierMovement.
     * @param {CashierMovementDeleteArgs} args - Arguments to delete one CashierMovement.
     * @example
     * // Delete one CashierMovement
     * const CashierMovement = await prisma.cashierMovement.delete({
     *   where: {
     *     // ... filter to delete one CashierMovement
     *   }
     * })
     * 
     */
    delete<T extends CashierMovementDeleteArgs>(args: SelectSubset<T, CashierMovementDeleteArgs<ExtArgs>>): Prisma__CashierMovementClient<$Result.GetResult<Prisma.$CashierMovementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CashierMovement.
     * @param {CashierMovementUpdateArgs} args - Arguments to update one CashierMovement.
     * @example
     * // Update one CashierMovement
     * const cashierMovement = await prisma.cashierMovement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CashierMovementUpdateArgs>(args: SelectSubset<T, CashierMovementUpdateArgs<ExtArgs>>): Prisma__CashierMovementClient<$Result.GetResult<Prisma.$CashierMovementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CashierMovements.
     * @param {CashierMovementDeleteManyArgs} args - Arguments to filter CashierMovements to delete.
     * @example
     * // Delete a few CashierMovements
     * const { count } = await prisma.cashierMovement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CashierMovementDeleteManyArgs>(args?: SelectSubset<T, CashierMovementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CashierMovements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashierMovementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CashierMovements
     * const cashierMovement = await prisma.cashierMovement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CashierMovementUpdateManyArgs>(args: SelectSubset<T, CashierMovementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CashierMovements and returns the data updated in the database.
     * @param {CashierMovementUpdateManyAndReturnArgs} args - Arguments to update many CashierMovements.
     * @example
     * // Update many CashierMovements
     * const cashierMovement = await prisma.cashierMovement.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CashierMovements and only return the `uuid`
     * const cashierMovementWithUuidOnly = await prisma.cashierMovement.updateManyAndReturn({
     *   select: { uuid: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CashierMovementUpdateManyAndReturnArgs>(args: SelectSubset<T, CashierMovementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CashierMovementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CashierMovement.
     * @param {CashierMovementUpsertArgs} args - Arguments to update or create a CashierMovement.
     * @example
     * // Update or create a CashierMovement
     * const cashierMovement = await prisma.cashierMovement.upsert({
     *   create: {
     *     // ... data to create a CashierMovement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CashierMovement we want to update
     *   }
     * })
     */
    upsert<T extends CashierMovementUpsertArgs>(args: SelectSubset<T, CashierMovementUpsertArgs<ExtArgs>>): Prisma__CashierMovementClient<$Result.GetResult<Prisma.$CashierMovementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CashierMovements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashierMovementCountArgs} args - Arguments to filter CashierMovements to count.
     * @example
     * // Count the number of CashierMovements
     * const count = await prisma.cashierMovement.count({
     *   where: {
     *     // ... the filter for the CashierMovements we want to count
     *   }
     * })
    **/
    count<T extends CashierMovementCountArgs>(
      args?: Subset<T, CashierMovementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CashierMovementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CashierMovement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashierMovementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CashierMovementAggregateArgs>(args: Subset<T, CashierMovementAggregateArgs>): Prisma.PrismaPromise<GetCashierMovementAggregateType<T>>

    /**
     * Group by CashierMovement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashierMovementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CashierMovementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CashierMovementGroupByArgs['orderBy'] }
        : { orderBy?: CashierMovementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CashierMovementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCashierMovementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CashierMovement model
   */
  readonly fields: CashierMovementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CashierMovement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CashierMovementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    session<T extends CashierSessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CashierSessionDefaultArgs<ExtArgs>>): Prisma__CashierSessionClient<$Result.GetResult<Prisma.$CashierSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CashierMovement model
   */
  interface CashierMovementFieldRefs {
    readonly uuid: FieldRef<"CashierMovement", 'String'>
    readonly sessionUuid: FieldRef<"CashierMovement", 'String'>
    readonly type: FieldRef<"CashierMovement", 'String'>
    readonly amount: FieldRef<"CashierMovement", 'Float'>
    readonly description: FieldRef<"CashierMovement", 'String'>
    readonly createdAt: FieldRef<"CashierMovement", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CashierMovement findUnique
   */
  export type CashierMovementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashierMovement
     */
    select?: CashierMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CashierMovement
     */
    omit?: CashierMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashierMovementInclude<ExtArgs> | null
    /**
     * Filter, which CashierMovement to fetch.
     */
    where: CashierMovementWhereUniqueInput
  }

  /**
   * CashierMovement findUniqueOrThrow
   */
  export type CashierMovementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashierMovement
     */
    select?: CashierMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CashierMovement
     */
    omit?: CashierMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashierMovementInclude<ExtArgs> | null
    /**
     * Filter, which CashierMovement to fetch.
     */
    where: CashierMovementWhereUniqueInput
  }

  /**
   * CashierMovement findFirst
   */
  export type CashierMovementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashierMovement
     */
    select?: CashierMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CashierMovement
     */
    omit?: CashierMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashierMovementInclude<ExtArgs> | null
    /**
     * Filter, which CashierMovement to fetch.
     */
    where?: CashierMovementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CashierMovements to fetch.
     */
    orderBy?: CashierMovementOrderByWithRelationInput | CashierMovementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CashierMovements.
     */
    cursor?: CashierMovementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CashierMovements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CashierMovements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CashierMovements.
     */
    distinct?: CashierMovementScalarFieldEnum | CashierMovementScalarFieldEnum[]
  }

  /**
   * CashierMovement findFirstOrThrow
   */
  export type CashierMovementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashierMovement
     */
    select?: CashierMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CashierMovement
     */
    omit?: CashierMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashierMovementInclude<ExtArgs> | null
    /**
     * Filter, which CashierMovement to fetch.
     */
    where?: CashierMovementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CashierMovements to fetch.
     */
    orderBy?: CashierMovementOrderByWithRelationInput | CashierMovementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CashierMovements.
     */
    cursor?: CashierMovementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CashierMovements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CashierMovements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CashierMovements.
     */
    distinct?: CashierMovementScalarFieldEnum | CashierMovementScalarFieldEnum[]
  }

  /**
   * CashierMovement findMany
   */
  export type CashierMovementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashierMovement
     */
    select?: CashierMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CashierMovement
     */
    omit?: CashierMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashierMovementInclude<ExtArgs> | null
    /**
     * Filter, which CashierMovements to fetch.
     */
    where?: CashierMovementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CashierMovements to fetch.
     */
    orderBy?: CashierMovementOrderByWithRelationInput | CashierMovementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CashierMovements.
     */
    cursor?: CashierMovementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CashierMovements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CashierMovements.
     */
    skip?: number
    distinct?: CashierMovementScalarFieldEnum | CashierMovementScalarFieldEnum[]
  }

  /**
   * CashierMovement create
   */
  export type CashierMovementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashierMovement
     */
    select?: CashierMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CashierMovement
     */
    omit?: CashierMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashierMovementInclude<ExtArgs> | null
    /**
     * The data needed to create a CashierMovement.
     */
    data: XOR<CashierMovementCreateInput, CashierMovementUncheckedCreateInput>
  }

  /**
   * CashierMovement createMany
   */
  export type CashierMovementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CashierMovements.
     */
    data: CashierMovementCreateManyInput | CashierMovementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CashierMovement createManyAndReturn
   */
  export type CashierMovementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashierMovement
     */
    select?: CashierMovementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CashierMovement
     */
    omit?: CashierMovementOmit<ExtArgs> | null
    /**
     * The data used to create many CashierMovements.
     */
    data: CashierMovementCreateManyInput | CashierMovementCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashierMovementIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CashierMovement update
   */
  export type CashierMovementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashierMovement
     */
    select?: CashierMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CashierMovement
     */
    omit?: CashierMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashierMovementInclude<ExtArgs> | null
    /**
     * The data needed to update a CashierMovement.
     */
    data: XOR<CashierMovementUpdateInput, CashierMovementUncheckedUpdateInput>
    /**
     * Choose, which CashierMovement to update.
     */
    where: CashierMovementWhereUniqueInput
  }

  /**
   * CashierMovement updateMany
   */
  export type CashierMovementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CashierMovements.
     */
    data: XOR<CashierMovementUpdateManyMutationInput, CashierMovementUncheckedUpdateManyInput>
    /**
     * Filter which CashierMovements to update
     */
    where?: CashierMovementWhereInput
    /**
     * Limit how many CashierMovements to update.
     */
    limit?: number
  }

  /**
   * CashierMovement updateManyAndReturn
   */
  export type CashierMovementUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashierMovement
     */
    select?: CashierMovementSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CashierMovement
     */
    omit?: CashierMovementOmit<ExtArgs> | null
    /**
     * The data used to update CashierMovements.
     */
    data: XOR<CashierMovementUpdateManyMutationInput, CashierMovementUncheckedUpdateManyInput>
    /**
     * Filter which CashierMovements to update
     */
    where?: CashierMovementWhereInput
    /**
     * Limit how many CashierMovements to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashierMovementIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CashierMovement upsert
   */
  export type CashierMovementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashierMovement
     */
    select?: CashierMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CashierMovement
     */
    omit?: CashierMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashierMovementInclude<ExtArgs> | null
    /**
     * The filter to search for the CashierMovement to update in case it exists.
     */
    where: CashierMovementWhereUniqueInput
    /**
     * In case the CashierMovement found by the `where` argument doesn't exist, create a new CashierMovement with this data.
     */
    create: XOR<CashierMovementCreateInput, CashierMovementUncheckedCreateInput>
    /**
     * In case the CashierMovement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CashierMovementUpdateInput, CashierMovementUncheckedUpdateInput>
  }

  /**
   * CashierMovement delete
   */
  export type CashierMovementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashierMovement
     */
    select?: CashierMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CashierMovement
     */
    omit?: CashierMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashierMovementInclude<ExtArgs> | null
    /**
     * Filter which CashierMovement to delete.
     */
    where: CashierMovementWhereUniqueInput
  }

  /**
   * CashierMovement deleteMany
   */
  export type CashierMovementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CashierMovements to delete
     */
    where?: CashierMovementWhereInput
    /**
     * Limit how many CashierMovements to delete.
     */
    limit?: number
  }

  /**
   * CashierMovement without action
   */
  export type CashierMovementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashierMovement
     */
    select?: CashierMovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CashierMovement
     */
    omit?: CashierMovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashierMovementInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CompanyScalarFieldEnum: {
    uuid: 'uuid',
    name: 'name',
    menuTheme: 'menuTheme',
    soundOnOrderReady: 'soundOnOrderReady',
    createdAt: 'createdAt'
  };

  export type CompanyScalarFieldEnum = (typeof CompanyScalarFieldEnum)[keyof typeof CompanyScalarFieldEnum]


  export const UserScalarFieldEnum: {
    uuid: 'uuid',
    email: 'email',
    passwordHash: 'passwordHash',
    name: 'name',
    role: 'role',
    companyUuid: 'companyUuid',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const UserGroupScalarFieldEnum: {
    uuid: 'uuid',
    name: 'name',
    permissions: 'permissions',
    companyUuid: 'companyUuid',
    createdAt: 'createdAt'
  };

  export type UserGroupScalarFieldEnum = (typeof UserGroupScalarFieldEnum)[keyof typeof UserGroupScalarFieldEnum]


  export const UserGroupMemberScalarFieldEnum: {
    userUuid: 'userUuid',
    groupUuid: 'groupUuid'
  };

  export type UserGroupMemberScalarFieldEnum = (typeof UserGroupMemberScalarFieldEnum)[keyof typeof UserGroupMemberScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    uuid: 'uuid',
    name: 'name',
    price: 'price',
    active: 'active',
    description: 'description',
    categoryUuid: 'categoryUuid',
    companyUuid: 'companyUuid'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    uuid: 'uuid',
    name: 'name',
    companyUuid: 'companyUuid'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const TableScalarFieldEnum: {
    uuid: 'uuid',
    number: 'number',
    qrCode: 'qrCode',
    description: 'description',
    companyUuid: 'companyUuid'
  };

  export type TableScalarFieldEnum = (typeof TableScalarFieldEnum)[keyof typeof TableScalarFieldEnum]


  export const OrderScalarFieldEnum: {
    uuid: 'uuid',
    tableUuid: 'tableUuid',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum]


  export const OrderItemScalarFieldEnum: {
    uuid: 'uuid',
    orderUuid: 'orderUuid',
    productUuid: 'productUuid',
    quantity: 'quantity',
    unitPrice: 'unitPrice'
  };

  export type OrderItemScalarFieldEnum = (typeof OrderItemScalarFieldEnum)[keyof typeof OrderItemScalarFieldEnum]


  export const CashierSessionScalarFieldEnum: {
    uuid: 'uuid',
    companyUuid: 'companyUuid',
    openedAt: 'openedAt',
    closedAt: 'closedAt',
    openingBalance: 'openingBalance',
    closingBalance: 'closingBalance',
    status: 'status'
  };

  export type CashierSessionScalarFieldEnum = (typeof CashierSessionScalarFieldEnum)[keyof typeof CashierSessionScalarFieldEnum]


  export const CashierMovementScalarFieldEnum: {
    uuid: 'uuid',
    sessionUuid: 'sessionUuid',
    type: 'type',
    amount: 'amount',
    description: 'description',
    createdAt: 'createdAt'
  };

  export type CashierMovementScalarFieldEnum = (typeof CashierMovementScalarFieldEnum)[keyof typeof CashierMovementScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type CompanyWhereInput = {
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    uuid?: StringFilter<"Company"> | string
    name?: StringFilter<"Company"> | string
    menuTheme?: StringNullableFilter<"Company"> | string | null
    soundOnOrderReady?: BoolFilter<"Company"> | boolean
    createdAt?: DateTimeFilter<"Company"> | Date | string
    users?: UserListRelationFilter
    userGroups?: UserGroupListRelationFilter
    tables?: TableListRelationFilter
    categories?: CategoryListRelationFilter
    products?: ProductListRelationFilter
    cashierSessions?: CashierSessionListRelationFilter
  }

  export type CompanyOrderByWithRelationInput = {
    uuid?: SortOrder
    name?: SortOrder
    menuTheme?: SortOrderInput | SortOrder
    soundOnOrderReady?: SortOrder
    createdAt?: SortOrder
    users?: UserOrderByRelationAggregateInput
    userGroups?: UserGroupOrderByRelationAggregateInput
    tables?: TableOrderByRelationAggregateInput
    categories?: CategoryOrderByRelationAggregateInput
    products?: ProductOrderByRelationAggregateInput
    cashierSessions?: CashierSessionOrderByRelationAggregateInput
  }

  export type CompanyWhereUniqueInput = Prisma.AtLeast<{
    uuid?: string
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    name?: StringFilter<"Company"> | string
    menuTheme?: StringNullableFilter<"Company"> | string | null
    soundOnOrderReady?: BoolFilter<"Company"> | boolean
    createdAt?: DateTimeFilter<"Company"> | Date | string
    users?: UserListRelationFilter
    userGroups?: UserGroupListRelationFilter
    tables?: TableListRelationFilter
    categories?: CategoryListRelationFilter
    products?: ProductListRelationFilter
    cashierSessions?: CashierSessionListRelationFilter
  }, "uuid">

  export type CompanyOrderByWithAggregationInput = {
    uuid?: SortOrder
    name?: SortOrder
    menuTheme?: SortOrderInput | SortOrder
    soundOnOrderReady?: SortOrder
    createdAt?: SortOrder
    _count?: CompanyCountOrderByAggregateInput
    _max?: CompanyMaxOrderByAggregateInput
    _min?: CompanyMinOrderByAggregateInput
  }

  export type CompanyScalarWhereWithAggregatesInput = {
    AND?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    OR?: CompanyScalarWhereWithAggregatesInput[]
    NOT?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    uuid?: StringWithAggregatesFilter<"Company"> | string
    name?: StringWithAggregatesFilter<"Company"> | string
    menuTheme?: StringNullableWithAggregatesFilter<"Company"> | string | null
    soundOnOrderReady?: BoolWithAggregatesFilter<"Company"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Company"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    uuid?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    companyUuid?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    groupMembers?: UserGroupMemberListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    uuid?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    role?: SortOrder
    companyUuid?: SortOrder
    createdAt?: SortOrder
    company?: CompanyOrderByWithRelationInput
    groupMembers?: UserGroupMemberOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    uuid?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    companyUuid?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    groupMembers?: UserGroupMemberListRelationFilter
  }, "uuid" | "email">

  export type UserOrderByWithAggregationInput = {
    uuid?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    role?: SortOrder
    companyUuid?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    uuid?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    companyUuid?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type UserGroupWhereInput = {
    AND?: UserGroupWhereInput | UserGroupWhereInput[]
    OR?: UserGroupWhereInput[]
    NOT?: UserGroupWhereInput | UserGroupWhereInput[]
    uuid?: StringFilter<"UserGroup"> | string
    name?: StringFilter<"UserGroup"> | string
    permissions?: StringNullableListFilter<"UserGroup">
    companyUuid?: StringFilter<"UserGroup"> | string
    createdAt?: DateTimeFilter<"UserGroup"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    members?: UserGroupMemberListRelationFilter
  }

  export type UserGroupOrderByWithRelationInput = {
    uuid?: SortOrder
    name?: SortOrder
    permissions?: SortOrder
    companyUuid?: SortOrder
    createdAt?: SortOrder
    company?: CompanyOrderByWithRelationInput
    members?: UserGroupMemberOrderByRelationAggregateInput
  }

  export type UserGroupWhereUniqueInput = Prisma.AtLeast<{
    uuid?: string
    AND?: UserGroupWhereInput | UserGroupWhereInput[]
    OR?: UserGroupWhereInput[]
    NOT?: UserGroupWhereInput | UserGroupWhereInput[]
    name?: StringFilter<"UserGroup"> | string
    permissions?: StringNullableListFilter<"UserGroup">
    companyUuid?: StringFilter<"UserGroup"> | string
    createdAt?: DateTimeFilter<"UserGroup"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    members?: UserGroupMemberListRelationFilter
  }, "uuid">

  export type UserGroupOrderByWithAggregationInput = {
    uuid?: SortOrder
    name?: SortOrder
    permissions?: SortOrder
    companyUuid?: SortOrder
    createdAt?: SortOrder
    _count?: UserGroupCountOrderByAggregateInput
    _max?: UserGroupMaxOrderByAggregateInput
    _min?: UserGroupMinOrderByAggregateInput
  }

  export type UserGroupScalarWhereWithAggregatesInput = {
    AND?: UserGroupScalarWhereWithAggregatesInput | UserGroupScalarWhereWithAggregatesInput[]
    OR?: UserGroupScalarWhereWithAggregatesInput[]
    NOT?: UserGroupScalarWhereWithAggregatesInput | UserGroupScalarWhereWithAggregatesInput[]
    uuid?: StringWithAggregatesFilter<"UserGroup"> | string
    name?: StringWithAggregatesFilter<"UserGroup"> | string
    permissions?: StringNullableListFilter<"UserGroup">
    companyUuid?: StringWithAggregatesFilter<"UserGroup"> | string
    createdAt?: DateTimeWithAggregatesFilter<"UserGroup"> | Date | string
  }

  export type UserGroupMemberWhereInput = {
    AND?: UserGroupMemberWhereInput | UserGroupMemberWhereInput[]
    OR?: UserGroupMemberWhereInput[]
    NOT?: UserGroupMemberWhereInput | UserGroupMemberWhereInput[]
    userUuid?: StringFilter<"UserGroupMember"> | string
    groupUuid?: StringFilter<"UserGroupMember"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    group?: XOR<UserGroupScalarRelationFilter, UserGroupWhereInput>
  }

  export type UserGroupMemberOrderByWithRelationInput = {
    userUuid?: SortOrder
    groupUuid?: SortOrder
    user?: UserOrderByWithRelationInput
    group?: UserGroupOrderByWithRelationInput
  }

  export type UserGroupMemberWhereUniqueInput = Prisma.AtLeast<{
    userUuid_groupUuid?: UserGroupMemberUserUuidGroupUuidCompoundUniqueInput
    AND?: UserGroupMemberWhereInput | UserGroupMemberWhereInput[]
    OR?: UserGroupMemberWhereInput[]
    NOT?: UserGroupMemberWhereInput | UserGroupMemberWhereInput[]
    userUuid?: StringFilter<"UserGroupMember"> | string
    groupUuid?: StringFilter<"UserGroupMember"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    group?: XOR<UserGroupScalarRelationFilter, UserGroupWhereInput>
  }, "userUuid_groupUuid">

  export type UserGroupMemberOrderByWithAggregationInput = {
    userUuid?: SortOrder
    groupUuid?: SortOrder
    _count?: UserGroupMemberCountOrderByAggregateInput
    _max?: UserGroupMemberMaxOrderByAggregateInput
    _min?: UserGroupMemberMinOrderByAggregateInput
  }

  export type UserGroupMemberScalarWhereWithAggregatesInput = {
    AND?: UserGroupMemberScalarWhereWithAggregatesInput | UserGroupMemberScalarWhereWithAggregatesInput[]
    OR?: UserGroupMemberScalarWhereWithAggregatesInput[]
    NOT?: UserGroupMemberScalarWhereWithAggregatesInput | UserGroupMemberScalarWhereWithAggregatesInput[]
    userUuid?: StringWithAggregatesFilter<"UserGroupMember"> | string
    groupUuid?: StringWithAggregatesFilter<"UserGroupMember"> | string
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    uuid?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    price?: FloatFilter<"Product"> | number
    active?: BoolFilter<"Product"> | boolean
    description?: StringFilter<"Product"> | string
    categoryUuid?: StringFilter<"Product"> | string
    companyUuid?: StringFilter<"Product"> | string
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    orderItems?: OrderItemListRelationFilter
  }

  export type ProductOrderByWithRelationInput = {
    uuid?: SortOrder
    name?: SortOrder
    price?: SortOrder
    active?: SortOrder
    description?: SortOrder
    categoryUuid?: SortOrder
    companyUuid?: SortOrder
    category?: CategoryOrderByWithRelationInput
    company?: CompanyOrderByWithRelationInput
    orderItems?: OrderItemOrderByRelationAggregateInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    uuid?: string
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    name?: StringFilter<"Product"> | string
    price?: FloatFilter<"Product"> | number
    active?: BoolFilter<"Product"> | boolean
    description?: StringFilter<"Product"> | string
    categoryUuid?: StringFilter<"Product"> | string
    companyUuid?: StringFilter<"Product"> | string
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    orderItems?: OrderItemListRelationFilter
  }, "uuid">

  export type ProductOrderByWithAggregationInput = {
    uuid?: SortOrder
    name?: SortOrder
    price?: SortOrder
    active?: SortOrder
    description?: SortOrder
    categoryUuid?: SortOrder
    companyUuid?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    uuid?: StringWithAggregatesFilter<"Product"> | string
    name?: StringWithAggregatesFilter<"Product"> | string
    price?: FloatWithAggregatesFilter<"Product"> | number
    active?: BoolWithAggregatesFilter<"Product"> | boolean
    description?: StringWithAggregatesFilter<"Product"> | string
    categoryUuid?: StringWithAggregatesFilter<"Product"> | string
    companyUuid?: StringWithAggregatesFilter<"Product"> | string
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    uuid?: StringFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    companyUuid?: StringFilter<"Category"> | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    products?: ProductListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    uuid?: SortOrder
    name?: SortOrder
    companyUuid?: SortOrder
    company?: CompanyOrderByWithRelationInput
    products?: ProductOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    uuid?: string
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    name?: StringFilter<"Category"> | string
    companyUuid?: StringFilter<"Category"> | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    products?: ProductListRelationFilter
  }, "uuid">

  export type CategoryOrderByWithAggregationInput = {
    uuid?: SortOrder
    name?: SortOrder
    companyUuid?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    uuid?: StringWithAggregatesFilter<"Category"> | string
    name?: StringWithAggregatesFilter<"Category"> | string
    companyUuid?: StringWithAggregatesFilter<"Category"> | string
  }

  export type TableWhereInput = {
    AND?: TableWhereInput | TableWhereInput[]
    OR?: TableWhereInput[]
    NOT?: TableWhereInput | TableWhereInput[]
    uuid?: StringFilter<"Table"> | string
    number?: IntFilter<"Table"> | number
    qrCode?: StringFilter<"Table"> | string
    description?: StringFilter<"Table"> | string
    companyUuid?: StringFilter<"Table"> | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    orders?: OrderListRelationFilter
  }

  export type TableOrderByWithRelationInput = {
    uuid?: SortOrder
    number?: SortOrder
    qrCode?: SortOrder
    description?: SortOrder
    companyUuid?: SortOrder
    company?: CompanyOrderByWithRelationInput
    orders?: OrderOrderByRelationAggregateInput
  }

  export type TableWhereUniqueInput = Prisma.AtLeast<{
    uuid?: string
    companyUuid_number?: TableCompanyUuidNumberCompoundUniqueInput
    AND?: TableWhereInput | TableWhereInput[]
    OR?: TableWhereInput[]
    NOT?: TableWhereInput | TableWhereInput[]
    number?: IntFilter<"Table"> | number
    qrCode?: StringFilter<"Table"> | string
    description?: StringFilter<"Table"> | string
    companyUuid?: StringFilter<"Table"> | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    orders?: OrderListRelationFilter
  }, "uuid" | "companyUuid_number">

  export type TableOrderByWithAggregationInput = {
    uuid?: SortOrder
    number?: SortOrder
    qrCode?: SortOrder
    description?: SortOrder
    companyUuid?: SortOrder
    _count?: TableCountOrderByAggregateInput
    _avg?: TableAvgOrderByAggregateInput
    _max?: TableMaxOrderByAggregateInput
    _min?: TableMinOrderByAggregateInput
    _sum?: TableSumOrderByAggregateInput
  }

  export type TableScalarWhereWithAggregatesInput = {
    AND?: TableScalarWhereWithAggregatesInput | TableScalarWhereWithAggregatesInput[]
    OR?: TableScalarWhereWithAggregatesInput[]
    NOT?: TableScalarWhereWithAggregatesInput | TableScalarWhereWithAggregatesInput[]
    uuid?: StringWithAggregatesFilter<"Table"> | string
    number?: IntWithAggregatesFilter<"Table"> | number
    qrCode?: StringWithAggregatesFilter<"Table"> | string
    description?: StringWithAggregatesFilter<"Table"> | string
    companyUuid?: StringWithAggregatesFilter<"Table"> | string
  }

  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    uuid?: StringFilter<"Order"> | string
    tableUuid?: StringFilter<"Order"> | string
    status?: StringFilter<"Order"> | string
    createdAt?: DateTimeFilter<"Order"> | Date | string
    table?: XOR<TableScalarRelationFilter, TableWhereInput>
    items?: OrderItemListRelationFilter
  }

  export type OrderOrderByWithRelationInput = {
    uuid?: SortOrder
    tableUuid?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    table?: TableOrderByWithRelationInput
    items?: OrderItemOrderByRelationAggregateInput
  }

  export type OrderWhereUniqueInput = Prisma.AtLeast<{
    uuid?: string
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    tableUuid?: StringFilter<"Order"> | string
    status?: StringFilter<"Order"> | string
    createdAt?: DateTimeFilter<"Order"> | Date | string
    table?: XOR<TableScalarRelationFilter, TableWhereInput>
    items?: OrderItemListRelationFilter
  }, "uuid">

  export type OrderOrderByWithAggregationInput = {
    uuid?: SortOrder
    tableUuid?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: OrderCountOrderByAggregateInput
    _max?: OrderMaxOrderByAggregateInput
    _min?: OrderMinOrderByAggregateInput
  }

  export type OrderScalarWhereWithAggregatesInput = {
    AND?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    OR?: OrderScalarWhereWithAggregatesInput[]
    NOT?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    uuid?: StringWithAggregatesFilter<"Order"> | string
    tableUuid?: StringWithAggregatesFilter<"Order"> | string
    status?: StringWithAggregatesFilter<"Order"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
  }

  export type OrderItemWhereInput = {
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    uuid?: StringFilter<"OrderItem"> | string
    orderUuid?: StringFilter<"OrderItem"> | string
    productUuid?: StringFilter<"OrderItem"> | string
    quantity?: IntFilter<"OrderItem"> | number
    unitPrice?: FloatFilter<"OrderItem"> | number
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }

  export type OrderItemOrderByWithRelationInput = {
    uuid?: SortOrder
    orderUuid?: SortOrder
    productUuid?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    order?: OrderOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
  }

  export type OrderItemWhereUniqueInput = Prisma.AtLeast<{
    uuid?: string
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    orderUuid?: StringFilter<"OrderItem"> | string
    productUuid?: StringFilter<"OrderItem"> | string
    quantity?: IntFilter<"OrderItem"> | number
    unitPrice?: FloatFilter<"OrderItem"> | number
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }, "uuid">

  export type OrderItemOrderByWithAggregationInput = {
    uuid?: SortOrder
    orderUuid?: SortOrder
    productUuid?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    _count?: OrderItemCountOrderByAggregateInput
    _avg?: OrderItemAvgOrderByAggregateInput
    _max?: OrderItemMaxOrderByAggregateInput
    _min?: OrderItemMinOrderByAggregateInput
    _sum?: OrderItemSumOrderByAggregateInput
  }

  export type OrderItemScalarWhereWithAggregatesInput = {
    AND?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    OR?: OrderItemScalarWhereWithAggregatesInput[]
    NOT?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    uuid?: StringWithAggregatesFilter<"OrderItem"> | string
    orderUuid?: StringWithAggregatesFilter<"OrderItem"> | string
    productUuid?: StringWithAggregatesFilter<"OrderItem"> | string
    quantity?: IntWithAggregatesFilter<"OrderItem"> | number
    unitPrice?: FloatWithAggregatesFilter<"OrderItem"> | number
  }

  export type CashierSessionWhereInput = {
    AND?: CashierSessionWhereInput | CashierSessionWhereInput[]
    OR?: CashierSessionWhereInput[]
    NOT?: CashierSessionWhereInput | CashierSessionWhereInput[]
    uuid?: StringFilter<"CashierSession"> | string
    companyUuid?: StringFilter<"CashierSession"> | string
    openedAt?: DateTimeFilter<"CashierSession"> | Date | string
    closedAt?: DateTimeNullableFilter<"CashierSession"> | Date | string | null
    openingBalance?: FloatFilter<"CashierSession"> | number
    closingBalance?: FloatNullableFilter<"CashierSession"> | number | null
    status?: StringFilter<"CashierSession"> | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    movements?: CashierMovementListRelationFilter
  }

  export type CashierSessionOrderByWithRelationInput = {
    uuid?: SortOrder
    companyUuid?: SortOrder
    openedAt?: SortOrder
    closedAt?: SortOrderInput | SortOrder
    openingBalance?: SortOrder
    closingBalance?: SortOrderInput | SortOrder
    status?: SortOrder
    company?: CompanyOrderByWithRelationInput
    movements?: CashierMovementOrderByRelationAggregateInput
  }

  export type CashierSessionWhereUniqueInput = Prisma.AtLeast<{
    uuid?: string
    AND?: CashierSessionWhereInput | CashierSessionWhereInput[]
    OR?: CashierSessionWhereInput[]
    NOT?: CashierSessionWhereInput | CashierSessionWhereInput[]
    companyUuid?: StringFilter<"CashierSession"> | string
    openedAt?: DateTimeFilter<"CashierSession"> | Date | string
    closedAt?: DateTimeNullableFilter<"CashierSession"> | Date | string | null
    openingBalance?: FloatFilter<"CashierSession"> | number
    closingBalance?: FloatNullableFilter<"CashierSession"> | number | null
    status?: StringFilter<"CashierSession"> | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    movements?: CashierMovementListRelationFilter
  }, "uuid">

  export type CashierSessionOrderByWithAggregationInput = {
    uuid?: SortOrder
    companyUuid?: SortOrder
    openedAt?: SortOrder
    closedAt?: SortOrderInput | SortOrder
    openingBalance?: SortOrder
    closingBalance?: SortOrderInput | SortOrder
    status?: SortOrder
    _count?: CashierSessionCountOrderByAggregateInput
    _avg?: CashierSessionAvgOrderByAggregateInput
    _max?: CashierSessionMaxOrderByAggregateInput
    _min?: CashierSessionMinOrderByAggregateInput
    _sum?: CashierSessionSumOrderByAggregateInput
  }

  export type CashierSessionScalarWhereWithAggregatesInput = {
    AND?: CashierSessionScalarWhereWithAggregatesInput | CashierSessionScalarWhereWithAggregatesInput[]
    OR?: CashierSessionScalarWhereWithAggregatesInput[]
    NOT?: CashierSessionScalarWhereWithAggregatesInput | CashierSessionScalarWhereWithAggregatesInput[]
    uuid?: StringWithAggregatesFilter<"CashierSession"> | string
    companyUuid?: StringWithAggregatesFilter<"CashierSession"> | string
    openedAt?: DateTimeWithAggregatesFilter<"CashierSession"> | Date | string
    closedAt?: DateTimeNullableWithAggregatesFilter<"CashierSession"> | Date | string | null
    openingBalance?: FloatWithAggregatesFilter<"CashierSession"> | number
    closingBalance?: FloatNullableWithAggregatesFilter<"CashierSession"> | number | null
    status?: StringWithAggregatesFilter<"CashierSession"> | string
  }

  export type CashierMovementWhereInput = {
    AND?: CashierMovementWhereInput | CashierMovementWhereInput[]
    OR?: CashierMovementWhereInput[]
    NOT?: CashierMovementWhereInput | CashierMovementWhereInput[]
    uuid?: StringFilter<"CashierMovement"> | string
    sessionUuid?: StringFilter<"CashierMovement"> | string
    type?: StringFilter<"CashierMovement"> | string
    amount?: FloatFilter<"CashierMovement"> | number
    description?: StringNullableFilter<"CashierMovement"> | string | null
    createdAt?: DateTimeFilter<"CashierMovement"> | Date | string
    session?: XOR<CashierSessionScalarRelationFilter, CashierSessionWhereInput>
  }

  export type CashierMovementOrderByWithRelationInput = {
    uuid?: SortOrder
    sessionUuid?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    session?: CashierSessionOrderByWithRelationInput
  }

  export type CashierMovementWhereUniqueInput = Prisma.AtLeast<{
    uuid?: string
    AND?: CashierMovementWhereInput | CashierMovementWhereInput[]
    OR?: CashierMovementWhereInput[]
    NOT?: CashierMovementWhereInput | CashierMovementWhereInput[]
    sessionUuid?: StringFilter<"CashierMovement"> | string
    type?: StringFilter<"CashierMovement"> | string
    amount?: FloatFilter<"CashierMovement"> | number
    description?: StringNullableFilter<"CashierMovement"> | string | null
    createdAt?: DateTimeFilter<"CashierMovement"> | Date | string
    session?: XOR<CashierSessionScalarRelationFilter, CashierSessionWhereInput>
  }, "uuid">

  export type CashierMovementOrderByWithAggregationInput = {
    uuid?: SortOrder
    sessionUuid?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: CashierMovementCountOrderByAggregateInput
    _avg?: CashierMovementAvgOrderByAggregateInput
    _max?: CashierMovementMaxOrderByAggregateInput
    _min?: CashierMovementMinOrderByAggregateInput
    _sum?: CashierMovementSumOrderByAggregateInput
  }

  export type CashierMovementScalarWhereWithAggregatesInput = {
    AND?: CashierMovementScalarWhereWithAggregatesInput | CashierMovementScalarWhereWithAggregatesInput[]
    OR?: CashierMovementScalarWhereWithAggregatesInput[]
    NOT?: CashierMovementScalarWhereWithAggregatesInput | CashierMovementScalarWhereWithAggregatesInput[]
    uuid?: StringWithAggregatesFilter<"CashierMovement"> | string
    sessionUuid?: StringWithAggregatesFilter<"CashierMovement"> | string
    type?: StringWithAggregatesFilter<"CashierMovement"> | string
    amount?: FloatWithAggregatesFilter<"CashierMovement"> | number
    description?: StringNullableWithAggregatesFilter<"CashierMovement"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CashierMovement"> | Date | string
  }

  export type CompanyCreateInput = {
    uuid?: string
    name: string
    menuTheme?: string | null
    soundOnOrderReady?: boolean
    createdAt?: Date | string
    users?: UserCreateNestedManyWithoutCompanyInput
    userGroups?: UserGroupCreateNestedManyWithoutCompanyInput
    tables?: TableCreateNestedManyWithoutCompanyInput
    categories?: CategoryCreateNestedManyWithoutCompanyInput
    products?: ProductCreateNestedManyWithoutCompanyInput
    cashierSessions?: CashierSessionCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateInput = {
    uuid?: string
    name: string
    menuTheme?: string | null
    soundOnOrderReady?: boolean
    createdAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCompanyInput
    userGroups?: UserGroupUncheckedCreateNestedManyWithoutCompanyInput
    tables?: TableUncheckedCreateNestedManyWithoutCompanyInput
    categories?: CategoryUncheckedCreateNestedManyWithoutCompanyInput
    products?: ProductUncheckedCreateNestedManyWithoutCompanyInput
    cashierSessions?: CashierSessionUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUpdateInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    menuTheme?: NullableStringFieldUpdateOperationsInput | string | null
    soundOnOrderReady?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCompanyNestedInput
    userGroups?: UserGroupUpdateManyWithoutCompanyNestedInput
    tables?: TableUpdateManyWithoutCompanyNestedInput
    categories?: CategoryUpdateManyWithoutCompanyNestedInput
    products?: ProductUpdateManyWithoutCompanyNestedInput
    cashierSessions?: CashierSessionUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    menuTheme?: NullableStringFieldUpdateOperationsInput | string | null
    soundOnOrderReady?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCompanyNestedInput
    userGroups?: UserGroupUncheckedUpdateManyWithoutCompanyNestedInput
    tables?: TableUncheckedUpdateManyWithoutCompanyNestedInput
    categories?: CategoryUncheckedUpdateManyWithoutCompanyNestedInput
    products?: ProductUncheckedUpdateManyWithoutCompanyNestedInput
    cashierSessions?: CashierSessionUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCreateManyInput = {
    uuid?: string
    name: string
    menuTheme?: string | null
    soundOnOrderReady?: boolean
    createdAt?: Date | string
  }

  export type CompanyUpdateManyMutationInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    menuTheme?: NullableStringFieldUpdateOperationsInput | string | null
    soundOnOrderReady?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyUncheckedUpdateManyInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    menuTheme?: NullableStringFieldUpdateOperationsInput | string | null
    soundOnOrderReady?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    uuid?: string
    email: string
    passwordHash: string
    name: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    company: CompanyCreateNestedOneWithoutUsersInput
    groupMembers?: UserGroupMemberCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    uuid?: string
    email: string
    passwordHash: string
    name: string
    role?: $Enums.UserRole
    companyUuid: string
    createdAt?: Date | string
    groupMembers?: UserGroupMemberUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutUsersNestedInput
    groupMembers?: UserGroupMemberUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    companyUuid?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupMembers?: UserGroupMemberUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    uuid?: string
    email: string
    passwordHash: string
    name: string
    role?: $Enums.UserRole
    companyUuid: string
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    companyUuid?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserGroupCreateInput = {
    uuid?: string
    name: string
    permissions?: UserGroupCreatepermissionsInput | string[]
    createdAt?: Date | string
    company: CompanyCreateNestedOneWithoutUserGroupsInput
    members?: UserGroupMemberCreateNestedManyWithoutGroupInput
  }

  export type UserGroupUncheckedCreateInput = {
    uuid?: string
    name: string
    permissions?: UserGroupCreatepermissionsInput | string[]
    companyUuid: string
    createdAt?: Date | string
    members?: UserGroupMemberUncheckedCreateNestedManyWithoutGroupInput
  }

  export type UserGroupUpdateInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    permissions?: UserGroupUpdatepermissionsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutUserGroupsNestedInput
    members?: UserGroupMemberUpdateManyWithoutGroupNestedInput
  }

  export type UserGroupUncheckedUpdateInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    permissions?: UserGroupUpdatepermissionsInput | string[]
    companyUuid?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: UserGroupMemberUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type UserGroupCreateManyInput = {
    uuid?: string
    name: string
    permissions?: UserGroupCreatepermissionsInput | string[]
    companyUuid: string
    createdAt?: Date | string
  }

  export type UserGroupUpdateManyMutationInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    permissions?: UserGroupUpdatepermissionsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserGroupUncheckedUpdateManyInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    permissions?: UserGroupUpdatepermissionsInput | string[]
    companyUuid?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserGroupMemberCreateInput = {
    user: UserCreateNestedOneWithoutGroupMembersInput
    group: UserGroupCreateNestedOneWithoutMembersInput
  }

  export type UserGroupMemberUncheckedCreateInput = {
    userUuid: string
    groupUuid: string
  }

  export type UserGroupMemberUpdateInput = {
    user?: UserUpdateOneRequiredWithoutGroupMembersNestedInput
    group?: UserGroupUpdateOneRequiredWithoutMembersNestedInput
  }

  export type UserGroupMemberUncheckedUpdateInput = {
    userUuid?: StringFieldUpdateOperationsInput | string
    groupUuid?: StringFieldUpdateOperationsInput | string
  }

  export type UserGroupMemberCreateManyInput = {
    userUuid: string
    groupUuid: string
  }

  export type UserGroupMemberUpdateManyMutationInput = {

  }

  export type UserGroupMemberUncheckedUpdateManyInput = {
    userUuid?: StringFieldUpdateOperationsInput | string
    groupUuid?: StringFieldUpdateOperationsInput | string
  }

  export type ProductCreateInput = {
    uuid?: string
    name: string
    price: number
    active?: boolean
    description: string
    category: CategoryCreateNestedOneWithoutProductsInput
    company: CompanyCreateNestedOneWithoutProductsInput
    orderItems?: OrderItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateInput = {
    uuid?: string
    name: string
    price: number
    active?: boolean
    description: string
    categoryUuid: string
    companyUuid: string
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    company?: CompanyUpdateOneRequiredWithoutProductsNestedInput
    orderItems?: OrderItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
    categoryUuid?: StringFieldUpdateOperationsInput | string
    companyUuid?: StringFieldUpdateOperationsInput | string
    orderItems?: OrderItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    uuid?: string
    name: string
    price: number
    active?: boolean
    description: string
    categoryUuid: string
    companyUuid: string
  }

  export type ProductUpdateManyMutationInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
  }

  export type ProductUncheckedUpdateManyInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
    categoryUuid?: StringFieldUpdateOperationsInput | string
    companyUuid?: StringFieldUpdateOperationsInput | string
  }

  export type CategoryCreateInput = {
    uuid?: string
    name: string
    company: CompanyCreateNestedOneWithoutCategoriesInput
    products?: ProductCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    uuid?: string
    name: string
    companyUuid: string
    products?: ProductUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    company?: CompanyUpdateOneRequiredWithoutCategoriesNestedInput
    products?: ProductUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    companyUuid?: StringFieldUpdateOperationsInput | string
    products?: ProductUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    uuid?: string
    name: string
    companyUuid: string
  }

  export type CategoryUpdateManyMutationInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    companyUuid?: StringFieldUpdateOperationsInput | string
  }

  export type TableCreateInput = {
    uuid?: string
    number: number
    qrCode?: string
    description?: string
    company: CompanyCreateNestedOneWithoutTablesInput
    orders?: OrderCreateNestedManyWithoutTableInput
  }

  export type TableUncheckedCreateInput = {
    uuid?: string
    number: number
    qrCode?: string
    description?: string
    companyUuid: string
    orders?: OrderUncheckedCreateNestedManyWithoutTableInput
  }

  export type TableUpdateInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    number?: IntFieldUpdateOperationsInput | number
    qrCode?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    company?: CompanyUpdateOneRequiredWithoutTablesNestedInput
    orders?: OrderUpdateManyWithoutTableNestedInput
  }

  export type TableUncheckedUpdateInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    number?: IntFieldUpdateOperationsInput | number
    qrCode?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    companyUuid?: StringFieldUpdateOperationsInput | string
    orders?: OrderUncheckedUpdateManyWithoutTableNestedInput
  }

  export type TableCreateManyInput = {
    uuid?: string
    number: number
    qrCode?: string
    description?: string
    companyUuid: string
  }

  export type TableUpdateManyMutationInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    number?: IntFieldUpdateOperationsInput | number
    qrCode?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type TableUncheckedUpdateManyInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    number?: IntFieldUpdateOperationsInput | number
    qrCode?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    companyUuid?: StringFieldUpdateOperationsInput | string
  }

  export type OrderCreateInput = {
    uuid?: string
    status?: string
    createdAt?: Date | string
    table: TableCreateNestedOneWithoutOrdersInput
    items?: OrderItemCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateInput = {
    uuid?: string
    tableUuid: string
    status?: string
    createdAt?: Date | string
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderUpdateInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    table?: TableUpdateOneRequiredWithoutOrdersNestedInput
    items?: OrderItemUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    tableUuid?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderCreateManyInput = {
    uuid?: string
    tableUuid: string
    status?: string
    createdAt?: Date | string
  }

  export type OrderUpdateManyMutationInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUncheckedUpdateManyInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    tableUuid?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemCreateInput = {
    uuid?: string
    quantity: number
    unitPrice: number
    order: OrderCreateNestedOneWithoutItemsInput
    product: ProductCreateNestedOneWithoutOrderItemsInput
  }

  export type OrderItemUncheckedCreateInput = {
    uuid?: string
    orderUuid: string
    productUuid: string
    quantity: number
    unitPrice: number
  }

  export type OrderItemUpdateInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput
    product?: ProductUpdateOneRequiredWithoutOrderItemsNestedInput
  }

  export type OrderItemUncheckedUpdateInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    orderUuid?: StringFieldUpdateOperationsInput | string
    productUuid?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
  }

  export type OrderItemCreateManyInput = {
    uuid?: string
    orderUuid: string
    productUuid: string
    quantity: number
    unitPrice: number
  }

  export type OrderItemUpdateManyMutationInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
  }

  export type OrderItemUncheckedUpdateManyInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    orderUuid?: StringFieldUpdateOperationsInput | string
    productUuid?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
  }

  export type CashierSessionCreateInput = {
    uuid?: string
    openedAt?: Date | string
    closedAt?: Date | string | null
    openingBalance?: number
    closingBalance?: number | null
    status?: string
    company: CompanyCreateNestedOneWithoutCashierSessionsInput
    movements?: CashierMovementCreateNestedManyWithoutSessionInput
  }

  export type CashierSessionUncheckedCreateInput = {
    uuid?: string
    companyUuid: string
    openedAt?: Date | string
    closedAt?: Date | string | null
    openingBalance?: number
    closingBalance?: number | null
    status?: string
    movements?: CashierMovementUncheckedCreateNestedManyWithoutSessionInput
  }

  export type CashierSessionUpdateInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    openingBalance?: FloatFieldUpdateOperationsInput | number
    closingBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    company?: CompanyUpdateOneRequiredWithoutCashierSessionsNestedInput
    movements?: CashierMovementUpdateManyWithoutSessionNestedInput
  }

  export type CashierSessionUncheckedUpdateInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    companyUuid?: StringFieldUpdateOperationsInput | string
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    openingBalance?: FloatFieldUpdateOperationsInput | number
    closingBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    movements?: CashierMovementUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type CashierSessionCreateManyInput = {
    uuid?: string
    companyUuid: string
    openedAt?: Date | string
    closedAt?: Date | string | null
    openingBalance?: number
    closingBalance?: number | null
    status?: string
  }

  export type CashierSessionUpdateManyMutationInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    openingBalance?: FloatFieldUpdateOperationsInput | number
    closingBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type CashierSessionUncheckedUpdateManyInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    companyUuid?: StringFieldUpdateOperationsInput | string
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    openingBalance?: FloatFieldUpdateOperationsInput | number
    closingBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type CashierMovementCreateInput = {
    uuid?: string
    type: string
    amount: number
    description?: string | null
    createdAt?: Date | string
    session: CashierSessionCreateNestedOneWithoutMovementsInput
  }

  export type CashierMovementUncheckedCreateInput = {
    uuid?: string
    sessionUuid: string
    type: string
    amount: number
    description?: string | null
    createdAt?: Date | string
  }

  export type CashierMovementUpdateInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: CashierSessionUpdateOneRequiredWithoutMovementsNestedInput
  }

  export type CashierMovementUncheckedUpdateInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    sessionUuid?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CashierMovementCreateManyInput = {
    uuid?: string
    sessionUuid: string
    type: string
    amount: number
    description?: string | null
    createdAt?: Date | string
  }

  export type CashierMovementUpdateManyMutationInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CashierMovementUncheckedUpdateManyInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    sessionUuid?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type UserGroupListRelationFilter = {
    every?: UserGroupWhereInput
    some?: UserGroupWhereInput
    none?: UserGroupWhereInput
  }

  export type TableListRelationFilter = {
    every?: TableWhereInput
    some?: TableWhereInput
    none?: TableWhereInput
  }

  export type CategoryListRelationFilter = {
    every?: CategoryWhereInput
    some?: CategoryWhereInput
    none?: CategoryWhereInput
  }

  export type ProductListRelationFilter = {
    every?: ProductWhereInput
    some?: ProductWhereInput
    none?: ProductWhereInput
  }

  export type CashierSessionListRelationFilter = {
    every?: CashierSessionWhereInput
    some?: CashierSessionWhereInput
    none?: CashierSessionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserGroupOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TableOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CashierSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CompanyCountOrderByAggregateInput = {
    uuid?: SortOrder
    name?: SortOrder
    menuTheme?: SortOrder
    soundOnOrderReady?: SortOrder
    createdAt?: SortOrder
  }

  export type CompanyMaxOrderByAggregateInput = {
    uuid?: SortOrder
    name?: SortOrder
    menuTheme?: SortOrder
    soundOnOrderReady?: SortOrder
    createdAt?: SortOrder
  }

  export type CompanyMinOrderByAggregateInput = {
    uuid?: SortOrder
    name?: SortOrder
    menuTheme?: SortOrder
    soundOnOrderReady?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type CompanyScalarRelationFilter = {
    is?: CompanyWhereInput
    isNot?: CompanyWhereInput
  }

  export type UserGroupMemberListRelationFilter = {
    every?: UserGroupMemberWhereInput
    some?: UserGroupMemberWhereInput
    none?: UserGroupMemberWhereInput
  }

  export type UserGroupMemberOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    uuid?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    role?: SortOrder
    companyUuid?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    uuid?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    role?: SortOrder
    companyUuid?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    uuid?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    role?: SortOrder
    companyUuid?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type UserGroupCountOrderByAggregateInput = {
    uuid?: SortOrder
    name?: SortOrder
    permissions?: SortOrder
    companyUuid?: SortOrder
    createdAt?: SortOrder
  }

  export type UserGroupMaxOrderByAggregateInput = {
    uuid?: SortOrder
    name?: SortOrder
    companyUuid?: SortOrder
    createdAt?: SortOrder
  }

  export type UserGroupMinOrderByAggregateInput = {
    uuid?: SortOrder
    name?: SortOrder
    companyUuid?: SortOrder
    createdAt?: SortOrder
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserGroupScalarRelationFilter = {
    is?: UserGroupWhereInput
    isNot?: UserGroupWhereInput
  }

  export type UserGroupMemberUserUuidGroupUuidCompoundUniqueInput = {
    userUuid: string
    groupUuid: string
  }

  export type UserGroupMemberCountOrderByAggregateInput = {
    userUuid?: SortOrder
    groupUuid?: SortOrder
  }

  export type UserGroupMemberMaxOrderByAggregateInput = {
    userUuid?: SortOrder
    groupUuid?: SortOrder
  }

  export type UserGroupMemberMinOrderByAggregateInput = {
    userUuid?: SortOrder
    groupUuid?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type CategoryScalarRelationFilter = {
    is?: CategoryWhereInput
    isNot?: CategoryWhereInput
  }

  export type OrderItemListRelationFilter = {
    every?: OrderItemWhereInput
    some?: OrderItemWhereInput
    none?: OrderItemWhereInput
  }

  export type OrderItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductCountOrderByAggregateInput = {
    uuid?: SortOrder
    name?: SortOrder
    price?: SortOrder
    active?: SortOrder
    description?: SortOrder
    categoryUuid?: SortOrder
    companyUuid?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    price?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    uuid?: SortOrder
    name?: SortOrder
    price?: SortOrder
    active?: SortOrder
    description?: SortOrder
    categoryUuid?: SortOrder
    companyUuid?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    uuid?: SortOrder
    name?: SortOrder
    price?: SortOrder
    active?: SortOrder
    description?: SortOrder
    categoryUuid?: SortOrder
    companyUuid?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    price?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type CategoryCountOrderByAggregateInput = {
    uuid?: SortOrder
    name?: SortOrder
    companyUuid?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    uuid?: SortOrder
    name?: SortOrder
    companyUuid?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    uuid?: SortOrder
    name?: SortOrder
    companyUuid?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type OrderListRelationFilter = {
    every?: OrderWhereInput
    some?: OrderWhereInput
    none?: OrderWhereInput
  }

  export type OrderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TableCompanyUuidNumberCompoundUniqueInput = {
    companyUuid: string
    number: number
  }

  export type TableCountOrderByAggregateInput = {
    uuid?: SortOrder
    number?: SortOrder
    qrCode?: SortOrder
    description?: SortOrder
    companyUuid?: SortOrder
  }

  export type TableAvgOrderByAggregateInput = {
    number?: SortOrder
  }

  export type TableMaxOrderByAggregateInput = {
    uuid?: SortOrder
    number?: SortOrder
    qrCode?: SortOrder
    description?: SortOrder
    companyUuid?: SortOrder
  }

  export type TableMinOrderByAggregateInput = {
    uuid?: SortOrder
    number?: SortOrder
    qrCode?: SortOrder
    description?: SortOrder
    companyUuid?: SortOrder
  }

  export type TableSumOrderByAggregateInput = {
    number?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type TableScalarRelationFilter = {
    is?: TableWhereInput
    isNot?: TableWhereInput
  }

  export type OrderCountOrderByAggregateInput = {
    uuid?: SortOrder
    tableUuid?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderMaxOrderByAggregateInput = {
    uuid?: SortOrder
    tableUuid?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderMinOrderByAggregateInput = {
    uuid?: SortOrder
    tableUuid?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderScalarRelationFilter = {
    is?: OrderWhereInput
    isNot?: OrderWhereInput
  }

  export type ProductScalarRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type OrderItemCountOrderByAggregateInput = {
    uuid?: SortOrder
    orderUuid?: SortOrder
    productUuid?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
  }

  export type OrderItemAvgOrderByAggregateInput = {
    quantity?: SortOrder
    unitPrice?: SortOrder
  }

  export type OrderItemMaxOrderByAggregateInput = {
    uuid?: SortOrder
    orderUuid?: SortOrder
    productUuid?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
  }

  export type OrderItemMinOrderByAggregateInput = {
    uuid?: SortOrder
    orderUuid?: SortOrder
    productUuid?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
  }

  export type OrderItemSumOrderByAggregateInput = {
    quantity?: SortOrder
    unitPrice?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type CashierMovementListRelationFilter = {
    every?: CashierMovementWhereInput
    some?: CashierMovementWhereInput
    none?: CashierMovementWhereInput
  }

  export type CashierMovementOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CashierSessionCountOrderByAggregateInput = {
    uuid?: SortOrder
    companyUuid?: SortOrder
    openedAt?: SortOrder
    closedAt?: SortOrder
    openingBalance?: SortOrder
    closingBalance?: SortOrder
    status?: SortOrder
  }

  export type CashierSessionAvgOrderByAggregateInput = {
    openingBalance?: SortOrder
    closingBalance?: SortOrder
  }

  export type CashierSessionMaxOrderByAggregateInput = {
    uuid?: SortOrder
    companyUuid?: SortOrder
    openedAt?: SortOrder
    closedAt?: SortOrder
    openingBalance?: SortOrder
    closingBalance?: SortOrder
    status?: SortOrder
  }

  export type CashierSessionMinOrderByAggregateInput = {
    uuid?: SortOrder
    companyUuid?: SortOrder
    openedAt?: SortOrder
    closedAt?: SortOrder
    openingBalance?: SortOrder
    closingBalance?: SortOrder
    status?: SortOrder
  }

  export type CashierSessionSumOrderByAggregateInput = {
    openingBalance?: SortOrder
    closingBalance?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type CashierSessionScalarRelationFilter = {
    is?: CashierSessionWhereInput
    isNot?: CashierSessionWhereInput
  }

  export type CashierMovementCountOrderByAggregateInput = {
    uuid?: SortOrder
    sessionUuid?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type CashierMovementAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type CashierMovementMaxOrderByAggregateInput = {
    uuid?: SortOrder
    sessionUuid?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type CashierMovementMinOrderByAggregateInput = {
    uuid?: SortOrder
    sessionUuid?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type CashierMovementSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type UserCreateNestedManyWithoutCompanyInput = {
    create?: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput> | UserCreateWithoutCompanyInput[] | UserUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCompanyInput | UserCreateOrConnectWithoutCompanyInput[]
    createMany?: UserCreateManyCompanyInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserGroupCreateNestedManyWithoutCompanyInput = {
    create?: XOR<UserGroupCreateWithoutCompanyInput, UserGroupUncheckedCreateWithoutCompanyInput> | UserGroupCreateWithoutCompanyInput[] | UserGroupUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserGroupCreateOrConnectWithoutCompanyInput | UserGroupCreateOrConnectWithoutCompanyInput[]
    createMany?: UserGroupCreateManyCompanyInputEnvelope
    connect?: UserGroupWhereUniqueInput | UserGroupWhereUniqueInput[]
  }

  export type TableCreateNestedManyWithoutCompanyInput = {
    create?: XOR<TableCreateWithoutCompanyInput, TableUncheckedCreateWithoutCompanyInput> | TableCreateWithoutCompanyInput[] | TableUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: TableCreateOrConnectWithoutCompanyInput | TableCreateOrConnectWithoutCompanyInput[]
    createMany?: TableCreateManyCompanyInputEnvelope
    connect?: TableWhereUniqueInput | TableWhereUniqueInput[]
  }

  export type CategoryCreateNestedManyWithoutCompanyInput = {
    create?: XOR<CategoryCreateWithoutCompanyInput, CategoryUncheckedCreateWithoutCompanyInput> | CategoryCreateWithoutCompanyInput[] | CategoryUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutCompanyInput | CategoryCreateOrConnectWithoutCompanyInput[]
    createMany?: CategoryCreateManyCompanyInputEnvelope
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type ProductCreateNestedManyWithoutCompanyInput = {
    create?: XOR<ProductCreateWithoutCompanyInput, ProductUncheckedCreateWithoutCompanyInput> | ProductCreateWithoutCompanyInput[] | ProductUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCompanyInput | ProductCreateOrConnectWithoutCompanyInput[]
    createMany?: ProductCreateManyCompanyInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type CashierSessionCreateNestedManyWithoutCompanyInput = {
    create?: XOR<CashierSessionCreateWithoutCompanyInput, CashierSessionUncheckedCreateWithoutCompanyInput> | CashierSessionCreateWithoutCompanyInput[] | CashierSessionUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: CashierSessionCreateOrConnectWithoutCompanyInput | CashierSessionCreateOrConnectWithoutCompanyInput[]
    createMany?: CashierSessionCreateManyCompanyInputEnvelope
    connect?: CashierSessionWhereUniqueInput | CashierSessionWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput> | UserCreateWithoutCompanyInput[] | UserUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCompanyInput | UserCreateOrConnectWithoutCompanyInput[]
    createMany?: UserCreateManyCompanyInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserGroupUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<UserGroupCreateWithoutCompanyInput, UserGroupUncheckedCreateWithoutCompanyInput> | UserGroupCreateWithoutCompanyInput[] | UserGroupUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserGroupCreateOrConnectWithoutCompanyInput | UserGroupCreateOrConnectWithoutCompanyInput[]
    createMany?: UserGroupCreateManyCompanyInputEnvelope
    connect?: UserGroupWhereUniqueInput | UserGroupWhereUniqueInput[]
  }

  export type TableUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<TableCreateWithoutCompanyInput, TableUncheckedCreateWithoutCompanyInput> | TableCreateWithoutCompanyInput[] | TableUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: TableCreateOrConnectWithoutCompanyInput | TableCreateOrConnectWithoutCompanyInput[]
    createMany?: TableCreateManyCompanyInputEnvelope
    connect?: TableWhereUniqueInput | TableWhereUniqueInput[]
  }

  export type CategoryUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<CategoryCreateWithoutCompanyInput, CategoryUncheckedCreateWithoutCompanyInput> | CategoryCreateWithoutCompanyInput[] | CategoryUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutCompanyInput | CategoryCreateOrConnectWithoutCompanyInput[]
    createMany?: CategoryCreateManyCompanyInputEnvelope
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type ProductUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<ProductCreateWithoutCompanyInput, ProductUncheckedCreateWithoutCompanyInput> | ProductCreateWithoutCompanyInput[] | ProductUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCompanyInput | ProductCreateOrConnectWithoutCompanyInput[]
    createMany?: ProductCreateManyCompanyInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type CashierSessionUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<CashierSessionCreateWithoutCompanyInput, CashierSessionUncheckedCreateWithoutCompanyInput> | CashierSessionCreateWithoutCompanyInput[] | CashierSessionUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: CashierSessionCreateOrConnectWithoutCompanyInput | CashierSessionCreateOrConnectWithoutCompanyInput[]
    createMany?: CashierSessionCreateManyCompanyInputEnvelope
    connect?: CashierSessionWhereUniqueInput | CashierSessionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput> | UserCreateWithoutCompanyInput[] | UserUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCompanyInput | UserCreateOrConnectWithoutCompanyInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutCompanyInput | UserUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: UserCreateManyCompanyInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutCompanyInput | UserUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: UserUpdateManyWithWhereWithoutCompanyInput | UserUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserGroupUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<UserGroupCreateWithoutCompanyInput, UserGroupUncheckedCreateWithoutCompanyInput> | UserGroupCreateWithoutCompanyInput[] | UserGroupUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserGroupCreateOrConnectWithoutCompanyInput | UserGroupCreateOrConnectWithoutCompanyInput[]
    upsert?: UserGroupUpsertWithWhereUniqueWithoutCompanyInput | UserGroupUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: UserGroupCreateManyCompanyInputEnvelope
    set?: UserGroupWhereUniqueInput | UserGroupWhereUniqueInput[]
    disconnect?: UserGroupWhereUniqueInput | UserGroupWhereUniqueInput[]
    delete?: UserGroupWhereUniqueInput | UserGroupWhereUniqueInput[]
    connect?: UserGroupWhereUniqueInput | UserGroupWhereUniqueInput[]
    update?: UserGroupUpdateWithWhereUniqueWithoutCompanyInput | UserGroupUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: UserGroupUpdateManyWithWhereWithoutCompanyInput | UserGroupUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: UserGroupScalarWhereInput | UserGroupScalarWhereInput[]
  }

  export type TableUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<TableCreateWithoutCompanyInput, TableUncheckedCreateWithoutCompanyInput> | TableCreateWithoutCompanyInput[] | TableUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: TableCreateOrConnectWithoutCompanyInput | TableCreateOrConnectWithoutCompanyInput[]
    upsert?: TableUpsertWithWhereUniqueWithoutCompanyInput | TableUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: TableCreateManyCompanyInputEnvelope
    set?: TableWhereUniqueInput | TableWhereUniqueInput[]
    disconnect?: TableWhereUniqueInput | TableWhereUniqueInput[]
    delete?: TableWhereUniqueInput | TableWhereUniqueInput[]
    connect?: TableWhereUniqueInput | TableWhereUniqueInput[]
    update?: TableUpdateWithWhereUniqueWithoutCompanyInput | TableUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: TableUpdateManyWithWhereWithoutCompanyInput | TableUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: TableScalarWhereInput | TableScalarWhereInput[]
  }

  export type CategoryUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<CategoryCreateWithoutCompanyInput, CategoryUncheckedCreateWithoutCompanyInput> | CategoryCreateWithoutCompanyInput[] | CategoryUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutCompanyInput | CategoryCreateOrConnectWithoutCompanyInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutCompanyInput | CategoryUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: CategoryCreateManyCompanyInputEnvelope
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutCompanyInput | CategoryUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutCompanyInput | CategoryUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
  }

  export type ProductUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<ProductCreateWithoutCompanyInput, ProductUncheckedCreateWithoutCompanyInput> | ProductCreateWithoutCompanyInput[] | ProductUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCompanyInput | ProductCreateOrConnectWithoutCompanyInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCompanyInput | ProductUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: ProductCreateManyCompanyInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCompanyInput | ProductUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCompanyInput | ProductUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type CashierSessionUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<CashierSessionCreateWithoutCompanyInput, CashierSessionUncheckedCreateWithoutCompanyInput> | CashierSessionCreateWithoutCompanyInput[] | CashierSessionUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: CashierSessionCreateOrConnectWithoutCompanyInput | CashierSessionCreateOrConnectWithoutCompanyInput[]
    upsert?: CashierSessionUpsertWithWhereUniqueWithoutCompanyInput | CashierSessionUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: CashierSessionCreateManyCompanyInputEnvelope
    set?: CashierSessionWhereUniqueInput | CashierSessionWhereUniqueInput[]
    disconnect?: CashierSessionWhereUniqueInput | CashierSessionWhereUniqueInput[]
    delete?: CashierSessionWhereUniqueInput | CashierSessionWhereUniqueInput[]
    connect?: CashierSessionWhereUniqueInput | CashierSessionWhereUniqueInput[]
    update?: CashierSessionUpdateWithWhereUniqueWithoutCompanyInput | CashierSessionUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: CashierSessionUpdateManyWithWhereWithoutCompanyInput | CashierSessionUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: CashierSessionScalarWhereInput | CashierSessionScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput> | UserCreateWithoutCompanyInput[] | UserUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCompanyInput | UserCreateOrConnectWithoutCompanyInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutCompanyInput | UserUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: UserCreateManyCompanyInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutCompanyInput | UserUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: UserUpdateManyWithWhereWithoutCompanyInput | UserUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserGroupUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<UserGroupCreateWithoutCompanyInput, UserGroupUncheckedCreateWithoutCompanyInput> | UserGroupCreateWithoutCompanyInput[] | UserGroupUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserGroupCreateOrConnectWithoutCompanyInput | UserGroupCreateOrConnectWithoutCompanyInput[]
    upsert?: UserGroupUpsertWithWhereUniqueWithoutCompanyInput | UserGroupUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: UserGroupCreateManyCompanyInputEnvelope
    set?: UserGroupWhereUniqueInput | UserGroupWhereUniqueInput[]
    disconnect?: UserGroupWhereUniqueInput | UserGroupWhereUniqueInput[]
    delete?: UserGroupWhereUniqueInput | UserGroupWhereUniqueInput[]
    connect?: UserGroupWhereUniqueInput | UserGroupWhereUniqueInput[]
    update?: UserGroupUpdateWithWhereUniqueWithoutCompanyInput | UserGroupUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: UserGroupUpdateManyWithWhereWithoutCompanyInput | UserGroupUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: UserGroupScalarWhereInput | UserGroupScalarWhereInput[]
  }

  export type TableUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<TableCreateWithoutCompanyInput, TableUncheckedCreateWithoutCompanyInput> | TableCreateWithoutCompanyInput[] | TableUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: TableCreateOrConnectWithoutCompanyInput | TableCreateOrConnectWithoutCompanyInput[]
    upsert?: TableUpsertWithWhereUniqueWithoutCompanyInput | TableUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: TableCreateManyCompanyInputEnvelope
    set?: TableWhereUniqueInput | TableWhereUniqueInput[]
    disconnect?: TableWhereUniqueInput | TableWhereUniqueInput[]
    delete?: TableWhereUniqueInput | TableWhereUniqueInput[]
    connect?: TableWhereUniqueInput | TableWhereUniqueInput[]
    update?: TableUpdateWithWhereUniqueWithoutCompanyInput | TableUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: TableUpdateManyWithWhereWithoutCompanyInput | TableUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: TableScalarWhereInput | TableScalarWhereInput[]
  }

  export type CategoryUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<CategoryCreateWithoutCompanyInput, CategoryUncheckedCreateWithoutCompanyInput> | CategoryCreateWithoutCompanyInput[] | CategoryUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutCompanyInput | CategoryCreateOrConnectWithoutCompanyInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutCompanyInput | CategoryUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: CategoryCreateManyCompanyInputEnvelope
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutCompanyInput | CategoryUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutCompanyInput | CategoryUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
  }

  export type ProductUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<ProductCreateWithoutCompanyInput, ProductUncheckedCreateWithoutCompanyInput> | ProductCreateWithoutCompanyInput[] | ProductUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCompanyInput | ProductCreateOrConnectWithoutCompanyInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCompanyInput | ProductUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: ProductCreateManyCompanyInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCompanyInput | ProductUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCompanyInput | ProductUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type CashierSessionUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<CashierSessionCreateWithoutCompanyInput, CashierSessionUncheckedCreateWithoutCompanyInput> | CashierSessionCreateWithoutCompanyInput[] | CashierSessionUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: CashierSessionCreateOrConnectWithoutCompanyInput | CashierSessionCreateOrConnectWithoutCompanyInput[]
    upsert?: CashierSessionUpsertWithWhereUniqueWithoutCompanyInput | CashierSessionUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: CashierSessionCreateManyCompanyInputEnvelope
    set?: CashierSessionWhereUniqueInput | CashierSessionWhereUniqueInput[]
    disconnect?: CashierSessionWhereUniqueInput | CashierSessionWhereUniqueInput[]
    delete?: CashierSessionWhereUniqueInput | CashierSessionWhereUniqueInput[]
    connect?: CashierSessionWhereUniqueInput | CashierSessionWhereUniqueInput[]
    update?: CashierSessionUpdateWithWhereUniqueWithoutCompanyInput | CashierSessionUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: CashierSessionUpdateManyWithWhereWithoutCompanyInput | CashierSessionUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: CashierSessionScalarWhereInput | CashierSessionScalarWhereInput[]
  }

  export type CompanyCreateNestedOneWithoutUsersInput = {
    create?: XOR<CompanyCreateWithoutUsersInput, CompanyUncheckedCreateWithoutUsersInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutUsersInput
    connect?: CompanyWhereUniqueInput
  }

  export type UserGroupMemberCreateNestedManyWithoutUserInput = {
    create?: XOR<UserGroupMemberCreateWithoutUserInput, UserGroupMemberUncheckedCreateWithoutUserInput> | UserGroupMemberCreateWithoutUserInput[] | UserGroupMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserGroupMemberCreateOrConnectWithoutUserInput | UserGroupMemberCreateOrConnectWithoutUserInput[]
    createMany?: UserGroupMemberCreateManyUserInputEnvelope
    connect?: UserGroupMemberWhereUniqueInput | UserGroupMemberWhereUniqueInput[]
  }

  export type UserGroupMemberUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserGroupMemberCreateWithoutUserInput, UserGroupMemberUncheckedCreateWithoutUserInput> | UserGroupMemberCreateWithoutUserInput[] | UserGroupMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserGroupMemberCreateOrConnectWithoutUserInput | UserGroupMemberCreateOrConnectWithoutUserInput[]
    createMany?: UserGroupMemberCreateManyUserInputEnvelope
    connect?: UserGroupMemberWhereUniqueInput | UserGroupMemberWhereUniqueInput[]
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type CompanyUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<CompanyCreateWithoutUsersInput, CompanyUncheckedCreateWithoutUsersInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutUsersInput
    upsert?: CompanyUpsertWithoutUsersInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutUsersInput, CompanyUpdateWithoutUsersInput>, CompanyUncheckedUpdateWithoutUsersInput>
  }

  export type UserGroupMemberUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserGroupMemberCreateWithoutUserInput, UserGroupMemberUncheckedCreateWithoutUserInput> | UserGroupMemberCreateWithoutUserInput[] | UserGroupMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserGroupMemberCreateOrConnectWithoutUserInput | UserGroupMemberCreateOrConnectWithoutUserInput[]
    upsert?: UserGroupMemberUpsertWithWhereUniqueWithoutUserInput | UserGroupMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserGroupMemberCreateManyUserInputEnvelope
    set?: UserGroupMemberWhereUniqueInput | UserGroupMemberWhereUniqueInput[]
    disconnect?: UserGroupMemberWhereUniqueInput | UserGroupMemberWhereUniqueInput[]
    delete?: UserGroupMemberWhereUniqueInput | UserGroupMemberWhereUniqueInput[]
    connect?: UserGroupMemberWhereUniqueInput | UserGroupMemberWhereUniqueInput[]
    update?: UserGroupMemberUpdateWithWhereUniqueWithoutUserInput | UserGroupMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserGroupMemberUpdateManyWithWhereWithoutUserInput | UserGroupMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserGroupMemberScalarWhereInput | UserGroupMemberScalarWhereInput[]
  }

  export type UserGroupMemberUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserGroupMemberCreateWithoutUserInput, UserGroupMemberUncheckedCreateWithoutUserInput> | UserGroupMemberCreateWithoutUserInput[] | UserGroupMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserGroupMemberCreateOrConnectWithoutUserInput | UserGroupMemberCreateOrConnectWithoutUserInput[]
    upsert?: UserGroupMemberUpsertWithWhereUniqueWithoutUserInput | UserGroupMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserGroupMemberCreateManyUserInputEnvelope
    set?: UserGroupMemberWhereUniqueInput | UserGroupMemberWhereUniqueInput[]
    disconnect?: UserGroupMemberWhereUniqueInput | UserGroupMemberWhereUniqueInput[]
    delete?: UserGroupMemberWhereUniqueInput | UserGroupMemberWhereUniqueInput[]
    connect?: UserGroupMemberWhereUniqueInput | UserGroupMemberWhereUniqueInput[]
    update?: UserGroupMemberUpdateWithWhereUniqueWithoutUserInput | UserGroupMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserGroupMemberUpdateManyWithWhereWithoutUserInput | UserGroupMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserGroupMemberScalarWhereInput | UserGroupMemberScalarWhereInput[]
  }

  export type UserGroupCreatepermissionsInput = {
    set: string[]
  }

  export type CompanyCreateNestedOneWithoutUserGroupsInput = {
    create?: XOR<CompanyCreateWithoutUserGroupsInput, CompanyUncheckedCreateWithoutUserGroupsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutUserGroupsInput
    connect?: CompanyWhereUniqueInput
  }

  export type UserGroupMemberCreateNestedManyWithoutGroupInput = {
    create?: XOR<UserGroupMemberCreateWithoutGroupInput, UserGroupMemberUncheckedCreateWithoutGroupInput> | UserGroupMemberCreateWithoutGroupInput[] | UserGroupMemberUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: UserGroupMemberCreateOrConnectWithoutGroupInput | UserGroupMemberCreateOrConnectWithoutGroupInput[]
    createMany?: UserGroupMemberCreateManyGroupInputEnvelope
    connect?: UserGroupMemberWhereUniqueInput | UserGroupMemberWhereUniqueInput[]
  }

  export type UserGroupMemberUncheckedCreateNestedManyWithoutGroupInput = {
    create?: XOR<UserGroupMemberCreateWithoutGroupInput, UserGroupMemberUncheckedCreateWithoutGroupInput> | UserGroupMemberCreateWithoutGroupInput[] | UserGroupMemberUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: UserGroupMemberCreateOrConnectWithoutGroupInput | UserGroupMemberCreateOrConnectWithoutGroupInput[]
    createMany?: UserGroupMemberCreateManyGroupInputEnvelope
    connect?: UserGroupMemberWhereUniqueInput | UserGroupMemberWhereUniqueInput[]
  }

  export type UserGroupUpdatepermissionsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type CompanyUpdateOneRequiredWithoutUserGroupsNestedInput = {
    create?: XOR<CompanyCreateWithoutUserGroupsInput, CompanyUncheckedCreateWithoutUserGroupsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutUserGroupsInput
    upsert?: CompanyUpsertWithoutUserGroupsInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutUserGroupsInput, CompanyUpdateWithoutUserGroupsInput>, CompanyUncheckedUpdateWithoutUserGroupsInput>
  }

  export type UserGroupMemberUpdateManyWithoutGroupNestedInput = {
    create?: XOR<UserGroupMemberCreateWithoutGroupInput, UserGroupMemberUncheckedCreateWithoutGroupInput> | UserGroupMemberCreateWithoutGroupInput[] | UserGroupMemberUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: UserGroupMemberCreateOrConnectWithoutGroupInput | UserGroupMemberCreateOrConnectWithoutGroupInput[]
    upsert?: UserGroupMemberUpsertWithWhereUniqueWithoutGroupInput | UserGroupMemberUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: UserGroupMemberCreateManyGroupInputEnvelope
    set?: UserGroupMemberWhereUniqueInput | UserGroupMemberWhereUniqueInput[]
    disconnect?: UserGroupMemberWhereUniqueInput | UserGroupMemberWhereUniqueInput[]
    delete?: UserGroupMemberWhereUniqueInput | UserGroupMemberWhereUniqueInput[]
    connect?: UserGroupMemberWhereUniqueInput | UserGroupMemberWhereUniqueInput[]
    update?: UserGroupMemberUpdateWithWhereUniqueWithoutGroupInput | UserGroupMemberUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: UserGroupMemberUpdateManyWithWhereWithoutGroupInput | UserGroupMemberUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: UserGroupMemberScalarWhereInput | UserGroupMemberScalarWhereInput[]
  }

  export type UserGroupMemberUncheckedUpdateManyWithoutGroupNestedInput = {
    create?: XOR<UserGroupMemberCreateWithoutGroupInput, UserGroupMemberUncheckedCreateWithoutGroupInput> | UserGroupMemberCreateWithoutGroupInput[] | UserGroupMemberUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: UserGroupMemberCreateOrConnectWithoutGroupInput | UserGroupMemberCreateOrConnectWithoutGroupInput[]
    upsert?: UserGroupMemberUpsertWithWhereUniqueWithoutGroupInput | UserGroupMemberUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: UserGroupMemberCreateManyGroupInputEnvelope
    set?: UserGroupMemberWhereUniqueInput | UserGroupMemberWhereUniqueInput[]
    disconnect?: UserGroupMemberWhereUniqueInput | UserGroupMemberWhereUniqueInput[]
    delete?: UserGroupMemberWhereUniqueInput | UserGroupMemberWhereUniqueInput[]
    connect?: UserGroupMemberWhereUniqueInput | UserGroupMemberWhereUniqueInput[]
    update?: UserGroupMemberUpdateWithWhereUniqueWithoutGroupInput | UserGroupMemberUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: UserGroupMemberUpdateManyWithWhereWithoutGroupInput | UserGroupMemberUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: UserGroupMemberScalarWhereInput | UserGroupMemberScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutGroupMembersInput = {
    create?: XOR<UserCreateWithoutGroupMembersInput, UserUncheckedCreateWithoutGroupMembersInput>
    connectOrCreate?: UserCreateOrConnectWithoutGroupMembersInput
    connect?: UserWhereUniqueInput
  }

  export type UserGroupCreateNestedOneWithoutMembersInput = {
    create?: XOR<UserGroupCreateWithoutMembersInput, UserGroupUncheckedCreateWithoutMembersInput>
    connectOrCreate?: UserGroupCreateOrConnectWithoutMembersInput
    connect?: UserGroupWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutGroupMembersNestedInput = {
    create?: XOR<UserCreateWithoutGroupMembersInput, UserUncheckedCreateWithoutGroupMembersInput>
    connectOrCreate?: UserCreateOrConnectWithoutGroupMembersInput
    upsert?: UserUpsertWithoutGroupMembersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGroupMembersInput, UserUpdateWithoutGroupMembersInput>, UserUncheckedUpdateWithoutGroupMembersInput>
  }

  export type UserGroupUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<UserGroupCreateWithoutMembersInput, UserGroupUncheckedCreateWithoutMembersInput>
    connectOrCreate?: UserGroupCreateOrConnectWithoutMembersInput
    upsert?: UserGroupUpsertWithoutMembersInput
    connect?: UserGroupWhereUniqueInput
    update?: XOR<XOR<UserGroupUpdateToOneWithWhereWithoutMembersInput, UserGroupUpdateWithoutMembersInput>, UserGroupUncheckedUpdateWithoutMembersInput>
  }

  export type CategoryCreateNestedOneWithoutProductsInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    connect?: CategoryWhereUniqueInput
  }

  export type CompanyCreateNestedOneWithoutProductsInput = {
    create?: XOR<CompanyCreateWithoutProductsInput, CompanyUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutProductsInput
    connect?: CompanyWhereUniqueInput
  }

  export type OrderItemCreateNestedManyWithoutProductInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type OrderItemUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CategoryUpdateOneRequiredWithoutProductsNestedInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    upsert?: CategoryUpsertWithoutProductsInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutProductsInput, CategoryUpdateWithoutProductsInput>, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type CompanyUpdateOneRequiredWithoutProductsNestedInput = {
    create?: XOR<CompanyCreateWithoutProductsInput, CompanyUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutProductsInput
    upsert?: CompanyUpsertWithoutProductsInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutProductsInput, CompanyUpdateWithoutProductsInput>, CompanyUncheckedUpdateWithoutProductsInput>
  }

  export type OrderItemUpdateManyWithoutProductNestedInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutProductInput | OrderItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutProductInput | OrderItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutProductInput | OrderItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type OrderItemUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutProductInput | OrderItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutProductInput | OrderItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutProductInput | OrderItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type CompanyCreateNestedOneWithoutCategoriesInput = {
    create?: XOR<CompanyCreateWithoutCategoriesInput, CompanyUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutCategoriesInput
    connect?: CompanyWhereUniqueInput
  }

  export type ProductCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type ProductUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type CompanyUpdateOneRequiredWithoutCategoriesNestedInput = {
    create?: XOR<CompanyCreateWithoutCategoriesInput, CompanyUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutCategoriesInput
    upsert?: CompanyUpsertWithoutCategoriesInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutCategoriesInput, CompanyUpdateWithoutCategoriesInput>, CompanyUncheckedUpdateWithoutCategoriesInput>
  }

  export type ProductUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput | ProductUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCategoryInput | ProductUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCategoryInput | ProductUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type ProductUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput | ProductUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCategoryInput | ProductUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCategoryInput | ProductUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type CompanyCreateNestedOneWithoutTablesInput = {
    create?: XOR<CompanyCreateWithoutTablesInput, CompanyUncheckedCreateWithoutTablesInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutTablesInput
    connect?: CompanyWhereUniqueInput
  }

  export type OrderCreateNestedManyWithoutTableInput = {
    create?: XOR<OrderCreateWithoutTableInput, OrderUncheckedCreateWithoutTableInput> | OrderCreateWithoutTableInput[] | OrderUncheckedCreateWithoutTableInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutTableInput | OrderCreateOrConnectWithoutTableInput[]
    createMany?: OrderCreateManyTableInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutTableInput = {
    create?: XOR<OrderCreateWithoutTableInput, OrderUncheckedCreateWithoutTableInput> | OrderCreateWithoutTableInput[] | OrderUncheckedCreateWithoutTableInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutTableInput | OrderCreateOrConnectWithoutTableInput[]
    createMany?: OrderCreateManyTableInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CompanyUpdateOneRequiredWithoutTablesNestedInput = {
    create?: XOR<CompanyCreateWithoutTablesInput, CompanyUncheckedCreateWithoutTablesInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutTablesInput
    upsert?: CompanyUpsertWithoutTablesInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutTablesInput, CompanyUpdateWithoutTablesInput>, CompanyUncheckedUpdateWithoutTablesInput>
  }

  export type OrderUpdateManyWithoutTableNestedInput = {
    create?: XOR<OrderCreateWithoutTableInput, OrderUncheckedCreateWithoutTableInput> | OrderCreateWithoutTableInput[] | OrderUncheckedCreateWithoutTableInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutTableInput | OrderCreateOrConnectWithoutTableInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutTableInput | OrderUpsertWithWhereUniqueWithoutTableInput[]
    createMany?: OrderCreateManyTableInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutTableInput | OrderUpdateWithWhereUniqueWithoutTableInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutTableInput | OrderUpdateManyWithWhereWithoutTableInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutTableNestedInput = {
    create?: XOR<OrderCreateWithoutTableInput, OrderUncheckedCreateWithoutTableInput> | OrderCreateWithoutTableInput[] | OrderUncheckedCreateWithoutTableInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutTableInput | OrderCreateOrConnectWithoutTableInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutTableInput | OrderUpsertWithWhereUniqueWithoutTableInput[]
    createMany?: OrderCreateManyTableInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutTableInput | OrderUpdateWithWhereUniqueWithoutTableInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutTableInput | OrderUpdateManyWithWhereWithoutTableInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type TableCreateNestedOneWithoutOrdersInput = {
    create?: XOR<TableCreateWithoutOrdersInput, TableUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: TableCreateOrConnectWithoutOrdersInput
    connect?: TableWhereUniqueInput
  }

  export type OrderItemCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type OrderItemUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type TableUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<TableCreateWithoutOrdersInput, TableUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: TableCreateOrConnectWithoutOrdersInput
    upsert?: TableUpsertWithoutOrdersInput
    connect?: TableWhereUniqueInput
    update?: XOR<XOR<TableUpdateToOneWithWhereWithoutOrdersInput, TableUpdateWithoutOrdersInput>, TableUncheckedUpdateWithoutOrdersInput>
  }

  export type OrderItemUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutOrderInput | OrderItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutOrderInput | OrderItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutOrderInput | OrderItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type OrderItemUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutOrderInput | OrderItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutOrderInput | OrderItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutOrderInput | OrderItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type OrderCreateNestedOneWithoutItemsInput = {
    create?: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput
    connect?: OrderWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutOrderItemsInput = {
    create?: XOR<ProductCreateWithoutOrderItemsInput, ProductUncheckedCreateWithoutOrderItemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutOrderItemsInput
    connect?: ProductWhereUniqueInput
  }

  export type OrderUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput
    upsert?: OrderUpsertWithoutItemsInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutItemsInput, OrderUpdateWithoutItemsInput>, OrderUncheckedUpdateWithoutItemsInput>
  }

  export type ProductUpdateOneRequiredWithoutOrderItemsNestedInput = {
    create?: XOR<ProductCreateWithoutOrderItemsInput, ProductUncheckedCreateWithoutOrderItemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutOrderItemsInput
    upsert?: ProductUpsertWithoutOrderItemsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutOrderItemsInput, ProductUpdateWithoutOrderItemsInput>, ProductUncheckedUpdateWithoutOrderItemsInput>
  }

  export type CompanyCreateNestedOneWithoutCashierSessionsInput = {
    create?: XOR<CompanyCreateWithoutCashierSessionsInput, CompanyUncheckedCreateWithoutCashierSessionsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutCashierSessionsInput
    connect?: CompanyWhereUniqueInput
  }

  export type CashierMovementCreateNestedManyWithoutSessionInput = {
    create?: XOR<CashierMovementCreateWithoutSessionInput, CashierMovementUncheckedCreateWithoutSessionInput> | CashierMovementCreateWithoutSessionInput[] | CashierMovementUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: CashierMovementCreateOrConnectWithoutSessionInput | CashierMovementCreateOrConnectWithoutSessionInput[]
    createMany?: CashierMovementCreateManySessionInputEnvelope
    connect?: CashierMovementWhereUniqueInput | CashierMovementWhereUniqueInput[]
  }

  export type CashierMovementUncheckedCreateNestedManyWithoutSessionInput = {
    create?: XOR<CashierMovementCreateWithoutSessionInput, CashierMovementUncheckedCreateWithoutSessionInput> | CashierMovementCreateWithoutSessionInput[] | CashierMovementUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: CashierMovementCreateOrConnectWithoutSessionInput | CashierMovementCreateOrConnectWithoutSessionInput[]
    createMany?: CashierMovementCreateManySessionInputEnvelope
    connect?: CashierMovementWhereUniqueInput | CashierMovementWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CompanyUpdateOneRequiredWithoutCashierSessionsNestedInput = {
    create?: XOR<CompanyCreateWithoutCashierSessionsInput, CompanyUncheckedCreateWithoutCashierSessionsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutCashierSessionsInput
    upsert?: CompanyUpsertWithoutCashierSessionsInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutCashierSessionsInput, CompanyUpdateWithoutCashierSessionsInput>, CompanyUncheckedUpdateWithoutCashierSessionsInput>
  }

  export type CashierMovementUpdateManyWithoutSessionNestedInput = {
    create?: XOR<CashierMovementCreateWithoutSessionInput, CashierMovementUncheckedCreateWithoutSessionInput> | CashierMovementCreateWithoutSessionInput[] | CashierMovementUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: CashierMovementCreateOrConnectWithoutSessionInput | CashierMovementCreateOrConnectWithoutSessionInput[]
    upsert?: CashierMovementUpsertWithWhereUniqueWithoutSessionInput | CashierMovementUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: CashierMovementCreateManySessionInputEnvelope
    set?: CashierMovementWhereUniqueInput | CashierMovementWhereUniqueInput[]
    disconnect?: CashierMovementWhereUniqueInput | CashierMovementWhereUniqueInput[]
    delete?: CashierMovementWhereUniqueInput | CashierMovementWhereUniqueInput[]
    connect?: CashierMovementWhereUniqueInput | CashierMovementWhereUniqueInput[]
    update?: CashierMovementUpdateWithWhereUniqueWithoutSessionInput | CashierMovementUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: CashierMovementUpdateManyWithWhereWithoutSessionInput | CashierMovementUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: CashierMovementScalarWhereInput | CashierMovementScalarWhereInput[]
  }

  export type CashierMovementUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: XOR<CashierMovementCreateWithoutSessionInput, CashierMovementUncheckedCreateWithoutSessionInput> | CashierMovementCreateWithoutSessionInput[] | CashierMovementUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: CashierMovementCreateOrConnectWithoutSessionInput | CashierMovementCreateOrConnectWithoutSessionInput[]
    upsert?: CashierMovementUpsertWithWhereUniqueWithoutSessionInput | CashierMovementUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: CashierMovementCreateManySessionInputEnvelope
    set?: CashierMovementWhereUniqueInput | CashierMovementWhereUniqueInput[]
    disconnect?: CashierMovementWhereUniqueInput | CashierMovementWhereUniqueInput[]
    delete?: CashierMovementWhereUniqueInput | CashierMovementWhereUniqueInput[]
    connect?: CashierMovementWhereUniqueInput | CashierMovementWhereUniqueInput[]
    update?: CashierMovementUpdateWithWhereUniqueWithoutSessionInput | CashierMovementUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: CashierMovementUpdateManyWithWhereWithoutSessionInput | CashierMovementUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: CashierMovementScalarWhereInput | CashierMovementScalarWhereInput[]
  }

  export type CashierSessionCreateNestedOneWithoutMovementsInput = {
    create?: XOR<CashierSessionCreateWithoutMovementsInput, CashierSessionUncheckedCreateWithoutMovementsInput>
    connectOrCreate?: CashierSessionCreateOrConnectWithoutMovementsInput
    connect?: CashierSessionWhereUniqueInput
  }

  export type CashierSessionUpdateOneRequiredWithoutMovementsNestedInput = {
    create?: XOR<CashierSessionCreateWithoutMovementsInput, CashierSessionUncheckedCreateWithoutMovementsInput>
    connectOrCreate?: CashierSessionCreateOrConnectWithoutMovementsInput
    upsert?: CashierSessionUpsertWithoutMovementsInput
    connect?: CashierSessionWhereUniqueInput
    update?: XOR<XOR<CashierSessionUpdateToOneWithWhereWithoutMovementsInput, CashierSessionUpdateWithoutMovementsInput>, CashierSessionUncheckedUpdateWithoutMovementsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type UserCreateWithoutCompanyInput = {
    uuid?: string
    email: string
    passwordHash: string
    name: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    groupMembers?: UserGroupMemberCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCompanyInput = {
    uuid?: string
    email: string
    passwordHash: string
    name: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    groupMembers?: UserGroupMemberUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCompanyInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput>
  }

  export type UserCreateManyCompanyInputEnvelope = {
    data: UserCreateManyCompanyInput | UserCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type UserGroupCreateWithoutCompanyInput = {
    uuid?: string
    name: string
    permissions?: UserGroupCreatepermissionsInput | string[]
    createdAt?: Date | string
    members?: UserGroupMemberCreateNestedManyWithoutGroupInput
  }

  export type UserGroupUncheckedCreateWithoutCompanyInput = {
    uuid?: string
    name: string
    permissions?: UserGroupCreatepermissionsInput | string[]
    createdAt?: Date | string
    members?: UserGroupMemberUncheckedCreateNestedManyWithoutGroupInput
  }

  export type UserGroupCreateOrConnectWithoutCompanyInput = {
    where: UserGroupWhereUniqueInput
    create: XOR<UserGroupCreateWithoutCompanyInput, UserGroupUncheckedCreateWithoutCompanyInput>
  }

  export type UserGroupCreateManyCompanyInputEnvelope = {
    data: UserGroupCreateManyCompanyInput | UserGroupCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type TableCreateWithoutCompanyInput = {
    uuid?: string
    number: number
    qrCode?: string
    description?: string
    orders?: OrderCreateNestedManyWithoutTableInput
  }

  export type TableUncheckedCreateWithoutCompanyInput = {
    uuid?: string
    number: number
    qrCode?: string
    description?: string
    orders?: OrderUncheckedCreateNestedManyWithoutTableInput
  }

  export type TableCreateOrConnectWithoutCompanyInput = {
    where: TableWhereUniqueInput
    create: XOR<TableCreateWithoutCompanyInput, TableUncheckedCreateWithoutCompanyInput>
  }

  export type TableCreateManyCompanyInputEnvelope = {
    data: TableCreateManyCompanyInput | TableCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type CategoryCreateWithoutCompanyInput = {
    uuid?: string
    name: string
    products?: ProductCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutCompanyInput = {
    uuid?: string
    name: string
    products?: ProductUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutCompanyInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutCompanyInput, CategoryUncheckedCreateWithoutCompanyInput>
  }

  export type CategoryCreateManyCompanyInputEnvelope = {
    data: CategoryCreateManyCompanyInput | CategoryCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type ProductCreateWithoutCompanyInput = {
    uuid?: string
    name: string
    price: number
    active?: boolean
    description: string
    category: CategoryCreateNestedOneWithoutProductsInput
    orderItems?: OrderItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutCompanyInput = {
    uuid?: string
    name: string
    price: number
    active?: boolean
    description: string
    categoryUuid: string
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutCompanyInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutCompanyInput, ProductUncheckedCreateWithoutCompanyInput>
  }

  export type ProductCreateManyCompanyInputEnvelope = {
    data: ProductCreateManyCompanyInput | ProductCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type CashierSessionCreateWithoutCompanyInput = {
    uuid?: string
    openedAt?: Date | string
    closedAt?: Date | string | null
    openingBalance?: number
    closingBalance?: number | null
    status?: string
    movements?: CashierMovementCreateNestedManyWithoutSessionInput
  }

  export type CashierSessionUncheckedCreateWithoutCompanyInput = {
    uuid?: string
    openedAt?: Date | string
    closedAt?: Date | string | null
    openingBalance?: number
    closingBalance?: number | null
    status?: string
    movements?: CashierMovementUncheckedCreateNestedManyWithoutSessionInput
  }

  export type CashierSessionCreateOrConnectWithoutCompanyInput = {
    where: CashierSessionWhereUniqueInput
    create: XOR<CashierSessionCreateWithoutCompanyInput, CashierSessionUncheckedCreateWithoutCompanyInput>
  }

  export type CashierSessionCreateManyCompanyInputEnvelope = {
    data: CashierSessionCreateManyCompanyInput | CashierSessionCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutCompanyInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutCompanyInput, UserUncheckedUpdateWithoutCompanyInput>
    create: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput>
  }

  export type UserUpdateWithWhereUniqueWithoutCompanyInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutCompanyInput, UserUncheckedUpdateWithoutCompanyInput>
  }

  export type UserUpdateManyWithWhereWithoutCompanyInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutCompanyInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    uuid?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    companyUuid?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
  }

  export type UserGroupUpsertWithWhereUniqueWithoutCompanyInput = {
    where: UserGroupWhereUniqueInput
    update: XOR<UserGroupUpdateWithoutCompanyInput, UserGroupUncheckedUpdateWithoutCompanyInput>
    create: XOR<UserGroupCreateWithoutCompanyInput, UserGroupUncheckedCreateWithoutCompanyInput>
  }

  export type UserGroupUpdateWithWhereUniqueWithoutCompanyInput = {
    where: UserGroupWhereUniqueInput
    data: XOR<UserGroupUpdateWithoutCompanyInput, UserGroupUncheckedUpdateWithoutCompanyInput>
  }

  export type UserGroupUpdateManyWithWhereWithoutCompanyInput = {
    where: UserGroupScalarWhereInput
    data: XOR<UserGroupUpdateManyMutationInput, UserGroupUncheckedUpdateManyWithoutCompanyInput>
  }

  export type UserGroupScalarWhereInput = {
    AND?: UserGroupScalarWhereInput | UserGroupScalarWhereInput[]
    OR?: UserGroupScalarWhereInput[]
    NOT?: UserGroupScalarWhereInput | UserGroupScalarWhereInput[]
    uuid?: StringFilter<"UserGroup"> | string
    name?: StringFilter<"UserGroup"> | string
    permissions?: StringNullableListFilter<"UserGroup">
    companyUuid?: StringFilter<"UserGroup"> | string
    createdAt?: DateTimeFilter<"UserGroup"> | Date | string
  }

  export type TableUpsertWithWhereUniqueWithoutCompanyInput = {
    where: TableWhereUniqueInput
    update: XOR<TableUpdateWithoutCompanyInput, TableUncheckedUpdateWithoutCompanyInput>
    create: XOR<TableCreateWithoutCompanyInput, TableUncheckedCreateWithoutCompanyInput>
  }

  export type TableUpdateWithWhereUniqueWithoutCompanyInput = {
    where: TableWhereUniqueInput
    data: XOR<TableUpdateWithoutCompanyInput, TableUncheckedUpdateWithoutCompanyInput>
  }

  export type TableUpdateManyWithWhereWithoutCompanyInput = {
    where: TableScalarWhereInput
    data: XOR<TableUpdateManyMutationInput, TableUncheckedUpdateManyWithoutCompanyInput>
  }

  export type TableScalarWhereInput = {
    AND?: TableScalarWhereInput | TableScalarWhereInput[]
    OR?: TableScalarWhereInput[]
    NOT?: TableScalarWhereInput | TableScalarWhereInput[]
    uuid?: StringFilter<"Table"> | string
    number?: IntFilter<"Table"> | number
    qrCode?: StringFilter<"Table"> | string
    description?: StringFilter<"Table"> | string
    companyUuid?: StringFilter<"Table"> | string
  }

  export type CategoryUpsertWithWhereUniqueWithoutCompanyInput = {
    where: CategoryWhereUniqueInput
    update: XOR<CategoryUpdateWithoutCompanyInput, CategoryUncheckedUpdateWithoutCompanyInput>
    create: XOR<CategoryCreateWithoutCompanyInput, CategoryUncheckedCreateWithoutCompanyInput>
  }

  export type CategoryUpdateWithWhereUniqueWithoutCompanyInput = {
    where: CategoryWhereUniqueInput
    data: XOR<CategoryUpdateWithoutCompanyInput, CategoryUncheckedUpdateWithoutCompanyInput>
  }

  export type CategoryUpdateManyWithWhereWithoutCompanyInput = {
    where: CategoryScalarWhereInput
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyWithoutCompanyInput>
  }

  export type CategoryScalarWhereInput = {
    AND?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
    OR?: CategoryScalarWhereInput[]
    NOT?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
    uuid?: StringFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    companyUuid?: StringFilter<"Category"> | string
  }

  export type ProductUpsertWithWhereUniqueWithoutCompanyInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutCompanyInput, ProductUncheckedUpdateWithoutCompanyInput>
    create: XOR<ProductCreateWithoutCompanyInput, ProductUncheckedCreateWithoutCompanyInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutCompanyInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutCompanyInput, ProductUncheckedUpdateWithoutCompanyInput>
  }

  export type ProductUpdateManyWithWhereWithoutCompanyInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutCompanyInput>
  }

  export type ProductScalarWhereInput = {
    AND?: ProductScalarWhereInput | ProductScalarWhereInput[]
    OR?: ProductScalarWhereInput[]
    NOT?: ProductScalarWhereInput | ProductScalarWhereInput[]
    uuid?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    price?: FloatFilter<"Product"> | number
    active?: BoolFilter<"Product"> | boolean
    description?: StringFilter<"Product"> | string
    categoryUuid?: StringFilter<"Product"> | string
    companyUuid?: StringFilter<"Product"> | string
  }

  export type CashierSessionUpsertWithWhereUniqueWithoutCompanyInput = {
    where: CashierSessionWhereUniqueInput
    update: XOR<CashierSessionUpdateWithoutCompanyInput, CashierSessionUncheckedUpdateWithoutCompanyInput>
    create: XOR<CashierSessionCreateWithoutCompanyInput, CashierSessionUncheckedCreateWithoutCompanyInput>
  }

  export type CashierSessionUpdateWithWhereUniqueWithoutCompanyInput = {
    where: CashierSessionWhereUniqueInput
    data: XOR<CashierSessionUpdateWithoutCompanyInput, CashierSessionUncheckedUpdateWithoutCompanyInput>
  }

  export type CashierSessionUpdateManyWithWhereWithoutCompanyInput = {
    where: CashierSessionScalarWhereInput
    data: XOR<CashierSessionUpdateManyMutationInput, CashierSessionUncheckedUpdateManyWithoutCompanyInput>
  }

  export type CashierSessionScalarWhereInput = {
    AND?: CashierSessionScalarWhereInput | CashierSessionScalarWhereInput[]
    OR?: CashierSessionScalarWhereInput[]
    NOT?: CashierSessionScalarWhereInput | CashierSessionScalarWhereInput[]
    uuid?: StringFilter<"CashierSession"> | string
    companyUuid?: StringFilter<"CashierSession"> | string
    openedAt?: DateTimeFilter<"CashierSession"> | Date | string
    closedAt?: DateTimeNullableFilter<"CashierSession"> | Date | string | null
    openingBalance?: FloatFilter<"CashierSession"> | number
    closingBalance?: FloatNullableFilter<"CashierSession"> | number | null
    status?: StringFilter<"CashierSession"> | string
  }

  export type CompanyCreateWithoutUsersInput = {
    uuid?: string
    name: string
    menuTheme?: string | null
    soundOnOrderReady?: boolean
    createdAt?: Date | string
    userGroups?: UserGroupCreateNestedManyWithoutCompanyInput
    tables?: TableCreateNestedManyWithoutCompanyInput
    categories?: CategoryCreateNestedManyWithoutCompanyInput
    products?: ProductCreateNestedManyWithoutCompanyInput
    cashierSessions?: CashierSessionCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutUsersInput = {
    uuid?: string
    name: string
    menuTheme?: string | null
    soundOnOrderReady?: boolean
    createdAt?: Date | string
    userGroups?: UserGroupUncheckedCreateNestedManyWithoutCompanyInput
    tables?: TableUncheckedCreateNestedManyWithoutCompanyInput
    categories?: CategoryUncheckedCreateNestedManyWithoutCompanyInput
    products?: ProductUncheckedCreateNestedManyWithoutCompanyInput
    cashierSessions?: CashierSessionUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutUsersInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutUsersInput, CompanyUncheckedCreateWithoutUsersInput>
  }

  export type UserGroupMemberCreateWithoutUserInput = {
    group: UserGroupCreateNestedOneWithoutMembersInput
  }

  export type UserGroupMemberUncheckedCreateWithoutUserInput = {
    groupUuid: string
  }

  export type UserGroupMemberCreateOrConnectWithoutUserInput = {
    where: UserGroupMemberWhereUniqueInput
    create: XOR<UserGroupMemberCreateWithoutUserInput, UserGroupMemberUncheckedCreateWithoutUserInput>
  }

  export type UserGroupMemberCreateManyUserInputEnvelope = {
    data: UserGroupMemberCreateManyUserInput | UserGroupMemberCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CompanyUpsertWithoutUsersInput = {
    update: XOR<CompanyUpdateWithoutUsersInput, CompanyUncheckedUpdateWithoutUsersInput>
    create: XOR<CompanyCreateWithoutUsersInput, CompanyUncheckedCreateWithoutUsersInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutUsersInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutUsersInput, CompanyUncheckedUpdateWithoutUsersInput>
  }

  export type CompanyUpdateWithoutUsersInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    menuTheme?: NullableStringFieldUpdateOperationsInput | string | null
    soundOnOrderReady?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userGroups?: UserGroupUpdateManyWithoutCompanyNestedInput
    tables?: TableUpdateManyWithoutCompanyNestedInput
    categories?: CategoryUpdateManyWithoutCompanyNestedInput
    products?: ProductUpdateManyWithoutCompanyNestedInput
    cashierSessions?: CashierSessionUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutUsersInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    menuTheme?: NullableStringFieldUpdateOperationsInput | string | null
    soundOnOrderReady?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userGroups?: UserGroupUncheckedUpdateManyWithoutCompanyNestedInput
    tables?: TableUncheckedUpdateManyWithoutCompanyNestedInput
    categories?: CategoryUncheckedUpdateManyWithoutCompanyNestedInput
    products?: ProductUncheckedUpdateManyWithoutCompanyNestedInput
    cashierSessions?: CashierSessionUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type UserGroupMemberUpsertWithWhereUniqueWithoutUserInput = {
    where: UserGroupMemberWhereUniqueInput
    update: XOR<UserGroupMemberUpdateWithoutUserInput, UserGroupMemberUncheckedUpdateWithoutUserInput>
    create: XOR<UserGroupMemberCreateWithoutUserInput, UserGroupMemberUncheckedCreateWithoutUserInput>
  }

  export type UserGroupMemberUpdateWithWhereUniqueWithoutUserInput = {
    where: UserGroupMemberWhereUniqueInput
    data: XOR<UserGroupMemberUpdateWithoutUserInput, UserGroupMemberUncheckedUpdateWithoutUserInput>
  }

  export type UserGroupMemberUpdateManyWithWhereWithoutUserInput = {
    where: UserGroupMemberScalarWhereInput
    data: XOR<UserGroupMemberUpdateManyMutationInput, UserGroupMemberUncheckedUpdateManyWithoutUserInput>
  }

  export type UserGroupMemberScalarWhereInput = {
    AND?: UserGroupMemberScalarWhereInput | UserGroupMemberScalarWhereInput[]
    OR?: UserGroupMemberScalarWhereInput[]
    NOT?: UserGroupMemberScalarWhereInput | UserGroupMemberScalarWhereInput[]
    userUuid?: StringFilter<"UserGroupMember"> | string
    groupUuid?: StringFilter<"UserGroupMember"> | string
  }

  export type CompanyCreateWithoutUserGroupsInput = {
    uuid?: string
    name: string
    menuTheme?: string | null
    soundOnOrderReady?: boolean
    createdAt?: Date | string
    users?: UserCreateNestedManyWithoutCompanyInput
    tables?: TableCreateNestedManyWithoutCompanyInput
    categories?: CategoryCreateNestedManyWithoutCompanyInput
    products?: ProductCreateNestedManyWithoutCompanyInput
    cashierSessions?: CashierSessionCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutUserGroupsInput = {
    uuid?: string
    name: string
    menuTheme?: string | null
    soundOnOrderReady?: boolean
    createdAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCompanyInput
    tables?: TableUncheckedCreateNestedManyWithoutCompanyInput
    categories?: CategoryUncheckedCreateNestedManyWithoutCompanyInput
    products?: ProductUncheckedCreateNestedManyWithoutCompanyInput
    cashierSessions?: CashierSessionUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutUserGroupsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutUserGroupsInput, CompanyUncheckedCreateWithoutUserGroupsInput>
  }

  export type UserGroupMemberCreateWithoutGroupInput = {
    user: UserCreateNestedOneWithoutGroupMembersInput
  }

  export type UserGroupMemberUncheckedCreateWithoutGroupInput = {
    userUuid: string
  }

  export type UserGroupMemberCreateOrConnectWithoutGroupInput = {
    where: UserGroupMemberWhereUniqueInput
    create: XOR<UserGroupMemberCreateWithoutGroupInput, UserGroupMemberUncheckedCreateWithoutGroupInput>
  }

  export type UserGroupMemberCreateManyGroupInputEnvelope = {
    data: UserGroupMemberCreateManyGroupInput | UserGroupMemberCreateManyGroupInput[]
    skipDuplicates?: boolean
  }

  export type CompanyUpsertWithoutUserGroupsInput = {
    update: XOR<CompanyUpdateWithoutUserGroupsInput, CompanyUncheckedUpdateWithoutUserGroupsInput>
    create: XOR<CompanyCreateWithoutUserGroupsInput, CompanyUncheckedCreateWithoutUserGroupsInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutUserGroupsInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutUserGroupsInput, CompanyUncheckedUpdateWithoutUserGroupsInput>
  }

  export type CompanyUpdateWithoutUserGroupsInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    menuTheme?: NullableStringFieldUpdateOperationsInput | string | null
    soundOnOrderReady?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCompanyNestedInput
    tables?: TableUpdateManyWithoutCompanyNestedInput
    categories?: CategoryUpdateManyWithoutCompanyNestedInput
    products?: ProductUpdateManyWithoutCompanyNestedInput
    cashierSessions?: CashierSessionUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutUserGroupsInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    menuTheme?: NullableStringFieldUpdateOperationsInput | string | null
    soundOnOrderReady?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCompanyNestedInput
    tables?: TableUncheckedUpdateManyWithoutCompanyNestedInput
    categories?: CategoryUncheckedUpdateManyWithoutCompanyNestedInput
    products?: ProductUncheckedUpdateManyWithoutCompanyNestedInput
    cashierSessions?: CashierSessionUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type UserGroupMemberUpsertWithWhereUniqueWithoutGroupInput = {
    where: UserGroupMemberWhereUniqueInput
    update: XOR<UserGroupMemberUpdateWithoutGroupInput, UserGroupMemberUncheckedUpdateWithoutGroupInput>
    create: XOR<UserGroupMemberCreateWithoutGroupInput, UserGroupMemberUncheckedCreateWithoutGroupInput>
  }

  export type UserGroupMemberUpdateWithWhereUniqueWithoutGroupInput = {
    where: UserGroupMemberWhereUniqueInput
    data: XOR<UserGroupMemberUpdateWithoutGroupInput, UserGroupMemberUncheckedUpdateWithoutGroupInput>
  }

  export type UserGroupMemberUpdateManyWithWhereWithoutGroupInput = {
    where: UserGroupMemberScalarWhereInput
    data: XOR<UserGroupMemberUpdateManyMutationInput, UserGroupMemberUncheckedUpdateManyWithoutGroupInput>
  }

  export type UserCreateWithoutGroupMembersInput = {
    uuid?: string
    email: string
    passwordHash: string
    name: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    company: CompanyCreateNestedOneWithoutUsersInput
  }

  export type UserUncheckedCreateWithoutGroupMembersInput = {
    uuid?: string
    email: string
    passwordHash: string
    name: string
    role?: $Enums.UserRole
    companyUuid: string
    createdAt?: Date | string
  }

  export type UserCreateOrConnectWithoutGroupMembersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGroupMembersInput, UserUncheckedCreateWithoutGroupMembersInput>
  }

  export type UserGroupCreateWithoutMembersInput = {
    uuid?: string
    name: string
    permissions?: UserGroupCreatepermissionsInput | string[]
    createdAt?: Date | string
    company: CompanyCreateNestedOneWithoutUserGroupsInput
  }

  export type UserGroupUncheckedCreateWithoutMembersInput = {
    uuid?: string
    name: string
    permissions?: UserGroupCreatepermissionsInput | string[]
    companyUuid: string
    createdAt?: Date | string
  }

  export type UserGroupCreateOrConnectWithoutMembersInput = {
    where: UserGroupWhereUniqueInput
    create: XOR<UserGroupCreateWithoutMembersInput, UserGroupUncheckedCreateWithoutMembersInput>
  }

  export type UserUpsertWithoutGroupMembersInput = {
    update: XOR<UserUpdateWithoutGroupMembersInput, UserUncheckedUpdateWithoutGroupMembersInput>
    create: XOR<UserCreateWithoutGroupMembersInput, UserUncheckedCreateWithoutGroupMembersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGroupMembersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGroupMembersInput, UserUncheckedUpdateWithoutGroupMembersInput>
  }

  export type UserUpdateWithoutGroupMembersInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateWithoutGroupMembersInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    companyUuid?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserGroupUpsertWithoutMembersInput = {
    update: XOR<UserGroupUpdateWithoutMembersInput, UserGroupUncheckedUpdateWithoutMembersInput>
    create: XOR<UserGroupCreateWithoutMembersInput, UserGroupUncheckedCreateWithoutMembersInput>
    where?: UserGroupWhereInput
  }

  export type UserGroupUpdateToOneWithWhereWithoutMembersInput = {
    where?: UserGroupWhereInput
    data: XOR<UserGroupUpdateWithoutMembersInput, UserGroupUncheckedUpdateWithoutMembersInput>
  }

  export type UserGroupUpdateWithoutMembersInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    permissions?: UserGroupUpdatepermissionsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutUserGroupsNestedInput
  }

  export type UserGroupUncheckedUpdateWithoutMembersInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    permissions?: UserGroupUpdatepermissionsInput | string[]
    companyUuid?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryCreateWithoutProductsInput = {
    uuid?: string
    name: string
    company: CompanyCreateNestedOneWithoutCategoriesInput
  }

  export type CategoryUncheckedCreateWithoutProductsInput = {
    uuid?: string
    name: string
    companyUuid: string
  }

  export type CategoryCreateOrConnectWithoutProductsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
  }

  export type CompanyCreateWithoutProductsInput = {
    uuid?: string
    name: string
    menuTheme?: string | null
    soundOnOrderReady?: boolean
    createdAt?: Date | string
    users?: UserCreateNestedManyWithoutCompanyInput
    userGroups?: UserGroupCreateNestedManyWithoutCompanyInput
    tables?: TableCreateNestedManyWithoutCompanyInput
    categories?: CategoryCreateNestedManyWithoutCompanyInput
    cashierSessions?: CashierSessionCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutProductsInput = {
    uuid?: string
    name: string
    menuTheme?: string | null
    soundOnOrderReady?: boolean
    createdAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCompanyInput
    userGroups?: UserGroupUncheckedCreateNestedManyWithoutCompanyInput
    tables?: TableUncheckedCreateNestedManyWithoutCompanyInput
    categories?: CategoryUncheckedCreateNestedManyWithoutCompanyInput
    cashierSessions?: CashierSessionUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutProductsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutProductsInput, CompanyUncheckedCreateWithoutProductsInput>
  }

  export type OrderItemCreateWithoutProductInput = {
    uuid?: string
    quantity: number
    unitPrice: number
    order: OrderCreateNestedOneWithoutItemsInput
  }

  export type OrderItemUncheckedCreateWithoutProductInput = {
    uuid?: string
    orderUuid: string
    quantity: number
    unitPrice: number
  }

  export type OrderItemCreateOrConnectWithoutProductInput = {
    where: OrderItemWhereUniqueInput
    create: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput>
  }

  export type OrderItemCreateManyProductInputEnvelope = {
    data: OrderItemCreateManyProductInput | OrderItemCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type CategoryUpsertWithoutProductsInput = {
    update: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutProductsInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type CategoryUpdateWithoutProductsInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    company?: CompanyUpdateOneRequiredWithoutCategoriesNestedInput
  }

  export type CategoryUncheckedUpdateWithoutProductsInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    companyUuid?: StringFieldUpdateOperationsInput | string
  }

  export type CompanyUpsertWithoutProductsInput = {
    update: XOR<CompanyUpdateWithoutProductsInput, CompanyUncheckedUpdateWithoutProductsInput>
    create: XOR<CompanyCreateWithoutProductsInput, CompanyUncheckedCreateWithoutProductsInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutProductsInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutProductsInput, CompanyUncheckedUpdateWithoutProductsInput>
  }

  export type CompanyUpdateWithoutProductsInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    menuTheme?: NullableStringFieldUpdateOperationsInput | string | null
    soundOnOrderReady?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCompanyNestedInput
    userGroups?: UserGroupUpdateManyWithoutCompanyNestedInput
    tables?: TableUpdateManyWithoutCompanyNestedInput
    categories?: CategoryUpdateManyWithoutCompanyNestedInput
    cashierSessions?: CashierSessionUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutProductsInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    menuTheme?: NullableStringFieldUpdateOperationsInput | string | null
    soundOnOrderReady?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCompanyNestedInput
    userGroups?: UserGroupUncheckedUpdateManyWithoutCompanyNestedInput
    tables?: TableUncheckedUpdateManyWithoutCompanyNestedInput
    categories?: CategoryUncheckedUpdateManyWithoutCompanyNestedInput
    cashierSessions?: CashierSessionUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type OrderItemUpsertWithWhereUniqueWithoutProductInput = {
    where: OrderItemWhereUniqueInput
    update: XOR<OrderItemUpdateWithoutProductInput, OrderItemUncheckedUpdateWithoutProductInput>
    create: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput>
  }

  export type OrderItemUpdateWithWhereUniqueWithoutProductInput = {
    where: OrderItemWhereUniqueInput
    data: XOR<OrderItemUpdateWithoutProductInput, OrderItemUncheckedUpdateWithoutProductInput>
  }

  export type OrderItemUpdateManyWithWhereWithoutProductInput = {
    where: OrderItemScalarWhereInput
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyWithoutProductInput>
  }

  export type OrderItemScalarWhereInput = {
    AND?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
    OR?: OrderItemScalarWhereInput[]
    NOT?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
    uuid?: StringFilter<"OrderItem"> | string
    orderUuid?: StringFilter<"OrderItem"> | string
    productUuid?: StringFilter<"OrderItem"> | string
    quantity?: IntFilter<"OrderItem"> | number
    unitPrice?: FloatFilter<"OrderItem"> | number
  }

  export type CompanyCreateWithoutCategoriesInput = {
    uuid?: string
    name: string
    menuTheme?: string | null
    soundOnOrderReady?: boolean
    createdAt?: Date | string
    users?: UserCreateNestedManyWithoutCompanyInput
    userGroups?: UserGroupCreateNestedManyWithoutCompanyInput
    tables?: TableCreateNestedManyWithoutCompanyInput
    products?: ProductCreateNestedManyWithoutCompanyInput
    cashierSessions?: CashierSessionCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutCategoriesInput = {
    uuid?: string
    name: string
    menuTheme?: string | null
    soundOnOrderReady?: boolean
    createdAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCompanyInput
    userGroups?: UserGroupUncheckedCreateNestedManyWithoutCompanyInput
    tables?: TableUncheckedCreateNestedManyWithoutCompanyInput
    products?: ProductUncheckedCreateNestedManyWithoutCompanyInput
    cashierSessions?: CashierSessionUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutCategoriesInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutCategoriesInput, CompanyUncheckedCreateWithoutCategoriesInput>
  }

  export type ProductCreateWithoutCategoryInput = {
    uuid?: string
    name: string
    price: number
    active?: boolean
    description: string
    company: CompanyCreateNestedOneWithoutProductsInput
    orderItems?: OrderItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutCategoryInput = {
    uuid?: string
    name: string
    price: number
    active?: boolean
    description: string
    companyUuid: string
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput>
  }

  export type ProductCreateManyCategoryInputEnvelope = {
    data: ProductCreateManyCategoryInput | ProductCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type CompanyUpsertWithoutCategoriesInput = {
    update: XOR<CompanyUpdateWithoutCategoriesInput, CompanyUncheckedUpdateWithoutCategoriesInput>
    create: XOR<CompanyCreateWithoutCategoriesInput, CompanyUncheckedCreateWithoutCategoriesInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutCategoriesInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutCategoriesInput, CompanyUncheckedUpdateWithoutCategoriesInput>
  }

  export type CompanyUpdateWithoutCategoriesInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    menuTheme?: NullableStringFieldUpdateOperationsInput | string | null
    soundOnOrderReady?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCompanyNestedInput
    userGroups?: UserGroupUpdateManyWithoutCompanyNestedInput
    tables?: TableUpdateManyWithoutCompanyNestedInput
    products?: ProductUpdateManyWithoutCompanyNestedInput
    cashierSessions?: CashierSessionUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutCategoriesInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    menuTheme?: NullableStringFieldUpdateOperationsInput | string | null
    soundOnOrderReady?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCompanyNestedInput
    userGroups?: UserGroupUncheckedUpdateManyWithoutCompanyNestedInput
    tables?: TableUncheckedUpdateManyWithoutCompanyNestedInput
    products?: ProductUncheckedUpdateManyWithoutCompanyNestedInput
    cashierSessions?: CashierSessionUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type ProductUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutCategoryInput, ProductUncheckedUpdateWithoutCategoryInput>
    create: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutCategoryInput, ProductUncheckedUpdateWithoutCategoryInput>
  }

  export type ProductUpdateManyWithWhereWithoutCategoryInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutCategoryInput>
  }

  export type CompanyCreateWithoutTablesInput = {
    uuid?: string
    name: string
    menuTheme?: string | null
    soundOnOrderReady?: boolean
    createdAt?: Date | string
    users?: UserCreateNestedManyWithoutCompanyInput
    userGroups?: UserGroupCreateNestedManyWithoutCompanyInput
    categories?: CategoryCreateNestedManyWithoutCompanyInput
    products?: ProductCreateNestedManyWithoutCompanyInput
    cashierSessions?: CashierSessionCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutTablesInput = {
    uuid?: string
    name: string
    menuTheme?: string | null
    soundOnOrderReady?: boolean
    createdAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCompanyInput
    userGroups?: UserGroupUncheckedCreateNestedManyWithoutCompanyInput
    categories?: CategoryUncheckedCreateNestedManyWithoutCompanyInput
    products?: ProductUncheckedCreateNestedManyWithoutCompanyInput
    cashierSessions?: CashierSessionUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutTablesInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutTablesInput, CompanyUncheckedCreateWithoutTablesInput>
  }

  export type OrderCreateWithoutTableInput = {
    uuid?: string
    status?: string
    createdAt?: Date | string
    items?: OrderItemCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutTableInput = {
    uuid?: string
    status?: string
    createdAt?: Date | string
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutTableInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutTableInput, OrderUncheckedCreateWithoutTableInput>
  }

  export type OrderCreateManyTableInputEnvelope = {
    data: OrderCreateManyTableInput | OrderCreateManyTableInput[]
    skipDuplicates?: boolean
  }

  export type CompanyUpsertWithoutTablesInput = {
    update: XOR<CompanyUpdateWithoutTablesInput, CompanyUncheckedUpdateWithoutTablesInput>
    create: XOR<CompanyCreateWithoutTablesInput, CompanyUncheckedCreateWithoutTablesInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutTablesInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutTablesInput, CompanyUncheckedUpdateWithoutTablesInput>
  }

  export type CompanyUpdateWithoutTablesInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    menuTheme?: NullableStringFieldUpdateOperationsInput | string | null
    soundOnOrderReady?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCompanyNestedInput
    userGroups?: UserGroupUpdateManyWithoutCompanyNestedInput
    categories?: CategoryUpdateManyWithoutCompanyNestedInput
    products?: ProductUpdateManyWithoutCompanyNestedInput
    cashierSessions?: CashierSessionUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutTablesInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    menuTheme?: NullableStringFieldUpdateOperationsInput | string | null
    soundOnOrderReady?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCompanyNestedInput
    userGroups?: UserGroupUncheckedUpdateManyWithoutCompanyNestedInput
    categories?: CategoryUncheckedUpdateManyWithoutCompanyNestedInput
    products?: ProductUncheckedUpdateManyWithoutCompanyNestedInput
    cashierSessions?: CashierSessionUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type OrderUpsertWithWhereUniqueWithoutTableInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutTableInput, OrderUncheckedUpdateWithoutTableInput>
    create: XOR<OrderCreateWithoutTableInput, OrderUncheckedCreateWithoutTableInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutTableInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutTableInput, OrderUncheckedUpdateWithoutTableInput>
  }

  export type OrderUpdateManyWithWhereWithoutTableInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutTableInput>
  }

  export type OrderScalarWhereInput = {
    AND?: OrderScalarWhereInput | OrderScalarWhereInput[]
    OR?: OrderScalarWhereInput[]
    NOT?: OrderScalarWhereInput | OrderScalarWhereInput[]
    uuid?: StringFilter<"Order"> | string
    tableUuid?: StringFilter<"Order"> | string
    status?: StringFilter<"Order"> | string
    createdAt?: DateTimeFilter<"Order"> | Date | string
  }

  export type TableCreateWithoutOrdersInput = {
    uuid?: string
    number: number
    qrCode?: string
    description?: string
    company: CompanyCreateNestedOneWithoutTablesInput
  }

  export type TableUncheckedCreateWithoutOrdersInput = {
    uuid?: string
    number: number
    qrCode?: string
    description?: string
    companyUuid: string
  }

  export type TableCreateOrConnectWithoutOrdersInput = {
    where: TableWhereUniqueInput
    create: XOR<TableCreateWithoutOrdersInput, TableUncheckedCreateWithoutOrdersInput>
  }

  export type OrderItemCreateWithoutOrderInput = {
    uuid?: string
    quantity: number
    unitPrice: number
    product: ProductCreateNestedOneWithoutOrderItemsInput
  }

  export type OrderItemUncheckedCreateWithoutOrderInput = {
    uuid?: string
    productUuid: string
    quantity: number
    unitPrice: number
  }

  export type OrderItemCreateOrConnectWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
  }

  export type OrderItemCreateManyOrderInputEnvelope = {
    data: OrderItemCreateManyOrderInput | OrderItemCreateManyOrderInput[]
    skipDuplicates?: boolean
  }

  export type TableUpsertWithoutOrdersInput = {
    update: XOR<TableUpdateWithoutOrdersInput, TableUncheckedUpdateWithoutOrdersInput>
    create: XOR<TableCreateWithoutOrdersInput, TableUncheckedCreateWithoutOrdersInput>
    where?: TableWhereInput
  }

  export type TableUpdateToOneWithWhereWithoutOrdersInput = {
    where?: TableWhereInput
    data: XOR<TableUpdateWithoutOrdersInput, TableUncheckedUpdateWithoutOrdersInput>
  }

  export type TableUpdateWithoutOrdersInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    number?: IntFieldUpdateOperationsInput | number
    qrCode?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    company?: CompanyUpdateOneRequiredWithoutTablesNestedInput
  }

  export type TableUncheckedUpdateWithoutOrdersInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    number?: IntFieldUpdateOperationsInput | number
    qrCode?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    companyUuid?: StringFieldUpdateOperationsInput | string
  }

  export type OrderItemUpsertWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    update: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
  }

  export type OrderItemUpdateWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    data: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>
  }

  export type OrderItemUpdateManyWithWhereWithoutOrderInput = {
    where: OrderItemScalarWhereInput
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyWithoutOrderInput>
  }

  export type OrderCreateWithoutItemsInput = {
    uuid?: string
    status?: string
    createdAt?: Date | string
    table: TableCreateNestedOneWithoutOrdersInput
  }

  export type OrderUncheckedCreateWithoutItemsInput = {
    uuid?: string
    tableUuid: string
    status?: string
    createdAt?: Date | string
  }

  export type OrderCreateOrConnectWithoutItemsInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
  }

  export type ProductCreateWithoutOrderItemsInput = {
    uuid?: string
    name: string
    price: number
    active?: boolean
    description: string
    category: CategoryCreateNestedOneWithoutProductsInput
    company: CompanyCreateNestedOneWithoutProductsInput
  }

  export type ProductUncheckedCreateWithoutOrderItemsInput = {
    uuid?: string
    name: string
    price: number
    active?: boolean
    description: string
    categoryUuid: string
    companyUuid: string
  }

  export type ProductCreateOrConnectWithoutOrderItemsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutOrderItemsInput, ProductUncheckedCreateWithoutOrderItemsInput>
  }

  export type OrderUpsertWithoutItemsInput = {
    update: XOR<OrderUpdateWithoutItemsInput, OrderUncheckedUpdateWithoutItemsInput>
    create: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutItemsInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutItemsInput, OrderUncheckedUpdateWithoutItemsInput>
  }

  export type OrderUpdateWithoutItemsInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    table?: TableUpdateOneRequiredWithoutOrdersNestedInput
  }

  export type OrderUncheckedUpdateWithoutItemsInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    tableUuid?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUpsertWithoutOrderItemsInput = {
    update: XOR<ProductUpdateWithoutOrderItemsInput, ProductUncheckedUpdateWithoutOrderItemsInput>
    create: XOR<ProductCreateWithoutOrderItemsInput, ProductUncheckedCreateWithoutOrderItemsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutOrderItemsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutOrderItemsInput, ProductUncheckedUpdateWithoutOrderItemsInput>
  }

  export type ProductUpdateWithoutOrderItemsInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    company?: CompanyUpdateOneRequiredWithoutProductsNestedInput
  }

  export type ProductUncheckedUpdateWithoutOrderItemsInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
    categoryUuid?: StringFieldUpdateOperationsInput | string
    companyUuid?: StringFieldUpdateOperationsInput | string
  }

  export type CompanyCreateWithoutCashierSessionsInput = {
    uuid?: string
    name: string
    menuTheme?: string | null
    soundOnOrderReady?: boolean
    createdAt?: Date | string
    users?: UserCreateNestedManyWithoutCompanyInput
    userGroups?: UserGroupCreateNestedManyWithoutCompanyInput
    tables?: TableCreateNestedManyWithoutCompanyInput
    categories?: CategoryCreateNestedManyWithoutCompanyInput
    products?: ProductCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutCashierSessionsInput = {
    uuid?: string
    name: string
    menuTheme?: string | null
    soundOnOrderReady?: boolean
    createdAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCompanyInput
    userGroups?: UserGroupUncheckedCreateNestedManyWithoutCompanyInput
    tables?: TableUncheckedCreateNestedManyWithoutCompanyInput
    categories?: CategoryUncheckedCreateNestedManyWithoutCompanyInput
    products?: ProductUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutCashierSessionsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutCashierSessionsInput, CompanyUncheckedCreateWithoutCashierSessionsInput>
  }

  export type CashierMovementCreateWithoutSessionInput = {
    uuid?: string
    type: string
    amount: number
    description?: string | null
    createdAt?: Date | string
  }

  export type CashierMovementUncheckedCreateWithoutSessionInput = {
    uuid?: string
    type: string
    amount: number
    description?: string | null
    createdAt?: Date | string
  }

  export type CashierMovementCreateOrConnectWithoutSessionInput = {
    where: CashierMovementWhereUniqueInput
    create: XOR<CashierMovementCreateWithoutSessionInput, CashierMovementUncheckedCreateWithoutSessionInput>
  }

  export type CashierMovementCreateManySessionInputEnvelope = {
    data: CashierMovementCreateManySessionInput | CashierMovementCreateManySessionInput[]
    skipDuplicates?: boolean
  }

  export type CompanyUpsertWithoutCashierSessionsInput = {
    update: XOR<CompanyUpdateWithoutCashierSessionsInput, CompanyUncheckedUpdateWithoutCashierSessionsInput>
    create: XOR<CompanyCreateWithoutCashierSessionsInput, CompanyUncheckedCreateWithoutCashierSessionsInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutCashierSessionsInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutCashierSessionsInput, CompanyUncheckedUpdateWithoutCashierSessionsInput>
  }

  export type CompanyUpdateWithoutCashierSessionsInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    menuTheme?: NullableStringFieldUpdateOperationsInput | string | null
    soundOnOrderReady?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCompanyNestedInput
    userGroups?: UserGroupUpdateManyWithoutCompanyNestedInput
    tables?: TableUpdateManyWithoutCompanyNestedInput
    categories?: CategoryUpdateManyWithoutCompanyNestedInput
    products?: ProductUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutCashierSessionsInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    menuTheme?: NullableStringFieldUpdateOperationsInput | string | null
    soundOnOrderReady?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCompanyNestedInput
    userGroups?: UserGroupUncheckedUpdateManyWithoutCompanyNestedInput
    tables?: TableUncheckedUpdateManyWithoutCompanyNestedInput
    categories?: CategoryUncheckedUpdateManyWithoutCompanyNestedInput
    products?: ProductUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CashierMovementUpsertWithWhereUniqueWithoutSessionInput = {
    where: CashierMovementWhereUniqueInput
    update: XOR<CashierMovementUpdateWithoutSessionInput, CashierMovementUncheckedUpdateWithoutSessionInput>
    create: XOR<CashierMovementCreateWithoutSessionInput, CashierMovementUncheckedCreateWithoutSessionInput>
  }

  export type CashierMovementUpdateWithWhereUniqueWithoutSessionInput = {
    where: CashierMovementWhereUniqueInput
    data: XOR<CashierMovementUpdateWithoutSessionInput, CashierMovementUncheckedUpdateWithoutSessionInput>
  }

  export type CashierMovementUpdateManyWithWhereWithoutSessionInput = {
    where: CashierMovementScalarWhereInput
    data: XOR<CashierMovementUpdateManyMutationInput, CashierMovementUncheckedUpdateManyWithoutSessionInput>
  }

  export type CashierMovementScalarWhereInput = {
    AND?: CashierMovementScalarWhereInput | CashierMovementScalarWhereInput[]
    OR?: CashierMovementScalarWhereInput[]
    NOT?: CashierMovementScalarWhereInput | CashierMovementScalarWhereInput[]
    uuid?: StringFilter<"CashierMovement"> | string
    sessionUuid?: StringFilter<"CashierMovement"> | string
    type?: StringFilter<"CashierMovement"> | string
    amount?: FloatFilter<"CashierMovement"> | number
    description?: StringNullableFilter<"CashierMovement"> | string | null
    createdAt?: DateTimeFilter<"CashierMovement"> | Date | string
  }

  export type CashierSessionCreateWithoutMovementsInput = {
    uuid?: string
    openedAt?: Date | string
    closedAt?: Date | string | null
    openingBalance?: number
    closingBalance?: number | null
    status?: string
    company: CompanyCreateNestedOneWithoutCashierSessionsInput
  }

  export type CashierSessionUncheckedCreateWithoutMovementsInput = {
    uuid?: string
    companyUuid: string
    openedAt?: Date | string
    closedAt?: Date | string | null
    openingBalance?: number
    closingBalance?: number | null
    status?: string
  }

  export type CashierSessionCreateOrConnectWithoutMovementsInput = {
    where: CashierSessionWhereUniqueInput
    create: XOR<CashierSessionCreateWithoutMovementsInput, CashierSessionUncheckedCreateWithoutMovementsInput>
  }

  export type CashierSessionUpsertWithoutMovementsInput = {
    update: XOR<CashierSessionUpdateWithoutMovementsInput, CashierSessionUncheckedUpdateWithoutMovementsInput>
    create: XOR<CashierSessionCreateWithoutMovementsInput, CashierSessionUncheckedCreateWithoutMovementsInput>
    where?: CashierSessionWhereInput
  }

  export type CashierSessionUpdateToOneWithWhereWithoutMovementsInput = {
    where?: CashierSessionWhereInput
    data: XOR<CashierSessionUpdateWithoutMovementsInput, CashierSessionUncheckedUpdateWithoutMovementsInput>
  }

  export type CashierSessionUpdateWithoutMovementsInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    openingBalance?: FloatFieldUpdateOperationsInput | number
    closingBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    company?: CompanyUpdateOneRequiredWithoutCashierSessionsNestedInput
  }

  export type CashierSessionUncheckedUpdateWithoutMovementsInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    companyUuid?: StringFieldUpdateOperationsInput | string
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    openingBalance?: FloatFieldUpdateOperationsInput | number
    closingBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateManyCompanyInput = {
    uuid?: string
    email: string
    passwordHash: string
    name: string
    role?: $Enums.UserRole
    createdAt?: Date | string
  }

  export type UserGroupCreateManyCompanyInput = {
    uuid?: string
    name: string
    permissions?: UserGroupCreatepermissionsInput | string[]
    createdAt?: Date | string
  }

  export type TableCreateManyCompanyInput = {
    uuid?: string
    number: number
    qrCode?: string
    description?: string
  }

  export type CategoryCreateManyCompanyInput = {
    uuid?: string
    name: string
  }

  export type ProductCreateManyCompanyInput = {
    uuid?: string
    name: string
    price: number
    active?: boolean
    description: string
    categoryUuid: string
  }

  export type CashierSessionCreateManyCompanyInput = {
    uuid?: string
    openedAt?: Date | string
    closedAt?: Date | string | null
    openingBalance?: number
    closingBalance?: number | null
    status?: string
  }

  export type UserUpdateWithoutCompanyInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupMembers?: UserGroupMemberUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCompanyInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupMembers?: UserGroupMemberUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutCompanyInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserGroupUpdateWithoutCompanyInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    permissions?: UserGroupUpdatepermissionsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: UserGroupMemberUpdateManyWithoutGroupNestedInput
  }

  export type UserGroupUncheckedUpdateWithoutCompanyInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    permissions?: UserGroupUpdatepermissionsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: UserGroupMemberUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type UserGroupUncheckedUpdateManyWithoutCompanyInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    permissions?: UserGroupUpdatepermissionsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TableUpdateWithoutCompanyInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    number?: IntFieldUpdateOperationsInput | number
    qrCode?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    orders?: OrderUpdateManyWithoutTableNestedInput
  }

  export type TableUncheckedUpdateWithoutCompanyInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    number?: IntFieldUpdateOperationsInput | number
    qrCode?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    orders?: OrderUncheckedUpdateManyWithoutTableNestedInput
  }

  export type TableUncheckedUpdateManyWithoutCompanyInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    number?: IntFieldUpdateOperationsInput | number
    qrCode?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type CategoryUpdateWithoutCompanyInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    products?: ProductUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutCompanyInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    products?: ProductUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateManyWithoutCompanyInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type ProductUpdateWithoutCompanyInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    orderItems?: OrderItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutCompanyInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
    categoryUuid?: StringFieldUpdateOperationsInput | string
    orderItems?: OrderItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateManyWithoutCompanyInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
    categoryUuid?: StringFieldUpdateOperationsInput | string
  }

  export type CashierSessionUpdateWithoutCompanyInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    openingBalance?: FloatFieldUpdateOperationsInput | number
    closingBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    movements?: CashierMovementUpdateManyWithoutSessionNestedInput
  }

  export type CashierSessionUncheckedUpdateWithoutCompanyInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    openingBalance?: FloatFieldUpdateOperationsInput | number
    closingBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    movements?: CashierMovementUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type CashierSessionUncheckedUpdateManyWithoutCompanyInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    openingBalance?: FloatFieldUpdateOperationsInput | number
    closingBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type UserGroupMemberCreateManyUserInput = {
    groupUuid: string
  }

  export type UserGroupMemberUpdateWithoutUserInput = {
    group?: UserGroupUpdateOneRequiredWithoutMembersNestedInput
  }

  export type UserGroupMemberUncheckedUpdateWithoutUserInput = {
    groupUuid?: StringFieldUpdateOperationsInput | string
  }

  export type UserGroupMemberUncheckedUpdateManyWithoutUserInput = {
    groupUuid?: StringFieldUpdateOperationsInput | string
  }

  export type UserGroupMemberCreateManyGroupInput = {
    userUuid: string
  }

  export type UserGroupMemberUpdateWithoutGroupInput = {
    user?: UserUpdateOneRequiredWithoutGroupMembersNestedInput
  }

  export type UserGroupMemberUncheckedUpdateWithoutGroupInput = {
    userUuid?: StringFieldUpdateOperationsInput | string
  }

  export type UserGroupMemberUncheckedUpdateManyWithoutGroupInput = {
    userUuid?: StringFieldUpdateOperationsInput | string
  }

  export type OrderItemCreateManyProductInput = {
    uuid?: string
    orderUuid: string
    quantity: number
    unitPrice: number
  }

  export type OrderItemUpdateWithoutProductInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput
  }

  export type OrderItemUncheckedUpdateWithoutProductInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    orderUuid?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
  }

  export type OrderItemUncheckedUpdateManyWithoutProductInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    orderUuid?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
  }

  export type ProductCreateManyCategoryInput = {
    uuid?: string
    name: string
    price: number
    active?: boolean
    description: string
    companyUuid: string
  }

  export type ProductUpdateWithoutCategoryInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
    company?: CompanyUpdateOneRequiredWithoutProductsNestedInput
    orderItems?: OrderItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutCategoryInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
    companyUuid?: StringFieldUpdateOperationsInput | string
    orderItems?: OrderItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateManyWithoutCategoryInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    description?: StringFieldUpdateOperationsInput | string
    companyUuid?: StringFieldUpdateOperationsInput | string
  }

  export type OrderCreateManyTableInput = {
    uuid?: string
    status?: string
    createdAt?: Date | string
  }

  export type OrderUpdateWithoutTableInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutTableInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutTableInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemCreateManyOrderInput = {
    uuid?: string
    productUuid: string
    quantity: number
    unitPrice: number
  }

  export type OrderItemUpdateWithoutOrderInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    product?: ProductUpdateOneRequiredWithoutOrderItemsNestedInput
  }

  export type OrderItemUncheckedUpdateWithoutOrderInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    productUuid?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
  }

  export type OrderItemUncheckedUpdateManyWithoutOrderInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    productUuid?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
  }

  export type CashierMovementCreateManySessionInput = {
    uuid?: string
    type: string
    amount: number
    description?: string | null
    createdAt?: Date | string
  }

  export type CashierMovementUpdateWithoutSessionInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CashierMovementUncheckedUpdateWithoutSessionInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CashierMovementUncheckedUpdateManyWithoutSessionInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}