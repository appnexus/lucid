import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass }  from '../../util/component-types';

import ExpanderPanel from '../ExpanderPanel/ExpanderPanel';

import * as reducers from '../Accordion/Accordion.reducers';

const cx = lucidClassNames.bind('&-Accordion');

const {
	func,
	array,
	object,
	number,
	string,
} = React.PropTypes;

/**
 * {"categories": ["layout"], "madeFrom": ["ExpanderPanel"]}
 *
 * This is a container that renders panels from an array of items
 * and controls its expansion/retraction.
 */
const Accordion = createClass({
	displayName: 'Accordion',

	reducers,

	propTypes: {
		/**
		 * An array of the items to be rendered on accordion
		 */
		items: array,

		/**
		 * Appended to the component-specific class names set on the root
		 * element.
		 */
		className: string,

		/**
		 * Indicates which item is expanded.
		 */
		index: number,

		/**
		 * Called when the user clicks on the component's header of an item.
		 *
		 * Signature: `(itemIndex, { event, props }) => {}`
		 */
		onChange: func,

		/**
		 * Passed through to the root element.
		 */
		style: object,
	},

	getDefaultProps() {
		return {
			items: [],
			onChange: _.noop,
		};
	},

	handleToggle(isExpanded, index, event) {
		const selectedIndex = isExpanded ? index : null;

		this.props.onChange(selectedIndex, {
			event,
			props: this.props,
		});
	},

	render() {
		const {
			items,
			className,
			index,
			style,
			...passThroughs,
		} = this.props;

		return (
			<div
				{...passThroughs}
				className={cx('&', className)}
				style={style}>
				{items.map((item, i) => (
					<ExpanderPanel
						key={`expander-${i}`}
						style={item.style}
						onToggle={(isExpanded, { event }) => this.handleToggle(isExpanded, i, event)}
						isExpanded={i === index}>
						<ExpanderPanel.Header>{item.title}</ExpanderPanel.Header>
						{item.content}
					</ExpanderPanel>
				))}
			</div>
		);
	},
});

export default Accordion;
