
import superagent from 'superagent';

const API_KEY = '7284cd75cb81c08e2e672b7676b0dad7';

export default ( source ) => {
  return new Promise( ( resolve, reject ) => {
    superagent
    .post( 'http://api.datumbox.com/1.0/TextExtraction.json' )
    .send( { api_key: API_KEY, text: source } )
    .end( ( err, res ) => {
      if ( err ) return reject( err );

      resolve( res.body.output.result );
    } );
  } );
};
