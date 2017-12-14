import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import _ from 'lodash';
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

const {
	arrayOf,
	bool,
	func,
	node,
	number,
	oneOf,
	oneOfType,
	string,
} = PropTypes;

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
		 * The Custom Icon for your IconBox.
		 */
		Icon: createClass({
			displayName: 'IconBox.Icon',
		}),
	},

	propTypes: {
		/**
		 * Disables the IconBox by greying it out
		 */
		isDisabled: bool,
		/**
		 * Activates the IconBox by giving it a "pressed down" look
		 */
		isActive: bool,
		/**
		 * Selects the IconBox by checking it's input
		 */
		isSelected: bool,
		/**
		 * Class names that are appended to the defaults
		 */
		className: string,
		/**
		 * Set this to `true` if you want the IconBox to only contain
		 * an icon.
		 */
		hasOnlyIcon: bool,
		/**
		 * Any valid React children
		 */
		children: oneOfType([node, arrayOf(node)]),
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

		tabIndex: number,

		name: string,
	},

	getDefaultProps() {
		return {
			isDisabled: false,
			isActive: false,
			isSelected: false,
			onClick: _.noop,
			hasOnlyIcon: false,
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
			isActive,
			isIndeterminate,
			onClick,
			isSelected,
			children,
			className,
			tabIndex,
			name,
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
					onSelect={onClick}
					name={name}
					tabIndex={tabIndex}
				/>
			: <RadioButtonLabeled
					Label={Label}
					className={cx('&-radio', {
						[`${className}-radio`]: className,
					})}
					isDisabled={isDisabled}
					isSelected={isSelected}
					onSelect={onClick}
					name={name}
					tabIndex={tabIndex}
				/>;
	},

	render() {
		const {
			isDisabled,
			isActive,
			isSelected,
			kind,
			className,
			children,
			type,
			...passThroughs
		} = this.props;

		const hasOnlyIcon = _.isUndefined(this.props.children.length)
			? false
			: true;
		const Icon = getFirst(this.props, IconBox.Icon, <Icon />).props.children;

		return (
			<figure
				{...omitProps(passThroughs, IconBox, ['callbackId'])}
				className={cx(
					'&',
					{
						'&-is-disabled': isDisabled,
						'&-is-active': isActive,
						'&-is-selected': isSelected,
						'&-checkbox': kind === 'checkbox',
						'&-radio': kind === 'radio',
						'&-has-only-icon': hasOnlyIcon,
					},
					className
				)}
				onClick={this.handleClick}
				disabled={isDisabled}
				ref="figure"
			>
				{Icon}
				<figcaption className={cx('&-figcaption')}>
					{this.getInputComponent()}
				</figcaption>
			</figure>
		);
	},
});

export default IconBox;
