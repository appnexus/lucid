import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, findTypes, omitProps } from '../../util/component-types';
import { buildHybridComponent } from '../../util/state-management';

import {
	ExpanderPanelDumb as ExpanderPanel,
} from '../ExpanderPanel/ExpanderPanel';

import * as reducers from '../Accordion/Accordion.reducers';

const cx = lucidClassNames.bind('&-Accordion');

const { any, func, object, number, string } = PropTypes;

/**
* {"categories": ["layout"], "madeFrom": ["ExpanderPanel"]}
*
* This is a container that renders panels and controls its expansion/retraction.
*/
const Accordion = createClass({
	displayName: 'Accordion',

	components: {
		Item: ExpanderPanel,
		Header: ExpanderPanel.Header,
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

		/**
		 * prop alternative to Header child component
		 * passed through to the underlying ExpanderPanel
		 */
		Header: any,
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
		const { style, className, selectedIndex, ...passThroughs } = this.props;

		const itemChildProps = _.map(
			findTypes(this.props, Accordion.Item),
			'props'
		);

		return (
			<div
				{...omitProps(passThroughs, Accordion)}
				className={cx('&', className)}
				style={style}
			>
				{_.map(itemChildProps, (itemChildProp, index) => {
					return (
						<ExpanderPanel
							key={index}
							{...itemChildProp}
							className={cx('&-Item', itemChildProp.className)}
							onToggle={(isExpanded, { event }) =>
								this.handleToggle(isExpanded, index, event)}
							isExpanded={!itemChildProp.isDisabled && selectedIndex === index}
						/>
					);
				})}
			</div>
		);
	},
});

export default buildHybridComponent(Accordion);
export { Accordion as AccordionDumb };
