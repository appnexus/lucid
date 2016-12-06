import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, filterTypes, getFirst, omitProps }  from '../../util/component-types';
import Button from '../Button/Button';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import CaretIcon from '../Icon/CaretIcon/CaretIcon';
import DropMenu from '../DropMenu/DropMenu';
import * as reducers from './SplitButton.reducers';

const cx = lucidClassNames.bind('&-SplitButton');

const {
	any,
	shape,
} = React.PropTypes;

/**
 *
 * {"categories": ["controls", "buttons"], "madeFrom": ["Button", "DropMenu"]}
 *
 * `SplitButton`s allow you to a single main `Button` together with a list of
 * additional `Button`s which will be rendered within a `DropMenu`.
 */
const SplitButton = createClass({
	displayName: 'SplitButton',

	components: {
		/**
		 * One of many potential `Button`s to render in this `SplitButton`. The
		 * first `Button` will be used as the Primary button, while all others will
		 * be rendered within the `DropMenu` below.
		 */
		Button,
	},

	reducers,

	propTypes: {
		/**
		 * Object of DropMenu props which are passed thru to the underlying DropMenu component.
		 */
		DropMenu: shape(DropMenu.propTypes),

		/**
		 * Appended to the component-specific class names set on the root
		 * element. Value is run through the `classnames` library.
		 */
		className: any,

		/**
		 * All children should be `ButtonGroup.Button`s and they support the same
		 * props as `Button`s.
		 */
		children: any,
	},

	getDefaultProps() {
		return {
			DropMenu: DropMenu.getDefaultProps(),
		};
	},

	// Handles clicks on the Primary Button
	handleClick({event}) {
		const {
			DropMenu: {
				onCollapse,
			},
		} = this.props;

		const clickedButtonProps = _.get(getFirst(this.props, SplitButton.Button), 'props');

		// Stop propagation to prevent this `Click` from expanding the `DropMenu`
		event.stopPropagation();
		onCollapse();
		clickedButtonProps.onClick({event, props: clickedButtonProps});
	},

	// Handles clicks in the DropMenu
	handleSelect(optionIndex, {event}) {
		const {
			DropMenu: {
				onCollapse,
			},
		} = this.props;

		const buttonChildProps = _.map(filterTypes(this.props.children, SplitButton.Button), 'props');
		const clickedButtonProps = buttonChildProps[optionIndex + 1];

		onCollapse();

		if (_.has(clickedButtonProps, 'onClick')) {
			clickedButtonProps.onClick({event, props: clickedButtonProps});
		}
	},

	render() {
		const {
			className,
			DropMenu: dropMenuProps,
			...passThroughs
		} = this.props;

		const {
			isExpanded,
		} = dropMenuProps;

		const buttonChildProps = _.map(filterTypes(this.props.children, SplitButton.Button), 'props');
		const primaryButtonProps = _.first(buttonChildProps);

		return (
			<DropMenu
				{...dropMenuProps}
				{...omitProps(passThroughs, SplitButton)}
				className={cx('&', className)}
				onSelect={this.handleSelect}
			>
				<DropMenu.Control>
					<ButtonGroup>
						<Button
							{...primaryButtonProps}
							onClick={this.handleClick}
						/>
						<Button
							hasOnlyIcon
							isActive={isExpanded}
							kind={_.get(primaryButtonProps, 'kind')}
						>
							<CaretIcon size={8} />
						</Button>
					</ButtonGroup>
				</DropMenu.Control>
				{_.map(_.slice(buttonChildProps, 1), (buttonChildProp, index) => (
					<DropMenu.Option
						{...buttonChildProp}
						key={index}
					/>
				))}
			</DropMenu>
		);
	},
});

export default SplitButton;
