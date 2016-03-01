import _ from 'lodash';
import Button from '../Button/Button';
import React from 'react';
import classNames from 'classnames';
import { bindClassNames } from '../../util/style-helpers';
import { createLucidComponentDefinition }  from '../../util/component-definition';
import reducers from './ButtonGroup.reducers';

const boundClassNames = bindClassNames('ButtonGroup');

const {
	any,
	func,
	arrayOf,
	number,
} = React.PropTypes;

/**
 *
 * {"categories": ["controls", "buttons"]}
 *
 * Button groups allow you to pair buttons together to form a seamless cluster.
 * Any props not explicitly called out are spread on to the root component.
 */
const ButtonGroup = React.createClass(createLucidComponentDefinition({
	displayName: 'ButtonGroup',

	childProps: {
		Button: { ...Button.propTypes }
	},

	reducers: reducers,

	propTypes: {
		/**
		 * A function that is called with the index of the child button clicked.
		 * The second argument is the raw DOM event.
		 */
		onSelect: func,

		/**
		 * Appended to the component-specific class names set on the root
		 * element. Value is run through the `classnames` library.
		 */
		className: any,

		/**
		 * All children should be `ButtonGroup.Button`s and they support the same
		 * props as `Button`s.
		 */
		children: any,

		/**
		 * An array of currently selected `ButtonGroup.Button`s indices. You can
		 * also pass the prop `isActive` to individual `ButtonGroup.Button`
		 * components.
		 */
		selectedIndices: arrayOf(number),
	},

	getDefaultProps() {
		return {
			onSelect: _.noop,
			className: null,
			children: null,
			selectedIndices: [],
		};
	},

	handleSelect(index, origHandler, event) {
		// If the consumer passed in an `onClick` to the child `ButtonGroup.Button`
		// component, we should make sure to call that in addition to the
		// `ButtonGroup`'s `onSelect`.
		if (_.isFunction(origHandler)) {
			origHandler(event);
		}

		this.props.onSelect(index, event);
	},

	render() {
		const {
			selectedIndices,
			className,
			children,
			...others
		} = this.props;

		const buttonChildProps = ButtonGroup.Button.findInAllAsProps(this.props);

		const rootClasses = classNames(className, boundClassNames('~'));

		return (
			<span
				{...others}
				className={rootClasses}
			>
				{_.map(buttonChildProps, (buttonChildProp, index) => {
					return (
						// The order of the spread operator below is important. If the
						// consumer puts `isActive` directly on a `ButtonGroup.Button`, we
						// want that to take precedence over the `selectedIndices` prop on
						// the parent `ButtonGroup`. However, we want our `onClick` at the
						// bottom because we manually handle passing the event to the
						// `ButtonGroup.Button`'s `onClick` if it exists.
						<Button
							isActive={_.includes(selectedIndices, index)}
							{...buttonChildProp}
							key={index}
							onClick={_.partial(this.handleSelect, index, buttonChildProp.onClick)}
						/>
					);
				})}
				{children}
			</span>
		);
	}
}));

export default ButtonGroup;
