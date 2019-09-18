import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { Motion, spring } from 'react-motion';
import { QUICK_SLIDE_MOTION } from '../../constants/motion-spring';
import { lucidClassNames } from '../../util/style-helpers';
import { omitProps, StandardProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Collapsible');

const { any, bool, node, number, string } = PropTypes;

// TODO: Is there a better way to add type checks for passThroughs in this case
// where the underling element could be anything vs just extending
// `React.HTMLProps<HTMLElement>`? Related to issue #1045
export interface ICollapsibleProps
	extends StandardProps,
		React.HTMLProps<HTMLElement> {
	/** Indicates that the component is in the "expanded" state when true and in
	 * the "unexpanded" state when false. */
	isExpanded?: boolean;

	/** Show an animated transition for alternating values of \`isExpanded\`. */
	isAnimated?: boolean;

	/** If true, do not render children when fully collapsed. */
	isMountControlled?: boolean;

	/** If \isMountControlled\ is true, this value sets is the minimum height
	 * the container needs to reach to not render any children. */
	mountControlThreshold?: number;

	/** Pass in a custom root element type. */
	rootType?: any;
}

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
		description: `
			This is a simple container that can render content as expanded or
			collapsed.
		`,
		categories: ['utility'],
	};
	// static _isPrivate = true;
	static propTypes = {
		children: node`
			Expandable content.
		`,

		className: string`
			Appended to the component-specific class names set on the root element.
		`,

		isExpanded: bool`
			Indicates that the component is in the "expanded" state when true and in
			the "unexpanded" state when false.
		`,

		isAnimated: bool`
			Show an animated transition for alternating values of \`isExpanded\`.
		`,

		isMountControlled: bool`
			If true, do not render children when fully collapsed.
		`,

		mountControlThreshold: number`
			If \`isMountControlled\` is true, this value sets is the minimum height
			the container needs to reach to not render any children.
		`,

		rootType: any`
			Pass in a custom root element type.
		`,
	};

	private rootRef = React.createRef<HTMLDivElement>();

	isAnimated: boolean | undefined = false;
	delayTimer: number | null = null;

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

	componentWillMount(): void {
		this.isAnimated = false;
		this.delayTimer = null;
	}

	componentDidMount(): void {
		_.delay((): void => {
			// const maxHeight = _.get(this, 'rootRef.current.scrollHeight');
			this.setState({
				maxHeight: _.get(this, 'rootRef.current.scrollHeight'),
			});
			this.isAnimated = this.props.isAnimated;
		}, 32);
	}

	componentDidUpdate(): void {
		this.isAnimated = false;
		this.delayTimer = _.delay((): void => {
			if (this.props.isExpanded) {
				const maxHeight = _.get(this, 'rootRef.current.scrollHeight');
				if (maxHeight !== this.state.maxHeight) {
					this.setState({
						maxHeight,
					});
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
			>
				{(tween): JSX.Element =>
					React.createElement(
						rootType,
						{
							...omitProps(
								passThroughs,
								undefined,
								Object.keys(Collapsible.propTypes)
							),
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
								...passThroughs.style,
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
