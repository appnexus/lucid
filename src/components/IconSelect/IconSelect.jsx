import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';

import Icon from '../Icon/Icon';
import RadioButtonLabeled from '../RadioButtonLabeled/RadioButtonLabeled';
import CheckboxLabeled from '../CheckboxLabeled/CheckboxLabeled';

import { lucidClassNames } from '../../util/style-helpers.js';
import { createClass, omitProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-IconSelect');

const { arrayOf, bool, func, node, number, oneOf, string, shape } = PropTypes;

const getFigureParent = domNode => {
	if (domNode.classList.contains(cx('&-Item'))) {
		return domNode;
	}
	if (domNode === document.body) {
		throw new Error(`domNode is not a child of .${cx('&-Item')}`);
	}

	return getFigureParent(domNode.parentElement);
};
const IconSelect = createClass({
	displayName: 'IconSelect',

	statics: {
		peek: {
			description: `
				IconSelect allow you to pair icons together to form a related cluster.
				Any props not explicitly called out are spread on to the root
				component.
			`,
			categories: ['controls', 'selectors'],
		},
	},

	propTypes: {
		className: string`
			Appended to the component-specific class names set on the root element.
			Value is run through the \`classnames\` library.
		`,

		children: node`
			Added to the end of the IconSelect group.
		`,

		items: arrayOf(
			shape({
				id: string.isRequired,
				icon: node,
				label: node,
				isSelected: bool,
				isPartial: bool,
				tabIndex: number,
				isDisabled: bool,
				className: string,
			})
		).isRequired`
			Items in the IconSelect group. Each item should have an id.
		`,

		kind: oneOf(['single', 'multiple'])`
			Defines the type of IconSelect box. A 'single' select will create a radio
			input type Item. A 'multiple' select will create a checkbox input type.
		`,

		onSelect: func`
			A function that is called with the id of the Item in the IconSelect group
			is clicked.  Signature: \`(id, { event }) => {}\`
		`,

		isDisabled: bool`
			Disabled all IconSelect Items.
		`,
	},

	getDefaultProps() {
		return {
			kind: 'multiple',
			isDisabled: false,
			onSelect: _.noop,
		};
	},

	handleClick(event) {
		if (!this.props.isDisabled) {
			const domNode = getFigureParent(event.target);
			const id = domNode.dataset.id;

			domNode.focus();
			if (!domNode.hasAttribute('disabled')) {
				this.props.onSelect(id, { event, props: this.props });
			}
		}
	},

	getChildIcon(icon) {
		return icon ? (
			icon
		) : (
			<Icon>
				<rect x="0" y="0" width="16" height="16" />
				<rect x="1" y="1" width="14" height="14" fill="white" />
			</Icon>
		);
	},

	getInputComponent(item) {
		const { kind, className, isDisabled } = this.props;
		const Label = item.label;
		const singleSelect = _.isEqual(kind, 'single');

		return singleSelect ? (
			<RadioButtonLabeled
				Label={Label}
				className={cx('&-Item-radio', {
					[`${className}-radio`]: className,
				})}
				isDisabled={isDisabled || item.isDisabled}
				isSelected={item.isSelected}
				tabIndex={item.tabIndex}
			/>
		) : (
			<CheckboxLabeled
				Label={Label}
				className={cx('&-Item-checkbox', {
					[`${className}-checkbox`]: className,
				})}
				isDisabled={isDisabled || item.isDisabled}
				isIndeterminate={item.isPartial}
				isSelected={item.isSelected}
				tabIndex={item.tabIndex}
			/>
		);
	},

	render() {
		const {
			className,
			children,
			kind,
			items,
			isDisabled,
			...passThroughs
		} = this.props;

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
								'&-Item-is-disabled': isDisabled || childItem.isDisabled,
								'&-Item-is-partial': childItem.isPartial,
								'&-Item-is-selected': childItem.isSelected,
								'&-Item-multi': kind === 'multiple',
								'&-Item-single': kind === 'single',
							})}
							data-id={childItem.id}
							onClick={this.handleClick}
							disabled={isDisabled || childItem.isDisabled}
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
