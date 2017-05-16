import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import ReactTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, getFirst, omitProps } from '../../util/component-types';
import Switch from '../Switch/Switch';

const cx = lucidClassNames.bind('&-SwitchLabeled');
const { any, node, object, string } = PropTypes;

/**
 * {"categories": ["controls", "toggles"], "extend": "Switch", "madeFrom": ["Switch"]}
 *
 * This is a composite of the `Switch` component and the native `label`
 * element.
 */
const SwitchLabeled = createClass({
	displayName: 'SwitchLabeled',

	components: {
		/**
		 * Label to be shown alongside the switch.
		 */
		Label: createClass({
			displayName: 'SwitchLabeled.Label',
			propName: 'Label',
			propTypes: {
				/**
				 * Used to identify the purpose of this switch to the user -- can be
				 * any renderable content.
				 */
				children: node,
			},
		}),
	},

	propTypes: {
		...Switch.propTypes,

		/**
		 * Appended to the component-specific class names set on the root
		 * element.
		 */
		className: string,

		/**
		 * Passed through to the root element.
		 */
		style: object,

		/**
		 * Child element whose children are used to identify the purpose of this
		 * switch to the user.
		 */
		Label: any,
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
					{labelChildProps
						? <span key={this._labelKey}>
								{labelChildProps.children || labelChildProps}
							</span>
						: null}
				</ReactTransitionGroup>
			</label>
		);
	},
});

export default SwitchLabeled;
