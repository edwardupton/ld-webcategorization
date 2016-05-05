/**
 * External dependencies
 */
import { assert } from 'chai';
import path from 'path';

/**
 * Internal dependencies
 */
import { categorizer, trainingData } from '../src/index';

describe( 'Website Categorizer', () => {

  it( 'should fail if no training set is given' , ( done ) => {
    categorizer()
    .then( retval => {
      assert.deepEqual( retval, { error: true, message: 'No training set given' } );
      done();
    } );
  } );

  it( 'should fail if a non-existing file is given', ( done ) => {
    categorizer( './non-existing-test.csv' )
    .then( retval => {
      assert.deepEqual( retval, {
        error: true,
        message: 'ENOENT: no such file or directory, access \'./non-existing-test.csv\''
      } );

      done();
    } );
  } );

  it( 'should read in the training set given', ( done ) => {
    categorizer( path.join( __dirname, 'fixture', 'test.csv' ) )
    .then( () => {
      assert.equal( 3, trainingData.length );

      done();
    } );
  } );
} );
