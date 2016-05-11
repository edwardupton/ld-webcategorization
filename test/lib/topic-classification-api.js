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
import topicClassificationApi from '../../src/lib/topic-classification-api.js';

let agent;

describe( 'Lib: Topic Classification API', () => {
  before( () => {
    agent = superagentMock( superagent, mockConfig );
  } );

  it( 'should send the html to the API' , ( done ) => {
    topicClassificationApi( '<b>some text here</b>' )
    .then( text => {
      assert.isString( text );
      assert.equal( text, 'Science');
      done();
    } );
  } );

  after( () => {
    agent.unset();
  } );
} );
