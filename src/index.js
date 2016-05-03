/**
 * External dependencies
 */
import fs from 'fs';

// Training data will be exposed here for Mocha
export let trainingData = new Array();

/**
 * Main categorizer of the sites, requires a training set, outputs a list of predicted categories.
 *
 * @param  {String} trainingSet A CSV file that can be used as the training set.
 * @return {Object}             Will always return `error`, which is a boolean and some more properties if necessary.
 */
export const categorizer = ( trainingSet ) => {
  if ( !trainingSet ) {
    return { error: true, message: 'No training set given' };
  }

  try {
    fs.accessSync( trainingSet, fs.R_OK );
  } catch ( err ) {
    return { error: true, message: err.message };
  }

  // Read in the CVS and add it to the training data
};

// We are running this as a script, so just take the
// third argument immediately (the csv file)
if ( !module.parent ) {
  const retval = categorizer( process.argv.length >= 3 ? process.argv[2] : null );

  if ( retval.error === true ) {
    console.log( 'Error:', retval.message );
  }

  process.exit( 0 );
}
