import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { buildModernHybridComponent } from '../../util/state-management';
import { ExpanderPanelDumb as ExpanderPanel } from '../ExpanderPanel/ExpanderPanel';
import {
	findTypes,
	omitProps,
	StandardProps,
} from '../../util/component-types';
import * as reducers from '../Accordion/Accordion.reducers';

const cx = lucidClassNames.bind('&-Accordion');

const { func, object, number, string } = PropTypes;
interface IAccordionProps extends StandardProps {
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

export interface IAccordionState {
	selectedIndex: number | null;
}

const defaultProps = {
	onSelect: _.noop,
};

const Accordion = (props: IAccordionProps): React.ReactElement => {
	const { style, className, selectedIndex, ...passThroughs } = props;

	const itemChildProps = _.map(findTypes(props, Accordion.Item), 'props');

	const handleToggle = (
		isExpanded: boolean,
		index: number,
		event: React.MouseEvent
	) => {
		const selectedIndex = isExpanded ? index : null;

		props.onSelect(selectedIndex, {
			event,
			props,
		});
	};

	return (
		<div
			{...omitProps(passThroughs, undefined, _.keys(Accordion.propTypes))}
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
	className: string`
		Appended to the component-specific class names set on the root element.
	`,
	selectedIndex: number`
		Indicates which item is expanded
	`,
	onSelect: func`
		Called when the user clicks on the component's header of an item.
	`,
	style: object`
		Passed through to the root element.
	`,
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
>(Accordion, { reducers });

export { Accordion as AccordionDumb };
