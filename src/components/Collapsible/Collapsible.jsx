import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { Motion, spring } from 'react-motion';
import { QUICK_SLIDE_MOTION } from '../../constants/motion-spring';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, omitProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Collapsible');

const { any, bool, node, number, string } = PropTypes;

const Collapsible = createClass({
	displayName: 'Collapsible',

	statics: {
		peek: {
			description: `
				This is a simple container that can render content as expanded or
				collapsed.
			`,
			categories: ['utility'],
		},
	},

	_isPrivate: true,

	propTypes: {
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
	},

	getDefaultProps() {
		return {
			isExpanded: true,
			isAnimated: true,
			isMountControlled: true,
			mountControlThreshold: 4,
			rootType: 'div',
		};
	},

	getInitialState() {
		return {
			maxHeight: null,
		};
	},

	storeRef(name) {
		return ref => {
			this.Refs[name] = ref;
		};
	},

	componentWillMount() {
		this.Refs = {};
		this.isAnimated = false;
		this.delayTimer = null;
	},

	componentDidMount() {
		_.delay(() => {
			this.setState({
				maxHeight: _.get(this.Refs, 'root.scrollHeight'),
			});
			this.isAnimated = this.props.isAnimated;
		}, 32);
	},

	componentDidUpdate() {
		this.isAnimated = false;
		this.delayTimer = _.delay(() => {
			if (this.props.isExpanded) {
				const maxHeight = _.get(this.Refs, 'root.scrollHeight');
				if (maxHeight !== this.state.maxHeight) {
					this.setState({
						maxHeight,
					});
				}
			}
			this.isAnimated = this.props.isAnimated;
		}, 32);
	},

	componentWillUnmount() {
		this.delayTimer && clearTimeout(this.delayTimer);
	},

	render() {
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
								height:
									isExpanded && !_.isNull(maxHeight)
										? spring(maxHeight, QUICK_SLIDE_MOTION)
										: spring(0, QUICK_SLIDE_MOTION),
							}
						: {
								height: isExpanded && !_.isNull(maxHeight) ? maxHeight : 0,
							}
				}
			>
				{tween =>
					React.createElement(
						rootType,
						{
							...omitProps(passThroughs, Collapsible),
							ref: this.storeRef('root'),
							className: cx('&', className),
							style: {
								height:
									tween.height !== maxHeight
										? tween.height < 0 ? 0 : tween.height
										: null,
								overflow: 'hidden',
								padding: 0,
								...passThroughs.style,
							},
						},
						[
							<div
								key="content"
								className={cx('&-content')}
								style={{ margin: 0 }}
							>
								{isMountControlled && !isExpanded
									? _.isNull(maxHeight) ||
										Math.abs(tween.height) > mountControlThreshold
										? children
										: null
									: children}
							</div>,
						]
					)
				}
			</Motion>
		);
	},
});

export default Collapsible;
