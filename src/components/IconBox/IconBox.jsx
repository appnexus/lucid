import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Icon from '../Icon/Icon';
import { lucidClassNames } from '../../util/style-helpers';
import {
	createClass,
	getFirst,
	omitProps,
	rejectTypes,
} from '../../util/component-types';

import RadioButtonLabeled from '../RadioButtonLabeled/RadioButtonLabeled';
import CheckboxLabeled from '../CheckboxLabeled/CheckboxLabeled';

const cx = lucidClassNames.bind('&-IconBox');

const { bool, func, node, number, oneOf, string } = PropTypes;

/**
 *
 * {"categories": ["controls", "toggles"]}
 *
 * A basic button. Any props that are not explicitly called out below will be
 * passed through to the native `button` component.
 */
const IconBox = createClass({
	displayName: 'IconBox',
	propName: 'IconBox',

	components: {
		/**
		 * The Custom Icon for your IconBox. Defaults to a square placeholder.
		 */
		Icon: createClass({
			displayName: 'IconBox.Icon',
			propName: 'Icon',
		}),
	},

	propTypes: {
		/**
		 * Disables the IconBox by greying it out
		 */
		isDisabled: bool,

		/**
		 * Selects the IconBox by checking it's input
		 */
		isSelected: bool,

		/**
		 * Selects the IconBox by setting it's checkbox to the secondary state. Only usable when kind='checkbox'
		 */
		isIndeterminate: bool,

		/**
		 * Class names that are appended to the defaults
		 */
		className: string,

		/**
		 * Any valid React children
		 */
		children: node,

		/**
		 * Style variations of the IconBox
		 */
		kind: oneOf(['radio', 'checkbox']),

		/**
		 * Called when the user clicks the `IconBox`.
		 *
		 * Signature: `({ event, props }) => {}`
		 */
		onClick: func,

		/**
		 * tabIndex
		 */
		tabIndex: number,
	},

	getDefaultProps() {
		return {
			isDisabled: false,
			isSelected: false,
			onClick: _.noop,
		};
	},

	handleClick(event) {
		const { isDisabled, onClick } = this.props;
		const domNode = ReactDOM.findDOMNode(this);

		if (!isDisabled) {
			// required to correctly apply the focus state in Safari and Firefox
			domNode.focus();
			onClick({ event, props: this.props });
		}
	},

	getInputComponent() {
		const {
			kind,
			isDisabled,
			children,
			isIndeterminate,
			isSelected,
			className,
			tabIndex,
		} = this.props;

		const Label = rejectTypes(children, IconBox.Icon);

		return _.isEqual(kind, 'checkbox')
			? <CheckboxLabeled
					Label={Label}
					className={cx('&-checkbox', {
						[`${className}-checkbox`]: className,
					})}
					isDisabled={isDisabled}
					isIndeterminate={isIndeterminate}
					isSelected={isSelected}
					tabIndex={tabIndex}
				/>
			: <RadioButtonLabeled
					Label={Label}
					className={cx('&-radio', {
						[`${className}-radio`]: className,
					})}
					isDisabled={isDisabled}
					isSelected={isSelected}
					tabIndex={tabIndex}
				/>;
	},

	render() {
		const {
			isDisabled,
			isSelected,
			isIndeterminate,
			kind,
			className,
			...passThroughs
		} = this.props;

		const iconChildren = getFirst(
			this.props,
			IconBox.Icon,
			<IconBox.Icon>
				<Icon>
					<rect x="0" y="0" width="16" height="16" />
					<rect x="1" y="1" width="14" height="14" fill="white" />
				</Icon>
			</IconBox.Icon>
		).props.children;

		return (
			<figure
				{...omitProps(passThroughs, IconBox, [
					'callbackId',
					'hasIndeterminate',
					'Boxes',
				])}
				className={cx(
					'&',
					{
						'&-is-disabled': isDisabled,
						'&-is-indeterminate': isIndeterminate,
						'&-is-selected': isSelected,
						'&-checkbox': kind === 'checkbox',
						'&-radio': kind === 'radio',
					},
					className
				)}
				onClick={this.handleClick}
				disabled={isDisabled}
			>
				{iconChildren}
				<figcaption className={cx('&-figcaption')}>
					{this.getInputComponent()}
				</figcaption>
			</figure>
		);
	},
});

export default IconBox;
