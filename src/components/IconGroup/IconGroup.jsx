import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { lucidClassNames } from '../../util/style-helpers';
import { createClass, findTypes, omitProps } from '../../util/component-types';
import IconBox from '../IconBox/IconBox';
import reducers from './IconGroup.reducers';
import { buildHybridComponent } from '../../util/state-management';

const cx = lucidClassNames.bind('&-IconGroup');

const { any, bool, oneOf, func, arrayOf, number } = PropTypes;

/**
 *
 * {"categories": ["controls", "toggles"], "madeFrom": ["IconBox"]}
 *
 * CheckboxIconGroups allow you to pair IconBox's together to form a related cluster.
 * Any props not explicitly called out are spread on to the root component.
 */
const IconGroup = createClass({
	displayName: 'IconGroup',

	components: {
		/**
		 * Renders a `<IconBox`> inside the `CheckboxIconGroup`.
		 */
		Box: createClass({
			displayName: 'IconGroup.Box',
		}),
		Icon: IconBox.Icon,
	},

	reducers: reducers,

	propTypes: {
		/**
		 * A function that is called with the index of the child IconBox clicked.
		 * `props` refers to the child IconBox props.
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
		 * All children should be `IconGroup.IconBox`s and they support the same
		 * props as `IconBox`s.
		 */
		children: any,

		/**
		 * An array of currently selected `IconGroup.IconBox`s indices. You can
		 * also pass the prop `isSelected` to individual `IconGroup.IconBox`
		 * components.
		 */
		selectedIndices: arrayOf(number),

		/**
		 * An array of currently active `IconGroup.IconBox`s indices. You can
		 * also pass the prop `isActive` to individual `IconGroup.IconBox`
		 * components.
		 */
		selectedIndices: arrayOf(number),

		/**
		 * An array of currently indeterminate `IconGroup.IconBox`s indices. You can
		 * also pass the prop `isIndeterminate` to individual `IconGroup.IconBox`
		 * components.
		 */
		selectedIndices: arrayOf(number),

		/**
			* defines if more than one `IconGroup.IconBox` may be selected at at
			* time. This is also passed down to the props of each
			* `IconGroup.IconBox`s. An IconGroup may not contain a mix of radio and
			* checkbox `IconBox`s at this time.
			*/
		kind: oneOf(['radio', 'checkbox']),

		/*
		 * Sets if the `IconGroup.Box`s may have an `isActive` state.
		 */
		handleActive: bool,

		/*
		 * Sets if the `IconGroup.Box`s may have an `isIndeterminate` state.
		 */
		handleIndeterminate: bool,

		/*
		 * Sets if the `IconGroup.Box`s may have an `isSelected` state.
		 */
		handleSelect: bool,
	},

	getDefaultProps() {
		return {
			onSelect: _.noop,
			className: null,
			children: null,
			selectedIndices: {},
			kind: 'checkbox',
			activeIndices: [],
			indeterminateIndices: [],
			handleActive: true,
			handleIndeterminate: true,
			handleSelect: true,
		};
	},

	handleSelect({ event, props: childProps }) {
		const { callbackId } = childProps;
		const clickedIconBoxProps = _.get(
			findTypes(this.props, IconGroup.IconBox)[callbackId],
			'props',
			{}
		);

		// If the consumer passed in an `onClick` to the child `IconGroup.Button`
		// component, we should make sure to call that in addition to the
		// `IconGroup`'s `onSelect`.
		if (_.isFunction(clickedIconBoxProps.onClick)) {
			clickedIconBoxProps.onClick({ event, props: childProps });
		}

		this.props.onSelect(callbackId, { event, props: childProps });
	},

	render() {
		const {
			selectedIndices,
			activeIndices,
			indeterminateIndices,
			handleSelect,
			className,
			children,
			kind,
			...passThroughs
		} = this.props;

		const iconBoxChildProps = _.map(
			findTypes(this.props, IconGroup.Box),
			'props'
		);

		return (
			<span
				{...omitProps(passThroughs, IconGroup)}
				className={cx('&', className)}
			>
				{_.map(iconBoxChildProps, (iconBoxChildProp, index) => {
					const isCheckbox = _.isEqual(this.props.kind, 'checkbox');
					let isIndeterminate = false;
					let isSelected = false;

					if (isCheckbox) {
						const selectedIndex = _.isUndefined(selectedIndices[index])
							? 2
							: selectedIndices[index];
						isIndeterminate = _.isEqual(selectedIndex, 1);
						isSelected = _.isEqual(selectedIndex, 0);
					} else {
						isSelected = _.includes(selectedIndices, index);
					}

					return (
						// The order of the spread operator below is important. If the
						// consumer puts `isActive` directly on a `IconGroup.IconBox`, we
						// want that to take precedence over the `selectedIndices` prop on
						// the parent `IconGroup`. However, we want our `onClick` at the
						// bottom because we manually handle passing the event to the
						// `IconGroup.IconBox`'s `onClick` if it exists.
						(
							<IconBox
								isIndeterminate={isIndeterminate}
								isSelected={isSelected}
								{...iconBoxChildProp}
								key={index}
								callbackId={index}
								onClick={this.handleSelect}
								kind={kind}
							/>
						)
					);
				})}
				{children}
			</span>
		);
	},
});

export default buildHybridComponent(IconGroup);
export { IconGroup as IconGroupDumb };
