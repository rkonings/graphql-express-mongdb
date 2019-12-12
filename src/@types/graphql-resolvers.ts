import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Author = {
   __typename?: 'Author',
  name: Scalars['String'],
  id: Scalars['String'],
  posts?: Maybe<Array<Maybe<Post>>>,
};

export type Client = {
   __typename?: 'Client',
  _id: Scalars['String'],
  name: Scalars['String'],
  address: Scalars['String'],
  zipcode: Scalars['String'],
  telephone: Scalars['String'],
  city: Scalars['String'],
  user: Scalars['String'],
  type?: Maybe<Scalars['String']>,
};

export type ClientData = {
   __typename?: 'ClientData',
  data?: Maybe<Client>,
};

export type InputSettings = {
  language?: Maybe<Scalars['String']>,
  dateFormat?: Maybe<Scalars['String']>,
  pushNotifications?: Maybe<Scalars['Boolean']>,
  unscribeEmailLink?: Maybe<Scalars['Boolean']>,
  signature?: Maybe<Scalars['String']>,
};

export type InputUser = {
  email?: Maybe<Scalars['String']>,
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  settings?: Maybe<InputSettings>,
};

export type Mutation = {
   __typename?: 'Mutation',
  addClient?: Maybe<Client>,
  signup?: Maybe<User>,
  login?: Maybe<Token>,
  updateUser?: Maybe<User>,
  seedClients?: Maybe<Array<Maybe<Client>>>,
};


export type MutationAddClientArgs = {
  name?: Maybe<Scalars['String']>,
  address?: Maybe<Scalars['String']>,
  zipcode?: Maybe<Scalars['String']>,
  city?: Maybe<Scalars['String']>,
  telephone?: Maybe<Scalars['String']>
};


export type MutationSignupArgs = {
  email: Scalars['String'],
  password: Scalars['String'],
  firstName: Scalars['String'],
  lastName: Scalars['String']
};


export type MutationLoginArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationUpdateUserArgs = {
  user?: Maybe<InputUser>
};


export type MutationSeedClientsArgs = {
  amount: Scalars['Int']
};

export type Post = {
   __typename?: 'Post',
  id: Scalars['String'],
  title: Scalars['String'],
  author?: Maybe<Author>,
};

export type Query = {
   __typename?: 'Query',
  posts?: Maybe<Array<Maybe<Post>>>,
  authors?: Maybe<Array<Maybe<Author>>>,
  users?: Maybe<Array<Maybe<User>>>,
  user?: Maybe<User>,
  clients?: Maybe<Array<Maybe<ClientData>>>,
};


export type QueryClientsArgs = {
  type?: Maybe<Array<Maybe<Scalars['String']>>>,
  city?: Maybe<Array<Maybe<Scalars['String']>>>
};

export type Settings = {
   __typename?: 'Settings',
  language: Scalars['String'],
  dateFormat: Scalars['String'],
  pushNotifications: Scalars['Boolean'],
  unscribeEmailLink: Scalars['Boolean'],
  signature: Scalars['String'],
};

export type Token = {
   __typename?: 'Token',
  token: Scalars['String'],
};

export type User = {
   __typename?: 'User',
  _id: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  settings?: Maybe<Settings>,
};



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
  Post: ResolverTypeWrapper<Post>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Author: ResolverTypeWrapper<Author>,
  User: ResolverTypeWrapper<User>,
  Settings: ResolverTypeWrapper<Settings>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  ClientData: ResolverTypeWrapper<ClientData>,
  Client: ResolverTypeWrapper<Client>,
  Mutation: ResolverTypeWrapper<{}>,
  Token: ResolverTypeWrapper<Token>,
  InputUser: InputUser,
  InputSettings: InputSettings,
  Int: ResolverTypeWrapper<Scalars['Int']>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  Post: Post,
  String: Scalars['String'],
  Author: Author,
  User: User,
  Settings: Settings,
  Boolean: Scalars['Boolean'],
  ClientData: ClientData,
  Client: Client,
  Mutation: {},
  Token: Token,
  InputUser: InputUser,
  InputSettings: InputSettings,
  Int: Scalars['Int'],
};

export type AuthorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Author'] = ResolversParentTypes['Author']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  posts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Post']>>>, ParentType, ContextType>,
};

export type ClientResolvers<ContextType = any, ParentType extends ResolversParentTypes['Client'] = ResolversParentTypes['Client']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  zipcode?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  telephone?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  user?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type ClientDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClientData'] = ResolversParentTypes['ClientData']> = {
  data?: Resolver<Maybe<ResolversTypes['Client']>, ParentType, ContextType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addClient?: Resolver<Maybe<ResolversTypes['Client']>, ParentType, ContextType, MutationAddClientArgs>,
  signup?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationSignupArgs, 'email' | 'password' | 'firstName' | 'lastName'>>,
  login?: Resolver<Maybe<ResolversTypes['Token']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>,
  updateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, MutationUpdateUserArgs>,
  seedClients?: Resolver<Maybe<Array<Maybe<ResolversTypes['Client']>>>, ParentType, ContextType, RequireFields<MutationSeedClientsArgs, 'amount'>>,
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  author?: Resolver<Maybe<ResolversTypes['Author']>, ParentType, ContextType>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  posts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Post']>>>, ParentType, ContextType>,
  authors?: Resolver<Maybe<Array<Maybe<ResolversTypes['Author']>>>, ParentType, ContextType>,
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  clients?: Resolver<Maybe<Array<Maybe<ResolversTypes['ClientData']>>>, ParentType, ContextType, QueryClientsArgs>,
};

export type SettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Settings'] = ResolversParentTypes['Settings']> = {
  language?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  dateFormat?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  pushNotifications?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  unscribeEmailLink?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  signature?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type TokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  settings?: Resolver<Maybe<ResolversTypes['Settings']>, ParentType, ContextType>,
};

export type Resolvers<ContextType = any> = {
  Author?: AuthorResolvers<ContextType>,
  Client?: ClientResolvers<ContextType>,
  ClientData?: ClientDataResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Post?: PostResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Settings?: SettingsResolvers<ContextType>,
  Token?: TokenResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
