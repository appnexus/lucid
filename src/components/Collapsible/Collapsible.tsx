import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';
import { QUICK_SLIDE_MOTION } from '../../constants/motion-spring';
import { lucidClassNames } from '../../util/style-helpers';
import { StandardProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Collapsible');

const { any, bool, node, number, string, func } = PropTypes;

// TODO: Is there a better way to add type checks for passThroughs in this case
// where the underling element could be anything vs just extending
// `React.HTMLProps<HTMLElement>`? Related to issue #1045
export interface ICollapsibleProps extends StandardProps {
	/** Indicates that the component is in the "expanded" state when true and in
	 * the "unexpanded" state when false. */
	isExpanded: boolean;

	/** Show an animated transition for alternating values of \`isExpanded\`. */
	isAnimated: boolean;

	/** If true, do not render children when fully collapsed. */
	isMountControlled: boolean;

	/** If \isMountControlled\ is true, this value sets is the minimum height
	 * the container needs to reach to not render any children. */
	mountControlThreshold: number;

	/** Pass in a custom root element type. */
	rootType: any;

	/** Pass in a callback to be called after ExpanderPanel has came to a rest. */
	onRest?: () => void;
}

/** TODO: Remove this constant when the component is converted to a functional component */
const nonPassthroughs = [
	'children',
	'className',
	'isExpanded',
	'isAnimated',
	'isMountControlled',
	'mountControlThreshold',
	'onRest',
	'rootType',
];

export interface ICollapsibleState {
	maxHeight: number;
}

class Collapsible extends React.Component<
	ICollapsibleProps,
	ICollapsibleState,
	{}
> {
	static displayName = 'Collapsible';
	static peek = {
		description: `This is a simple container that can render content as expanded or collapsed.`,
		categories: ['utility'],
	};
	// static _isPrivate = true;
	static propTypes = {
		/**
			Expandable content.
		*/
		children: node,

		/**
			Appended to the component-specific class names set on the root element.
		*/
		className: string,

		/**
			Indicates that the component is in the "expanded" state when true and in
			the "unexpanded" state when false.
		*/
		isExpanded: bool,

		/**
			Show an animated transition for alternating values of \`isExpanded\`.
		*/
		isAnimated: bool,

		/**
			If true, do not render children when fully collapsed.
		*/
		isMountControlled: bool,

		/**
			If \`isMountControlled\` is true, this value sets is the minimum height
			the container needs to reach to not render any children.
		*/
		mountControlThreshold: number,

		/**
			Optional. The callback that fires when the animation comes to a rest.
		*/
		onRest: func,

		/**
			Pass in a custom root element type.
		*/
		rootType: any,
	};

	private rootRef = React.createRef<HTMLDivElement>();

	isAnimated: boolean | undefined = false;
	delayTimer: number | null = null;
	_isMounted = false;

	static defaultProps = {
		isExpanded: true,
		isAnimated: true,
		isMountControlled: true,
		mountControlThreshold: 4,
		rootType: 'div',
	};

	state = {
		maxHeight: 0,
	};

	UNSAFE_componentWillMount(): void {
		this._isMounted = false;
		this.isAnimated = false;
		this.delayTimer = null;
	}

	componentDidMount(): void {
		this._isMounted = true;
		_.delay((): void => {
			// const maxHeight = _.get(this, 'rootRef.current.scrollHeight');
			if (this._isMounted) {
				this.setState({
					maxHeight: _.get(this, 'rootRef.current.scrollHeight'),
				});
			}
			this.isAnimated = this.props.isAnimated;
		}, 32);
	}

	componentDidUpdate(): void {
		this.isAnimated = false;
		this.delayTimer = _.delay((): void => {
			if (this.props.isExpanded) {
				const maxHeight = _.get(this, 'rootRef.current.scrollHeight');
				if (maxHeight !== this.state.maxHeight) {
					if (this._isMounted) {
						this.setState({
							maxHeight,
						});
					}
				}
			}
			this.isAnimated = this.props.isAnimated;
		}, 32);
	}

	componentWillUnmount(): void {
		this.delayTimer && clearTimeout(this.delayTimer);
	}

	render(): React.ReactNode {
		const {
			children,
			className,
			isExpanded,
			isMountControlled,
			mountControlThreshold,
			rootType,
			onRest,
			style,
			...passThroughs
		} = this.props;

		const { maxHeight } = this.state;

		return (
			<Motion
				style={
					this.isAnimated
						? {
								height: isExpanded
									? spring(maxHeight, QUICK_SLIDE_MOTION)
									: spring(0, QUICK_SLIDE_MOTION),
						  }
						: { height: isExpanded ? maxHeight : 0 }
				}
				onRest={onRest}
			>
				{(tween): JSX.Element =>
					React.createElement(
						rootType,
						{
							..._.omit(passThroughs, nonPassthroughs),
							ref: this.rootRef,
							className: cx('&', className),
							style: {
								height:
									tween.height !== maxHeight
										? tween.height < 0
											? 0
											: tween.height
										: null,
								overflow: 'hidden',
								padding: 0,
								...style,
							},
						},
						[
							<div
								key='content'
								className={cx('&-content')}
								style={{ margin: 0 }}
							>
								{isMountControlled && !isExpanded
									? _.isNull(maxHeight) ||
									  Math.abs(tween.height) > (mountControlThreshold as number)
										? children
										: null
									: children}
							</div>,
						]
					)
				}
			</Motion>
		);
	}
}

export default Collapsible;
