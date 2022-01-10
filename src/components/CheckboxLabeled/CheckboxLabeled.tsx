import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { findTypes, StandardProps } from '../../util/component-types';
import Checkbox, {
	ICheckboxProps,
	defaultProps as defaultPropsCheckbox,
} from '../Checkbox/Checkbox';

const cx = lucidClassNames.bind('&-CheckboxLabeled');
const { any, node, object, string, bool, func } = PropTypes;

/** Label */
export interface ILabelProps extends StandardProps {}

const Label = (props: ILabelProps): null => null;

Label.displayName = 'CheckboxLabeled.Label';
Label.peek = {
	description: `Renders a \`Label\` for the \`Checkbox\`.`,
	categories: ['controls', 'toggles'],
	madeFrom: ['Checkbox'],
};
Label.propName = 'Label';
Label.propTypes = {
	/**
		Used to identify the purpose of this checkbox to the user -- can be
		any renderable content.
	*/
	children: node,
};

/** Checkbox Labeled */
/** TODO: Remove the nonPassThroughs when the component is converted to a functional component */
const nonPassThroughs = [
	'isIndeterminate',
	'isDisabled',
	'isSelected',
	'onSelect',
	'className',
	'style',
	'Label',
	'initialState',
];
export interface ICheckboxLabeledProps extends ICheckboxProps {
	/** Child element whose children are used to identify the purpose of this  checkbox to the user. */
	Label?:
		| string
		| string[]
		| Element[]
		| (React.ReactNode & { props: ILabelProps });
}

export const CheckboxLabeled = (
	props: ICheckboxLabeledProps
): React.ReactElement => {
	const {
		className,
		isIndeterminate,
		isDisabled,
		isSelected,
		onSelect,
		style,
		...passThroughs
	} = props;

	const labelChildProps = _.first(
		_.map(findTypes(props, CheckboxLabeled.Label), 'props')
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
				{..._.omit(passThroughs, nonPassThroughs)}
			/>
			<div
				{...labelChildProps}
				className={cx('&-label', _.get(labelChildProps, 'className', null))}
			/>
		</label>
	);
};

CheckboxLabeled.displayName = 'CheckboxLabeled';

CheckboxLabeled.peek = {
	description: `A square two-state toggle with a \`Label\`.`,
	notes: {
		overview: `A square two-state toggle with a label that explains the action or selection. This is a composite of \`Checkbox\` and the native \`label\` element.`,
		intendedUse: `Use checkboxes to allow users to select one or more items. Commonly used to select filters or settings. For interactions where users can only select one option, use \`RadioButtonLabeled\`.`,
		technicalRecommendations: `
			- Use the styles on the \`CheckboxLabeled\` parent container to ensure only the checkboxes and their labels are clickable.
			- Use the Selected state when a filter or setting will be applied.
			- Use the Unselected state when a filter or setting will not be applied.
			- Use the Indeterminate state for parent checkboxes where some of the child checkboxes are Selected and some are Unselected. For example, the master checkbox in the header row of the interactive table example in \`DataTable\`.
			- You can have the label as a child or a prop depending on the needs of your application. 
		`,
	},
	categories: ['controls', 'toggles'],
	madeFrom: ['Checkbox'],
};

CheckboxLabeled.defaultProps = defaultPropsCheckbox;

// Can't just `...Checkbox.propTypes` anymore because of the way we have to
// handle default props. They are duplicated here on purpose which is okay
// since in the future we'll be removing proptypes in favor of just typescript.
CheckboxLabeled.propTypes = {
	/**
		Indicates whether the component should appear in an "indeterminate" or
		"partially checked" state. This prop takes precedence over
		\`isSelected\`.
	*/
	isIndeterminate: bool,

	/**
		Indicates whether the component should appear and act disabled by having
		a "greyed out" palette and ignoring user interactions.
	*/
	isDisabled: bool,

	/**
		Indicates that the component is in the "selected" state when true and in
		the "unselected" state when false. This props is ignored if
		\`isIndeterminate\` is \`true\`.
	*/
	isSelected: bool,

	/**
		Called when the user clicks on the component or when they press the space
		key while the component is in focus.  Signature:
		\`(isSelected, { event, props }) => {}\`
	*/
	onSelect: func,

	/**
		Appended to the component-specific class names set on the root element.
	*/
	className: string,

	/**
		Passed through to the root element.
	*/
	style: object,

	/**
		Child element whose children are used to identify the purpose of this
		checkbox to the user.
	*/
	Label: any,
};

CheckboxLabeled.Label = Label;

export default CheckboxLabeled;
