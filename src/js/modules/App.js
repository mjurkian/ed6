/**
 * Import vendor modules
 */

/**
 * Import additional modules here:
 *
 * import './module_xyz';
 */
import BackToTop from "./BackToTop";


/**
 * Main App module used in index.js to initialise all other modules, includes helper functions/modules for use in initialising
 * modules depending on various criteria
 *
 * @returns {{init: init}}
 */
export default (() => {
	/**
	 * @param Module {Object}
	 * @param Module.init {Function}
	 * @param name {string|boolean}
	 * @param options {Object}
	 */
	const alwaysInit = ( Module, name = false, options = false ) => {
		if ( name ) {
			loadedModules[ name ] = Module
		}
		Module.init( options )
	}

	const init = () => {

		alwaysInit( BackToTop );
	}

	return {
		init,
	}
})()
