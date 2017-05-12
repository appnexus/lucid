import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { bindClassNames } from '../../util/style-helpers';
import { createClass, findTypes, omitProps } from '../../util/component-types';
import { buildHybridComponent } from '../../util/state-management';
import * as reducers from './VerticalListMenu.reducers';
import ChevronIcon from '../Icon/ChevronIcon/ChevronIcon';
import Collapsible from '../Collapsible/Collapsible';

const cx = bindClassNames('lucid-VerticalListMenu');

const { func, arrayOf, bool, string, number, node, object, shape } = PropTypes;

/**
 * {"categories": ["navigation"], "madeFrom": ["ChevronIcon"]}
 *
 * Used primarily for navigation lists. It supports nesting `VerticalListMenu`s
 * below `VerticalListMenu.Item`s and animating expanding of those sub lists.
 * The default reducer behavior is for only one `VerticalListMenu.Item` to be
 * selected at any given time; that is easily overridden by handling `onSelect`
 * yourself.
 */
const VerticalListMenu = createClass({
	displayName: 'VerticalListMenu',

	reducers,

	components: {
		/**
		 * A child item that can contain content or another VerticalListMenu.
		 */
		Item: createClass({
			displayName: 'VerticalListMenu.Item',
			propTypes: {
				/**
				 * Show or hide the expand button. Should be `true` if you want to nest
				 * menus.
				 */
				hasExpander: bool,
				/**
				 * Determines the visibility of nested menus.
				 */
				isExpanded: bool,
				/**
				 * If `true` then a small bar on the left side of the item will be
				 * shown indicating this item is selected.
				 */
				isSelected: bool,
				/**
				 * Determines the visibility of the small bar on the left when the user
				 * hovers over the item. This should indicate to the user that an item
				 * is clickable.
				 */
				isActionable: bool,
				/**
				 * Called when the user clicks the main body of the item.
				 *
				 * Signature: `(index, { event, props}) => {}`
				 */
				onSelect: func,
				/**
				 * Called when the user clicks the expand button.
				 *
				 * Signature: `(index, { event, props}) => {}`
				 */
				onToggle: func,
				/**
				 * Props that are passed through to the underlying Collapsible
				 * component if the item has children.
				 */
				Collapsible: shape(Collapsible.propTypes),
			},
		}),
	},

	propTypes: {
		/**
		 * Regular `children` aren't really used in this component, but if you do
		 * add them they will be placed at the end of the component. You should be
		 * using `VerticalListMenu.Item`s instead of regular children.
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
		 * Indicates which of the `VerticalListMenu.Item` children are currently
		 * selected. You can also put the `isSelected` prop directly on the
		 * `VerticalListMenu.Item`s if you wish.
		 */
		selectedIndices: arrayOf(number),

		/**
		 * Indicates which of the `VerticalListMenu.Item` children are currently
		 * expanded. You can also put the `isExpanded` prop directly on the
		 * `VerticalListMenu.Item`s if you wish.
		 */
		expandedIndices: arrayOf(number),

		/**
		 * Callback fired when the user selects a `VerticalListMenu.Item`.
		 *
		 * Signature: `(index, { event, props }) => {}`
		 */
		onSelect: func,

		/**
		 * Callback fired when the user expands or collapses an expandable `VerticalListMenu.Item`.
		 *
		 * Signature: `(index, { event, props }) => {}`
		 */
		onToggle: func,
	},

	getDefaultProps() {
		return {
			onSelect: _.noop,
			onToggle: _.noop,
			expandedIndices: [],
			selectedIndices: [],
		};
	},

	render() {
		const {
			children,
			className,
			style,
			selectedIndices,
			expandedIndices,
			...passThroughs
		} = this.props;

		const itemChildProps = _.map(
			findTypes(this.props, VerticalListMenu.Item),
			'props'
		);

		return (
			<ul
				{...omitProps(passThroughs, VerticalListMenu)}
				className={cx('&', className)}
				style={style}
			>
				{_.map(itemChildProps, (itemChildProp, index) => {
					const {
						hasExpander = false,
						isActionable = true,
						Collapsible: collapsibleProps = Collapsible.getDefaultProps(),
					} = itemChildProp;

					const itemChildrenAsArray = React.Children.toArray(
						itemChildProp.children
					);

					// Was not able to get `child.Type` to work correctly, I suspect this
					// is due to the way we wrap components with createLucidComponentDefinition
					const listChildren = _.filter(
						itemChildrenAsArray,
						child => _.get(child, 'type.displayName', '') === 'VerticalListMenu'
					);
					const otherChildren = _.filter(
						itemChildrenAsArray,
						child => _.get(child, 'type.displayName', '') !== 'VerticalListMenu'
					);

					// If the prop is found on the child, it should override what was
					// passed in at the top level for selectedIndices and expandedIndices
					const actualIsExpanded = _.has(itemChildProp, 'isExpanded')
						? _.get(itemChildProp, 'isExpanded', true)
						: _.includes(expandedIndices, index);

					const actualIsSelected = _.has(itemChildProp, 'isSelected')
						? _.get(itemChildProp, 'isSelected', false)
						: _.includes(selectedIndices, index);

					return (
						<li
							key={index}
							{...itemChildProp.passThroughs}
							className={cx('&-Item', itemChildProp.className)}
						>
							<div
								className={cx('&-Item-content', {
									'&-Item-content-is-selected': actualIsSelected,
									'&-Item-content-is-actionable': isActionable,
								})}
								onClick={_.partial(this.handleClickItem, index, itemChildProp)}
							>
								<div className={cx('&-Item-content-text')}>
									{otherChildren}
								</div>
								{hasExpander
									? <div
											className={cx('&-Item-expander')}
											onClick={_.partial(
												this.handleToggle,
												index,
												itemChildProp
											)}
										>
											<ChevronIcon
												direction={actualIsExpanded ? 'up' : 'down'}
											/>
										</div>
									: null}
							</div>

							{!_.isEmpty(listChildren)
								? <Collapsible
										{...collapsibleProps}
										className={cx('&-Item-nested-list')}
										isExpanded={actualIsExpanded}
									>
										{listChildren}
									</Collapsible>
								: null}
						</li>
					);
				})}
				{children}
			</ul>
		);
	},

	handleToggle(index, itemChildProp, event) {
		const { onToggle } = itemChildProp;

		// Prevent the user from also selecting the current item.
		event.stopPropagation();

		this.props.onToggle(index, { event, props: itemChildProp });

		if (onToggle) {
			onToggle(index, { event, props: itemChildProp });
		}
	},

	handleClickItem(index, itemChildProp, event) {
		const { onSelect } = itemChildProp;

		this.props.onSelect(index, { event, props: itemChildProp });

		if (onSelect) {
			onSelect(index, { event, props: itemChildProp });
		}
	},
});

export default buildHybridComponent(VerticalListMenu);
export { VerticalListMenu as VerticalListMenuDumb };
