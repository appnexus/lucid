import _ from 'lodash';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Motion, spring } from 'react-motion';
import { QUICK_SLIDE_MOTION } from '../../constants/motion-spring';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, getFirst, findTypes, omitProps }  from '../../util/component-types';
import ChevronIcon from '../Icon/ChevronIcon/ChevronIcon';
import * as reducers from './Expander.reducers';

const cx = lucidClassNames.bind('&-Expander');

const {
	any,
	bool,
	func,
	node,
	object,
	string,
} = React.PropTypes;

/**
 * {"categories": ["layout"], "madeFrom": ["ChevronIcon"]}
 *
 * This is a container that provides a toggle that controls when the content is
 * shown.
 */
const Expander = createClass({
	displayName: 'Expander',

	components: {
		/**
		 * Renders a `<span>` to be shown next to the expander icon.
		 */
		Label: createClass({
			displayName: 'Expander.Label',
			propName: 'Label',
			propTypes: {
				/**
				 * Used to identify the purpose of this switch to the user -- can be
				 * any renderable content.
				 */
				children: node,
			},
		}),
	},

	reducers,

	propTypes: {
		/**
		 * Expandable content.
		 */
		children: node,

		/**
		 * Appended to the component-specific class names set on the root
		 * element.
		 */
		className: string,

		/**
		 * Indicates that the component is in the "expanded" state when true
		 * and in the "unexpanded" state when false.
		 */
		isExpanded: bool,

		/**
		 * Called when the user clicks on the component's header.
		 *
		 * Signature: `(isExpanded, { event, props }) => {}`
		 */
		onToggle: func,

		/**
		 * Passed through to the root element.
		 */
		style: object,

		/**
		 * Child element whose children represents content to be shown next to
		 * the expander icon.
		 */
		Label: any,
	},

	getDefaultProps() {
		return {
			isExpanded: false,
			onToggle: _.noop,
		};
	},

	getInitialState() {
		return {
			maxHeight: null,
		};
	},

	componentWillReceiveProps(nextProps) {
		const currentLabel = _.get(getFirst(this.props, Expander.Label), 'props.children', null);
		const nextLabel = _.get(getFirst(nextProps, Expander.Label), 'props.children', null);

		if (currentLabel !== nextLabel) {
			this._labelKey++;
		}
	},

	storeRef(name) {
		return (ref) => {
			this.Refs[name] = ref;
		};
	},

	componentWillMount() {
		this.Refs = {};
		this.isAnimated = false;
		this._labelKey = 0;
	},

	componentDidMount() {
		_.delay(() => {
			this.setState({
				maxHeight: this.Refs.contentInner.offsetHeight,
			});
			this.isAnimated = true;
		}, 32);
	},

	componentDidUpdate() {
		if (this.isMounted()) {
			this.isAnimated = false;
			_.delay(() => {
				if (this.props.isExpanded) {
					const maxHeight = this.Refs.contentInner.offsetHeight;
					if (maxHeight !== this.state.maxHeight) {
						this.setState({
							maxHeight,
						});
					}
				}
				this.isAnimated = true;
			}, 32);
		}
	},

	render() {
		const {
			children,
			className,
			isExpanded,
			style,
			...passThroughs,
		} = this.props;

		const {
			maxHeight,
		} = this.state;

		const labelChildProp = _.first(_.map(findTypes(this.props, Expander.Label), 'props'));

		return (
			<div
				{...omitProps(passThroughs, Expander)}
				className={cx('&', {
					'&-is-expanded': isExpanded,
				}, className)}
				style={style}
			>
				<header className={cx('&-header')} onClick={this.handleToggle}>
					<span className={cx('&-icon')}>
						<ChevronIcon
							direction={isExpanded ? 'up' : 'down'}
						/>
					</span>
					<ReactCSSTransitionGroup
						transitionName={cx('&-text')}
						transitionEnterTimeout={100}
						transitionLeaveTimeout={100}
						className={cx('&-text')}
					>
						{labelChildProp ?
							<span key={this._labelKey}>{labelChildProp.children}</span>
						: null}
					</ReactCSSTransitionGroup>
				</header>
				<Motion
					style={this.isAnimated ? {
						height: (isExpanded && !_.isNull(maxHeight) ? spring(maxHeight, QUICK_SLIDE_MOTION) : spring(0, QUICK_SLIDE_MOTION)),
					} : {
						height: (isExpanded && !_.isNull(maxHeight) ? maxHeight : 0),
					}}
				>
					{tween => (
						<section
							className={cx('&-content', {
								'&-content-is-expanded': isExpanded,
							})}
							style={{
								height: tween.height < 0 ? 0 : tween.height,
							}}
						>
							<div
								ref={this.storeRef('contentInner')}
								className={cx('&-content-inner')}
							>
								{_.isNull(maxHeight) || Math.abs(tween.height) > 4 ? children : null}
							</div>
						</section>
					)}
				</Motion>
			</div>
		);
	},

	handleToggle(event) {
		this.props.onToggle(!this.props.isExpanded, {
			event, props: this.props,
		});
	},
});

export default Expander;
