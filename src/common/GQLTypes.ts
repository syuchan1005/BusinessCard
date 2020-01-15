import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  ISODateTime: Date,
  Upload: Promise<{ filename: string, mimetype: string, encoding: string, createReadStream: () => NodeJS.ReadableStream }>,
  ISODate: Date,
  ISOTime: Date,
};




export type Mutation = {
   __typename?: 'Mutation',
  signUp: TokenResult,
  logIn: TokenResult,
  refreshToken: TokenResult,
  revokeToken: Scalars['Boolean'],
};


export type MutationSignUpArgs = {
  name: Scalars['String'],
  password: Scalars['String']
};


export type MutationLogInArgs = {
  name: Scalars['String'],
  password: Scalars['String']
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String']
};


export type MutationRevokeTokenArgs = {
  token: Scalars['String']
};

export enum Orientation {
  Portrait = 'PORTRAIT',
  Landscape = 'LANDSCAPE'
}

export type Query = {
   __typename?: 'Query',
  hello: Scalars['String'],
  helloA: Scalars['String'],
  templateMetadata: Array<TemplateMetadata>,
  templateMetadatum: TemplateMetadataResult,
};


export type QueryTemplateMetadatumArgs = {
  id: Scalars['ID']
};

export type Template = {
   __typename?: 'Template',
  id: Scalars['ID'],
  metaId: Scalars['ID'],
  type: TemplateType,
  svg: Scalars['String'],
  templateMetadata: TemplateMetadata,
  createdAt: Scalars['ISODateTime'],
  updatedAt: Scalars['ISODateTime'],
};

export type TemplateMetadata = {
   __typename?: 'TemplateMetadata',
  id: Scalars['ID'],
  authorId: Scalars['ID'],
  private: Scalars['Boolean'],
  name: Scalars['String'],
  description: Scalars['String'],
  sizeId: Scalars['ID'],
  orientation: Orientation,
  author: User,
  size: TemplateSize,
  templates: Array<Template>,
  createdAt: Scalars['ISODateTime'],
  updatedAt: Scalars['ISODateTime'],
};

export type TemplateMetadataResult = {
   __typename?: 'TemplateMetadataResult',
  success: Scalars['Boolean'],
  code?: Maybe<Scalars['String']>,
  message?: Maybe<Scalars['String']>,
  templateMetadata?: Maybe<TemplateMetadata>,
};

export type TemplateSize = {
   __typename?: 'TemplateSize',
  id: Scalars['ID'],
  name: Scalars['String'],
  width: Scalars['Int'],
  height: Scalars['Int'],
  templateMetadata: Array<TemplateMetadata>,
};

export enum TemplateType {
  Front = 'FRONT',
  Back = 'BACK'
}

export type Token = {
   __typename?: 'Token',
  accessToken: Scalars['String'],
  refreshToken: Scalars['String'],
  expiresIn: Scalars['Int'],
};

export type TokenResult = {
   __typename?: 'TokenResult',
  success: Scalars['Boolean'],
  code?: Maybe<Scalars['String']>,
  message?: Maybe<Scalars['String']>,
  token?: Maybe<Token>,
};


export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  name: Scalars['String'],
  templateMetadata: Array<TemplateMetadata>,
  createdAt: Scalars['ISODateTime'],
  updatedAt: Scalars['ISODateTime'],
};

export type TemplateMetadataQueryVariables = {};


export type TemplateMetadataQueryData = (
  { __typename?: 'Query' }
  & { templateMetadata: Array<(
    { __typename?: 'TemplateMetadata' }
    & Pick<TemplateMetadata, 'id' | 'authorId' | 'private' | 'name' | 'description' | 'sizeId' | 'orientation' | 'createdAt' | 'updatedAt'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    ), size: (
      { __typename?: 'TemplateSize' }
      & Pick<TemplateSize, 'id' | 'name' | 'width' | 'height'>
    ), templates: Array<(
      { __typename?: 'Template' }
      & Pick<Template, 'id' | 'type' | 'svg'>
    )> }
  )> }
);

export type TemplateMetadatumQueryVariables = {
  id: Scalars['ID']
};


export type TemplateMetadatumQueryData = (
  { __typename?: 'Query' }
  & { templateMetadatum: (
    { __typename?: 'TemplateMetadataResult' }
    & Pick<TemplateMetadataResult, 'success' | 'code' | 'message'>
    & { templateMetadata: Maybe<(
      { __typename?: 'TemplateMetadata' }
      & Pick<TemplateMetadata, 'id' | 'name'>
      & { templates: Array<(
        { __typename?: 'Template' }
        & Pick<Template, 'id' | 'type' | 'svg'>
      )> }
    )> }
  ) }
);

export type LogInMutationVariables = {
  name: Scalars['String'],
  password: Scalars['String']
};


export type LogInMutationData = (
  { __typename?: 'Mutation' }
  & { logIn: (
    { __typename?: 'TokenResult' }
    & Pick<TokenResult, 'success' | 'code' | 'message'>
    & { token: Maybe<(
      { __typename?: 'Token' }
      & Pick<Token, 'accessToken' | 'refreshToken' | 'expiresIn'>
    )> }
  ) }
);

export type SignUpMutationVariables = {
  name: Scalars['String'],
  password: Scalars['String']
};


