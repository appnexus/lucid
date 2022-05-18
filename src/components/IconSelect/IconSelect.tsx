import _, { omit } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon/Icon';
import RadioButtonLabeled from '../RadioButtonLabeled/RadioButtonLabeled';
import CheckboxLabeled from '../CheckboxLabeled/CheckboxLabeled';
import { lucidClassNames } from '../../util/style-helpers';
import { StandardProps, Overwrite } from '../../util/component-types';

const cx = lucidClassNames.bind('&-IconSelect');

const { arrayOf, bool, func, node, number, oneOf, string, shape } = PropTypes;

const getFigureParent = (domNode: HTMLElement): HTMLElement | undefined => {
	if (domNode.classList.contains(cx('&-Item'))) {
		return domNode;
	}
	if (domNode === document.body) {
		throw new Error(`domNode is not a child of .${cx('&-Item')}`);
	}
	if (domNode.parentElement) {
		return getFigureParent(domNode.parentElement);
	}

	return;
};

interface Item {
	id: string;
	icon?: React.ReactElement;
	label?: React.ReactElement | string;
	isSelected?: boolean;
	isPartial?: boolean;
	tabIndex?: number;
	isDisabled?: boolean;
	className?: string;
}

interface IIconSelectPropsRaw extends StandardProps {
	/** Items in the IconSelect group. Each item should have an id. */
	items: Item[];

	/** Defines the type of IconSelect box. A 'single' select will create a radio
		input type Item. A 'multiple' select will create a checkbox input type. */
	kind: 'single' | 'multiple';

	/** A function that is called with the id of the Item in the IconSelect group
		is clicked. */
	onSelect: (
		id: string,
		{
			event,
			props,
		}: {
			event: React.MouseEvent;
			props: IIconSelectProps;
		}
	) => void;

	/** Disabled all IconSelect Items. */
	isDisabled: boolean;
}

export type IIconSelectProps = Overwrite<
	React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLSpanElement>,
		HTMLSpanElement
	>,
	IIconSelectPropsRaw
>;

const defaultProps = {
	kind: 'multiple' as const,
	isDisabled: false,
	onSelect: _.noop,
};

export const IconSelect = (props: IIconSelectProps): React.ReactElement => {
	const {
		className,
		children,
		kind,
		items,
		isDisabled,
		onSelect,
		...passThroughs
	} = props;

	const handleClick = (event: React.MouseEvent): void => {
		if (!props.isDisabled) {
			const domNode = getFigureParent(event.target as HTMLElement);
			if (domNode) {
				const id = domNode.dataset.id;

				domNode.focus();
				if (!domNode.hasAttribute('disabled') && id) {
					onSelect(id, { event, props: props });
				}
			}
		}
	};

	const getChildIcon = (icon: React.ReactElement): React.ReactElement => {
		return icon ? (
			icon
		) : (
			<Icon>
				<rect x='0' y='0' width='16' height='16' />
				<rect x='1' y='1' width='14' height='14' fill='white' />
			</Icon>
		);
	};

	const getInputComponent = (item: Item) => {
		const { kind, className, isDisabled } = props;
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
				// tabIndex={item.tabIndex}
			/>
		) : (
			<CheckboxLabeled
				Label={Label}
				className={cx('&-Item-checkbox', {
					[`${className}-checkbox`]: className,
				})}
				isDisabled={isDisabled || item.isDisabled ? true : false}
				isIndeterminate={item.isPartial ? true : false}
				isSelected={item.isSelected ? true : false}
				// tabIndex={item.tabIndex}
			/>
		);
	};

	return (
		<span
			{...omit(
				passThroughs,
				[
					'className',
					'children',
					'items',
					'kind',
					'onSelect',
					'isDisabled',
				].concat(['initialState', 'callbackId'])
			)}
			className={cx('&', className)}
		>
			{_.map(items, (childItem, index): React.ReactElement => {
				const itemDisabled = isDisabled || childItem.isDisabled;
				return (
					<figure
						key={`iconselectitem_${index}`}
						className={cx('&-Item', childItem.className, {
							[`${className}-Item`]: className,
							'&-Item-is-disabled': itemDisabled,
							'&-Item-is-partial': childItem.isPartial,
							'&-Item-is-selected': childItem.isSelected,
							'&-Item-multi': kind === 'multiple',
							'&-Item-single': kind === 'single',
						})}
						data-id={childItem.id}
						onClick={itemDisabled ? undefined : handleClick}
					>
						{childItem.icon && getChildIcon(childItem.icon)}
						<figcaption className={cx('&-Item-figcaption')}>
							{getInputComponent(childItem)}
						</figcaption>
					</figure>
				);
			})}
			{children}
		</span>
	);
};

IconSelect.displayName = 'IconSelect';

IconSelect.defaultProps = defaultProps;

IconSelect.peek = {
	description: `\`IconSelect\` allows you to pair icons together to form a related cluster. Any props not explicitly called out are spread on to the root component.`,
	categories: ['controls', 'selectors'],
};

IconSelect.propTypes = {
	/**
		Appended to the component-specific class names set on the root element.
		Value is run through the \`classnames\` library.
	*/
	className: string,

	/**
		Added to the end of the IconSelect group.
	*/
	children: node,

	/**
		Items in the IconSelect group. Each item should have an id.
	*/
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
	).isRequired,

	/**
		Defines the type of IconSelect box. A 'single' select will create a radio
		input type Item. A 'multiple' select will create a checkbox input type.
	*/
	kind: oneOf(['single', 'multiple']),

	/**
		A function that is called with the id of the Item in the IconSelect group
		is clicked.  Signature: \`(id, { event }) => {}\`
	*/
	onSelect: func,

	/**
		Disabled all IconSelect Items.
	*/
	isDisabled: bool,
};

export default IconSelect;
