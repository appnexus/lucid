import _ from 'lodash';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { lucidClassNames } from '../../util/style-helpers';
import { createLucidComponentDefinition }  from '../../util/component-definition';
import ChevronIcon from '../Icon/ChevronIcon/ChevronIcon';
import * as reducers from './Expander.reducers';

const boundClassNames = lucidClassNames.bind('&-Expander');

const {
	any,
	bool,
	func,
	node,
	object,
	string
} = React.PropTypes;

/**
 * {"categories": ["layout"], "madeFrom": ["ChevronIcon"]}
 *
 * This is a container that provides a toggle that controls when the content is
 * shown.
 */
const Expander = React.createClass(createLucidComponentDefinition({
	displayName: 'Expander',

	childProps: {
		Label: {
			/**
			 * Used to identify the purpose of this switch to the user -- can be
			 * any renderable content.
			 */
			children: node
		}
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
		Label: any
	},

	getDefaultProps() {
		return {
			isExpanded: false,
			onToggle: _.noop
		};
	},

	componentWillMount() {
		this._labelKey = 0;
	},

	componentWillReceiveProps(nextProps) {
		const currentLabel = _.first(Expander.Label.findInAllAsProps(this.props)).children;
		const nextLabel = _.first(Expander.Label.findInAllAsProps(nextProps)).children;

		if (currentLabel !== nextLabel) {
			this._labelKey++;
		}
	},

	render() {
		const {
			children,
			className,
			isExpanded,
			style,
			...passThroughs
		} = this.props;

		const labelChildProp = _.first(Expander.Label.findInAllAsProps(this.props));

		return (
			<div
				{...passThroughs}
				className={boundClassNames('&', {
					'&-is-expanded': isExpanded,
				}, className)}
				style={style}
			>
				<header className={boundClassNames('&-header')} onClick={this.handleExpand}>
					<span className={boundClassNames('&-icon')}>
						<ChevronIcon
							direction={isExpanded ? 'up' : 'down'}
						/>
					</span>
					<ReactCSSTransitionGroup
						transitionName={boundClassNames('&-text')}
						transitionEnterTimeout={100}
						transitionLeaveTimeout={100}
						className={boundClassNames('&-text')}
					>
						{labelChildProp ?
							<span key={this._labelKey}>{labelChildProp.children}</span>
						: null}
					</ReactCSSTransitionGroup>
				</header>
				<section className={boundClassNames('&-content', {
					'&-content-is-expanded': isExpanded
				})}>
					{children}
				</section>
			</div>
		);
	},

	handleExpand(event) {
		this.props.onToggle(!this.props.isExpanded, {
			event, props: this.props
		});
	}
}));

export default Expander;
