import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { lucidClassNames, uniqueName } from '../../util/style-helpers';
import {
	getFirst,
	findTypes,
	rejectTypes,
	StandardProps,
	Overwrite,
} from '../../util/component-types';
import reducers, { IRadioGroupState } from './RadioGroup.reducers';
import { buildModernHybridComponent } from '../../util/state-management';
import RadioButtonLabeled, {
	IRadioButtonLabeledLabelProps,
} from '../RadioButtonLabeled/RadioButtonLabeled';
import RadioButton, { IRadioButtonProps } from '../RadioButton/RadioButton';

const cx = lucidClassNames.bind('&-RadioGroup');

const { func, node, number, string, bool } = PropTypes;

/** RadioGroup Label */
const RadioGroupLabel = (props: IRadioButtonLabeledLabelProps) => null;
RadioGroupLabel.peek = {
	description: `Support radio button labels as \`RadioGroup.Label\` component which can be provided as a child of a \`RadioGroup.RadioButton\` component.`,
};
RadioGroupLabel.propTypes = {
	children: node,
};
RadioGroupLabel.displayName = 'RadioGroup.Label';

/** RadioGroup */
export interface IRadioGroupPropsRaw extends StandardProps {
	/**
	 * Passed along to the \`RadioGroup.RadioButton\' children whose \'name\'
	 * props are ignored.
	 */
	name: string;

	/**
	 * Called when the user clicks on one of the child radio buttons or when
	 * they press the space key while one is in focus, and only called when the
	 * component is in the unselected state. \`props\` refers to the child
	 * \`RadioButton\` props.  Signature: \`(selectedIndex, { event, props }) => {}\`
	 */
	onSelect: (
		selectedIndex: string | number,
		{
			event,
			props,
		}: {
			event: React.MouseEvent;
			props: IRadioButtonProps;
		}
	) => void;

	/**
	 * Indicates which \`RadioGroup.RadioButton\' child is currently
	 * selected. The index of the last \`RadioGroup.RadioButton\` child with
	 * \'isSelected\' equal to true takes precedence over this prop.
	 */
	selectedIndex: number;

	/**
	 * Indicates whether all \`RadioGroup.RadioButton\' children should appear
	 * and act disabled by having a "greyed out" palette and ignoring user
	 * interactions.
	 */
	isDisabled: boolean;
}

export type IRadioGroupProps = Overwrite<
	React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLSpanElement>,
		HTMLSpanElement
	>,
	IRadioGroupPropsRaw
>;

const defaultProps = {
	name: uniqueName(`${cx('&')}-`),
	onSelect: _.noop,
	selectedIndex: 0,
	isDisabled: false,
};

/** TODO: Remove this constant when the component is converted to a functional component */
const nonPassThroughs = [
	'children',
	'className',
	'name',
	'onSelect',
	'selectedIndex',
	'isDisabled',
];

