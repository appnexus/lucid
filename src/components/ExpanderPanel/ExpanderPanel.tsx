import _, { omit } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { lucidClassNames } from '../../util/style-helpers';
import { getFirst, StandardProps } from '../../util/component-types';
import { buildModernHybridComponent } from '../../util/state-management';
import { IExpanderState } from '../Expander/Expander';
import ChevronIcon from '../Icon/ChevronIcon/ChevronIcon';
import Collapsible from '../Collapsible/Collapsible';
import Button from '../Button/Button';
import Panel from '../Panel/Panel';

import * as reducers from '../Expander/Expander.reducers';

const cx = lucidClassNames.bind('&-ExpanderPanel');

const { any, bool, func, node, object, string } = PropTypes;

/** Header */
export interface IExpanderPanelHeaderProps extends StandardProps {
	description?: string;
}

const Header = (_props: IExpanderPanelHeaderProps): null => null;
Header.displayName = 'ExpanderPanel.Header';
Header.peek = {
	description: `Renders a \`<span>\` of content next to the \`ChevronIcon\` in the \`Panel.Header\`.`,
};
Header.propName = 'Header';
Header.propTypes = {
	/**
		Used to identify the purpose of this switch to the user -- can be any
		renderable content.
	*/
	children: node,
};

/** ExpanderPanel */
export interface IExpanderPanelProps extends StandardProps {
	/** Indicates that the component is in the "expanded" state when true and in
			the "unexpanded" state when false. */
	isExpanded: boolean;

	/** Indicates that the component is in the "disabled" state when true and in
			the "enabled" state when false. */
	isDisabled: boolean;

	/** Controls the presence of padding on the inner content. */
	hasPadding: boolean;

	/** Optional. The callback that fires when the animation comes to a rest. */
	onRest?: () => void;

	/** Applies on onRest callback when rest state is closed. */
	onRestAppliedOnCollapse?: boolean;

	/** Called when the user clicks on the component's header. */
	onToggle: (
		isExpanded: boolean,
		{
			event,
			props,
		}: {
			event: React.MouseEvent;
			props: IExpanderPanelProps;
		}
	) => void;

	/** prop alternative to Header child component passed through to the
			underlying ExpanderPanel */
	Header?: React.ReactNode;
}

/** TODO: Remove the nonPassThroughs when the component is converted to a functional component */
const nonPassThroughs = [
	'className',
	'isExpanded',
	'onToggle',
	'onRest',
	'onRestAppliedOnCollapse',
	'Header',
	'isDisabled',
	'hasPadding',
	'initialState',
];

class ExpanderPanel extends React.Component<
	IExpanderPanelProps,
	IExpanderState
> {
	static displayName = 'ExpanderPanel';
	static Header = Header;
	static propTypes = {
		/**
			Expandable content.
		*/
		children: node,

		/**
			Appended to the component-specific class names set on the root element.
		*/
		className: string,

		/**
			Indicates that the component is in the "expanded" state when true and in
			the "unexpanded" state when false.
		*/
		isExpanded: bool,

		/**
			Indicates that the component is in the "disabled" state when true and in
			the "enabled" state when false.
		*/
		isDisabled: bool,

		/**
			Controls the presence of padding on the inner content.
		*/
		hasPadding: bool,

		/**
			Called when the user clicks on the component's header.
			Signature: \`(isExpanded, { event, props }) => {}\`
		*/
		onToggle: func,

		/**
			Passed through to the root element.
		*/
		style: object,

		/** 
		 	Optional. The callback that fires when the animation comes to a rest.
		*/
		onRest: func,

		/* 
			Applies on onRest callback when rest state is closed.
		*/
		onRestAppliedOnCollapse: bool,

		/**
			prop alternative to Header child component passed through to the
			underlying ExpanderPanel
		*/
		Header: any,
	};

	static peek = {
		description: `An expandable container that provides a toggle that controls when the \`Panel\` content is shown.`,
		categories: ['layout'],
		madeFrom: ['ChevronIcon', 'Expander', 'Panel'],
	};

	static defaultProps = {
		isExpanded: false,
		onToggle: _.noop,
		hasPadding: true,
		isDisabled: false,
	};

	handleToggle = (event: React.MouseEvent) => {
		if (!this.props.isDisabled) {
			this.props.onToggle(!this.props.isExpanded, {
				event,
				props: this.props,
			});
		}
	};

	render() {
		const {
			children,
			className,
			isExpanded,
			isDisabled,
			hasPadding,
			onRest,
			onRestAppliedOnCollapse,
			style,
			...passThroughs
		} = this.props;

		const headerChildProps = _.get(
			getFirst(this.props, ExpanderPanel.Header),
			'props'
		);

		const cleanedOnRest =
			onRestAppliedOnCollapse || isExpanded ? onRest : undefined;

		return (
			<Panel
				{...(omit(passThroughs, nonPassThroughs) as any)}
				className={cx(
					'&',
					{
						'&-is-collapsed': !isExpanded,
						'&-is-disabled': isDisabled,
					},
					className
				)}
				style={style}
				isGutterless={!hasPadding}
			>
				<Panel.Header className={cx('&-header')} onClick={this.handleToggle}>
					<Button className={cx('&-icon')} kind='invisible' hasOnlyIcon={true}>
						<ChevronIcon direction={isExpanded ? 'up' : 'down'} />
					</Button>

					<span {...headerChildProps} />
				</Panel.Header>

				<Collapsible
					isExpanded={isExpanded}
					className={cx('&-content', {
						'&-content-is-expanded': isExpanded,
					})}
					onRest={cleanedOnRest}
				>
					<div className={cx('&-content-inner')}>{children}</div>
				</Collapsible>
			</Panel>
		);
	}
}

export default buildModernHybridComponent<
	IExpanderPanelProps,
	IExpanderState,
	typeof ExpanderPanel
>(ExpanderPanel as any, { reducers });
export { ExpanderPanel as ExpanderPanelDumb };
