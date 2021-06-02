/**
 *
 * @param {String} input
 * @return {Boolean}
 */
function isNullOrWhitespace( input ) {
  return !input || !input.trim();
}

export default isNullOrWhitespace;
