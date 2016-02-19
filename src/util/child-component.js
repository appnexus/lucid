import React from 'react';
import _ from 'lodash';

/**
 * createChildComponent
 *
 * Returns a React Component which does not render anything, but has some useful static functions
 *
 * @return {ReactComponent} which renders `null` but exposes static helper functions
 */
export function createChildComponent (definition={}) {
	return React.createClass({
		propTypes: _.get(definition, 'propTypes', null),
		displayName: _.get(definition, 'displayName', null),
		render: () => null,
		statics: {

			/**
			 * getOwnChildren
			 *
			 * Returns all collective children of elements with this component type
			 *
			 * @param {Array} elements - usually `this.props.children` but can be any list of elements which
			 *	                          might have this type
			 * @return {Array} All the collective children of elements with this component type
			 */
			getOwnChildren(elements) {
				let component = this;
				let children = [];
				React.Children.forEach(elements, (element) => {
					if (element && element.type === component) {
						children = children.concat(React.Children.map(element.props.children, x => x));
					}
				});
				return children;
			},

			/**
			 * getAll
			 *
			 * Returns all elements with this component type
			 *
			 * @param {Array} elements - usually `this.props.children` but can be any list of elements which
			 *	                          might have this type
			 * @return {Array} elements with this component type
			 */
			getAll(elements) {
				let component = this;
				let elementsOfThisType = [];
				React.Children.forEach(elements, (element) => {
					if (element && element.type === component) {
						elementsOfThisType = elementsOfThisType.concat(element);
					}
				});
				return elementsOfThisType;
			},

			/**
			 * getAllProps
			 *
			 * Returns the `props` object of each element with this component type
			 *
			 * @param {Array} elements - usually `this.props.children` but can be any list of elements which
			 *	                          might have this type
			 * @return {Array} `props` objects of elements with this component type
			 */
			getAllProps(elements) {
				let component = this;
				return _.map(component.getAll(elements), 'props');
			},

			getAllAsProps(props, elements) {
				let component = this;
				return _.map(_.flatten([_.get(props, definition.propName, [])]), (childProp) => {
					if (_.isPlainObject(childProp)) {
						return _.assign({}, childProp, {children: childProp.children || childProp.text});
					} else {
						return {
							children: childProp
						};
					}
				}).concat(component.getAllProps(elements));
			}
		}
	});
}
