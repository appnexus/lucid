import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, getFirst, omitProps } from '../../util/component-types';
import { buildHybridComponent } from '../../util/state-management';

import ChevronIcon from '../Icon/ChevronIcon/ChevronIcon';
import Collapsible from '../Collapsible/Collapsible';
import Panel from '../Panel/Panel';

import * as reducers from '../Expander/Expander.reducers';

const cx = lucidClassNames.bind('&-ExpanderPanel');

const { any, bool, func, node, object, string } = PropTypes;

const ExpanderPanel = createClass({
	displayName: 'ExpanderPanel',

	statics: {
		peek: {
			description: `
				This is a container that provides a toggle that controls when the
				content is shown.
			`,
			categories: ['layout'],
			madeFrom: ['ChevronIcon', 'Expander', 'Panel'],
		},
	},

	components: {
		Header: createClass({
			statics: {
				peek: {
					description: `
						Renders a \`<span>\` of content next to the \`ChevronIcon\` in the
						\`Panel.Header\`
					`,
				},
			},
			displayName: 'ExpanderPanel.Header',
			propName: 'Header',
			propTypes: {
				children: node`
					Used to identify the purpose of this switch to the user -- can be any
					renderable content.
				`,
			},
		}),
	},

	reducers,

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

		isDisabled: bool`
			Indicates that the component is in the "disabled" state when true and in
			the "enabled" state when false.
		`,

		hasPadding: bool`
			Controls the presence of padding on the inner content.
		`,

		onToggle: func`
			Called when the user clicks on the component's header.
			Signature: \`(isExpanded, { event, props }) => {}\`
		`,

		style: object`
			Passed through to the root element.
		`,

		Header: any`
			prop alternative to Header child component passed through to the
			underlying ExpanderPanel
		`,
	},

	getDefaultProps() {
		return {
			isExpanded: false,
			onToggle: _.noop,
			hasPadding: true,
		};
	},

	handleToggle(event) {
		if (!this.props.isDisabled) {
			this.props.onToggle(!this.props.isExpanded, {
				event,
				props: this.props,
			});
		}
	},

	render() {
		const {
			children,
			className,
			isExpanded,
			isDisabled,
			hasPadding,
			style,
			...passThroughs
		} = this.props;

		const headerChildProps = _.get(
			getFirst(this.props, ExpanderPanel.Header),
			'props'
		);

		return (
			<Panel
				{...omitProps(passThroughs, ExpanderPanel, [], false)}
				className={cx(
					'&',
					{
						'&-is-collapsed': !isExpanded,
						'&-is-disabled': isDisabled,
					},
					className
				)}
				style={style}
			>
				<Panel.Header className={cx('&-header')} onClick={this.handleToggle}>
					<span className={cx('&-icon')}>
						<ChevronIcon direction={isExpanded ? 'up' : 'down'} />
					</span>

					<span {...headerChildProps} />
				</Panel.Header>

				<Collapsible
					isExpanded={isExpanded}
					className={cx('&-content', {
						'&-content-is-expanded': isExpanded,
					})}
				>
					<div
						className={cx('&-content-inner', {
							'&-content-inner-has-padding': hasPadding,
						})}
					>
						{children}
					</div>
				</Collapsible>
			</Panel>
		);
	},
});

export default buildHybridComponent(ExpanderPanel);
export { ExpanderPanel as ExpanderPanelDumb };
