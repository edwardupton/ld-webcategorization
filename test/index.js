/**
 * External dependencies
 */
import { assert } from 'chai';

/**
 * Internal dependencies
 */
import { categorizer, trainingData } from '../src/index';

describe( 'Website Categorizer', () => {

  it( 'should fail if no training set is given' , () => {
    assert.deepEqual( categorizer(), { error: true, message: 'No training set given' } );
  } );

  it( 'should fail if a non-existing file is given', () => {
    assert.deepEqual( categorizer( './non-existing-test.csv' ), {
      error: true,
      message: 'ENOENT: no such file or directory, access \'./non-existing-test.csv\''
    } );
  } );

  it( 'should read in the training set given', () => {
    categorizer( './fixture/test.csv' );
    assert.equal( 5, trainingData.length );
  } );
} );
