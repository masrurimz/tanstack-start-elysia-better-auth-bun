/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as PokemonImport } from './routes/pokemon'
import { Route as AuthImport } from './routes/_auth'
import { Route as IndexImport } from './routes/index'
import { Route as PokemonIndexImport } from './routes/pokemon.index'
import { Route as CountIndexImport } from './routes/count.index'
import { Route as PokemonResultsImport } from './routes/pokemon.results'
import { Route as CountTanstackImport } from './routes/count.tanstack'
import { Route as CountElysiaImport } from './routes/count.elysia'
import { Route as AuthRegisterImport } from './routes/_auth/register'
import { Route as AuthLoginImport } from './routes/_auth/login'

// Create/Update Routes

const PokemonRoute = PokemonImport.update({
  id: '/pokemon',
  path: '/pokemon',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const PokemonIndexRoute = PokemonIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => PokemonRoute,
} as any)

const CountIndexRoute = CountIndexImport.update({
  id: '/count/',
  path: '/count/',
  getParentRoute: () => rootRoute,
} as any)

const PokemonResultsRoute = PokemonResultsImport.update({
  id: '/results',
  path: '/results',
  getParentRoute: () => PokemonRoute,
} as any)

const CountTanstackRoute = CountTanstackImport.update({
  id: '/count/tanstack',
  path: '/count/tanstack',
  getParentRoute: () => rootRoute,
} as any)

const CountElysiaRoute = CountElysiaImport.update({
  id: '/count/elysia',
  path: '/count/elysia',
  getParentRoute: () => rootRoute,
} as any)

const AuthRegisterRoute = AuthRegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => AuthRoute,
} as any)

const AuthLoginRoute = AuthLoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => AuthRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/pokemon': {
      id: '/pokemon'
      path: '/pokemon'
      fullPath: '/pokemon'
      preLoaderRoute: typeof PokemonImport
      parentRoute: typeof rootRoute
    }
    '/_auth/login': {
      id: '/_auth/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof AuthLoginImport
      parentRoute: typeof AuthImport
    }
    '/_auth/register': {
      id: '/_auth/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof AuthRegisterImport
      parentRoute: typeof AuthImport
    }
    '/count/elysia': {
      id: '/count/elysia'
      path: '/count/elysia'
      fullPath: '/count/elysia'
      preLoaderRoute: typeof CountElysiaImport
      parentRoute: typeof rootRoute
    }
    '/count/tanstack': {
      id: '/count/tanstack'
      path: '/count/tanstack'
      fullPath: '/count/tanstack'
      preLoaderRoute: typeof CountTanstackImport
      parentRoute: typeof rootRoute
    }
    '/pokemon/results': {
      id: '/pokemon/results'
      path: '/results'
      fullPath: '/pokemon/results'
      preLoaderRoute: typeof PokemonResultsImport
      parentRoute: typeof PokemonImport
    }
    '/count/': {
      id: '/count/'
      path: '/count'
      fullPath: '/count'
      preLoaderRoute: typeof CountIndexImport
      parentRoute: typeof rootRoute
    }
    '/pokemon/': {
      id: '/pokemon/'
      path: '/'
      fullPath: '/pokemon/'
      preLoaderRoute: typeof PokemonIndexImport
      parentRoute: typeof PokemonImport
    }
  }
}

// Create and export the route tree

interface AuthRouteChildren {
  AuthLoginRoute: typeof AuthLoginRoute
  AuthRegisterRoute: typeof AuthRegisterRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthLoginRoute: AuthLoginRoute,
  AuthRegisterRoute: AuthRegisterRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

interface PokemonRouteChildren {
  PokemonResultsRoute: typeof PokemonResultsRoute
  PokemonIndexRoute: typeof PokemonIndexRoute
}

const PokemonRouteChildren: PokemonRouteChildren = {
  PokemonResultsRoute: PokemonResultsRoute,
  PokemonIndexRoute: PokemonIndexRoute,
}

const PokemonRouteWithChildren =
  PokemonRoute._addFileChildren(PokemonRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthRouteWithChildren
  '/pokemon': typeof PokemonRouteWithChildren
  '/login': typeof AuthLoginRoute
  '/register': typeof AuthRegisterRoute
  '/count/elysia': typeof CountElysiaRoute
  '/count/tanstack': typeof CountTanstackRoute
  '/pokemon/results': typeof PokemonResultsRoute
  '/count': typeof CountIndexRoute
  '/pokemon/': typeof PokemonIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthRouteWithChildren
  '/login': typeof AuthLoginRoute
  '/register': typeof AuthRegisterRoute
  '/count/elysia': typeof CountElysiaRoute
  '/count/tanstack': typeof CountTanstackRoute
  '/pokemon/results': typeof PokemonResultsRoute
  '/count': typeof CountIndexRoute
  '/pokemon': typeof PokemonIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_auth': typeof AuthRouteWithChildren
  '/pokemon': typeof PokemonRouteWithChildren
  '/_auth/login': typeof AuthLoginRoute
  '/_auth/register': typeof AuthRegisterRoute
  '/count/elysia': typeof CountElysiaRoute
  '/count/tanstack': typeof CountTanstackRoute
  '/pokemon/results': typeof PokemonResultsRoute
  '/count/': typeof CountIndexRoute
  '/pokemon/': typeof PokemonIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/pokemon'
    | '/login'
    | '/register'
    | '/count/elysia'
    | '/count/tanstack'
    | '/pokemon/results'
    | '/count'
    | '/pokemon/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/login'
    | '/register'
    | '/count/elysia'
    | '/count/tanstack'
    | '/pokemon/results'
    | '/count'
    | '/pokemon'
  id:
    | '__root__'
    | '/'
    | '/_auth'
    | '/pokemon'
    | '/_auth/login'
    | '/_auth/register'
    | '/count/elysia'
    | '/count/tanstack'
    | '/pokemon/results'
    | '/count/'
    | '/pokemon/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthRoute: typeof AuthRouteWithChildren
  PokemonRoute: typeof PokemonRouteWithChildren
  CountElysiaRoute: typeof CountElysiaRoute
  CountTanstackRoute: typeof CountTanstackRoute
  CountIndexRoute: typeof CountIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthRoute: AuthRouteWithChildren,
  PokemonRoute: PokemonRouteWithChildren,
  CountElysiaRoute: CountElysiaRoute,
  CountTanstackRoute: CountTanstackRoute,
  CountIndexRoute: CountIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_auth",
        "/pokemon",
        "/count/elysia",
        "/count/tanstack",
        "/count/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/login",
        "/_auth/register"
      ]
    },
    "/pokemon": {
      "filePath": "pokemon.tsx",
      "children": [
        "/pokemon/results",
        "/pokemon/"
      ]
    },
    "/_auth/login": {
      "filePath": "_auth/login.tsx",
      "parent": "/_auth"
    },
    "/_auth/register": {
      "filePath": "_auth/register.tsx",
      "parent": "/_auth"
    },
    "/count/elysia": {
      "filePath": "count.elysia.tsx"
    },
    "/count/tanstack": {
      "filePath": "count.tanstack.tsx"
    },
    "/pokemon/results": {
      "filePath": "pokemon.results.tsx",
      "parent": "/pokemon"
    },
    "/count/": {
      "filePath": "count.index.tsx"
    },
    "/pokemon/": {
      "filePath": "pokemon.index.tsx",
      "parent": "/pokemon"
    }
  }
}
ROUTE_MANIFEST_END */
