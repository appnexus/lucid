import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, findTypes, omitProps } from '../../util/component-types';
import { buildHybridComponent } from '../../util/state-management';

import { ExpanderPanelDumb as ExpanderPanel } from '../ExpanderPanel/ExpanderPanel';

import * as reducers from '../Accordion/Accordion.reducers';

const cx = lucidClassNames.bind('&-Accordion');

const { any, func, object, number, string } = PropTypes;

const Accordion = createClass({
	statics: {
		peek: {
			description: `
				This is a container that renders panels and controls its
				expansion/retraction.
			`,
			categories: ['layout'],
			madeFrom: ['ExpanderPanel'],
		},
	},

	displayName: 'Accordion',

	components: {
		Item: ExpanderPanel,
		Header: ExpanderPanel.Header,
	},

	reducers,

	propTypes: {
		className: string`
			Appended to the component-specific class names set on the root element.
		`,
		selectedIndex: number`
			Indicates which item is expanded
		`,
		onSelect: func`
			Called when the user clicks on the component's header of an item.
			Signature: \`(itemIndex, { event, props }) => {}\`
		`,
		style: object`
			Passed through to the root element.
		`,
		Header: any`
			Prop alternative to Header child component passed through to the
			underlying ExpanderPanel
		`,
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
								this.handleToggle(isExpanded, index, event)
							}
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
