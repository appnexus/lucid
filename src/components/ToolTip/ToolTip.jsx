import _ from 'lodash';
import React from 'react';
import ContextMenu from '../ContextMenu/ContextMenu';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, findTypes } from '../../util/component-types';

const cx = lucidClassNames.bind('&-ToolTip');

const {
	bool,
	func,
	node,
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
		 * Passed through to the root element.
		 */
		style: object,
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
			direction: ContextMenu.UP,
			alignment: ContextMenu.CENTER,
			portalId: null
		};
	},

	render() {
		const {
			className,
			children,
			style,
			alignment,
			direction,
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
			<div
				className={cx('&', '&-base', className)}
			>
				<ContextMenu
					alignment={ContextMenu.CENTER}
					directonOffset={15}
					getAlignmentOffset={getAlignmentOffset}
					{...passThroughs}
					direction={direction}
				>
					<Target className={cx('&', 'target', className)}>
						{target}
					</Target>
					<FlyOut
						style={style}
						className={cx('&-flyout', className, direction, alignment)}
					>
						<h2 className={cx('&-title')}>{title}</h2>
						{body}
					</FlyOut>
				</ContextMenu>
			</div>
		);
	}
});

export default ToolTip;
