import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, omitProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Switch');
const { bool, func, object, string } = PropTypes;

const Switch = createClass({
	displayName: 'Switch',

	statics: {
		peek: {
			description: `
				This is a toggle -- a component that is in one of two particular states
				at any given moment in time -- that uses a visualization of a physical
				on/off switch made popular by smartphone OSes to reflect its current
				state.

				It uses a hidden native check box control under the hood but leverages
				other HTML elements to visualize its state.
			`,
			categories: ['controls', 'toggles'],
		},
	},

	propTypes: {
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
	},

	getDefaultProps() {
		return {
			isDisabled: false,
			isSelected: false,
			onSelect: _.noop,
		};
	},

	componentDidMount() {
		this.nativeElement = this.refs.nativeElement;
	},

	render() {
		const {
			className,
			isDisabled,
			isSelected,
			style,
			...passThroughs
		} = this.props;

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
				onClick={this.handleClicked}
				onTouchEnd={this.handleClicked}
				style={style}
			>
				<input
					onChange={_.noop}
					{...omitProps(passThroughs, Switch, 'children')}
					checked={isSelected}
					className={cx('&-native')}
					disabled={isDisabled}
					ref="nativeElement"
					type="checkbox"
				/>
				<span className={cx('&-visualization-container')} />
				<span className={cx('&-visualization-glow')} />
				<span className={cx('&-visualization-handle')} />
			</span>
		);
	},

	handleClicked(event) {
		const { isDisabled, isSelected, onSelect } = this.props;

		event.preventDefault();

		if (!isDisabled) {
			onSelect(!isSelected, { event, props: this.props });
			this.nativeElement.focus();
		}
	},
});

export default Switch;
