/**
 * External dependencies
 */
import 'babel-polyfill';
import fs from 'fs';

/**
 * Internal dependencies
 */
import csvReader from './lib/csv-reader'

// Training data will be exposed here for Mocha
export let trainingData = new Array();

/**
 * Main categorizer of the sites, requires a training set, outputs a list of predicted categories.
 *
 * @param  String  trainingSet A CSV file that can be used as the training set.
 * @return Promise             Will always resolve with an object containing `error`
 */
export const categorizer = async ( trainingSet ) => {
  if ( !trainingSet ) {
    return { error: true, message: 'No training set given' };
  }

  try {
    fs.accessSync( trainingSet, fs.R_OK );

    // Read in the CVS and add it to the training data
    trainingData = await csvReader( trainingSet );
  } catch ( err ) {
    return { error: true, message: err.message };
  }
};

// We are running this as a script, so just take the
// third argument immediately (the csv file)
if ( !module.parent ) {
  ( async () => {
    categorizer( process.argv.length >= 3 ? process.argv[2] : null )
    .then( retval => {
      if ( retval.error === true ) {
        console.log( 'Error:', retval.message );
      }

      process.exit( 0 );
    } );
  } ) ();
}
