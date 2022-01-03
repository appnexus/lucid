import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import MinusCircleIcon from '../Icon/MinusCircleIcon/MinusCircleIcon';
import SuccessIcon from '../Icon/SuccessIcon/SuccessIcon';
import CloseIcon from '../Icon/CloseIcon/CloseIcon';
import InfoIcon from '../Icon/InfoIcon/InfoIcon';
import WarningIcon from '../Icon/WarningIcon/WarningIcon';
import { lucidClassNames } from '../../util/style-helpers';
import { getFirst, FC, StandardProps } from '../../util/component-types';

const { createElement } = React;

const { bool, func, string, node, oneOf } = PropTypes;

const cx = lucidClassNames.bind('&-Selection');

/** SELECTION ICON */
function defaultIcon(
	kind: SelectionKind,
	responsiveMode?: SelectionResponsiveMode
) {
	return kind === 'default' ? null : kind === 'container' ? null : kind ===
	  'success' ? (
		<SuccessIcon className={cx('&-Icon', `&-Icon-is-${responsiveMode}`)} />
	) : kind === 'danger' ? (
		<MinusCircleIcon className={cx('&-Icon', `&-Icon-is-${responsiveMode}`)} />
	) : kind === 'info' ? (
		<InfoIcon className={cx('&-Icon', `&-Icon-is-${responsiveMode}`)} />
	) : kind === 'warning' ? (
		<WarningIcon className={cx('&-Icon', `&-Icon-is-${responsiveMode}`)} />
	) : null;
}

export interface ISelectionIconProps extends StandardProps {}

const SelectionIcon: FC<ISelectionIconProps> = (): null => null;
SelectionIcon.peek = {
	description: `
        Icon that is displayed within the Selection. Any of the lucid \`*Icon\` components should work.
    `,
};
SelectionIcon.displayName = 'Selection.Icon';
SelectionIcon.propName = 'Icon';

/** SELECTION LABEL */
export interface ISelectionLabelProps extends StandardProps {}

const SelectionLabel: FC<ISelectionLabelProps> = (): null => null;
SelectionLabel.peek = {
	description: `\`Label\` for the \`Selection\`.`,
};
SelectionLabel.displayName = 'Selection.Label';
SelectionLabel.propName = 'Label';

/** SELECTION */
type SelectionKind =
	| 'default'
	| 'container'
	| 'success'
	| 'danger'
	| 'info'
	| 'warning';

type SelectionResponsiveMode = 'small' | 'medium' | 'large';

export interface ISelectionProps
	extends StandardProps,
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		> {
	/** Applies an icon and styles for the kind of selection. */
	kind: SelectionKind;

	/** Apply to the top of a nested sequence of Selection components.
	 * Adds some spacing for a list of top level Selections with nested Selctions inside each.
	 * */
	isTop?: boolean;

	/** Only applies to \`container\` Selection components.
	 * Fills with a darker gray background.
	 * Defaults to false.
	 * */
	isFilled?: boolean;

	/** Shows or hides the little "x" for a given item. */
	isRemovable: boolean;

	/** Called when the close button is clicked. */
	onRemove: ({
		props,
		event,
	}: {
		props: ISelectionProps;
		event: React.MouseEvent;
	}) => void;

	/** Gives the selection a background. This is desirable when you only have
	 * one level of nested selections.
	 * */
	hasBackground: boolean;

	/** Make the content text bold. This is desirable when you only have one
	 * level of nested selections.
	 * */
	isBold: boolean;

	/** Label of the component. */
	Label?: React.ReactNode;

	/** Display a custom icon for the selection. Generally you shouldn't need
	 * this prop since the \`kind\` prop will pick the correct icon for you.
	 * */
	Icon?: React.ReactNode;

	/** Adjusts the display of this component. This should typically be driven by
	 * screen size. Currently \`small\` and \`large\` are explicitly handled by
	 * this component.
	 * */
	responsiveMode: SelectionResponsiveMode;
}

const defaultProps = {
	isRemovable: true,
	onRemove: _.noop,
	hasBackground: false,
	isBold: false,
	kind: 'default' as const,
	responsiveMode: 'large' as const,
};

