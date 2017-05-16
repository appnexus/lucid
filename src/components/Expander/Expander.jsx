import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import ReactTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { lucidClassNames } from '../../util/style-helpers';
import {
	createClass,
	getFirst,
	findTypes,
	omitProps,
} from '../../util/component-types';
import { buildHybridComponent } from '../../util/state-management';
import ChevronIcon from '../Icon/ChevronIcon/ChevronIcon';
import Collapsible from '../Collapsible/Collapsible';
import * as reducers from './Expander.reducers';

const cx = lucidClassNames.bind('&-Expander');

const { any, bool, func, node, object, oneOf, string } = PropTypes;

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

		/**
		 * Renders different variants of Expander. 'simple' is default. 'highlighted' is more prominant.
		 */
		kind: oneOf(['simple', 'highlighted']),
	},

	getDefaultProps() {
		return {
			isExpanded: false,
			onToggle: _.noop,
			kind: 'simple',
		};
	},

	componentWillReceiveProps(nextProps) {
		const currentLabel = _.get(
			getFirst(this.props, Expander.Label),
			'props.children',
			null
		);
		const nextLabel = _.get(
			getFirst(nextProps, Expander.Label),
			'props.children',
			null
		);

		if (currentLabel !== nextLabel) {
			this._labelKey++;
		}
	},

	componentWillMount() {
		this._labelKey = 0;
	},

	render() {
		const {
			children,
			className,
			isExpanded,
			style,
			kind,
			...passThroughs
		} = this.props;

		const labelChildProp = _.first(
			_.map(findTypes(this.props, Expander.Label), 'props')
		);

		return (
			<div
				{...omitProps(passThroughs, Expander)}
				className={cx(
					'&',
					{
						'&-is-expanded': isExpanded,
						'&-kind-highlighted': kind === 'highlighted',
					},
					className
				)}
				style={style}
			>
				<header className={cx('&-header')} onClick={this.handleToggle}>
					<span className={cx('&-icon')}>
						<ChevronIcon direction={isExpanded ? 'up' : 'down'} />
					</span>
					<ReactTransitionGroup
						transitionName={cx('&-text')}
						transitionEnterTimeout={100}
						transitionLeaveTimeout={100}
						className={cx('&-text')}
					>
						{labelChildProp
							? <span key={this._labelKey}>{labelChildProp.children}</span>
							: null}
					</ReactTransitionGroup>
				</header>
				<Collapsible
					isExpanded={isExpanded}
					rootType="section"
					className={cx('&-content')}
				>
					{children}
				</Collapsible>
			</div>
		);
	},

	handleToggle(event) {
		this.props.onToggle(!this.props.isExpanded, {
			event,
			props: this.props,
		});
	},
});

export default buildHybridComponent(Expander);
export { Expander as ExpanderDumb };
