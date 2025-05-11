module.exports = function(wallaby) {

  return {
    files: [
      'packages/*/src/**/*.{ts,tsx}',
      'packages/*/tests/**/*.{ts,tsx}',
      '!packages/*/tests/**/*.test.{ts,tsx}',
    ],

    tests: [
      'packages/*/tests/**/*.test.{ts,tsx}',
    ],

    env: {
      type: 'node'
    },

    debug: true
    
  };
};
