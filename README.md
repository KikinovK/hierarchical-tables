# test assignment


## Getting Started

This is an example of how you can run a project locally. Follow these simple steps as an example.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/KikinovK/RSS-REACT-2023Q4.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```

<!-- USAGE EXAMPLES -->
## Usage

### Running the Application

To run the application, use the following command:
```
   npm dev
```


### Code Formatting and Linting

This project uses ESLint and Prettier for code formatting and linting. Husky is also configured to run pre-commit hooks to ensure code quality. Before committing changes, the pre-commit hooks will automatically format the code using Prettier and check for linting errors using ESLint.

To format the code using Prettier manually, use the following command:
```
   npm run pretty
```
To run ESLint for TypeScript and TSX files, use the following command:
```
   npm run lint
```

### Building the Project

To create an optimized production build of the project, use the following command:
```
   npm run build
```

## Preview

Before running the preview, make sure you have a production build ready by running the `npm run build`.

To preview the build and see how the application works in production mode, use the following command:
```
   npm run preview
```

## Available Commands

- `npm run format:fix`: To automatically fix Prettier formatting for TypeScript, TSX, and JSON files.
- `npm run lint:fix`: To automatically fix ESLint errors for TypeScript and TSX files.
