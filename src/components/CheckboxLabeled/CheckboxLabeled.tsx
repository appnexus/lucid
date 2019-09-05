import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import {
	findTypes,
	omitProps,
	FC,
	StandardProps,
} from '../../util/component-types';
import Checkbox, {
	ICheckboxProps,
	defaultPropsCheckbox,
} from '../Checkbox/Checkbox';

const cx = lucidClassNames.bind('&-CheckboxLabeled');
const { any, node, object, string, bool, func } = PropTypes;

interface ILabelProps extends StandardProps {}

const Label: FC<ILabelProps> = (props): null => null;

Label.displayName = 'CheckboxLabeled.Label';
Label.peek = {
	description: `
		Renders a \`label\` for the \`Checkbox\`
	`,
	categories: ['controls', 'toggles'],
	madeFrom: ['Checkbox'],
};
Label.propName = 'Label';
Label.propTypes = {
	children: node`
		Used to identify the purpose of this checkbox to the user -- can be
		any renderable content.
	`,
};

export interface ICheckboxLabeledProps extends ICheckboxProps {
	/** Child element whose children are used to identify the purpose of this  checkbox to the user. */
	Label?: React.ReactNode & { props: ILabelProps };
}

export interface ICheckboxLabeledFC extends FC<ICheckboxLabeledProps> {
	Label: FC<ILabelProps>;
}

const CheckboxLabeled: ICheckboxLabeledFC = (props): React.ReactElement => {
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
				{...omitProps(
					passThroughs,
					undefined,
					_.keys(CheckboxLabeled.propTypes),
					false
				)}
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
	description: `
		This is a composite of the \`Checkbox\` component and the native
		\`label\` element.
	`,
	categories: ['controls', 'toggles'],
	madeFrom: ['Checkbox'],
};

CheckboxLabeled.defaultProps = defaultPropsCheckbox;

CheckboxLabeled.getDefaultProps = (): typeof defaultPropsCheckbox =>
	defaultPropsCheckbox;

// Can't just `...Checkbox.propTypes` anymore because of the way we have to
// handle default props. They are duplicated here on purpose which is okay
// since in the future we'll be removing proptypes in favor is just typescript.
CheckboxLabeled.propTypes = {
	isIndeterminate: bool`
		Indicates whether the component should appear in an "indeterminate" or
		"partially checked" state. This prop takes precedence over
		\`isSelected\`.
	`,

	isDisabled: bool`
		Indicates whether the component should appear and act disabled by having
		a "greyed out" palette and ignoring user interactions.
	`,

	isSelected: bool`
		Indicates that the component is in the "selected" state when true and in
		the "unselected" state when false. This props is ignored if
		\`isIndeterminate\` is \`true\`.
	`,

	onSelect: func`
		Called when the user clicks on the component or when they press the space
		key while the component is in focus.  Signature:
		\`(isSelected, { event, props }) => {}\`
	`,

	className: string`
		Appended to the component-specific class names set on the root element.
	`,

	style: object`
		Passed through to the root element.
	`,

	Label: any`
		Child element whose children are used to identify the purpose of this
		checkbox to the user.
	`,
};

CheckboxLabeled.Label = Label;

export default CheckboxLabeled;
