import _ from 'lodash';
import classNames from 'classnames';

const APP_NAME = 'bert';

/**
 * bindClassNames
 *
 * Takes any arguments that are valid for the `classnames` library
 * and prepends every class with our application name and component
 * name.
 *
 * The function that is returned takes any of the parameters that classNames
 * supports with one addition. If the user has the '~' class, it will inject
 * the base class name as well.
 *
 * @param {string} componentName - e.g. "MyComponent"
 * @return {function}
 */
export function bindClassNames(componentName) {
	// E.g. "hello-there" -> "HelloThere"
	let cleanComponentName = _.startCase(componentName).replace(/\s/g, '');

	if (componentName !== cleanComponentName) {
		throw new Error(`Component name must be SnakeCase, you passed "${componentName}" to scopeClasses`);
	}

	return function() {
		let classes = classNames.apply(this, arguments);
		let classesArr = classes.split(' ');
		let scopedClassesArr = _.map(classesArr, (className) => {

			// Magic class name here
			if (className === '~') {
				return `${APP_NAME}-${componentName}`;
			}

			return `${APP_NAME}-${componentName}-${className}`;
		});

		return scopedClassesArr.join(' ');
	}
}
