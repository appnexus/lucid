import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import ReactTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, getFirst, omitProps } from '../../util/component-types';
import Switch from '../Switch/Switch';

const cx = lucidClassNames.bind('&-SwitchLabeled');
const { any, node, object, string } = PropTypes;

const SwitchLabeled = createClass({
	displayName: 'SwitchLabeled',

	statics: {
		peek: {
			description: `
				This is a composite of the \`Switch\` component and the native
				\`label\` element.
			`,
			categories: ['controls', 'toggles'],
			madeFrom: ['Switch'],
		},
	},

	components: {
		Label: createClass({
			displayName: 'SwitchLabeled.Label',
			statics: {
				peek: {
					description: `
						Label to be shown alongside the switch.
					`,
				},
			},
			propName: 'Label',
			propTypes: {
				children: node`
					Used to identify the purpose of this switch to the user -- can be any
					renderable content.
				`,
			},
		}),
	},

	propTypes: {
		...Switch.propTypes,

		className: string`
			Appended to the component-specific class names set on the root element.
		`,

		style: object`
			Passed through to the root element.
		`,

		Label: any`
			Child element whose children are used to identify the purpose of this
			switch to the user.
		`,
	},

	getDefaultProps() {
		return {
			isDisabled: false,
			isSelected: false,
			onSelect: _.noop,
		};
	},

	componentWillMount() {
		this._labelKey = 0;
	},

	componentWillReceiveProps(nextProps) {
		const currentLabel = _.get(
			getFirst(this.props, SwitchLabeled.Label),
			'props.children',
			null
		);
		const nextLabel = _.get(
			getFirst(nextProps, SwitchLabeled.Label),
			'props.children',
			null
		);

		if (currentLabel !== nextLabel) {
			this._labelKey++;
		}
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

		const labelChildProps = _.get(
			getFirst(this.props, SwitchLabeled.Label),
			'props'
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
				<Switch
					className={className}
					isDisabled={isDisabled}
					isSelected={isSelected}
					onSelect={onSelect}
					{...omitProps(passThroughs, SwitchLabeled, [], false)}
				/>
				<ReactTransitionGroup
					transitionName={cx('&-text')}
					transitionEnterTimeout={100}
					transitionLeaveTimeout={100}
					style={{ position: 'relative' }}
					className={cx('&-text')}
				>
					{labelChildProps ? (
						<span key={this._labelKey}>
							{labelChildProps.children || labelChildProps}
						</span>
					) : null}
				</ReactTransitionGroup>
			</label>
		);
	},
});

export default SwitchLabeled;
