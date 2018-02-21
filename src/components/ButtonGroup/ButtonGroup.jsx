import _ from 'lodash';
import Button from '../Button/Button';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, findTypes, omitProps } from '../../util/component-types';
import reducers from './ButtonGroup.reducers';
import { buildHybridComponent } from '../../util/state-management';

const cx = lucidClassNames.bind('&-ButtonGroup');

const { any, func, arrayOf, number } = PropTypes;

const ButtonGroup = createClass({
	displayName: 'ButtonGroup',

	statics: {
		peek: {
			description: `
				Button groups allow you to pair buttons together to form a seamless
				cluster.  Any props not explicitly called out are spread on to the root
				component.
			`,
			categories: ['controls', 'buttons'],
			madeFrom: ['Button'],
		},
	},

	components: {
		Button: createClass({
			displayName: 'ButtonGroup.Button',
			statics: {
				peek: {
					description: `
						Renders a \`<Button\`> inside the \`ButtonGroup\`.
					`,
				},
			},
		}),
	},

	reducers: reducers,

	propTypes: {
		onSelect: func`
			A function that is called with the index of the child button clicked.
			\`props\` refers to the child button props.  Signature:
			\`(selectedIndex, { event, props }) => {}\`
		`,

		className: any`
			Appended to the component-specific class names set on the root element.
			Value is run through the \`classnames\` library.
		`,

		children: any`
			All children should be \`ButtonGroup.Button\`s and they support the same
			props as \`Button\`s.
		`,

		selectedIndices: arrayOf(number)`
			An array of currently selected \`ButtonGroup.Button\`s indices. You can
			also pass the prop \`isActive\` to individual \`ButtonGroup.Button\`
			components.
		`,
	},

	getDefaultProps() {
		return {
			onSelect: _.noop,
			className: null,
			children: null,
			selectedIndices: [],
		};
	},

	handleSelect({ event, props: childProps }) {
		const { callbackId } = childProps;
		const clickedButtonProps = _.get(
			findTypes(this.props, ButtonGroup.Button)[callbackId],
			'props',
			{}
		);

		// If the consumer passed in an `onClick` to the child `ButtonGroup.Button`
		// component, we should make sure to call that in addition to the
		// `ButtonGroup`'s `onSelect`.
		if (_.isFunction(clickedButtonProps.onClick)) {
			clickedButtonProps.onClick({ event, props: childProps });
		}

		this.props.onSelect(callbackId, { event, props: childProps });
	},

	render() {
		const {
			selectedIndices,
			className,
			children,
			...passThroughs
		} = this.props;

		const buttonChildProps = _.map(
			findTypes(this.props, ButtonGroup.Button),
			'props'
		);

		return (
			<span
				{...omitProps(passThroughs, ButtonGroup)}
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
							callbackId={index}
							onClick={this.handleSelect}
						/>
					);
				})}
				{children}
			</span>
		);
	},
});

export default buildHybridComponent(ButtonGroup);
export { ButtonGroup as ButtonGroupDumb };
