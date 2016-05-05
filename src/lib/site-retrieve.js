/**
 * External dependencies
 */
import phantom from 'phantom';

/**
 * Renders a website and returns its contents through PhantomJS.
 *
 * @param  String url The url to render and return its contents
 * @return Promise    Returns the contents of the page
 */
export default ( url ) => {
  return new Promise( ( resolve, reject ) => {
    let phantomInstance;
    let sitePage;

    phantom.create()

    // Creating the instance, then the page
    .then( instance => {
      phantomInstance = instance;

      return instance.createPage();
    } )

    // After getting the page, retrieve the url
    .then( page => {
      sitePage = page;

      return page.open( url );
    } )

    // We get the status first, then retrieve the content
    .then( status => {
      if ( status !== 'success' ) return reject( 'Could not retrieve url' );
      return sitePage.property( 'content' );
    } )

    // Finally we get the rendered content
    .then( content => {
      resolve( content );

      sitePage.close();
      phantomInstance.exit();
    } )

    // On any error, do a catch
    .catch( error => {
      reject( error );
      phantomInstance.exit();
    } );
  } );
};
