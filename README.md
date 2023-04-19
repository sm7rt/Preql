[![Deploy frontend to staging](https://github.com/preql-data/preql-web/actions/workflows/deploy_staging.yml/badge.svg)](https://github.com/preql-data/preql-web/actions/workflows/deploy_staging.yml)
[![test](https://github.com/preql-data/preql-web/actions/workflows/test.yml/badge.svg)](https://github.com/preql-data/preql-web/actions/workflows/test.yml)
[![Build and Deploy](https://github.com/preql-data/preql-web/actions/workflows/deploy_ghpage.yml/badge.svg)](https://github.com/preql-data/preql-web/actions/workflows/deploy_ghpage.yml)

## Prerequisite

[nvm](https://github.com/nvm-sh/nvm) for setting the proper version of node

[node v16.15.0](https://nodejs.org/fa/blog/release/v16.15.0/)

[npm 8.5.5](https://www.npmjs.com/package/npm/v/8.5.5)

## Environment variables

You will need an `.env` file, you can look at the `.env.example` to see values that need to be set

## Architecture

[This document](https://www.notion.so/preql/Front-End-Architecture-bc553e45b82a42098088f5c5369bed27) will enumerate our architecture and practices

## Running dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running tests

Currrently we are using jest to run unit tests

```bash
npm run jest
```

## Linting and code formatting

We are using a combination of prettier and eslint, you can run the following command to apply these rules

```bash
npm run lint
```

## [Storybook](https://storybook.js.org/)

- Please refer to documentation for [writing Stories](https://storybook.js.org/docs/react/writing-stories/introduction)

## Preview links

We are currently leveraging [vercel](https://vercel.com) with 2 projects for this repo.

1. For the [nextjs deploy](https://vercel.com/preql-team/preql-web)
2. For the [storybook deploy](https://vercel.com/preql-team/preql-web-storybook)

These will generate preview links of changes on pull requests, and help quickly validate changes
