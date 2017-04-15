import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, findTypes, omitProps } from '../../util/component-types';
import Checkbox from '../Checkbox/Checkbox';

const cx = lucidClassNames.bind('&-CheckboxLabeled');
const { any, node, object, string } = PropTypes;

/**
 * {"categories": ["controls", "toggles"], "extend": "Checkbox", "madeFrom": ["Checkbox"]}
 *
 * This is a composite of the `Checkbox` component and the native `label`
 * element.
 */
const CheckboxLabeled = createClass({
	displayName: 'CheckboxLabeled',

	components: {
		/*
		 * Renders a `<label>` for the `<Checkbox>`
		 */
		Label: createClass({
			displayName: 'CheckboxLabeled.Label',
			propName: 'Label',
			propTypes: {
				/**
				 * Used to identify the purpose of this checkbox to the user -- can
				 * be any renderable content.
				 */
				children: node,
			},
		}),
	},

	propTypes: {
		...Checkbox.propTypes,

		/**
		 * Appended to the component-specific class names set on the root
		 * element.
		 */
		className: string,

		/**
		 * Passed through to the root element.
		 */
		style: object,

		/**
		 * Child element whose children are used to identify the purpose of this
		 * checkbox to the user.
		 */
		Label: any,
	},

	getDefaultProps() {
		return {
			isIndeterminate: false,
			isDisabled: false,
			isSelected: false,
			onSelect: _.noop,
		};
	},

	render() {
		const {
			className,
			isIndeterminate,
			isDisabled,
			isSelected,
			onSelect,
			style,
			...passThroughs
		} = this.props;

		const labelChildProps = _.first(
			_.map(findTypes(this.props, CheckboxLabeled.Label), 'props')
		);

		return (
			<label
				className={cx(
					'&',
					{
						'&-is-disabled': isDisabled,
						'&-is-selected': isIndeterminate || isSelected,
					},
					className
				)}
				style={style}
			>
				<Checkbox
					className={cx('&-Checkbox', className)}
					isDisabled={isDisabled}
					isIndeterminate={isIndeterminate}
					isSelected={isSelected}
					onSelect={onSelect}
					{...omitProps(passThroughs, CheckboxLabeled, [], false)}
				/>
				<div
					{...labelChildProps}
					className={cx('&-label', _.get(labelChildProps, 'className', null))}
				/>
			</label>
		);
	},
});

export default CheckboxLabeled;
