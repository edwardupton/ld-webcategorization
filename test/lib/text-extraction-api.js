/**
 * External dependencies
 */
import { assert } from 'chai';
import superagent from 'superagent';
import superagentMock from 'superagent-mock';

/**
 * Internal dependencies
 */
import mockConfig from '../fixture/superagent-mock';
import textExtractionApi from '../../src/lib/text-extraction-api.js';

describe( 'Lib: Text Extraction API', () => {
  const agent = superagentMock( superagent, mockConfig );

  it( 'should send the html to the API' , ( done ) => {
    textExtractionApi( '<b>some text here</b>' )
    .then( text => {
      assert.isString( text );
      assert.equal( text, 'some text here' );
      done();
    } );
  } );

  after( () => {
    agent.unset();
  } );
} );