const Selection = (props: ISelectionProps) => {
	const {
		className,
		isRemovable,
		children,
		hasBackground,
		isBold,
		isFilled,
		isTop,
		kind,
		onRemove,
		responsiveMode,
		...passThroughs
	} = props;

	const isSmall = responsiveMode === 'small';

	const labelProps = _.get(getFirst(props, Selection.Label), 'props', {});
	const iconElement = getFirst(props, Selection.Icon);
	const iconChildren = _.get(iconElement, 'props.children');
	const icon = iconChildren
		? createElement(iconChildren.type, {
				...iconChildren.props,
				className: cx('&-Icon', iconChildren.props.className),
		  })
		: defaultIcon(kind, responsiveMode);

	return (
		<div
			{..._.omit(passThroughs, ['callbackId', 'Label'])}
			className={cx(
				'&',
				`&-is-${responsiveMode}`,
				kind && `&-${kind}`,
				{
					'&-has-background': hasBackground,
					'&-is-bold': isBold,
					'&-is-filled': isFilled,
					'&-is-top': isTop,
					'&-no-title': _.isEmpty(labelProps),
				},
				className
			)}
		>
			{icon}

			<div className={cx('&-content')}>
				<div className={cx('&-label-container')}>
					<span
						{...labelProps}
						className={cx('&-label', isSmall && '&-label-is-small')}
					/>

					{isRemovable ? (
						<CloseIcon
							isClickable
							size={!isSmall ? 8 : 16}
							className={cx(
								'&-close-button',
								isSmall && '&-close-button-is-small'
							)}
							onClick={({ event }) => {
								onRemove({ event, props });
							}}
						/>
					) : null}
				</div>
				{!_.isEmpty(children) && (
					<div className={cx('&-children-container')}>
						{_.map(React.Children.toArray(children), (child, i) => {
							if (React.isValidElement(child) && child.type === Selection) {
								return (
									<Selection
										key={
											_.get(
												getFirst(child.props, Selection.Label),
												['props', 'children'],
												{}
											) + i
										}
										{...child.props}
									/>
								);
							}
							return child;
						})}
					</div>
				)}
			</div>
		</div>
	);
};

Selection.displayName = 'Selection';
Selection.Icon = SelectionIcon;
Selection.Label = SelectionLabel;
Selection.peek = {
	description: `Used to indicate selections. \`Selection\` is very similar to \`Tag\` but is meant to be used in areas of the UI that have more space available to them.`,
	categories: ['communication'],
};
Selection.defaultProps = defaultProps;
Selection.propTypes = {
	/**
			Appended to the component-specific class names set on the root element.
		*/
	className: string,

	/**
			Applies an icon and styles for the kind of selection.
		*/
	kind: oneOf(['default', 'container', 'success', 'danger', 'info', 'warning']),

	/**
			Apply to the top of a nested sequence of Selection components.
			Adds some spacing for a list of top level Selections with nested Selctions inside each.
		*/
	isTop: bool,

	/**
			Only applies to \`container\` Selection components.
			Fills with a darker gray background.
			Defaults to false.
		*/
	isFilled: bool,

	/**
			Shows or hides the little "x" for a given item.
		*/
	isRemovable: bool,

	/**
			Gives the selection a background. This is desirable when you only have
			one level of nested selections.
		*/
	hasBackground: bool,

	/**
			Make the content text bold. This is desirable when you only have one
			level of nested selections.
		*/
	isBold: bool,

	/**
			Called when the close button is clicked.
		*/
	onRemove: func,

	/**
			Label of the component.
		*/
	Label: node,

	/**
			Display a custom icon for the selection. Generally you shouldn't need
			this prop since the \`kind\` prop will pick the correct icon for you.
		*/
	Icon: node,

	/**
			Arbitrary children.
		*/
	children: node,

	/**
			Adjusts the display of this component. This should typically be driven by
			screen size. Currently \`small\` and \`large\` are explicitly handled by
			this component.
		*/
	responsiveMode: oneOf(['small', 'medium', 'large']),
};

export default Selection;
