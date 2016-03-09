import _ from 'lodash';
import React from 'react';
import classNames from 'classnames';
import { bindClassNames } from '../../util/style-helpers';
import { createLucidComponentDefinition }  from '../../util/component-definition';

const boundClassNames = bindClassNames('List');

const {
	string,
	node,
	oneOf,
} = React.PropTypes;

/**
 * {"categories": ["layout", "list"]}
 *
 * This component is designed to be used in Composits as a layout tool.
 * Please see examples for more information.
 */
const List = React.createClass(createLucidComponentDefinition({
	displayName: 'List',

	childProps: {
		ListItem: {
			/**
			 * Appended to the component-specific class names set on the root
			 * element.
			 */
			className: string,

			/**
			 * Any valid React component
			 */
			 children: node,
		}
	},

	propTypes: {
		/**
		 * Appended to the component-specific class names set on the root
		 * element.
		 */
		className: string,

		/**
		 * explicitly set the primary axis of the grid to Y
		 */
		hasDirection: oneOf('vertical', 'horizontal'),

		/**
		 * Any valid React component
		 */
		 children: node,
	},

	getDefaultProps() {
		return {
			className: null,
			children: null,
			hasDirection: 'horizontal',
		};
	},

	render() {
		const {
			className,
			children,
			hasDirection,
			...passThroughs
		} = this.props;

		const listChildProps = List.ListItem.findInAllAsProps(this.props);

		const listClasses = classNames(className, boundClassNames('~', {
			'is-vertical': hasDirection === 'vertical',
		}));

		return (
			<ul {...passThroughs}
				className={listClasses}>
				{_.map(listChildProps, (listChildProp) => {
					return (
						<li {...listChildProp}
							className={classNames(listChildProp.className, boundClassNames('ListItem'))} >
							{listChildProp.children}
						</li>
					);
				})}
				{children}
			</ul>
		);
	}
}));

export default List;
