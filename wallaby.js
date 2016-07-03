process.env.BABEL_ENV = 'node';

module.exports = function (wallaby) {
  return {
    files: [
      'source/**/*.js'
    ],

    tests: [
      'test/**/*.js'
    ],

    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: 'ava',

    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },

    debug: true
  };
};
