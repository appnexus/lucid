import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { omitProps, FC, StandardProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Checkbox');

const { bool, func, object, string } = PropTypes;

export interface ICheckboxProps extends StandardProps {
	/** Indicates whether the component should appear in an "indeterminate" or
	 * "partially checked" state. This prop takes precedence over
	 * \`isSelected\`.
	 */
	isIndeterminate?: boolean;

	/** Indicates whether the component should appear and act disabled by having
	 * a "greyed out" palette and ignoring user interactions.
	 */
	isDisabled?: boolean;

	/** Indicates that the component is in the "selected" state when true and in
	 * the "unselected" state when false. This props is ignored if
	 * \`isIndeterminate\` is \`true\`.
	 */
	isSelected?: boolean;

	/** Called when the user clicks on the component or when they press the space
	 * key while the component is in focus.  Signature:
	 * \`(isSelected, { event, props }) => {}\`
	 */
	onSelect?: (
		isSelected: boolean,
		{
			event,
			props,
		}: {
			event: React.MouseEvent<HTMLInputElement>;
			props: ICheckboxProps;
		}
	) => void;

	/** Passed through to the root element. */
	style?: React.CSSProperties;

	/** A string title that is displayed on hover. */
	title?: string;
}

const Checkbox: FC<ICheckboxProps> = (props): React.ReactElement => {
	const {
		className,
		isIndeterminate = false,
		isSelected = false,
		isDisabled = false,
		style,
		title,
		onSelect = _.noop,
		...passThroughs
	} = props;

	const nativeElement = React.createRef<HTMLInputElement>();

	function handleSpanClick(e: React.MouseEvent<HTMLInputElement>): void {
		e.preventDefault();
	}

	function handleClicked(event: React.MouseEvent<HTMLInputElement>): void {
		if (!isDisabled) {
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
				{...omitProps(
					passThroughs,
					undefined,
					['children'].concat(_.keys(Checkbox.propTypes))
				)}
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
	description: `
		This is a checkbox. It's a component that is in one of two particular
		states at any given moment. It features a custom visualization of the
		native checkbox button control to reflect its current state.

		It uses a hidden native checkbox control under the hood but leverages
		other HTML elements to visualize its state.
	`,
	categories: ['controls', 'toggles'],
};

Checkbox.propTypes = {
	className: string`
		Appended to the component-specific class names set on the root element.
	`,

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

	style: object`
		Passed through to the root element.
	`,

	title: string`
		A string title that is displayed on hover.
	`,
};

export default Checkbox;
