/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './app/routes/__root'
import { Route as IndexImport } from './app/routes/index'
import { Route as authSignupImport } from './app/routes/(auth)/signup'
import { Route as authLoginImport } from './app/routes/(auth)/login'
import { Route as appAppImport } from './app/routes/(app)/app'
import { Route as appAppIndexImport } from './app/routes/(app)/app.index'
import { Route as appAppForumsImport } from './app/routes/(app)/app.forums'
import { Route as appAppForumsForumIdImport } from './app/routes/(app)/app.forums_.$forumId'
import { Route as appAppForumsForumIdThreadsThreadIdImport } from './app/routes/(app)/app.forums_.$forumId_.threads_.$threadId'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const authSignupRoute = authSignupImport.update({
  id: '/(auth)/signup',
  path: '/signup',
  getParentRoute: () => rootRoute,
} as any)

const authLoginRoute = authLoginImport.update({
  id: '/(auth)/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const appAppRoute = appAppImport.update({
  id: '/(app)/app',
  path: '/app',
  getParentRoute: () => rootRoute,
} as any)

const appAppIndexRoute = appAppIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => appAppRoute,
} as any)

const appAppForumsRoute = appAppForumsImport.update({
  id: '/forums',
  path: '/forums',
  getParentRoute: () => appAppRoute,
} as any)

const appAppForumsForumIdRoute = appAppForumsForumIdImport.update({
  id: '/forums_/$forumId',
  path: '/forums/$forumId',
  getParentRoute: () => appAppRoute,
} as any)

const appAppForumsForumIdThreadsThreadIdRoute =
  appAppForumsForumIdThreadsThreadIdImport.update({
    id: '/forums_/$forumId_/threads_/$threadId',
    path: '/forums/$forumId/threads/$threadId',
    getParentRoute: () => appAppRoute,
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
    '/(app)/app': {
      id: '/(app)/app'
      path: '/app'
      fullPath: '/app'
      preLoaderRoute: typeof appAppImport
      parentRoute: typeof rootRoute
    }
    '/(auth)/login': {
      id: '/(auth)/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof authLoginImport
      parentRoute: typeof rootRoute
    }
    '/(auth)/signup': {
      id: '/(auth)/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof authSignupImport
      parentRoute: typeof rootRoute
    }
    '/(app)/app/forums': {
      id: '/(app)/app/forums'
      path: '/forums'
      fullPath: '/app/forums'
      preLoaderRoute: typeof appAppForumsImport
      parentRoute: typeof appAppImport
    }
    '/(app)/app/': {
      id: '/(app)/app/'
      path: '/'
      fullPath: '/app/'
      preLoaderRoute: typeof appAppIndexImport
      parentRoute: typeof appAppImport
    }
    '/(app)/app/forums_/$forumId': {
      id: '/(app)/app/forums_/$forumId'
      path: '/forums/$forumId'
      fullPath: '/app/forums/$forumId'
      preLoaderRoute: typeof appAppForumsForumIdImport
      parentRoute: typeof appAppImport
    }
    '/(app)/app/forums_/$forumId_/threads_/$threadId': {
      id: '/(app)/app/forums_/$forumId_/threads_/$threadId'
      path: '/forums/$forumId/threads/$threadId'
      fullPath: '/app/forums/$forumId/threads/$threadId'
      preLoaderRoute: typeof appAppForumsForumIdThreadsThreadIdImport
      parentRoute: typeof appAppImport
    }
  }
}

// Create and export the route tree

interface appAppRouteChildren {
  appAppForumsRoute: typeof appAppForumsRoute
  appAppIndexRoute: typeof appAppIndexRoute
  appAppForumsForumIdRoute: typeof appAppForumsForumIdRoute
  appAppForumsForumIdThreadsThreadIdRoute: typeof appAppForumsForumIdThreadsThreadIdRoute
}

