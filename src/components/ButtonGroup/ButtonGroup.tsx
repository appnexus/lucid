import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import Button, { IButtonProps } from '../Button/Button';
import { lucidClassNames } from '../../util/style-helpers';
import { findTypes, StandardProps } from '../../util/component-types';
import reducers from './ButtonGroup.reducers';
import { buildModernHybridComponent } from '../../util/state-management';

const cx = lucidClassNames.bind('&-ButtonGroup');

const { any, func, arrayOf, number } = PropTypes;

const ButtonGroupButton = (_props: Partial<IButtonProps>): null => null;
ButtonGroupButton.displayName = 'ButtonGroup.Button';
ButtonGroupButton.peek = {
	description: `Renders a \`<Button\`> inside the \`ButtonGroup\`.`,
};

const defaultProps = {
	onSelect: _.noop,
	selectedIndices: [],
};

const nonPassThroughs = [
	'onSelect',
	'className',
	'children',
	'selectedIndices',
];
export interface IButtonGroupState {
	selectedIndices: number[];
}

export interface IButtonGroupProps extends StandardProps {
	/** A function that is called with the index of the child button clicked. */
	onSelect: (
		selectedIndex: number,
		{ event, props }: { event: React.MouseEvent; props: IButtonProps }
	) => void;

	/** An array of currently selected \`ButtonGroup.Button\`s indices. You can
	also pass the prop \`isActive\` to individual \`ButtonGroup.Button\`
	components. */
	selectedIndices: number[];
}

class ButtonGroup extends React.Component<
	IButtonGroupProps,
	IButtonGroupState
> {
	static displayName = 'ButtonGroup';

	static peek = {
		description: `\`Button Group\` allows you to pair \`Buttons\` together to form a seamless cluster. Any props not explicitly called out are spread on to the root component.`,
		categories: ['controls', 'buttons'],
		madeFrom: ['Button'],
	};

	static Button = ButtonGroupButton;

	static reducers = reducers;

	static defaultProps = defaultProps;

	static propTypes = {
		/**
			A function that is called with the index of the child button clicked.
			\`props\` refers to the child button props.  Signature:
			\`(selectedIndex, { event, props }) => {}\`
		*/
		onSelect: func,

		/**
			Appended to the component-specific class names set on the root element.
			Value is run through the \`classnames\` library.
		*/
		className: any,

		/**
			All children should be \`ButtonGroup.Button\`s and they support the same
			props as \`Button\`s.
		*/
		children: any,

		/**
			An array of currently selected \`ButtonGroup.Button\`s indices. You can
			also pass the prop \`isActive\` to individual \`ButtonGroup.Button\`
			components.
		*/
		selectedIndices: arrayOf(number),
	};

	handleSelect = (event, childProps, index) => {
		const clickedButtonProps = _.get(
			findTypes(this.props, ButtonGroup.Button)[index],
			'props',
			{}
		);
		// If the consumer passed in an `onClick` to the child `ButtonGroup.Button`
		// component, we should make sure to call that in addition to the
		// `ButtonGroup`'s `onSelect`.
		if (_.isFunction(clickedButtonProps.onClick)) {
			clickedButtonProps.onClick({ event, props: childProps });
		}

		this.props.onSelect(index, { event, props: childProps });
	};

	render() {
		const { selectedIndices, className, children, ...passThroughs } =
			this.props;

		const buttonChildProps = _.map(
			findTypes(this.props, ButtonGroup.Button),
			'props'
		);

		return (
			<span
				{...(_.omit(passThroughs, nonPassThroughs) as any)}
				className={cx('&', className)}
			>
				{_.map(buttonChildProps, (buttonChildProp, index) => {
					return (
						// The order of the spread operator below is important. If the
						// consumer puts `isActive` directly on a `ButtonGroup.Button`, we
						// want that to take precedence over the `selectedIndices` prop on
						// the parent `ButtonGroup`. However, we want our `onClick` at the
						// bottom because we manually handle passing the event to the
						// `ButtonGroup.Button`'s `onClick` if it exists.
						<Button
							isActive={_.includes(selectedIndices, index)}
							{...buttonChildProp}
							key={index}
							onClick={({ event, props }) =>
								this.handleSelect(event, props, index)
							}
						/>
					);
				})}
				{children}
			</span>
		);
	}
}

export default buildModernHybridComponent<
	IButtonGroupProps,
	IButtonGroupState,
	typeof ButtonGroup
>(ButtonGroup as any, { reducers });

export { ButtonGroup as ButtonGroupDumb };
