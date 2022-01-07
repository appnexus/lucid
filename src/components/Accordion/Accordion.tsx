import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { buildModernHybridComponent } from '../../util/state-management';
import { ExpanderPanelDumb as ExpanderPanel } from '../ExpanderPanel/ExpanderPanel';
import { findTypes, StandardProps } from '../../util/component-types';
import * as reducers from '../Accordion/Accordion.reducers';

const cx = lucidClassNames.bind('&-Accordion');

const { func, object, number, string } = PropTypes;
export interface IAccordionProps extends StandardProps {
	/**
	 * Indicates which item is expanded
	 * */
	selectedIndex?: number | null;

	/**
	 * Called when the user clicks on the component's header of an item.
	 * */
	onSelect: (
		selectedIndex: number | null,
		{ event, props }: { event: React.MouseEvent; props: IAccordionProps }
	) => void;
}

/** TODO: Remove the nonPassThroughs when the component is converted to a functional component */
const nonPassThroughs = ['selectedIndex', 'onSelect'];

export interface IAccordionState {
	selectedIndex: number | null;
}

const defaultProps = {
	onSelect: _.noop,
};

const Accordion = (props: IAccordionProps): React.ReactElement => {
	const { style, className, onSelect, selectedIndex, ...passThroughs } = props;

	const itemChildProps = _.map(findTypes(props, Accordion.Item), 'props');

	const handleToggle = (
		isExpanded: boolean,
		index: number,
		event: React.MouseEvent
	) => {
		const selectedIndex = isExpanded ? index : null;

		onSelect(selectedIndex, {
			event,
			props,
		});
	};

	return (
		<div
			{...(_.omit(passThroughs, nonPassThroughs) as any)}
			className={cx('&', className)}
			style={style}
		>
			{_.map(itemChildProps, (itemChildProp, index: number) => {
				return (
					<ExpanderPanel
						key={index}
						{...itemChildProp}
						className={cx('&-Item', itemChildProp.className)}
						onToggle={(isExpanded, { event }) =>
							handleToggle(isExpanded, index, event)
						}
						isExpanded={!itemChildProp.isDisabled && selectedIndex === index}
					/>
				);
			})}
		</div>
	);
};

Accordion.displayName = 'Accordion';

Accordion.propTypes = {
	/**
		Appended to the component-specific class names set on the root element.
	*/
	className: string,

	/**
		Indicates which item is expanded
	*/
	selectedIndex: number,

	/**
		Called when the user clicks on the component's header of an item.
	*/
	onSelect: func,

	/**
		Passed through to the root element.
	**/
	style: object,
};

Accordion.peek = {
	description: `\`Accordion\` is a container that renders panels and controls their expansion or collapse.`,
	categories: ['layout'],
	madeFrom: ['ExpanderPanel'],
};

Accordion.defaultProps = defaultProps;

Accordion.reducers = reducers;

Accordion.Item = ExpanderPanel;

Accordion.Header = ExpanderPanel.Header;

export default buildModernHybridComponent<
	IAccordionProps,
	IAccordionState,
	typeof Accordion
>(Accordion as any, { reducers });

export { Accordion as AccordionDumb };
