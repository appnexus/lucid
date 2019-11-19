import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { buildHybridComponent } from '../../util/state-management';
import { ExpanderPanelDumb as ExpanderPanel, IExpanderPanelHeaderProps } from '../ExpanderPanel/ExpanderPanel';
import {
	findTypes,
	omitProps,
	StandardProps,
	Overwrite,
} from '../../util/component-types';
import * as reducers from '../Accordion/Accordion.reducers';

const cx = lucidClassNames.bind('&-Accordion');

const { any, func, object, number, string } = PropTypes;

interface IAccordionPropsRaw extends StandardProps {
	/**
	* Indicates which item is expanded
	* */
	selectedIndex: number,
	/**
	* Called when the user clicks on the component's header of an item.
	* */ 
	onSelect: (selectedIndex: number | null, {
		event,
		props
	}: {event: React.MouseEvent, props: IAccordionProps}) => void
	/**
	* Prop alternative to Header child component passed through to the
	* underlying ExpanderPanel
	*/
	Header: IExpanderPanelHeaderProps
}

type IAccordionProps = Overwrite<React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		>, IAccordionPropsRaw>

export interface IAccordionState {
	selectedIndex: number | null
}

const defaultProps = {
	onSelect: _.noop,
}

class Accordion extends React.Component<IAccordionProps, IAccordionState> {
	static displayName = 'Accordion';
	static propTypes = {
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
		Header: any`
			Prop alternative to Header child component passed through to the
			underlying ExpanderPanel
		`,
	}
	static definition = {
		statics: {
			Item: ExpanderPanel,
			Header: ExpanderPanel.Header,
			reducers,
			peek: {
				description: `
					This is a container that renders panels and controls its
					expansion/retraction.
				`,
				categories: ['layout'],
				madeFrom: ['ExpanderPanel'],
			},
		},
	};

	static defaultProps = defaultProps;

	static reducers = reducers;

	static Item = ExpanderPanel;

	static Header = ExpanderPanel.Header;

	handleToggle(isExpanded: boolean, index: number, event: React.MouseEvent) {
		const selectedIndex = isExpanded ? index : null;

		this.props.onSelect(selectedIndex, {
			event,
			props: this.props,
		});
	}

	render() {
		const { style, className, selectedIndex, ...passThroughs } = this.props;

		const itemChildProps = _.map(
			findTypes(this.props, Accordion.Item as { propName?: string | string[] }),
			'props'
		);

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
								this.handleToggle(isExpanded, index, event)
							}
							isExpanded={!itemChildProp.isDisabled && selectedIndex === index}
						/>
					);
				})}
			</div>
		);
	}
}

export default buildHybridComponent(Accordion);
export { Accordion as AccordionDumb };