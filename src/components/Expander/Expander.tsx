import _, { omit } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { lucidClassNames } from '../../util/style-helpers';
import { findTypes, StandardProps } from '../../util/component-types';
import { buildModernHybridComponent } from '../../util/state-management';
import ChevronIcon from '../Icon/ChevronIcon/ChevronIcon';
import Collapsible from '../Collapsible/Collapsible';
import * as reducers from './Expander.reducers';
import Button from '../Button/Button';

const cx = lucidClassNames.bind('&-Expander');

const { any, bool, func, node, object, oneOf, string } = PropTypes;

/** Expander Label */
export interface IExpanderLabelProps extends StandardProps {
	description?: string;
}

const Label = (_props: IExpanderLabelProps): null => null;
Label.displayName = 'Expander.Label';
Label.peek = {
	description: `Renders a \`<span>\` to be shown next to the \`ExpanderIcon\`.`,
};
Label.propName = 'Label';
Label.propTypes = {
	/**
		Used to identify the purpose of this switch to the user -- can be any
		renderable content.
	*/
	children: node,
};

/** Additional Label */
export interface IExpanderAdditionalLabelProps extends StandardProps {
	description?: string;
}
const AdditionalLabelContent = (_props: IExpanderAdditionalLabelProps): null =>
	null;
AdditionalLabelContent.displayName = 'Expander.AdditionalLabelContent';
AdditionalLabelContent.peek = {
	description: `Renders a \`<span>\` to be shown next to the expander label.`,
};
AdditionalLabelContent.propName = 'AdditionalLabelContent';
AdditionalLabelContent.propTypes = {
	/**
		Used to display additional information or/and actions next to expander label.
	*/
	children: node,
};

/** Expander */
export interface IExpanderProps
	extends StandardProps,
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		> {
	/**
	 * Indicates that the component is in the "expanded" state when true and in
	 * the "unexpanded" state when false.
	 * */
	isExpanded: boolean;

	/**
	 * Called when the user clicks on the component's header.
	 * */
	onToggle: (
		isExpanded: boolean,
		{ event, props }: { event: React.MouseEvent; props: IExpanderProps }
	) => void;

	/** Passed through to the root element. */
	style?: React.CSSProperties;

	/** Child element whose children represents content to be shown next to the
	 * expander icon.
	 * */
	Label?: React.ReactNode;

	/** Child element whose children respresent content to be shown inside
	 * Expander.Label and to the right of it
	 * */
	AdditionalLabelContent?: React.ReactNode;

	/** Renders different variants of Expander. 'simple' is default.
	 * 'highlighted' is more prominant.
	 * */
	kind: 'simple' | 'highlighted';
}

const nonPassThroughs = [
	'isExpanded',
	'onToggle',
	'style',
	'Label',
	'AdditionalLabelContent',
	'kind',
	'initialState',
	'callbackId',
];

const defaultProps = {
	isExpanded: false,
	onToggle: _.noop,
	kind: 'simple' as const,
};

export interface IExpanderState {
	isExpanded: boolean;
}

class Expander extends React.Component<IExpanderProps, IExpanderState> {
	static displayName = 'Expander';
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
			Called when the user clicks on the component's header.  Signature:
			\`(isExpanded, { event, props }) => {}\`
		*/
		onToggle: func,

		/**
			Passed through to the root element.
		*/
		style: object,

		/**
			Child element whose children represents content to be shown next to the
			expander icon.
		*/
		Label: any,

		/**
			Child element whose children respresent content to be shown inside
			Expander.Label and to the right of it
		*/
		AdditionalLabelContent: node,

		/**
			Renders different variants of Expander. 'simple' is default.
			'highlighted' is more prominant.
		*/
		kind: oneOf(['simple', 'highlighted']),
	};

	static defaultProps = defaultProps;

	static reducers = reducers;

	static Label = Label;
	static AdditionalLabelContent = AdditionalLabelContent;

	static peek = {
		description: `\`Expander\` is a container that provides a toggle that controls when the \`Panel\` content is shown.`,
		categories: ['layout'],
		madeFrom: ['ChevronIcon'],
	};

	handleToggle = (event: React.MouseEvent): void => {
		this.props.onToggle(!this.props.isExpanded, {
			event,
			props: this.props,
		});
	};

	render(): React.ReactNode {
		const { children, className, isExpanded, style, kind, ...passThroughs } =
			this.props;

		const labelChildProp = _.first(
			_.map(findTypes(this.props, Expander.Label), 'props')
		);

		const additionalLabelContentChildProp = _.first(
			_.map(findTypes(this.props, Expander.AdditionalLabelContent), 'props')
		);

		return (
			<div
				{...omit(passThroughs, nonPassThroughs)}
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
				<header className={cx('&-header')}>
					<div className={cx('&-header-toggle')} onClick={this.handleToggle}>
						<Button
							className={cx('&-icon')}
							kind='invisible'
							hasOnlyIcon={true}
						>
							<ChevronIcon direction={isExpanded ? 'up' : 'down'} />
						</Button>
						{labelChildProp && (
							<span className={cx('&-text')}>{labelChildProp.children}</span>
						)}
					</div>
					{additionalLabelContentChildProp && (
						<div className={cx('&-additional-content')}>
							{additionalLabelContentChildProp.children}
						</div>
					)}
				</header>
				<Collapsible
					isExpanded={isExpanded}
					rootType='section'
					className={cx('&-content')}
				>
					{children}
				</Collapsible>
			</div>
		);
	}
}

export default buildModernHybridComponent<
	IExpanderProps,
	IExpanderState,
	typeof Expander
>(Expander as any, { reducers });
export { Expander as ExpanderDumb };
