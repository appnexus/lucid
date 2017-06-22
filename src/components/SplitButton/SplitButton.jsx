import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import {
	createClass,
	filterTypes,
	getFirst,
	omitProps,
} from '../../util/component-types';
import { buildHybridComponent } from '../../util/state-management';
import Button from '../Button/Button';
import { ButtonGroupDumb as ButtonGroup } from '../ButtonGroup/ButtonGroup';
import CaretIcon from '../Icon/CaretIcon/CaretIcon';
import { DropMenuDumb as DropMenu } from '../DropMenu/DropMenu';
import * as reducers from './SplitButton.reducers';

const cx = lucidClassNames.bind('&-SplitButton');

const { any, bool, func, node, oneOf, shape, string } = PropTypes;

/**
 *
 * {"categories": ["controls", "buttons"], "madeFrom": ["Button", "DropMenu"]}
 *
 * SplitButtons allow you to combine a single main `Button` together with a
 * list of additional Buttons with actions which will be rendered within a
 * DropMenu.
 */
const SplitButton = createClass({
	displayName: 'SplitButton',

	components: {
		/**
		 * One of many potential `Button`s to render in this `SplitButton`. The
		 * first `Button` will be used as the Primary button, while all others will
		 * be rendered within the `DropMenu` below.
		 */
		Button: createClass({
			displayName: 'SplitButton.Button',
			propTypes: {
				/**
				 * The children to render within the `Button`.
				 */
				children: any,
				/**
				 * Disables selection of the `Button`.
				 */
				isDisabled: bool,
				/**
				 * Called when the user clicks the `Button`.
				 *
				 * Signature: `({ event, props }) => {}`
				 */
				onClick: func,
			},
		}),
	},

	reducers,

	propTypes: {
		/**
		 * Object of DropMenu props which are passed through to the underlying
		 * DropMenu component.
		 */
		DropMenu: shape(DropMenu.propTypes),

		/**
		 * All children should be `ButtonGroup.Button`s and they support the same
		 * props as `Button`s.
		 */
		children: node,

		/**
		 * Appended to the component-specific class names set on the root
		 * element. Value is run through the `classnames` library.
		 */
		className: string,

		/**
		 * Sets the direction the flyout menu will render relative to the
		 * SplitButton.
		 */
		direction: oneOf(['up', 'down']),

		/**
		 * Style variations of the SplitButton.
		 */
		kind: oneOf(['primary', 'success', 'warning', 'danger', 'info']),

		/**
		 * Size variations of the SplitButton.
		 */
		size: oneOf(['short', 'small', 'large']),

		/**
		 * Form element type variations of SplitButton. Defaults to 'button' to avoid
		 * being triggered by 'Enter' anywhere on the page. Passed through to DOM
		 * Button.
		 */
		type: string,
	},

	getDefaultProps() {
		return {
			direction: 'down',
			type: 'button',
			DropMenu: DropMenu.getDefaultProps(),
		};
	},

	// Handles clicks on the Primary Button
	handleClick({ event }) {
		const clickedButtonProps = _.get(
			getFirst(this.props, SplitButton.Button),
			'props'
		);

		// Stop propagation to prevent this `Click` from expanding the `DropMenu`
		event.stopPropagation();
		this.handleButtonClick(clickedButtonProps, event);
	},

	// Handles clicks in the DropMenu
	handleSelect(optionIndex, { event }) {
		const buttonChildProps = _.map(
			filterTypes(this.props.children, SplitButton.Button),
			'props'
		);
		this.handleButtonClick(buttonChildProps[optionIndex + 1], event);
	},

	handleButtonClick(buttonProps, event) {
		const { DropMenu: { onCollapse } } = this.props;

		onCollapse();

		if (_.has(buttonProps, 'onClick')) {
			buttonProps.onClick({ event, props: buttonProps });
		}
	},

	render() {
		const {
			className,
			kind,
			direction,
			type,
			size,
			DropMenu: dropMenuProps,
			...passThroughs
		} = this.props;

		const { isExpanded } = dropMenuProps;

		const [primaryButtonProps, ...buttonChildProps] = _.map(
			filterTypes(this.props.children, SplitButton.Button),
			'props'
		);

		return (
			<DropMenu
				{...dropMenuProps}
				{...omitProps(passThroughs, SplitButton, [], false)}
				direction={direction}
				className={cx('&', className)}
				onSelect={this.handleSelect}
			>
				<DropMenu.Control>
					<ButtonGroup>
						<Button
							{...primaryButtonProps}
							className={cx(
								'&-Button-primary',
								_.get(primaryButtonProps, 'className')
							)}
							kind={kind}
							type={type}
							size={size}
							onClick={this.handleClick}
						/>
						<Button
							className={cx('&-Button-drop')}
							hasOnlyIcon
							isActive={isExpanded}
							kind={kind}
							isDisabled={_.every(
								[primaryButtonProps, ...buttonChildProps],
								'isDisabled'
							)}
						>
							<CaretIcon
								className={cx('&-CaretIcon')}
								direction={direction}
								size={8}
							/>
						</Button>
					</ButtonGroup>
				</DropMenu.Control>
				{_.map(buttonChildProps, (buttonChildProp, index) => (
					<DropMenu.Option {...buttonChildProp} key={index} />
				))}
			</DropMenu>
		);
	},
});

export default buildHybridComponent(SplitButton);
export { SplitButton as SplitButtonDumb };
