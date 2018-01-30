import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, findTypes, omitProps } from '../../util/component-types';
import RadioButton from '../RadioButton/RadioButton';

const cx = lucidClassNames.bind('&-RadioButtonLabeled');
const { any, node, object, string } = PropTypes;

const RadioButtonLabeled = createClass({
	displayName: 'RadioButtonLabeled',

	statics: {
		peek: {
			description: `
				This is a composite of the \`RadioButton\` component and the native
				\`label\` element.
			`,
			categories: ['controls', 'toggles'],
			extend: 'RadioButton',
			madeFrom: ['RadioButton'],
		},
	},

	components: {
		Label: createClass({
			displayName: 'RadioButtonLabeled.Label',
			propName: 'Label',
			propTypes: {
				children: node`
					Used to identify the purpose of this radio button to the user -- can
					be any renderable content.
				`,
			},
		}),
	},

	propTypes: {
		...RadioButton.propTypes,

		className: string`
			Appended to the component-specific class names set on the root element.
		`,

		style: object`
			Passed through to the root element.
		`,

		Label: any`
			Child element whose children are used to identify the purpose of this
			radio button to the user.
		`,
	},

	getDefaultProps() {
		return {
			isDisabled: false,
			isSelected: false,
			onSelect: _.noop,
		};
	},

	render() {
		const {
			className,
			isDisabled,
			isSelected,
			onSelect,
			style,
			...passThroughs
		} = this.props;

		const labelChildProps = _.first(
			_.map(findTypes(this.props, RadioButtonLabeled.Label), 'props')
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
					{...omitProps(passThroughs, RadioButtonLabeled, [], false)}
				/>
				<div {...labelChildProps} className={cx('&-label')} />
			</label>
		);
	},
});

export default RadioButtonLabeled;