const RadioGroup = (props: IRadioGroupProps) => {
	const {
		children,
		className,
		name,
		selectedIndex,
		isDisabled,
		...passThroughs
	} = props;

	const handleSelected = (
		event: React.MouseEvent<Element, MouseEvent>,
		childProps: IRadioButtonProps,
		isSelected: boolean,
		selectedIndex: number
	) => {
		if (selectedIndex !== undefined) {
			const clickedRadioButtonProps = _.get(
				_.map(findTypes(props, RadioGroup.RadioButton), 'props'),
				selectedIndex
			);
			// If the `RadioGroup.RadioButton` child has an `onSelect` prop that is
			// a function, call that prior to calling the group's `onSelect` prop.

			if (_.isFunction(clickedRadioButtonProps.onSelect)) {
				clickedRadioButtonProps.onSelect(isSelected, {
					event,
					props: childProps,
				});
			}
			props.onSelect(selectedIndex, { event, props: childProps });
		}
	};

	const radioButtonChildProps = _.map(
		findTypes(props, RadioGroup.RadioButton),
		'props'
	);

	const selectedIndexFromChildren = _.findLastIndex(radioButtonChildProps, {
		isSelected: true,
	});

	// If there are any `RadioGroup.RadioButton` children with `isSelected`
	// equal to true, then the index of the last one should override the
	// value of the `selectedIndex` prop.
	const actualSelectedIndex =
		selectedIndexFromChildren !== -1
			? selectedIndexFromChildren
			: selectedIndex;

	return (
		<span
			{..._.omit(passThroughs as any, nonPassThroughs)}
			className={cx('&', className)}
		>
			{_.map(radioButtonChildProps, (radioButtonChildProp, index) => {
				const isSelected = actualSelectedIndex === index;

				return (
					<RadioButtonLabeled
						{...radioButtonChildProp}
						isDisabled={isDisabled || radioButtonChildProp.isDisabled}
						isSelected={isSelected}
						key={index}
						callbackId={index}
						name={name}
						onSelect={(isSelected, { event, props }) => {
							handleSelected(event, props, isSelected, index);
						}}
						Label={_.get(
							getFirst(radioButtonChildProp, RadioGroup.Label),
							'props',
							null
						)}
					/>
				);
			})}
			{rejectTypes(children, RadioGroup.RadioButton)}
		</span>
	);
};

RadioGroup.displayName = 'RadioGroup';

RadioGroup.propTypes = {
	/**
    			Should be instances of \`RadioGroup.RadioButton\` which supports the same
    			props as \`RadioButton\`.
    		*/
	children: node,

	/**
    			Appended to the component-specific class names set on the root element.
    		*/
	className: string,

	/**
    			Passed along to the \`RadioGroup.RadioButton\` children whose \`name\`
    			props are ignored.
    		*/
	name: string,

	/**
    			Called when the user clicks on one of the child radio buttons or when
    			they press the space key while one is in focus, and only called when the
    			component is in the unselected state. \`props\` refers to the child
    			\`RadioButton\` props.  Signature: \`(selectedIndex, { event, props }) => {}\`
    		*/
	onSelect: func,

	/**
    			Indicates which of the \`RadioGroup.RadioButton\` children is currently
    			selected. The index of the last \`RadioGroup.RadioButton\` child with
    			\`isSelected\` equal to true takes precedence over this prop.
    		*/
	selectedIndex: number,

	/**
    			Indicates whether all \`RadioGroup.RadioButton\` children should appear
    			and act disabled by having a "greyed out" palette and ignoring user
    			interactions.
    		*/
	isDisabled: bool,
};

RadioGroup.peek = {
	description: `A composite of the \`RadioButton\` component and the native \`label\` element.`,
	notes: {
		overview: `
			A round two-state toggle with a label that explains the action or selection. This is a composite of \`RadioButton\` and the native
			\`label\` element.		`,
		intendedUse: `
			- Use radio button to allow users to select one item. Commonly used to select filters or settings. For interactions where users can select mutiple options, use \`CheckboxLabeled\`. 
			- Use radio buttons for 2-3 options where you want to expose all options.
			- Use \`SingleSelect\` for 3-10 options where it is not a priority to expose all options.
			- Use \`RadioGroup\` for horizontal lists of options. Use \`RadioButtonLabeled\` for vertical lists of options.
	`,
		technicalRecommendations: `
			- Use the styles on the parent container of \`RadioGroup\` to ensure only the radio buttons and their labels are clickable.
			- Any props that are not explicitly defined in \`propTypes\` are passed to the native radio button control.
		`,
	},
	categories: ['controls', 'toggles'],
	madeFrom: ['RadioButton'],
};

RadioGroup.defaultProps = defaultProps;

RadioGroup.reducers = reducers;

RadioGroup.RadioButton = RadioButton;

RadioGroup.Label = RadioGroupLabel;

export default buildModernHybridComponent<
	IRadioGroupProps,
	IRadioGroupState,
	typeof RadioGroup
>(RadioGroup as any, { reducers });
export { RadioGroup as RadioGroupDumb };
