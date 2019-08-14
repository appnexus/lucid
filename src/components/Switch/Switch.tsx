import _ from 'lodash';
import React, { createRef } from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { omitProps, FC } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Switch');
const { bool, func, object, string } = PropTypes;

export interface ISwitchProps {
	/** Appended to the component-specific class names set on the root element.
	 * */
	className?: string;

	/** Indicates whether the component should appear and act disabled by having
	 * a "greyed out" palette and ignoring user interactions. */
	isDisabled?: boolean;

	/** Indicates that the component is in the "selected" state when true and in
	 * the "unselected" state when false. */
	isSelected?: boolean;

	/** Called when the user clicks on the component or when they press the space
	 * key while the component is in focus. */
	onSelect?: (
		isSelected: boolean,
		{
			event,
			props,
		}: {
			event:
				| React.MouseEvent<HTMLSpanElement>
				| React.TouchEvent<HTMLSpanElement>;
			props: ISwitchProps;
		}
	) => void;

	/** Passed through to the root element. */
	style?: React.CSSProperties;

	/** Offers a red/green styling to the switch. */
	isIncludeExclude?: boolean;
}

const Switch: FC<ISwitchProps> = (props): React.ReactElement => {
	const {
		className,
		isDisabled = false,
		isSelected = false,
		style,
		isIncludeExclude,
		onSelect = _.noop,
		...passThroughs
	} = props;

	const nativeElement = createRef<HTMLInputElement>();

	function handleClicked(
		event: React.MouseEvent<HTMLSpanElement> | React.TouchEvent<HTMLSpanElement>
	): void {
		event.preventDefault();

		if (!isDisabled) {
			onSelect(!isSelected, { event, props });
			if (nativeElement.current) {
				nativeElement.current.focus();
			}
		}
	}

	return (
		<span
			className={cx(
				'&',
				{
					'&-is-disabled': isDisabled,
					'&-is-selected': isSelected,
					'&-is-include-exclude': isIncludeExclude,
				},
				className
			)}
			onClick={handleClicked}
			onTouchEnd={handleClicked}
			style={style}
		>
			<input
				onChange={_.noop}
				{...omitProps(
					passThroughs,
					undefined,
					['children'].concat(_.keys(Switch.propTypes))
				)}
				checked={isSelected}
				className={cx('&-native')}
				disabled={isDisabled}
				ref={nativeElement}
				type='checkbox'
			/>
			<span className={cx('&-visualization-container')} />
			<span className={cx('&-visualization-handle')} />
		</span>
	);
};

Switch.displayName = 'Switch';
Switch.peek = {
	description: `
				This is a toggle -- a component that is in one of two particular states
				at any given moment in time -- that uses a visualization of a physical
				on/off switch made popular by smartphone OSes to reflect its current
				state.

				It uses a hidden native check box control under the hood but leverages
				other HTML elements to visualize its state.
			`,
	categories: ['controls', 'toggles'],
};

Switch.propTypes = {
	className: string`
			Appended to the component-specific class names set on the root element.
		`,

	isDisabled: bool`
			Indicates whether the component should appear and act disabled by having
			a "greyed out" palette and ignoring user interactions.
		`,

	isSelected: bool`
			Indicates that the component is in the "selected" state when true and in
			the "unselected" state when false.
		`,

	onSelect: func`
			Called when the user clicks on the component or when they press the space
			key while the component is in focus.  Signature:
			\`(isSelected, { event, props }) => {}\`
		`,

	style: object`
			Passed through to the root element.
		`,

	isIncludeExclude: bool`
			Offers a red/green styling to the switch.
		`,
};

export default Switch;
