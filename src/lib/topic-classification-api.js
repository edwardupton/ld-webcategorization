/**
 * External dependencies
 */
import superagent from 'superagent';

// @todo move into config file
const API_KEY = '7284cd75cb81c08e2e672b7676b0dad7';

/**
 * Uses Datumbox to extract the relevant topic of a given text.
 *
 * @param  String  source The extracted text from a site
 * @return Promise        Resolves to the extracted text
 */
export default ( source ) => {
  return new Promise( ( resolve, reject ) => {
    superagent
    .post( 'http://api.datumbox.com/1.0/TopicClassification.json' )
    .field( 'api_key', API_KEY )
    .field( 'text', source )
    .end( ( err, res ) => {
      if ( err ) return reject( err );
      if ( res.body.status === 0 ) return reject( res.body.error.ErrorMessage );
      resolve( res.body.output.result );
    } );
  } );
};
