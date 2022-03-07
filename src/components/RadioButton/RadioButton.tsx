import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { lucidClassNames } from '../../util/style-helpers';
import { StandardProps, Overwrite } from '../../util/component-types';

const cx = lucidClassNames.bind('&-RadioButton');
const { bool, func, object, string } = PropTypes;

export interface IRadioButtonPropsRaw extends StandardProps {
	/** Indicates whether the component should appear and act disabled by having
	 * a "greyed out" palette and ignoring user interactions.
	 *
	 * @default false
	 */
	isDisabled: boolean;

	/** Indicates that the component is in the "selected" state when true and in
	 * the "unselected" state when false.
	 *
	 * @default false
	 */
	isSelected: boolean;

	/** Optional name for the input element */
	name?: string;

	/** Called when the user clicks on the component or when they press the space
	 * key while the component is in focus, and only called when the component
	 * is in the unselected state.
	 */
	onSelect: (
		isSelected: boolean,
		{
			event,
			props,
		}: {
			event: React.MouseEvent<HTMLSpanElement>;
			props: IRadioButtonProps;
		}
	) => void;
}

export type IRadioButtonProps = Overwrite<
	React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLSpanElement>,
		HTMLSpanElement
	>,
	IRadioButtonPropsRaw
>;

/** TODO: Remove nonPassThroughs when the component is converted to a functional component */
const nonPassThroughs = [
	'callbackId',
	'children',
	'className',
	'isDisabled',
	'isSelected',
	'name',
	'onSelect',
	'style',
];

export const defaultProps = {
	isDisabled: false,
	isSelected: false,
	onSelect: _.noop,
};

export const RadioButton = (props: IRadioButtonProps): React.ReactElement => {
	const {
		className,
		isDisabled,
		isSelected,
		onSelect,
		style,
		...passThroughs
	} = props;

	const nativeElement = React.createRef<HTMLInputElement>();

	function handleClicked(event: React.MouseEvent<HTMLSpanElement>): void {
		if (!isDisabled && !isSelected) {
			onSelect(true, { event, props });
			if (nativeElement.current) {
				nativeElement.current.focus();
			}
		}
	}

	function handleSpanClick(e: React.MouseEvent<HTMLSpanElement>): void {
		e.preventDefault();
	}

	return (
		<span
			className={cx(
				'&',
				{
					'&-is-disabled': isDisabled,
					'&-is-selected': isSelected,
				},
				className
			)}
			onClick={(e) => handleClicked(e)}
			style={style}
		>
			<input
				onChange={_.noop}
				{..._.omit(passThroughs, nonPassThroughs)}
				checked={isSelected}
				className={cx('&-native')}
				disabled={isDisabled}
				ref={nativeElement}
				type='radio'
			/>
			<span onClick={handleSpanClick} className={cx('&-visualization-glow')} />
			<span
				onClick={handleSpanClick}
				className={cx('&-visualization-container')}
			/>
			<span onClick={handleSpanClick} className={cx('&-visualization-dot')} />
		</span>
	);
};

RadioButton.defaultProps = defaultProps;

RadioButton.displayName = 'RadioButton';

RadioButton.peek = {
	description: `\`RadioButton\` is a round two-state toggle used to create \`RadioButtonLabeled\`. It uses a hidden native checkbox control under the hood but leverages other \`HTML\` elements to visualize its state.`,
	notes: {
		overview: `RadioButton is a round two-state toggle. Use \`RadioButtonLabeled\` or \`RadioGroup\` in your applications.`,
		intendedUse: `Used to create \`RadioButtonLabeled\` and \`RadioGroup\`.`,
		technicalRecommendations: `
			- Use the Selected state when a filter or setting will be applied.
			- Use the Unselected state when a filter or setting will not be applied.
			- Any props that are not explicitly defined in \`propTypes\` are passed to the native radio button control.
		`,
	},
	categories: ['controls', 'toggles'],
};

RadioButton.propTypes = {
	/**
		Appended to the component-specific class names set on the root element.
	*/
	className: string,

	/**
		Indicates whether the component should appear and act disabled by having
		a "greyed out" palette and ignoring user interactions.
	*/
	isDisabled: bool,

	/**
		Indicates that the component is in the "selected" state when true and in
		the "unselected" state when false.
	*/
	isSelected: bool,

	/**
	Optional name for the input element.
	*/
	name: string,

	/**
		Called when the user clicks on the component or when they press the space
		key while the component is in focus, and only called when the component
		is in the unselected state.  Signature: \`(true, { event, props }) => {}\`
	*/
	onSelect: func,

	/**
		Passed through to the root element.
	*/
	style: object,
};

export default RadioButton;
