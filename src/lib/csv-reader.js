/**
 * Internal dependencies
 */
import fs from 'fs';
import parse from 'csv-parse';
import transform from 'stream-transform';

/**
 * Reads a CSV file and returns an array with valid urls.
 *
 * @param  String csvFile The CSV file to read
 * @return Promise        Returns a promise with a one parameter resolve
 */
export default ( csvFile ) => {
  const parser = parse( { delimiter: ',' } )
  const input = fs.createReadStream( csvFile );
  const output = [];

  input
  .pipe( parser )
  .pipe( transform( ( record, done ) => {
    if ( /^https?:\/\//.test( record ) ) {
      output.push( record[0] );
    }

    return done();
  } ) );

  return new Promise( function( resolve, reject ) {
    input.on( 'end', () => resolve( output ) );
    input.on( 'error', reject );
  } );
};
