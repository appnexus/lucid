import _ from 'lodash';
import React from 'react';
import ContextMenu from '../ContextMenu/ContextMenu';
import * as reducers from './ToolTip.reducers';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, findTypes } from '../../util/component-types';

const cx = lucidClassNames.bind('&-ToolTip');

const {
	bool,
	func,
	node,
	number,
	object,
	oneOf,
	string
} = React.PropTypes;

const {
	Target,
	FlyOut
} = ContextMenu;


/**
 * {"categories": ["communication"], "madeFrom": ["ContextMenu"]}
 *
 * `ToolTip` is a utility component to create a transient message anchored
 * to another component
 */

const ToolTip = createClass({
	displayName: 'ToolTip',

	reducers,

	propTypes: {
		/**
		 * `children` should include exactly one ToolTip.Target and one ToolTip.FlyOut.
		 */
		children: node,
		/**
		 * Appended to the component-specific class names set on the root element.
		 */
		className: string,
		/**
		 * Passed through to the root target element.
		 */
		style: object,
		/**
		 * Passed through to the root FlyOut element.
		 */
		flyOutStyle: object,
		/**
		 * maximum width of the ToolTip FlyOut. Defaults to 400px.
		 */
		flyOutMaxWidth: number,
		/**
		 * direction of the FlyOut relative to Target. Defaults to `'down'`.
		 */
		direction: oneOf(['down', 'up', 'right', 'left']),
		/**
		 * alignment of the Flyout relative to Target in the cross axis from `direction` Defaults to `'start'`
		 */
		alignment: oneOf(['start', 'center', 'end']),
		/**
		 * Indicates whether the ToolTip will render or not. Defaults to `true`.
		 */
		isExpanded: bool,
		/**
		 * Called when cursor moves over the target
		 */
		onMouseOver: func,
		/**
		 * Called when cursor leaves the target and the tooltip
		 */
		onMouseOut: func,
		/**
		 * The `id` of the FlyOut portal element that is appended to `document.body`. Defaults to a generated `id`.
		 */
		portalId: string
	},

	components: {
		Target: createClass({
			displayName: 'ToolTip.Target',
			propName: 'Target',
		}),
		Title: createClass({
			displayName: 'ToolTip.Title',
			propName: 'Title',
		}),
		Body: createClass({
			displayName: 'ToolTip.Body',
			propName: 'Body',
		}),
	},

	getDefaultProps() {
		return {
			alignment: ContextMenu.CENTER,
			direction: ContextMenu.UP,
			flyOutStyle: {},
			isExpanded: false,
			onMouseOut: _.noop,
			onMouseOver: _.noop,
			portalId: null,
		};
	},

	getInitialState() {
		return {
			isMouseOverFlyout: false,
			isMouseOverTarget: false,
		};
	},

	handleMouseOut() {
		setTimeout(() => {
			const {
				state: {
					isMouseOverFlyout,
					isMouseOverTarget
				},
				props: {
					onMouseOut
				}
			} = this;
			if (!isMouseOverFlyout && !isMouseOverTarget) {
				onMouseOut();
			}
		}, 100);
	},

	handleMouseOverFlyout() {
		this.setState({ isMouseOverFlyout: true });
	},

	handleMouseOutFlyout() {
		this.setState({ isMouseOverFlyout: false });
		this.handleMouseOut();
	},

	handleMouseOverTarget() {
		this.setState({ isMouseOverTarget: true });
		this.props.onMouseOver();
	},

	handleMouseOutTarget() {
		this.setState({ isMouseOverTarget: false });
		this.handleMouseOut();
	},

	render() {
		const {
			className,
			alignment,
			direction,
			flyOutMaxWidth,
			flyOutStyle,
			...passThroughs
		} = this.props;

		const target = _.chain(findTypes(this.props, ToolTip.Target)).map('props').first().get('children').value();
		const title = _.chain(findTypes(this.props, ToolTip.Title)).map('props').first().get('children').value();
		const body = _.chain(findTypes(this.props, ToolTip.Body)).map('props').first().get('children').value();
		const getAlignmentOffset = n => alignment === ContextMenu.CENTER
			? 0
			: alignment === ContextMenu.START
				? n / 2 - 22.5
				: -(n / 2 - 22.5);

		return (
			<ContextMenu
				className={cx('&', '&-base', className)}
				alignment={ContextMenu.CENTER}
				direction={direction}
				directonOffset={15}
				getAlignmentOffset={getAlignmentOffset}
				{...passThroughs}
				onMouseOver={this.handleMouseOverTarget}
				onMouseOut={this.handleMouseOutTarget}
			>
				<Target className={cx('&', className)}>
					{target}
				</Target>
				<FlyOut
					style={{
						...flyOutStyle,
						maxWidth: flyOutMaxWidth || flyOutStyle.maxWidth || 400
					}}
					className={cx('&-flyout', className, `&-${direction}`, `&-${alignment}`)}
					onMouseOver={this.handleMouseOverFlyout}
					onMouseOut={this.handleMouseOutFlyout}
				>
					<h2 className={cx('&-title')}>{title}</h2>
					{body}
				</FlyOut>
			</ContextMenu>
		);
	}
});

export default ToolTip;
