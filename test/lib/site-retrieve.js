/**
 * External dependencies
 */
import { assert } from 'chai';

/**
 * Internal dependencies
 */
import siteRetrieve from '../../src/lib/site-retrieve';

describe( 'Lib: Site Retrieve', () => {
  it( 'should get a site and render its contents' , ( done ) => {
    siteRetrieve( 'http://callaa.rs' )
    .then( source => {
      assert.isString( source );
      done();
    } );
  } );
} );
