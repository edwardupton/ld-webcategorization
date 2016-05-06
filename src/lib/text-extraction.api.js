
import superagent from 'superagent';

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
