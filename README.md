![Scooby](images/scooby-logo.svg)

_Scooby_ is an optimized visual, regression and E2E testing framework.
It can be used to generate many different kinds of reports, and integrates
seemlessly with our GitHub-based workflows.

Scooby was built with these goals in mind:

- Make it easy to add new regression, visual, and E2E tests
- Support multiple test formats out of the box (such as HTML, PNG, code, etc) to minimize the amount of boilerplate glue code.
- Being cost-efficient
- Be highly extensible to support new kinds of tests and reports
- Integrate well with our GitHub-based workflows

# Overview

TODO

# Getting started

This section covers the basics to use Scooby in your projects.
We'll start from the initial repository setup, gradually
covering all the steps to get a simple working setup.

> **Note for Scooby developers**: this section does not cover how to contribute to the Scooby project.
> If your goal is to extend or modify Scooby itself, please
> head to the [Developer guide](#developer-guide) section below.

## First-time repository setup

If this is the first time Scooby is used inside your project,
you'll need to set up a couple of things beforehand.

### Environment variables

Scooby requires several environment variables to work.
These variables provide the information and access tokens necessary
to generate reports, upload artifacts, update GitHub statuses and more.

These are the environment variables you need to specify in the project CI:

> If you are using CircleCI in your project, you'll need to specify them
> inside the Project Settings > Environment Variables section.

| Name                           | Description                                                                                                                                                       |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SCOOBY_AWS_S3_BUCKET`         | The name of the AWS S3 bucket that will host the reports and artifacts.                                                                                           |
| `SCOOBY_AWS_S3_REGION`         | The AWS region for the S3 bucket, such as `us-west-2`                                                                                                             |
| `SCOOBY_AWS_ACCESS_KEY_ID`     | An AWS Access Key ID with write access to the S3 bucket. There are important security considerations you should keep in mind, please read the TODO section below. |
| `SCOOBY_AWS_SECRET_ACCESS_KEY` | The AWS secret access key associated with the above account.                                                                                                      |
| `SCOOBY_GITHUB_ACCESS_TOKEN`   | A Github Access Token with write access to the repository you are planning to use.                                                                                |
| `SCOOBY_WEB_BASE_URL`          | Set this to `https://animaapp.github.io/scooby` unless you're planning to host the frontend somewhere else.                                                       |

## Adding your first Scooby test on CircleCI

## Adding the GitHub status update step

# FAQ

This section discusses some of the commonly asked questions related
to Scooby or testing in general.

## What's the difference between Fidelity and Regression tests?

While Fidelity and Regression tests share some common aspects,
they are designed to answer two very different questions:

- **Regression tests compare _two different versions of the same dataset_**.
  For example, a regression test might verify that the output of a
  code generator inside a feature branch is not different from a
  known-good state on the `main` branch.
- **Fidelity tests compare _the same version of two different datasets_**.
  For example, a fidelity test might compare how visually similar a given web page is to its Figma design.

From these definitions, we can draw several conclusions:

- Regression tests usually produce a binary good/bad result for each
  test entry, while fidelity tests produce a continuous similarity ratio.
- Regression tests aim at having zero differences between the two
  datasets, as we are testing the same system at two different points in time.
- Fidelity tests _could_ have differences and still be successful, as
  having a perfect match between datasets produced by two different systems might not be achieavable.

## Why the name _Scooby_?

There are two possible explanations, depending who's asking :D

- Scooby Doo is a famous detective dog, and as a tool, Scooby
  help us _detect_ regressions and problems.
- During our on-site at Anima, one of the conversation topics was
  [Cockney Rhyming slangs](https://en.wikipedia.org/wiki/Rhyming_slang).
  Among the others, turns out _scooby_ is a slang term for _clue_.
  For example, you could say: _I don't have a scooby about it_, which means _I don't have a clue about it_.
  I fell in love with the term, and when it came time to choose a name
  for the project, it was an easy choice.

# Reference

This section acts as a reference for the different tests that can be performed with Scooby, along with other useful commands.

## Visual Regression tests

Visual regression tests can be used to verify if changes introduced
in a commit (PR) are causing visual regressions.

In a nutshell, Scooby compares the dataset generated in a given commit (or PR) with the dataset of the _base commit_ (main branch).
This allow us to determine whether the changes in a given PR are
changing the behavior of our production systems (the ones on main) in a visual way.

```mermaid
graph LR;
  prod(Production - main branch)
  pr(PR commit - feature branch)
  pr-->Scooby
  prod-->Scooby
  Scooby-->Regression[Regression Report]
```

### Basic usage

```
npx @animaapp/scooby-cli regression --name "regression-name" --tests /path/to/tests --file-type=html
```

## Visual Fidelity tests

```
npx @animaapp/scooby-cli fidelity --name "fidelity-name" --expected /path/to/expected/tests --actual /path/to/actual/tests --file-type=png
```

# Developer guide

# Troubleshooting

## Error: Could not find expected browser (chrome) locally. Run `npm install` to download the correct Chromium revision (1045629).

If you are on macOS you might experience the following error when running Scooby:

```
Error: Could not find expected browser (chrome) locally. Run `npm install` to download the correct Chromium revision (1045629).
```

To solve it, you can force a chromium installation with:

```
node node_modules/puppeteer/install.js
```
