# ProvenanceNgDapp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Working with Provenance walletconnect-js

To make an Angular app compile against `walletconnect-js` the following
changes are needed.

## CommonJS Warnings

Update `angular.json` to allow the following CommonJS dependencies:

```json
"allowedCommonJsDependencies": [
    "buffer",
    "crypto",
    "crypto-browserify",
    "crypto-js",
    "events/",
    "google-protobuf/google/protobuf/any_pb",
    "google-protobuf/google/protobuf/timestamp_pb",
    "hoist-non-react-statics",
    "qrcode",
    "query-string",
    "secp256k1",
    "stream-browserify",
    "@babel/runtime/regenerator",
    "@provenanceio/walletconnect-js/lib/service",
    "@provenanceio/wallet-utils/lib",
    "@tendermint/belt",
    "@walletconnect/client",
    "@walletconnect/environment",
    "@walletconnect/socket-transport",
    "@walletconnect/types",
    "@walletconnect/window-metadata"
]

```

## Webpack5 Issues

Update `tsconfig.json` to provide the following paths:
```json
"paths": {
  "stream": [ "./node_modules/stream-browserify" ],
  "crypto": [ "./node_modules/crypto-browserify" ],
  "events": [ "./node_modules/events" ]
}
```

Install the custom webpack dependency: `npm install @angular-builders/custom-webpack --save`

Include the file images included in `walletconnect-js` by creating a custom webpack 
file `custom-webpack-config.js` and then update `angular.json` replacing all 
`@angular-devkit/build-angular` with `@angular-builders/custom-webpack`. 

Next, add a custom web pack config element to the `architect` section:

```json
"customWebpackConfig": {
  "path": "./custom-webpack-config.js"
},
```

Fix Tendermint's shit exports by adding `"allowSyntheticDefaultImports": true` to
`tsconfig.json` `compilerOptions`.

## Runtime Issues

Create a file named `main.lib.d.ts` to declare a `Window` interface for `global`:

```typescript
export {};

declare global {
    interface Window { global: any; Buffer: any; }
}
```

Update the `tsconfig.app.json` addint the `main.lib.d.ts` file to `files`:

```json
"files": [
    "src/main.ts",
    "src/polyfills.ts",
    "src/main.lib.d.ts"
]
```
