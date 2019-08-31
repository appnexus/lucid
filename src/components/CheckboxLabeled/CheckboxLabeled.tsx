import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { findTypes, omitProps, FC, StandardProps } from '../../util/component-types';
import Checkbox, { ICheckboxProps } from '../Checkbox/Checkbox';

const cx = lucidClassNames.bind('&-CheckboxLabeled');
const { any, node, object, string } = PropTypes;

interface ILabelProps extends StandardProps {}

const Label: FC<ILabelProps> = (props): React.ReactElement => (
	<div>{props.children}</div>
);

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
		isIndeterminate = false,
		isDisabled = false,
		isSelected = false,
		onSelect = _.noop,
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
CheckboxLabeled.propTypes = {
	...Checkbox.propTypes,

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
