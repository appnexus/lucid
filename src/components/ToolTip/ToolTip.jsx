import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import ContextMenu from '../ContextMenu/ContextMenu';
import CrossIcon from '../Icon/CrossIcon/CrossIcon';
import * as reducers from './ToolTip.reducers';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, findTypes, omitProps } from '../../util/component-types';
import { buildHybridComponent } from '../../util/state-management';

const cx = lucidClassNames.bind('&-ToolTip');
const flyOutCx = cx.bind('&-FlyOut');

const {
	bool,
	func,
	node,
	number,
	object,
	oneOf,
	string,
	oneOfType,
} = PropTypes;

const { Target, FlyOut } = ContextMenu;

/**
 * {"categories": ["communication"], "madeFrom": ["ContextMenu"]}
 *
 * A utility component that creates a transient message anchored to another
 * component.
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
		 * Set this to `true` if you want to have a `x` close icon.
		 */
		isCloseable: bool,
		/**
		 * Style variations of the `ToolTip`.
		 */
		kind: oneOf(['primary', 'success', 'warning', 'danger', 'info', 'default']),
		/**
		 * Called when the user closes the `Banner`.
		 *
		 * Signature: `({ event, props }) => {}`
		 */
		onClose: func,
		/**
		 * Passed through to the root target element.
		 */
		style: object,
		/**
		 * Passed through to the root FlyOut element.
		 */
		flyOutStyle: object,
		/**
		 * maximum width of the ToolTip FlyOut. Defaults to 200px.
		 */
		flyOutMaxWidth: oneOfType([number, string]),
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
		 * Signature: `({ props, event }) => {}`
		 */
		onMouseOver: func,
		/**
		 * Called when cursor leaves the target and the ToolTip
		 * Signature: `({ props, event }) => {}`
		 */
		onMouseOut: func,
		/**
		 * The `id` of the FlyOut portal element that is appended to `document.body`. Defaults to a generated `id`.
		 */
		portalId: string,
	},

	components: {
		/**
		 * The hover target that will trigger the ToolTip to be displayed.
		 */
		Target: createClass({
			displayName: 'ToolTip.Target',
		}),
		/**
		 * The title displayed at the top of the ToolTip.
		 */
		Title: createClass({
			displayName: 'ToolTip.Title',
		}),
		/**
		 * The body of the ToolTip displayed below the Title.
		 */
		Body: createClass({
			displayName: 'ToolTip.Body',
		}),
	},

	getDefaultProps() {
		return {
			alignment: ContextMenu.CENTER,
			direction: ContextMenu.UP,
			flyOutStyle: {},
			isCloseable: false,
			isExpanded: false,
			kind: 'default',
			onClose: _.noop,
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

	handleMouseOut(event) {
		setTimeout(() => {
			const {
				props,
				state: { isMouseOverFlyout, isMouseOverTarget },
				props: { onMouseOut },
			} = this;
			if (!isMouseOverFlyout && !isMouseOverTarget) {
				onMouseOut({ props, event });
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

	handleMouseOverTarget(event) {
		this.setState({ isMouseOverTarget: true });
		this.props.onMouseOver({ props: this.props, event });
	},

	handleMouseOutTarget() {
		this.setState({ isMouseOverTarget: false });
		this.handleMouseOut();
	},

	handleClose(event) {
		this.props.onClose({ event, props: this.props });
	},

	render() {
		const {
			className,
			alignment,
			direction,
			flyOutMaxWidth,
			flyOutStyle,
			isCloseable,
			isExpanded,
			kind,
			portalId,
			style,
			...passThroughs
		} = this.props;

		const targetProps = _.first(
			_.map(findTypes(this.props, ToolTip.Target), 'props')
		);
		const title = _.get(
			_.first(_.map(findTypes(this.props, ToolTip.Title), 'props')),
			'children'
		);
		const body = _.get(
			_.first(_.map(findTypes(this.props, ToolTip.Body), 'props')),
			'children'
		);
		const getAlignmentOffset = n =>
			(alignment === ContextMenu.CENTER
				? 0
				: alignment === ContextMenu.START ? n / 2 - 22.5 : -(n / 2 - 22.5));

		return (
			<ContextMenu
				className={cx('&', className)}
				alignment={ContextMenu.CENTER}
				direction={direction}
				directonOffset={15}
				getAlignmentOffset={getAlignmentOffset}
				isExpanded={isExpanded}
				style={style}
				portalId={portalId}
				{...omitProps(passThroughs, ToolTip, [], false)}
				onMouseOver={this.handleMouseOverTarget}
				onMouseOut={this.handleMouseOutTarget}
			>
				<Target
					{...targetProps}
					className={cx(_.get(targetProps, 'className'), '&-Target')}
				>
					{_.get(targetProps, 'children')}
				</Target>
				<FlyOut
					style={{
						...flyOutStyle,
						maxWidth: flyOutMaxWidth || flyOutStyle.maxWidth || 200,
					}}
					className={flyOutCx(
						className,
						'&',
						`&-${direction}`,
						`&-${alignment}`,
						`&-${kind}`
					)}
					onMouseOver={this.handleMouseOverFlyout}
					onMouseOut={this.handleMouseOutFlyout}
				>
					{isCloseable
						? <CrossIcon
								onClick={this.handleClose}
								className={flyOutCx('&-close')}
							/>
						: null}
					{!_.isNil(title)
						? <h2 className={flyOutCx('&-Title')}>{title}</h2>
						: null}
					{body}
				</FlyOut>
			</ContextMenu>
		);
	},
});

export default buildHybridComponent(ToolTip);
export { ToolTip as ToolTipDumb };
