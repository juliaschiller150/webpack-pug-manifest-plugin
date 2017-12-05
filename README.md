# Webpack Pug Manifest Plugin

Creates a `.pug` file with inline script tags for each webpack emitted file. This enables filename-embedded, hash-based caching with pug templates.

## Usage

```javascript
// webpack.config.js
// ...

const WebpackPugManifestPlugin = require('webpack-pug-manifest-plugin');

const pugManifest = new WebpackPugManifestPlugin();

module.exports = {
  entry: {
    bundle1: './src/bundle1',
    bundle2: './src/bundle2'
  },
  output: {
    // ...
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].[chunkhash].js'
  },
  // ...
  plugins: [pugManifest]
};
```

## Output
```javascript
// pug-manifest.pug

script(type="text/javascript" src="bundle1.48275ccd1ec5787b0174.js")
script(type="text/javascript" src="bundle2.81f9d53c7o476155833d.js")
```

## Options

### `Filter`
Type: `function`\
Effect: Filters assets by bundle name (including file extension).

### `Sort`
Type: `function`\
Effect: Sorts script tags by bundle name. Useful to ensure `runtime` or `vendor` bundles are included first, as required by webpack.

## License
ISC &COPY; TC Schiller
