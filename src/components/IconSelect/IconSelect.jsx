import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon/Icon';
import RadioButtonLabeled from '../RadioButtonLabeled/RadioButtonLabeled';
import CheckboxLabeled from '../CheckboxLabeled/CheckboxLabeled';

import { lucidClassNames } from '../../util/style-helpers.js';
import { createClass, omitProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-IconSelect');

const { arrayOf, bool, func, node, number, oneOf, string, shape } = PropTypes;

/**
 *
 * {"categories": ["controls", "selectors"]}
 *
 * IconSelect allow you to pair icons together to form a related cluster.
 * Any props not explicitly called out are spread on to the root component.
*/
const IconSelect = createClass({
	displayName: 'IconSelect',

	propTypes: {
		/**
		 * Appended to the component-specific class names set on the root
		 * element. Value is run through the `classnames` library.
		 */
		className: string,

		/**
		 * Added to the end of the IconSelect group.
		*/
		children: node,

		/**
		 * Items in the IconSelect group. Each item should have an id.
		*/
		items: arrayOf(
			shape({
				id: string.isRequired,
				icon: node,
				label: node,
				isSelected: bool,
				isPartial: bool,
				tabIndex: number,
			})
		).isRequired,

		/**
			* Defines the type of IconSelect box. A 'single' select will create a
			* radio input type Item. A 'multiple' select will create a checkbox
			* input type.
			*/
		kind: oneOf(['single', 'multiple']).isRequired,

		/**
		 * A function that is called with the id of the Item in the IconSelect
		 * group is clicked.
		 *
		 * Signature: `(id, { event }) => {}`
		 */
		onSelect: func,
	},

	getDefaultProps() {
		return {
			className: null,
			children: null,
			kind: 'multiple',
		};
	},

	handleClick(id) {
		return event => {
			const domNode = event.target;
			domNode.focus();

			this.props.onSelect(id, { event });
		};
	},

	getChildIcon(icon) {
		return icon
			? icon
			: <Icon>
					<rect x="0" y="0" width="16" height="16" />
					<rect x="1" y="1" width="14" height="14" fill="white" />
				</Icon>;
	},

	getInputComponent(item) {
		const { kind, className } = this.props;
		const { isDisabled, isPartial, isSelected, tabIndex } = item;
		const Label = item.label;
		const singleSelect = _.isEqual(kind, 'single');

		return singleSelect
			? <RadioButtonLabeled
					Label={Label}
					className={cx('&-Item-radio', {
						[`${className}-radio`]: className,
					})}
					isDisabled={isDisabled}
					isSelected={isSelected}
					tabIndex={tabIndex}
				/>
			: <CheckboxLabeled
					Label={Label}
					className={cx('&-Item-checkbox', {
						[`${className}-checkbox`]: className,
					})}
					isDisabled={isDisabled}
					isIndeterminate={isPartial}
					isSelected={isSelected}
					tabIndex={tabIndex}
				/>;
	},

	render() {
		const { className, children, kind, items, ...passThroughs } = this.props;

		return (
			<span
				{...omitProps(passThroughs, IconSelect, ['items'])}
				className={cx('&', className)}
			>
				{_.map(items, (childItem, index) => {
					return (
						<figure
							key={`iconselectitem_${index}`}
							className={cx('&-Item', childItem.className, {
								[`${className}-Item`]: className,
								'&-Item-is-disabled': childItem.isDisabled,
								'&-Item-is-partial': childItem.isPartial,
								'&-Item-is-selected': childItem.isSelected,
								'&-Item-multi': kind === 'multiple',
								'&-Item-single': kind === 'single',
							})}
							onClick={this.handleClick(childItem.id)}
							disabled={childItem.isDisabled}
						>
							{this.getChildIcon(childItem.icon)}
							<figcaption className={cx('&-Item-figcaption')}>
								{this.getInputComponent(childItem)}
							</figcaption>
						</figure>
					);
				})}
				{children}
			</span>
		);
	},
});

export default IconSelect;
