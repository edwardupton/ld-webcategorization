export default [
  {
    pattern: 'http://api.datumbox.com/1.0/(.*)',

    fixtures: ( match, params, headers ) => {
      if ( match[1] === 'TextExtraction.json' ) {
        return {
          output: {
            status: 1,
            result: 'some text here',
          }
        };
      }
    },

    post: ( match, data ) => {
      return {
        body: data
      };
    },

    get: ( match, data ) => {
      return {
        body: data
      };
    },
  }
];


