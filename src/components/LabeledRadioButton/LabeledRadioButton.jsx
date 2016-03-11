import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import RadioButton from '../RadioButton/RadioButton';

const boundClassNames = lucidClassNames.bind('&-LabeledRadioButton');
const {
	bool,
	func,
	node,
	object,
	string,
} = React.PropTypes;

/**
 * {"categories": ["controls", "toggles"], "extend": "RadioButton"}
 *
 * This is a composite of the `RadioButton` component and the native `label`
 * element.
 */
const LabeledRadioButton = React.createClass({
	propTypes: {
		...RadioButton.propTypes,

		/**
		 * Used to identify the purpose of this radio button to the user -- can
		 * be any renderable content.
		 */
		label: node
	},

	getDefaultProps() {
		return {
			isDisabled: false,
			isSelected: false,
			onSelect: _.noop
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
			label,
			onSelect,
			style,
			...passThroughs
		} = this.props;

		return (
			<label
					className={classNames(boundClassNames('&', {
						'&-is-disabled': isDisabled,
						'&-is-selected': isSelected
					}), className)}
					style={style}
			>
				<RadioButton
						className={className}
						isDisabled={isDisabled}
						isSelected={isSelected}
						onSelect={onSelect}
						{...passThroughs}
				/>
				{label}
			</label>
		);
	}
});

export default LabeledRadioButton;
