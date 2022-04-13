import _, { omit } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import ContextMenu from '../ContextMenu/ContextMenu';
import CloseIcon from '../Icon/CloseIcon/CloseIcon';
import { IIconProps } from '../Icon/Icon';
import * as reducers from './ToolTip.reducers';
import { lucidClassNames } from '../../util/style-helpers';
import { StandardProps, findTypes } from '../../util/component-types';
import { buildModernHybridComponent } from '../../util/state-management';

const cx = lucidClassNames.bind('&-ToolTip');
const flyOutCx = cx.bind('&-FlyOut');

const { bool, func, node, number, object, oneOf, string, oneOfType } =
	PropTypes;

const { Target, FlyOut } = ContextMenu;

/** ToolTip Target */
export interface IToolTipTargetProps extends StandardProps {
	description?: string;
	elementType?: string;
}

const ToolTipTarget = (_props: IToolTipTargetProps): null => null;
ToolTipTarget.displayName = 'ToolTip.Target';
ToolTipTarget.peek = {
	description: `The hover target that will trigger the \`ToolTip\` to be displayed.`,
};
ToolTipTarget.propName = 'Target';

/** ToolTip Title */
export interface IToolTipTitleProps extends StandardProps {
	description?: string;
}

const ToolTipTitle = (_props: IToolTipTitleProps): null => null;
ToolTipTitle.displayName = 'ToolTip.Title';
ToolTipTitle.peek = {
	description: `A not recommended title, optionally displayed at the top of the \`ToolTip\`.`,
};
ToolTipTitle.propName = 'Title';

/** ToolTip Body */
export interface IToolTipBodyProps extends StandardProps {
	description?: string;
}

const ToolTipBody = (_props: IToolTipBodyProps): null => null;
ToolTipBody.displayName = 'ToolTip.Body';
ToolTipBody.peek = {
	description: `The body of the \`ToolTip\`.`,
};
ToolTipBody.propName = 'Body';

/** ToolTip */
export interface IToolTipState {
	isExpanded: boolean;
	isMouseOverFlyout: boolean;
	isMouseOverTarget: boolean;
}

export interface IToolTipProps extends StandardProps {
	/** Set this to `true` if you want to have a `x` close icon. */
	isCloseable?: boolean;

	/** Offers a lighter style for the tooltip window. Defaults to `false`. */
	isLight?: boolean;

	/** Called when the user closes the `Banner`. */
	onClose?: ({
		event,
		props,
	}: {
		event: React.MouseEvent;
		props: IToolTipProps;
	}) => void;

	/** Passed through to the root `FlyOut` element. */
	flyOutStyle?: React.CSSProperties;

	/** maximum width of the `ToolTip` `FlyOut`. Defaults to `200px`. */
	flyOutMaxWidth?: number | string;

	/** direction of the `FlyOut` relative to `Target`. */
	direction?: 'down' | 'up' | 'right' | 'left';

	/** alignment of the `Flyout` relative to `Target` in the cross axis from `direction`. */
	alignment?: 'start' | 'center' | 'end';

	/** Indicates whether the `ToolTip` will render or not. */
	isExpanded?: boolean;

	/** Called when cursor moves over the `Target`. */
	onMouseOver?: ({
		event,
		props,
	}: {
		event: React.MouseEvent;
		props: IToolTipProps;
	}) => void;

	/** Called when cursor leaves the `Target` and the `ToolTip`. */
	onMouseOut?: ({
		event,
		props,
	}: {
		event: React.MouseEvent;
		props: IToolTipProps;
	}) => void;

	/** The `id` of the `FlyOut` portal element that is appended to `document.body`.
	 * Defaults to a generated `id`. */
	portalId?: string | null;
}

/** TODO: Remove nonPassThroughs when the component is converted to a functional component */
export const nonPassThroughs = [
	'children',
	'className',
	'isCloseable',
	'isLight',
	'onClose',
	'style',
	'flyOutStyle',
	'flyOutMaxWidth',
	'direction',
	'alignment',
	'isExpanded',
	'onMouseOver',
	'onMouseOut',
	'portalId',
	'Title',
	'Body',
	'Target',
	'initialState',
];

class ToolTip extends React.Component<IToolTipProps, IToolTipState> {
	constructor(props: IToolTipProps) {
		super(props);
		this.state = {
			isMouseOverFlyout: false,
			isMouseOverTarget: false,
			isExpanded: false,
		};
	}
	static displayName = 'ToolTip';

	static Title = ToolTipTitle;
	static Target = ToolTipTarget;
	static Body = ToolTipBody;

	static peek = {
		description: `A utility component that creates a transient message anchored to another component.`,
		notes: {
			overview: `A text popup shown on hover.`,
			intendedUse: `
					Use to provide an explanation for a button, text, or an operation. Often used in conjunction with \`HelpIcon\`.
										
					**Styling notes**
					
					- Use the {direction} and {alignment} that best suit your layout.
					- Tooltip should typically not use a Title. If one does, it should fit on a single line and not wrap.
					- Use black tooltips in most interactions. White tooltips are reserved for use within charts, for example \`LineChart\`.
				`,
			technicalRecommendations: `
				`,
		},
		categories: ['communication'],
		madeFrom: ['ContextMenu'],
	};

	static reducers = reducers;