export type SignUpMutationData = (
  { __typename?: 'Mutation' }
  & { signUp: (
    { __typename?: 'TokenResult' }
    & Pick<TokenResult, 'success' | 'code' | 'message'>
    & { token: Maybe<(
      { __typename?: 'Token' }
      & Pick<Token, 'accessToken' | 'refreshToken' | 'expiresIn'>
    )> }
  ) }
);



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  String: ResolverTypeWrapper<Scalars['String']>,
  TemplateMetadata: ResolverTypeWrapper<TemplateMetadata>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Orientation: Orientation,
  User: ResolverTypeWrapper<User>,
  ISODateTime: ResolverTypeWrapper<Scalars['ISODateTime']>,
  TemplateSize: ResolverTypeWrapper<TemplateSize>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Template: ResolverTypeWrapper<Template>,
  TemplateType: TemplateType,
  TemplateMetadataResult: ResolverTypeWrapper<TemplateMetadataResult>,
  Mutation: ResolverTypeWrapper<{}>,
  TokenResult: ResolverTypeWrapper<TokenResult>,
  Token: ResolverTypeWrapper<Token>,
  Upload: ResolverTypeWrapper<Scalars['Upload']>,
  ISODate: ResolverTypeWrapper<Scalars['ISODate']>,
  ISOTime: ResolverTypeWrapper<Scalars['ISOTime']>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  String: Scalars['String'],
  TemplateMetadata: TemplateMetadata,
  ID: Scalars['ID'],
  Boolean: Scalars['Boolean'],
  Orientation: Orientation,
  User: User,
  ISODateTime: Scalars['ISODateTime'],
  TemplateSize: TemplateSize,
  Int: Scalars['Int'],
  Template: Template,
  TemplateType: TemplateType,
  TemplateMetadataResult: TemplateMetadataResult,
  Mutation: {},
  TokenResult: TokenResult,
  Token: Token,
  Upload: Scalars['Upload'],
  ISODate: Scalars['ISODate'],
  ISOTime: Scalars['ISOTime'],
};

export interface IsoDateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ISODate'], any> {
  name: 'ISODate'
}

export interface IsoDateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ISODateTime'], any> {
  name: 'ISODateTime'
}

export interface IsoTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ISOTime'], any> {
  name: 'ISOTime'
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  signUp?: Resolver<ResolversTypes['TokenResult'], ParentType, ContextType, RequireFields<MutationSignUpArgs, 'name' | 'password'>>,
  logIn?: Resolver<ResolversTypes['TokenResult'], ParentType, ContextType, RequireFields<MutationLogInArgs, 'name' | 'password'>>,
  refreshToken?: Resolver<ResolversTypes['TokenResult'], ParentType, ContextType, RequireFields<MutationRefreshTokenArgs, 'refreshToken'>>,
  revokeToken?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRevokeTokenArgs, 'token'>>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  hello?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  helloA?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  templateMetadata?: Resolver<Array<ResolversTypes['TemplateMetadata']>, ParentType, ContextType>,
  templateMetadatum?: Resolver<ResolversTypes['TemplateMetadataResult'], ParentType, ContextType, RequireFields<QueryTemplateMetadatumArgs, 'id'>>,
};

export type TemplateResolvers<ContextType = any, ParentType extends ResolversParentTypes['Template'] = ResolversParentTypes['Template']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  metaId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  type?: Resolver<ResolversTypes['TemplateType'], ParentType, ContextType>,
  svg?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  templateMetadata?: Resolver<ResolversTypes['TemplateMetadata'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['ISODateTime'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['ISODateTime'], ParentType, ContextType>,
};

export type TemplateMetadataResolvers<ContextType = any, ParentType extends ResolversParentTypes['TemplateMetadata'] = ResolversParentTypes['TemplateMetadata']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  authorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  private?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  sizeId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  orientation?: Resolver<ResolversTypes['Orientation'], ParentType, ContextType>,
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  size?: Resolver<ResolversTypes['TemplateSize'], ParentType, ContextType>,
  templates?: Resolver<Array<ResolversTypes['Template']>, ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['ISODateTime'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['ISODateTime'], ParentType, ContextType>,
};

export type TemplateMetadataResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['TemplateMetadataResult'] = ResolversParentTypes['TemplateMetadataResult']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  templateMetadata?: Resolver<Maybe<ResolversTypes['TemplateMetadata']>, ParentType, ContextType>,
};

export type TemplateSizeResolvers<ContextType = any, ParentType extends ResolversParentTypes['TemplateSize'] = ResolversParentTypes['TemplateSize']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  width?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  height?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  templateMetadata?: Resolver<Array<ResolversTypes['TemplateMetadata']>, ParentType, ContextType>,
};

export type TokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  expiresIn?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
};

export type TokenResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['TokenResult'] = ResolversParentTypes['TokenResult']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  token?: Resolver<Maybe<ResolversTypes['Token']>, ParentType, ContextType>,
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  templateMetadata?: Resolver<Array<ResolversTypes['TemplateMetadata']>, ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['ISODateTime'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['ISODateTime'], ParentType, ContextType>,
};

export type Resolvers<ContextType = any> = {
  ISODate?: GraphQLScalarType,
  ISODateTime?: GraphQLScalarType,
  ISOTime?: GraphQLScalarType,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Template?: TemplateResolvers<ContextType>,
  TemplateMetadata?: TemplateMetadataResolvers<ContextType>,
  TemplateMetadataResult?: TemplateMetadataResultResolvers<ContextType>,
  TemplateSize?: TemplateSizeResolvers<ContextType>,
  Token?: TokenResolvers<ContextType>,
  TokenResult?: TokenResultResolvers<ContextType>,
  Upload?: GraphQLScalarType,
  User?: UserResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
