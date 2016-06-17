import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, findTypes }  from '../../util/component-types';

import ExpanderPanel from '../ExpanderPanel/ExpanderPanel';

import * as reducers from '../Accordion/Accordion.reducers';

const cx = lucidClassNames.bind('&-Accordion');

const {
	func,
	bool,
	object,
	number,
	string,
} = React.PropTypes;

/**
 * {"categories": ["layout"], "madeFrom": ["ExpanderPanel"]}
 *
 * This is a container that renders panels and controls its expansion/retraction.
 */
const Accordion = createClass({
	displayName: 'Accordion',

	components: {
		Item: createClass({
			displayName: 'Accordion.Item',
			propName: 'Item',
			propTypes: {
				/**
				* Styles an item as disabled. When this property is set to true, the item can't be expanded.
				*/
				isDisabled: bool,
			},
		}),
		Header: createClass({
			displayName: 'Accordion.Header',
			propName: 'Header',
		}),
	},

	reducers,

	propTypes: {
		/**
		 * Appended to the component-specific class names set on the root
		 * element.
		 */
		className: string,

		/**
		 * Indicates which item is expanded.
		 */
		selectedIndex: number,

		/**
		 * Called when the user clicks on the component's header of an item.
		 *
		 * Signature: `(itemIndex, { event, props }) => {}`
		 */
		onSelect: func,

		/**
		 * Passed through to the root element.
		 */
		style: object,
	},

	getDefaultProps() {
		return {
			onSelect: _.noop,
		};
	},

	handleToggle(isExpanded, index, event) {
		const selectedIndex = isExpanded ? index : null;

		this.props.onSelect(selectedIndex, {
			event,
			props: this.props,
		});
	},

	render() {
		const {
			style,
			className,
			selectedIndex,
			...passThroughs,
		} = this.props;

		const itemChildProps = _.map(findTypes(this.props, Accordion.Item), 'props');

		return (
			<div
				{...passThroughs}
				className={cx('&', className)}
				style={style}>
				{_.map(itemChildProps, (itemChildProp, index) => {
					let { isDisabled } = itemChildProp;

					return <div
						key={`expander-${index}`}
						className={cx('&-Item', {
							'&-Item-is-disabled': isDisabled,
						})}>
						<ExpanderPanel
							onToggle={(isExpanded, { event }) => !isDisabled && this.handleToggle(isExpanded, index, event)}
							isExpanded={!isDisabled && selectedIndex === index}>
							<ExpanderPanel.Header>{_.get(_.first(findTypes(itemChildProp, Accordion.Header)), 'props.children', '')}</ExpanderPanel.Header>
							{_.get(itemChildProp, 'children', '')}
						</ExpanderPanel>
					</div>;
				})}
			</div>
		);
	},
});

export default Accordion;
