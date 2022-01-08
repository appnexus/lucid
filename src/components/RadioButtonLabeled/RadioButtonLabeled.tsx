import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { lucidClassNames } from '../../util/style-helpers';
import { StandardProps, findTypes } from '../../util/component-types';
import RadioButton, {
	IRadioButtonProps,
	defaultProps as radioButtonDefaultProps,
} from '../RadioButton/RadioButton';

const cx = lucidClassNames.bind('&-RadioButtonLabeled');
const { any, object, string } = PropTypes;

export interface IRadioButtonLabeledLabelProps
	extends StandardProps,
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		> {
	description?: string;
}
const RadioButtonLabeledLabel = (_props: IRadioButtonLabeledLabelProps): null =>
	null;
RadioButtonLabeledLabel.displayName = 'RadioButtonLabeled.Label';
RadioButtonLabeledLabel.peek = {
	description: `Used to identify the purpose of this radio button to the user -- can be any renderable content.`,
};
RadioButtonLabeledLabel.propName = 'Label';

/** TODO: Remove nonPassThroughs when the component is converted to a functional component */
const nonPassThroughs = ['className', 'style', 'Label'];
export interface IRadioButtonLabeledProps extends IRadioButtonProps {
	/** Child element whose children are used to identify the purpose of this
		radio button to the user. */
	Label?: string | (React.ReactNode & { props: IRadioButtonLabeledLabelProps });
}

export const RadioButtonLabeled = (
	props: IRadioButtonLabeledProps
): React.ReactElement => {
	const {
		className,
		isDisabled,
		isSelected,
		onSelect,
		style,
		...passThroughs
	} = props;

	const labelChildProps = _.first(
		_.map(findTypes(props, RadioButtonLabeled.Label), 'props')
	);

	return (
		<label
			className={cx(
				'&',
				{
					'&-is-disabled': isDisabled,
					'&-is-selected': isSelected,
				},
				className
			)}
			style={style}
		>
			<RadioButton
				className={className}
				isDisabled={isDisabled}
				isSelected={isSelected}
				onSelect={onSelect}
				{..._.omit(passThroughs as any, nonPassThroughs)}
			/>
			<div {...labelChildProps} className={cx('&-label')} />
		</label>
	);
};

RadioButtonLabeled.displayName = 'RadioButtonLabeled';

RadioButtonLabeled.defaultProps = radioButtonDefaultProps;

RadioButtonLabeled.peek = {
	description: `A composite of the \`RadioButton\` component and the native \`label\` element.`,
	notes: {
		overview: `
			A round two-state toggle with a label that explains the action or selection. This is a composite of \`RadioButton\` and the native
			\`label\` element.		`,
		intendedUse: `
			- Use radio button to allow users to select one item. Commonly used to select filters or settings. For interactions where users can select mutiple options, use \`CheckboxLabeled\`. 
			- Use radio buttons for 2-3 options where you want to expose all options.
			- Use \`SingleSelect\` for 3-10 options where it is not a priority to expose all options.
			- Use \`RadioButtonLabeled\` for vertical lists of options. Use \`RadioGroup\` for horizontal lists of options.
		`,
		technicalRecommendations: `
			- Use the styles on the parent container of \`RadioButtonLabeled\` to ensure only the radio buttons and their labels are clickable.
			- Any props that are not explicitly defined in \`propTypes\` are passed to the native radio button control.
			`,
	},
	categories: ['controls', 'toggles'],
	extend: 'RadioButton',
	madeFrom: ['RadioButton'],
};

RadioButtonLabeled.propTypes = {
	...RadioButton.propTypes,

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
		radio button to the user.
	*/
	Label: any,
};

RadioButtonLabeled.Label = RadioButtonLabeledLabel;

export default RadioButtonLabeled;