const appAppRouteChildren: appAppRouteChildren = {
  appAppForumsRoute: appAppForumsRoute,
  appAppIndexRoute: appAppIndexRoute,
  appAppForumsForumIdRoute: appAppForumsForumIdRoute,
  appAppForumsForumIdThreadsThreadIdRoute:
    appAppForumsForumIdThreadsThreadIdRoute,
}

const appAppRouteWithChildren =
  appAppRoute._addFileChildren(appAppRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/app': typeof appAppRouteWithChildren
  '/login': typeof authLoginRoute
  '/signup': typeof authSignupRoute
  '/app/forums': typeof appAppForumsRoute
  '/app/': typeof appAppIndexRoute
  '/app/forums/$forumId': typeof appAppForumsForumIdRoute
  '/app/forums/$forumId/threads/$threadId': typeof appAppForumsForumIdThreadsThreadIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/login': typeof authLoginRoute
  '/signup': typeof authSignupRoute
  '/app/forums': typeof appAppForumsRoute
  '/app': typeof appAppIndexRoute
  '/app/forums/$forumId': typeof appAppForumsForumIdRoute
  '/app/forums/$forumId/threads/$threadId': typeof appAppForumsForumIdThreadsThreadIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/(app)/app': typeof appAppRouteWithChildren
  '/(auth)/login': typeof authLoginRoute
  '/(auth)/signup': typeof authSignupRoute
  '/(app)/app/forums': typeof appAppForumsRoute
  '/(app)/app/': typeof appAppIndexRoute
  '/(app)/app/forums_/$forumId': typeof appAppForumsForumIdRoute
  '/(app)/app/forums_/$forumId_/threads_/$threadId': typeof appAppForumsForumIdThreadsThreadIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/app'
    | '/login'
    | '/signup'
    | '/app/forums'
    | '/app/'
    | '/app/forums/$forumId'
    | '/app/forums/$forumId/threads/$threadId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/login'
    | '/signup'
    | '/app/forums'
    | '/app'
    | '/app/forums/$forumId'
    | '/app/forums/$forumId/threads/$threadId'
  id:
    | '__root__'
    | '/'
    | '/(app)/app'
    | '/(auth)/login'
    | '/(auth)/signup'
    | '/(app)/app/forums'
    | '/(app)/app/'
    | '/(app)/app/forums_/$forumId'
    | '/(app)/app/forums_/$forumId_/threads_/$threadId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  appAppRoute: typeof appAppRouteWithChildren
  authLoginRoute: typeof authLoginRoute
  authSignupRoute: typeof authSignupRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  appAppRoute: appAppRouteWithChildren,
  authLoginRoute: authLoginRoute,
  authSignupRoute: authSignupRoute,
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
        "/(app)/app",
        "/(auth)/login",
        "/(auth)/signup"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/(app)/app": {
      "filePath": "(app)/app.tsx",
      "children": [
        "/(app)/app/forums",
        "/(app)/app/",
        "/(app)/app/forums_/$forumId",
        "/(app)/app/forums_/$forumId_/threads_/$threadId"
      ]
    },
    "/(auth)/login": {
      "filePath": "(auth)/login.tsx"
    },
    "/(auth)/signup": {
      "filePath": "(auth)/signup.tsx"
    },
    "/(app)/app/forums": {
      "filePath": "(app)/app.forums.tsx",
      "parent": "/(app)/app"
    },
    "/(app)/app/": {
      "filePath": "(app)/app.index.tsx",
      "parent": "/(app)/app"
    },
    "/(app)/app/forums_/$forumId": {
      "filePath": "(app)/app.forums_.$forumId.tsx",
      "parent": "/(app)/app"
    },
    "/(app)/app/forums_/$forumId_/threads_/$threadId": {
      "filePath": "(app)/app.forums_.$forumId_.threads_.$threadId.tsx",
      "parent": "/(app)/app"
    }
  }
}
ROUTE_MANIFEST_END */
