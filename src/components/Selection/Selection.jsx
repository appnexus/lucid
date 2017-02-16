import _ from 'lodash';
import React from 'react';
import MinusCircleIcon from '../Icon/MinusCircleIcon/MinusCircleIcon';
import SuccessIcon from '../Icon/SuccessIcon/SuccessIcon';
import CrossIcon from '../Icon/CrossIcon/CrossIcon';
import InfoIcon from '../Icon/InfoIcon/InfoIcon';
import WarningIcon from '../Icon/WarningIcon/WarningIcon';
import { lucidClassNames } from '../../util/style-helpers';
import {
	createClass,
	omitProps,
	getFirst,
	filterTypes,
	rejectTypes,
} from '../../util/component-types';

const { createElement } = React;

const {
	bool,
	func,
	string,
	node,
	oneOf,
} = React.PropTypes;

const cx = lucidClassNames.bind('&-Selection');

const defaultIcons = {
	'default': null,
	'container': null,
	'success': <SuccessIcon className={cx('&-Icon')} />,
	'danger': <MinusCircleIcon className={cx('&-Icon')} />,
	'info': <InfoIcon className={cx('&-Icon')} />,
	'warning': <WarningIcon className={cx('&-Icon')} />,
};

/**
 *
 * {"categories": ["communication"]}
 *
 * Used to indicate selections. It's very similar to `Tag` but is meant to be
 * used in areas of the UI that have more space available to them.
 */
const Selection = createClass({
	displayName: 'Selection',

	components: {
		Label: createClass({
			displayName: 'Selection.Label',
			propName: 'Label',
		}),

		Icon: createClass({
			displayName: 'Selection.Icon',
			propName: 'Icon',
		}),
	},

	propTypes: {
		/**
		 * Appended to the component-specific class names set on the root element.
		 */
		className: string,
		/**
		 * Applies an icon and styles for the kind of selection.
		 */
		kind: oneOf(['default', 'container', 'success', 'danger', 'info', 'warning']),
		/**
		 * Shows or hides the little "x" for a given item.
		 */
		isRemovable: bool,
		/**
		 * Gives the selection a background. This is desirable when you only have
		 * one level of nested selections.
		 */
		hasBackground: bool,
		/**
		 * Make the content text bold. This is desirable when you only have
		 * one level of nested selections.
		 */
		isBold: bool,
		/**
		 * Called when the close button is clicked.
		 *
		 * Signature: `({ props, event }) => {}`
		 */
		onRemove: func,
		/**
		 * Label of the component.
		 */
		Label: node,
		/**
		 * Display a custom icon for the selection. Generally you shouldn't need
		 * this prop since the `kind` prop will pick the correct icon for you.
		 */
		Icon: node,
		/**
		 * Arbitrary children.
		 */
		children: node,
	},

	getDefaultProps() {
		return {
			kind: 'default',
			isRemovable: true,
			onRemove: _.noop,
			hasBackground: false,
			isBold: false,
		};
	},

	render() {
		const {
			className,
			kind,
			isRemovable,
			children,
			hasBackground,
			isBold,
			...passThroughs
		} = this.props;

		const selectionChildren = filterTypes(children, Selection);
		const otherChildren = rejectTypes(children, Selection);
		const labelProps = _.get(getFirst(this.props, Selection.Label), 'props', {});
		const iconElement = getFirst(this.props, Selection.Icon);
		const iconChildren = _.get(iconElement, 'props.children');
		const icon = iconChildren
			? createElement(iconChildren.type, {
				...iconChildren.props,
				className: cx('&-Icon', iconChildren.props.className),
			})
			: defaultIcons[kind];

		return (
			<div
				{...omitProps(passThroughs, Selection)}
				className={cx('&', kind && `&-${kind}`, {
					'&-has-background': hasBackground,
					'&-is-bold': isBold,
				}, className)}
			>
				{icon}

				<div className={cx('&-content')}>
					<div className={cx('&-label-container')}>
						<span
							{...labelProps}
							className={cx('&-label')}
						/>

						{isRemovable ? (
							<CrossIcon
								isClickable
								size={26}
								viewBox='-3 -2 20 20'
								className={cx('&-close-button')}
								onClick={this.handleRemoveClick}
							/>
						) : null}
					</div>

					{_.isEmpty(selectionChildren) ? null : (
						<div className={cx('&-children-container')}>
							{_.map(selectionChildren, ({ props }, i) => (
								<Selection
									key={_.get(getFirst(props, Selection.Label), ['props', 'children'], {}) + i}
									{...props}
								/>
							))}
						</div>
					)}
					{otherChildren}

				</div>
			</div>
		);
	},
});

export default Selection;