	static propTypes = {
		/**
		 * \`children\` should include exactly one ToolTip.Target and one ToolTip.FlyOut.
		 */
		children: node,

		/**
		 * Appended to the component-specific class names set on the root element.
		 */
		className: string,

		/**
		 * Set this to \`true\` if you want to have a \`x\` close icon.
		 */
		isCloseable: bool,

		/**
		 * Offers a lighter style for the tooltip window. Defaults to false.
		 */
		isLight: bool,

		/**
		 * Called when the user closes the \`Banner\`.
		 * Signature: \`({ event, props }) => {}\`
		 */
		onClose: func,

		/** Passed through to the root target element.*/
		style: object,

		/** Passed through to the root FlyOut element.*/
		flyOutStyle: object,

		/**
		 * maximum width of the ToolTip FlyOut. Defaults to 200px.
		 */
		flyOutMaxWidth: oneOfType([number, string]),

		/**
		 * direction of the FlyOut relative to Target.
		 */
		direction: oneOf(['down', 'up', 'right', 'left']),

		/**
		 * alignment of the Flyout relative to Target in the cross axis from \`direction\`.
		 */
		alignment: oneOf(['start', 'center', 'end']),

		/**
		 * Indicates whether the ToolTip will render or not.
		 */
		isExpanded: bool,

		/**
		 * Called when cursor moves over the target
		 * Signature: \`({ props, event }) => {}\`
		 */
		onMouseOver: func,

		/**
		 * Called when cursor leaves the target and the ToolTip
		 * Signature: \`({ props, event }) => {}\`
		 */
		onMouseOut: func,

		/**
		 * The \`id\` of the FlyOut portal element that is appended to \`document.body\`.
		 * Defaults to a generated \`id\`.
		 */
		portalId: string,

		/**
		 * Tooltips do not typically have a Title but one can be displayed above the Body.
		 */
		Title: node,

		/**
		 * The body of the 'ToolTip'.
		 */
		Body: node,

		/**
		 * The hover target that will trigger the ToolTip to be displayed.
		 */
		Target: node,
	};

	static defaultProps = {
		alignment: ContextMenu.CENTER,
		direction: ContextMenu.UP,
		flyOutStyle: {},
		isCloseable: false,
		isExpanded: false,
		isLight: false,
		onClose: _.noop,
		onMouseOut: _.noop,
		onMouseOver: _.noop,
		portalId: null,
	};

	handleMouseOut = (event: React.MouseEvent): void => {
		setTimeout(() => {
			const {
				props,
				state: { isMouseOverFlyout, isMouseOverTarget },
				props: { onMouseOut },
			} = this;
			if (!isMouseOverFlyout && !isMouseOverTarget) {
				onMouseOut && onMouseOut({ props, event });
			}
		}, 100);
	};

	handleMouseOverFlyout = () => {
		this.setState({ isMouseOverFlyout: true });
	};

	handleMouseOutFlyout = (event: React.MouseEvent) => {
		this.setState({ isMouseOverFlyout: false });
		this.handleMouseOut(event);
	};

	handleMouseOverTarget = (event: React.MouseEvent) => {
		this.setState({ isMouseOverTarget: true });
		this.props.onMouseOver &&
			this.props.onMouseOver({ props: this.props, event });
	};

	handleMouseOutTarget = (event: React.MouseEvent) => {
		this.setState({ isMouseOverTarget: false });
		this.handleMouseOut(event);
	};

	handleClose = ({
		event,
		props,
	}: {
		event: React.MouseEvent;
		props: IIconProps;
	}) => {
		this.props.onClose && this.props.onClose({ event, props: this.props });
	};

	render() {
		const {
			className,
			alignment,
			direction,
			flyOutMaxWidth,
			flyOutStyle,
			isCloseable,
			isExpanded,
			isLight,
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
		const getAlignmentOffset = (n: number) =>
			alignment === ContextMenu.CENTER
				? 0
				: alignment === ContextMenu.START
				? n / 2 - 22.5
				: -(n / 2 - 22.5);

		return (
			<ContextMenu
				className={cx('&', className)}
				// WARNING: Alignment is always set to center because the getAlignmentOffset function
				// handles the alignment instead of delegating to ContextMenu
				alignment={ContextMenu.CENTER}
				direction={direction}
				directonOffset={15}
				getAlignmentOffset={getAlignmentOffset}
				isExpanded={isExpanded}
				style={style}
				portalId={portalId}
				{...omit(passThroughs, nonPassThroughs)}
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
						maxWidth:
							flyOutMaxWidth || (flyOutStyle && flyOutStyle.maxWidth) || 200,
					}}
					className={flyOutCx(
						className,
						'&',
						`&-${direction}`,
						`&-${alignment}`,
						isLight ? '&-light' : '&-default'
					)}
					onMouseOver={this.handleMouseOverFlyout}
					onMouseOut={this.handleMouseOutFlyout}
				>
					{isCloseable ? (
						<CloseIcon
							isClickable
							size={8}
							onClick={this.handleClose}
							className={flyOutCx('&-close')}
						/>
					) : null}
					{!_.isNil(title) ? (
						<h2 className={flyOutCx('&-Title')}>{title}</h2>
					) : null}
					{body}
				</FlyOut>
			</ContextMenu>
		);
	}
}

export default buildModernHybridComponent<
	IToolTipProps,
	IToolTipState,
	typeof ToolTip
>(ToolTip as any, { reducers });

export { ToolTip as ToolTipDumb };
