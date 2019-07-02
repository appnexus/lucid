import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { findTypes, omitProps, withReducer } from '../../util/component-types';
import ChevronIcon from '../Icon/ChevronIcon/ChevronIcon';
import Collapsible from '../Collapsible/Collapsible';
import {initialState, reducer, mapDispatchToProps} from './Expander.reducers';

const cx = lucidClassNames.bind('&-Expander');

const { any, bool, func, node, object, oneOf, string } = PropTypes;

const Expander = (props) => {

	const {
		children,
		className,
		style,
		kind,
		onToggle,
		isExpanded,
		...passThroughs
	} = props;

	const labelChildProp = _.first(
		_.map(findTypes(props, Expander.Label), 'props')
	);

	const additionalLabelContentChildProp = _.first(
		_.map(findTypes(props, Expander.AdditionalLabelContent), 'props')
	);

	return (
		<div
			{...omitProps(passThroughs, Expander)}
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
				<div className={cx('&-header-toggle')} onClick={() => onToggle(!isExpanded, props)}>
					<span className={cx('&-icon')}>
						<ChevronIcon size={12} direction={isExpanded ? 'up' : 'down'} />
					</span>
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
};

Expander.displayName = 'Expander';
Expander.defaultProps = {
	isExpanded: false,
	kind: 'simple',
};

Expander.peek = {
	description: `
		This is a container that provides a toggle that controls when the
		content is shown.
	`,
	categories: ['layout'],
}

Expander.propTypes = {
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
};

Expander.Label = () => null;
Expander.Label.propName = 'Label';
Expander.Label.displayName = 'Expander.Label';
Expander.Label.propTypes = {
	children: node`
		Used to identify the purpose of this switch to the user -- can be any
		renderable content.
	`,
};

Expander.AdditionalLabelContent = () => null;
Expander.AdditionalLabelContent.displayName = 'Expander.AdditionalLabelContent';
Expander.AdditionalLabelContent.propName = 'AdditionalLabelContent';
Expander.AdditionalLabelContent.propTypes = {
	children: node`
		Used to display additional information or/and actions next to expander label.
	`,
};

//@todo maybe just let consumers compose the HoC directly so they can pass their own initialState and whatnot?
//@todo we could keep the stateful component as the default.  Just need to tweak our module loader in Storybook
const ExpanderStateful = withReducer(Expander, reducer, mapDispatchToProps, initialState);
export default Expander;
export {ExpanderStateful}
