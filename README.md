# Ubiquitongue

A review of notational conflicts that could be the leading cause of murder in researchers.

## Overview

Ubiquitongue is a comprehensive, searchable database of mathematical and computer science notations. It provides a bidirectional index that maps notations to their meanings, helping researchers disambiguate notational conflicts across academic papers.

## Live Website

Visit the live site at: https://ubqt.ranolp.dev

_Note: If the site is not available yet, GitHub Pages needs to be enabled in the repository settings and DNS needs to be configured._

## Development

### Prerequisites

- Node.js 20+
- pnpm 10.11.0

### Setup

```bash
# Install dependencies
pnpm install

# Seed sample data
pnpm --filter @ubiquitongue/data seed

# Start development server
pnpm --filter website dev
```

### Build

```bash
# Build all packages
pnpm build

# Build website only
pnpm --filter website build
```

### Deployment

The website is automatically deployed to GitHub Pages when changes are pushed to the main branch. The deployment workflow:

1. Builds the data layer
2. Generates the static website
3. Deploys to GitHub Pages

The site will be available at: https://ubqt.ranolp.dev

## Acknowledgement

Thanks for the Typst and its community efforts, which are widely adopted across this website. Especially...

- [typst/hayagriva](https://github.com/typst/hayagriva) - For maintaining bibliography
- 
