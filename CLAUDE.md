# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Stock Analysis UI** built with SvelteKit, designed to run on Cloudflare's platform. The application provides stock analysis functionality using Cloudflare Pages, D1 database, and Durable Objects for persistent analysis workflows.

## Development Commands

### Essential Commands
- `yarn dev` - Start development server
- `yarn build` - Build for production  
- `yarn preview` - Preview production build
- `yarn test` - Run tests with Vitest
- `yarn docs` - Generate JSDoc documentation

### Database Commands
- `npx d1 create --name <db-name>` - Create new D1 database
- `yarn d1:migrate` - Apply database migrations (requires database and env setup)

### Deployment
- Uses `wrangler` for Cloudflare deployment
- Build output goes to `.svelte-kit/cloudflare` for Pages deployment
- See `wrangler.jsonc` for Cloudflare Worker configuration

## Architecture & Key Components

### SvelteKit Configuration
- **Adapter**: `@sveltejs/adapter-cloudflare` for Cloudflare Pages
- **Aliases**: `$components`, `$stores`, `$utils` mapped to `src/lib/` subdirectories
- **Environment**: Uses `./environments` directory for environment variables

### Cloudflare Integration
- **Durable Objects**: `StockAnalysisDurableObject` handles persistent stock analysis workflows
- **D1 Database**: SQLite-compatible edge database for storing analysis data
- **Worker Binding**: `STOCK_ANALYSIS_DO` binding configured in `wrangler.jsonc`

### Stock Analysis System
The core analysis system is built around a Durable Object (`src/lib/utils/StockAnalysisDurableObject.js`):

- **Database Schema**: 
  - `stock_analysis` - Main analysis tracking table
  - `analysis_steps` - Individual analysis step tracking
  - `company_information` - Company data storage
  - `stock_price_history` - Price data storage

- **Analysis Steps**: 6-step process including company info, price history, news, analyst ratings, social sentiment, and completion

- **API Endpoint**: `/api/analyze` POST endpoint for triggering analysis

### Component Architecture
- **Theme System**: Dark/light mode via `themeStore.js` with persistent localStorage
- **Analysis State**: Centralized analysis state management via `analysisStore.js`
- **Reusable Components**: Button, Input, Alert, AnalysisLoader, NavBar, Footer in `src/lib/components/`

### Routing Structure
- `/` - Home page
- `/analysis` - Main stock analysis interface
- `/about` - About page
- `/contact` - Contact page
- `/api/analyze` - Analysis API endpoint

## Development Guidelines

### Code Style
- **JavaScript**: Use JSDoc for type documentation and better IntelliSense
- **Functions**: Prefer named functions over arrow functions for primary declarations
- **Documentation**: JSDoc required for all functions, especially database operations
- **Error Handling**: Implement comprehensive error handling for all async operations

### Database Operations
- Always use parameterized queries for D1 operations
- Implement proper error handling for database failures
- Use JSDoc to document expected return types and parameters

### Component Development
- Follow existing component patterns in `src/lib/components/`
- Use Svelte stores for state management
- Implement proper loading and error states
- Follow TailwindCSS utility-first approach

### Testing
- Vitest configured for unit testing
- Write tests for utility functions and complex logic
- Test API endpoints thoroughly

## Important Notes

- **Cloudflare Context**: Many operations require `platform.env` context from Cloudflare
- **Durable Objects**: Stock analysis state persists across requests via Durable Objects
- **Build Tool**: Uses Vite with SvelteKit and TailwindCSS integration
- **Documentation**: JSDoc configuration available for generating API docs