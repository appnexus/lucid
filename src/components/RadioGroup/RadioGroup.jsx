import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, getFirst, findTypes } from '../../util/component-types';
import getRandom from '../../util/random';
import RadioButtonLabeled from '../RadioButtonLabeled/RadioButtonLabeled';
import RadioButton from '../RadioButton/RadioButton';
import reducers from './RadioGroup.reducers';

const cx = lucidClassNames.bind('&-RadioGroup');

const {
	func,
	node,
	number,
	string,
} = React.PropTypes;

/**
 * {"categories": ["controls", "toggles"], "madeFrom": ["RadioButton"]}
 *
 * This is a group of related radio buttons whose values are mutually exclusive
 * and one whom must be selected any given moment in time.

 * Any props that are not explicitly defined in `propTypes` are spread onto the
 * root element.
 */
const RadioGroup = createClass({
	displayName: 'RadioGroup',

	components: {
		RadioButton: createClass({
			displayName: 'RadioGroup.RadioButton',
			propName: 'RadioButton',
			propTypes: RadioButton.propTypes,
		}),

		/**
		 * Support radio button labels as `RadioGroup.Label` component which can
		 * be provided as a child of a `RadioGroup.RadioButton` component.
		 */
		Label: createClass({
			displayName: 'RadioGroup.Label',
			propName: 'Label',
			propTypes: {
				children: node,
			},
		}),
	},

	reducers,

	propTypes: {
		/**
		 * Should be instances of `RadioGroup.RadioButton` which supports the
		 * same props as `RadioButton`.
		 */
		children: node,

		/**
		 * Appended to the component-specific class names set on the root
		 * element.
		 */
		className: string,

		/**
		 * Passed along to the `RadioGroup.RadioButton` children whose `name`
		 * props are ignored.
		 */
		name: string,

		/**
		 * Called when the user clicks on one of the child radio buttons or when
		 * they press the space key while one is in focus, and only called when
		 * the component is in the unselected state. `props` refers to the child
		 * `RadioButton` props.
		 *
		 * Signature: `(selectedIndex, { event, props }) => {}`
		 */
		onSelect: func,

		/**
		 * Indicates which of the `RadioGroup.RadioButton` children is currently
		 * selected. The index of the last `RadioGroup.RadioButton` child with
		 * `isSelected` equal to true takes precedence over this prop.
		 */
		selectedIndex: number,
	},

	getDefaultProps() {
		return {
			name: `${cx('&')}-${getRandom()}`,
			onSelect: _.noop,
			selectedIndex: 0,
		};
	},

	render() {
		const {
			children,
			className,
			name,
			selectedIndex,
			...passThroughs,
		} = this.props;

		const radioButtonChildProps = _.map(findTypes(this.props, RadioGroup.RadioButton), 'props')
		const selectedIndexFromChildren = _.findLastIndex(radioButtonChildProps, {
			isSelected: true,
		});

		// If there are any `RadioGroup.RadioButton` children with `isSelected`
		// equal to true, then the index of the last one should override the
		// value of the `selectedIndex` prop.
		const actualSelectedIndex = selectedIndexFromChildren !== -1
			? selectedIndexFromChildren
			: selectedIndex;

		return (
			<span
				{...passThroughs}
				className={cx('&', className)}
			>
				{_.map(radioButtonChildProps, (radioButtonChildProp, index) => {
					return (
						<RadioButtonLabeled
							{...radioButtonChildProp}
							isSelected={actualSelectedIndex === index}
							key={index}
							callbackId={index}
							name={name}
							onSelect={this.handleSelected}
							Label={_.get(getFirst(radioButtonChildProp, RadioGroup.Label), 'props', null)}
						/>
					);
				})}
				{children}
			</span>
		);
	},

	handleSelected(isSelected, { event, props: childProps }) {
		const { callbackId } = childProps;
		const clickedRadioButtonProps = _.map(findTypes(this.props, RadioGroup.RadioButton), 'props')[callbackId];

		// If the `RadioGroup.RadioButton` child has an `onSelect` prop that is
		// a function, call that prior to calling the group's `onSelect` prop.
		if (_.isFunction(clickedRadioButtonProps.onSelect)) {
			clickedRadioButtonProps.onSelect(isSelected, { event, props: childProps });
		}

		this.props.onSelect(callbackId, { event, props: childProps });
	},
});

export default RadioGroup;
