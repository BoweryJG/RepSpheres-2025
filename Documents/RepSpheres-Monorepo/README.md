# RepSpheres Monorepo

This monorepo contains all RepSpheres applications and shared packages, providing a unified architecture for development, testing, and deployment.

## Project Structure

```
RepSpheres-Monorepo/
├── apps/                  # Application-specific code
│   ├── main/              # globalrepspheres (main app)
│   ├── market-insights/   # Market Insights app
│   ├── crm/               # SphereOS/CRM app
│   ├── linguistics/       # Linguistics app
│   └── workspace/         # Workspace app
│
└── packages/              # Shared code and services
    ├── api-gateway/       # API Gateway for unified backend communication
    ├── router/            # Shared routing system
    ├── supabase-client/   # Shared Supabase client
    ├── ui/                # Shared UI components
    └── utils/             # Shared utilities
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v10 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd RepSpheres-Monorepo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build all packages and applications:
   ```bash
   npm run build
   ```

### Development

To start the development server for all applications:

```bash
npm run dev
```

To start a specific application:

```bash
npm run dev --filter=<app-name>
```

For example, to start only the Market Insights app:

```bash
npm run dev --filter=market-insights
```

### Testing

To run tests for all packages and applications:

```bash
npm run test
```

To test a specific package or application:

```bash
npm run test --filter=<package-or-app-name>
```

### Building

To build all packages and applications:

```bash
npm run build
```

To build a specific package or application:

```bash
npm run build --filter=<package-or-app-name>
```

## Key Features

- **Unified API Gateway**: Centralized communication with backend services
- **Shared UI Components**: Consistent user experience across applications
- **Shared State Management**: Centralized state handling
- **Shared Routing**: Seamless navigation between applications
- **Shared Supabase Client**: Consistent database access

## Deployment

Each application can be deployed independently to Netlify, while sharing the common packages.

## Contributing

1. Create a new branch for your feature or bugfix
2. Make your changes
3. Submit a pull request

## License

This project is proprietary and confidential.
