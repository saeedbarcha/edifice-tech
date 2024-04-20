const path = require('path');

module.exports = {
  // other webpack configurations...

  resolve: {
    fallback: {
      "zlib": require.resolve("browserify-zlib")
    }
  }
};
