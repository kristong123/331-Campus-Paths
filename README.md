# Campus Paths

This project consists of a client-server application for displaying and interacting with campus paths. The client is built with React and TypeScript, while the server is built with Express and TypeScript.

## Project Structure

331-CAMPUS-PATHS
├── client
│   ├── src
│   ├── package-lock.json
│   ├── package.json
│   └── tsconfig.json
├── server
│   ├── data
│   ├── src
│   ├── package-lock.json
│   ├── package.json
│   └── tsconfig.json
└── LICENSE

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install dependencies for both client and server:
    ```sh
    cd client
    npm install
    cd ../server
    npm install
    ```

### Running the Application

1. Start the server:
    ```sh
    cd server
    npm start
    ```

2. Start the client:
    ```sh
    cd client
    npm start
    ```

The client will be available at `http://localhost:8080` and the server will be running on `http://localhost:8088`.

## Client

The client is a React application configured with Webpack. The main entry point is [`index.tsx`](client/src/index.tsx).

### Available Scripts

- `npm start`: Starts the development server.

### Configuration

Webpack configuration is located in [`webpack.config.js`](client/src/webpack.config.js).

## Server

The server is an Express application. The main entry point is [`index.ts`](server/src/index.ts).

### Available Scripts

- `npm start`: Compiles the TypeScript code and starts the server.

### API Endpoints

- `GET /api/buildings`: Retrieves the list of buildings.
- `GET /api/shortestPath`: Retrieves the shortest path between two points.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
