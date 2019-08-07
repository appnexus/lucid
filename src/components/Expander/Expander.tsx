import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, findTypes, omitProps } from '../../util/component-types';
import { buildHybridComponent } from '../../util/state-management';
import ChevronIcon from '../Icon/ChevronIcon/ChevronIcon';
import Collapsible from '../Collapsible/Collapsible';
import * as reducers from './Expander.reducers';
import Button from '../Button/Button';

const cx = lucidClassNames.bind('&-Expander');

const { any, bool, func, node, object, oneOf, string } = PropTypes;

interface IExpanderLabelProps {
	description?: string;
	children?: React.ReactNode;
}

interface IExpanderAdditionalLabelProps {
	description?: string;
	children?: React.ReactNode;
}

export interface IExpanderProps {
	/** Expandable content. */
	children?: React.ReactNode;

	/** Appended to the component-specific class names set on the root element. */
	className?: string;

	/**
	 * Indicates that the component is in the "expanded" state when true and in
	 * the "unexpanded" state when false.
	 * */
	isExpanded?: boolean;

	/**
	 * Called when the user clicks on the component's header.
	 * */
	onToggle?: (
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
	kind?: 'simple' | 'highlighted';
}

export interface IExpanderState {
	isExpanded: boolean;
}

const Expander = createClass<IExpanderProps, IExpanderState>({
	displayName: 'Expander',

	statics: {
		peek: {
			description: `
				This is a container that provides a toggle that controls when the
				content is shown.
			`,
			categories: ['layout'],
			madeFrom: ['ChevronIcon'],
		},
	},

	components: {
		Label: createClass<IExpanderLabelProps, {}>({
			displayName: 'Expander.Label',
			statics: {
				peek: {
					description: `
						Renders a \`<span>\` to be shown next to the expander icon.
					`,
				},
			},
			propName: 'Label',
			propTypes: {
				children: node`
					Used to identify the purpose of this switch to the user -- can be any
					renderable content.
				`,
			},
		}),
		AdditionalLabelContent: createClass<IExpanderAdditionalLabelProps, {}>({
			displayName: 'Expander.AdditionalLabelContent',
			statics: {
				peek: {
					description: `
						Renders a \`<span>\` to be shown next to the expander label.
					`,
				},
			},
			propName: 'AdditionalLabelContent',
			propTypes: {
				children: node`
					Used to display additional information or/and actions next to expander label.
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

		onToggle: func`
			Called when the user clicks on the component's header.  Signature:
			\`(isExpanded, { event, props }) => {}\`
		`,

		style: object`
			Passed through to the root element.
		`,

		Label: any`
			Child element whose children represents content to be shown next to the
			expander icon.
		`,

		AdditionalLabelContent: node`
			Child element whose children respresent content to be shown inside
			Expander.Label and to the right of it
		`,

		kind: oneOf(['simple', 'highlighted'])`
			Renders different variants of Expander. 'simple' is default.
			'highlighted' is more prominant.
		`,
	},

	getDefaultProps() {
		return {
			isExpanded: false,
			onToggle: _.noop,
			kind: 'simple',
		};
	},

	render() {
		const {
			children,
			className,
			isExpanded,
			style,
			kind,
			...passThroughs
		} = this.props as IExpanderProps;

		const labelChildProp = _.first(
			_.map(findTypes(this.props, Expander.Label), 'props')
		);

		const additionalLabelContentChildProp = _.first(
			_.map(findTypes(this.props, Expander.AdditionalLabelContent), 'props')
		);

		return (
			<div
				{...omitProps<IExpanderProps>(passThroughs, Expander)}
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
	},

	handleToggle(event: React.MouseEvent) {
		this.props.onToggle(!this.props.isExpanded, {
			event,
			props: this.props,
		});
	},
});

export default buildHybridComponent(Expander);
export { Expander as ExpanderDumb };
