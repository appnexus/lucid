import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, getFirst, omitProps }  from '../../util/component-types';
import { Motion, spring } from 'react-motion';
import { QUICK_SLIDE_MOTION } from '../../constants/motion-spring';

import ChevronIcon from '../Icon/ChevronIcon/ChevronIcon';
import Panel from '../Panel/Panel';

import * as reducers from '../Expander/Expander.reducers';

const cx = lucidClassNames.bind('&-ExpanderPanel');

const {
	any,
	bool,
	func,
	node,
	object,
	string,
} = React.PropTypes;

/**
 * {"categories": ["layout"], "madeFrom": ["ChevronIcon", "Expander", "Panel"]}
 *
 * This is a container that provides a toggle that controls when the content is
 * shown.
 */
const ExpanderPanel = createClass({
	displayName: 'ExpanderPanel',

	components: {
		/**
		 * Renders a `<span>` of content next to the `ChevronIcon` in the `Panel.Header`
		 */
		Header: createClass({
			displayName: 'ExpanderPanel.Header',
			propName: 'Header',
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
		 * Indicates that the component is in the "disabled" state when true
		 * and in the "enabled" state when false.
		 */
		isDisabled: bool,

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
		 * prop alternative to Header child component
		 * passed through to the underlying ExpanderPanel
		 */
		Header: any,
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

	handleToggle(event) {
		if(!this.props.isDisabled){
			this.props.onToggle(!this.props.isExpanded, {
				event,
				props: this.props,
			});
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
			isDisabled,
			style,
			...passThroughs,
		} = this.props;

		const {
			maxHeight,
		} = this.state;

		const headerChildProps = _.get(getFirst(this.props, ExpanderPanel.Header), 'props');

		return (
			<Panel
				{...omitProps(passThroughs, ExpanderPanel)}
				className={cx('&', {
					'&-is-collapsed': !isExpanded,
					'&-is-disabled': isDisabled,
				}, className)}
				style={style}
			>
				<Panel.Header
					className={cx('&-header')}
					onClick={this.handleToggle}
				>
					<span className={cx('&-icon')}>
						<ChevronIcon direction={isExpanded ? 'up' : 'down'} />
					</span>

					<span {...headerChildProps} />
				</Panel.Header>

				<Motion
					style={this.isAnimated ? {
						height: (isExpanded && !_.isNull(maxHeight) ? spring(maxHeight, QUICK_SLIDE_MOTION) : spring(0, QUICK_SLIDE_MOTION)),
					} : {
						height: (isExpanded && !_.isNull(maxHeight) ? maxHeight : 0),
					}}
				>
					{tween => (
						<div
							ref={this.storeRef('content')}
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
						</div>
					)}
				</Motion>
			</Panel>
		);
	},
});

export default ExpanderPanel;
