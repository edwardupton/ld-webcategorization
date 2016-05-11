/**
 * External dependencies
 */
import 'babel-polyfill';
import fs from 'fs';
import async from 'async';

/**
 * Internal dependencies
 */
import csvReader from './lib/csv-reader'
import siteRetrieve from './lib/site-retrieve';
import textExtractionApi from './lib/text-extraction-api';
import topicClassificationApi from './lib/topic-classification-api';

// Environment is either production (default) or test
const env = process.env.NODE_ENV || 'production';
const ASYNC_THROTTLE = 1;

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

  // Now start categorizing rendering the pages in parallel and get the data
  if ( env === 'production' ) {
    let i = 0;
    let topics = [];

    // @todo rewrite into something less callback-hell.
    async.eachLimit( trainingData, ASYNC_THROTTLE, async ( site, done ) => {
      console.log( '-> Processing', site );
      let source;
      let extraction;
      let topic;

      try {
        // First render the site
        source = await siteRetrieve( site )
      } catch( err ) {
        console.warn( 'Exception in retrieval ' + site + ':', err );
        topics.push( { site: site, topic: null } );
      }

      if ( !source ) return done();

      try {
        // Secondly extract the text
        extraction = await textExtractionApi( source );
      } catch( err ) {
        console.warn( 'Exception in extraction ' + site + ':', err );
        topics.push( { site: site, topic: null } );
      }

      if ( !extraction ) return done();

      try {
        // Thirdly, get the topic of the site
        topic = await topicClassificationApi( extraction );
      } catch( err ) {
        console.warn( 'Exception in classification ' + site + ':', err );
        topics.push( { site: site, topic: null } );
      }

      if ( !topic ) return done();

      topics.push( { site: site, topic: topic } );
      done();
    }, () => {
      const resultsFile = 'results-' + Date.now() + '.json';

      fs.writeFileSync( resultsFile, JSON.stringify( topics ) );
      console.log( 'Done, results in ' + resultsFile );

      process.exit( 0 );
    } );
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
