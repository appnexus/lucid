// Required for all new components
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { lucidClassNames } from '../../util/style-helpers';
import { createClass, findTypes, omitProps } from '../../util/component-types';
import { buildHybridComponent } from '../../util/state-management';
import reducers from './CheckboxIconGroup.reducers.js';
import IconBox from '../IconBox/IconBox';

const cx = lucidClassNames.bind('&-CheckboxIconGroup');

const { string, func, bool, number, any, element, shape, arrayOf } = PropTypes;

/**
 * {"categories": ["controls", "IconGroup"]}
  *
 * A basic CheckboxIconGroup. Any props that are not explicitly called out below will be
 * passed through to the native `CheckboxIconGroup` component.
 */
const CheckboxIconGroup = createClass({
	displayName: 'CheckboxIconGroup',
	propName: 'CheckboxIconGroup',

	components: {
		/**
		 * Renders a `<IconBox>` inside the `CheckboxIconGroup`.
		 */
		IconBox: createClass({
			displayName: 'CheckboxIconGroup.IconBox',
			propName: 'IconBox',
		}),
	},

	reducers: reducers,

	propTypes: {
		/**
		 * A function that is called with the index of the child button clicked.
		 * `props` refers to the child button props.
		 *
		 * Signature: `(selectedIndex, { event, props }) => {}`
		 */
		onSelect: func,

		/**
		 * Appended to the component-specific class names set on the root
		 * element. Value is run through the `classnames` library.
		 */
		className: any,

		/**
		 * All children should be `CheckboxIconGroup.IconBox`s and they support the same
		 * props as `IconBox`s.
		 */
		children: any,

		/**
		 * An array of currently selected `CheckboxIconGroup.IconBox`s indices. You can
		 * also pass the prop `isActive` to individual `CheckboxIconGroup.IconBox`
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

	handleSelect({ event, props: childProps }) {
		debugger;
		const { callbackId } = childProps;
		const clickedIconProps = _.get(
			findTypes(this.props, CheckboxIconGroup.IconBox)[callbackId],
			'props',
			{}
		);

		debugger;

		// If the consumer passed in an `onClick` to the child `CheckboxIconGroup.IconBox`
		// component, we should make sure to call that in addition to the
		// `CheckboxIconGroup`'s `onSelect`.
		if (_.isFunction(clickedIconProps.onClick)) {
			clickedIconProps.onClick({ event, props: childProps });
		}

		this.props.onSelect(callbackId, { event, props: childProps });
	},

	render() {
		const {
			selectedIndices,
			className,
			children,
			...passThroughs
		} = this.props;

		const iconGroupChildProps = _.map(
			findTypes(this.props, CheckboxIconGroup.IconBox),
			'props'
		);

		return (
			<ul
				{...omitProps(passThroughs, CheckboxIconGroup)}
				className={cx('&', className)}
			>
				{_.map(iconGroupChildProps, (iconGroupChildProp, index) => {
					debugger;
					return (
						<li
							className={cx('&-ItemContainer')}
							key={`checkboxIconItem-${index}`}
						>
							<IconBox
								isActive={_.includes(selectedIndices, index)}
								{...iconGroupChildProp}
								key={index}
								callbackId={index}
								onClick={this.handleSelect}
								isCheckbox={true}
							/>
						</li>
					);
				})}
				{children}
			</ul>
		);
	},
});

export default buildHybridComponent(CheckboxIconGroup);
export { CheckboxIconGroup as CheckboxIconGroupDumb };
