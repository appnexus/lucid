import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { StandardProps, Overwrite } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Checkbox');

const { bool, func, object, string } = PropTypes;

export interface ICheckboxPropsRaw extends StandardProps {
	/** Indicates whether the component should appear in an "indeterminate" or
	 * "partially checked" state. This prop takes precedence over
	 * \`isSelected\`.
	 */
	isIndeterminate: boolean;

	/** Indicates whether the component should appear and act disabled by having
	 * a "greyed out" palette and ignoring user interactions.
	 */
	isDisabled: boolean;

	/** Indicates that the component is in the "selected" state when true and in
	 * the "unselected" state when false. This props is ignored if
	 * \`isIndeterminate\` is \`true\`.
	 */
	isSelected: boolean;

	/** Called when the user clicks on the component or when they press the space
	 * key while the component is in focus.
	 */
	onSelect: (
		isSelected: boolean,
		{
			event,
			props,
		}: {
			event: React.MouseEvent<HTMLInputElement>;
			props: ICheckboxProps;
		}
	) => void;

	/** A string title that is displayed on hover. */
	title?: string;
}

export type ICheckboxProps = Overwrite<
	React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	>,
	ICheckboxPropsRaw
>;

/** TODO: Remove nonPassThroughs when the component is converted to a functional component */
const nonPassThroughs = [
	'children',
	'className',
	'isIndeterminate',
	'isDisabled',
	'isSelected',
	'onSelect',
	'style',
	'title',
];

export const defaultProps = {
	isIndeterminate: false,
	isDisabled: false,
	isSelected: false,
	onSelect: _.noop,
};

export const Checkbox = (props: ICheckboxProps): React.ReactElement => {
	const {
		className,
		isIndeterminate,
		isSelected,
		isDisabled,
		style,
		title,
		onSelect,
		...passThroughs
	} = props;

	const nativeElement = React.createRef<HTMLInputElement>();

	function handleSpanClick(e: React.MouseEvent<HTMLInputElement>): void {
		e.preventDefault();
	}

	function handleClicked(event: React.MouseEvent<HTMLInputElement>): void {
		if (!isDisabled && onSelect) {
			onSelect(!isSelected, { event, props });
			if (nativeElement.current) {
				nativeElement.current.focus();
			}
		}
	}

	return (
		<div
			className={cx(
				'&',
				{
					'&-is-disabled': isDisabled,
					'&-is-selected': isIndeterminate || isSelected,
				},
				className
			)}
			onClick={handleClicked}
			style={style}
			title={title}
		>
			<input
				onChange={_.noop}
				{..._.omit(passThroughs, nonPassThroughs)}
				checked={isSelected}
				className={cx('&-native')}
				disabled={isDisabled}
				ref={nativeElement}
				title={title}
				type='checkbox'
			/>
			<span onClick={handleSpanClick} className={cx('&-visualization-glow')} />
			<span
				onClick={handleSpanClick}
				className={cx('&-visualization-container')}
			/>
			{isIndeterminate ? (
				<span
					onClick={handleSpanClick}
					className={cx('&-visualization-indeterminate')}
				>
					<span className={cx('&-visualization-indeterminate-line')} />
				</span>
			) : (
				<span
					onClick={handleSpanClick}
					className={cx('&-visualization-checkmark')}
				>
					<span className={cx('&-visualization-checkmark-stem')} />
					<span className={cx('&-visualization-checkmark-kick')} />
				</span>
			)}
		</div>
	);
};

Checkbox.displayName = 'Checkbox';
Checkbox.peek = {
	description: `\`Checkbox\` is a square two-state toggle used to create \`CheckboxLabeled\`. It uses a hidden native \`Checkbox\` control under the hood but leverages other \`HTML\` elements to visualize its state.`,
	notes: {
		overview: `
			Checkbox is a square two-state toggle. Use \`CheckboxLabeled\` in your applications.
		`,
		intendedUse: `
			Used to create \`CheckboxLabeled\`. 			
		`,
		technicalRecommendations: `
			- Use the Selected state when a filter or setting will be applied.
			- Use the Unselected state when a filter or setting will not be applied.
			- Use the Indeterminate state for parent checkboxes where some of the child checkboxes are Selected and some are Unselected. For example, the master checkbox in the header row of the interactive table example in \`DataTable\`.
		`,
	},
	categories: ['controls', 'toggles'],
};

Checkbox.defaultProps = defaultProps;

Checkbox.propTypes = {
	/**
		Appended to the component-specific class names set on the root element.
	*/
	className: string,

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
		Passed through to the root element.
	*/
	style: object,

	/**
		A string title that is displayed on hover.
	*/
	title: string,
};

export default Checkbox;
