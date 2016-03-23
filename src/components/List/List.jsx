import _ from 'lodash';
import React from 'react';
import classNames from 'classnames';
import { bindClassNames } from '../../util/style-helpers';
import { createLucidComponentDefinition }  from '../../util/component-definition';

const boundClassNames = bindClassNames('lucid-List');

const {
	string,
	bool,
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
		hasDirection: oneOf(['vertical', 'horizontal']),

		/**
		 * Any valid React component
		 */
		 children: node,

		 /**
 		 * Builds the Expander button to show child lists.
 		 */
 		 isExpandable: bool,

		/**
		 * Should the list be flexible or not
		 */
		 isFlexible: bool
	},

	getDefaultProps() {
		return {
			className: null,
			children: null,
			hasDirection: 'horizontal',
			isFlexible: true,
			isExpandable: true
		};
	},

	render() {
		const {
			className,
			children,
			hasDirection,
			isExpandable,
			isFlexible,
			...passThroughs
		} = this.props;

		const listChildProps = List.ListItem.findInAllAsProps(this.props);

		const listClasses = classNames(boundClassNames('&', {
			'&-is-vertical': hasDirection === 'vertical',
			'&-is-expandable': isExpandable === true,
			'&-is-flexible': isFlexible === true
		}, className));

		return (
			<ul {...passThroughs}
				className={listClasses}>
				{_.map(listChildProps, (listChildProp) => {
					const hasChildList = _.isArray(listChildProp.children);
					const listChildClasses = classNames(boundClassNames('&-ListItem', {
						'&-ListItem-is-parent' : hasChildList
					}, className));

					return (
						<li {...listChildProp}
							className={listChildClasses} >
							{ hasChildList ?
									<a>{ listChildProp.children[0]}
									</a>
									:
									<a>{listChildProp.children}</a>
							}
							{hasChildList? _.slice(listChildProp.children, 1) : null}
						</li>
					);
				})}
				{children}
			</ul>
		);
	}
}));

export default List;
