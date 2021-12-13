import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { lucidClassNames } from '../../util/style-helpers';
import { findTypes, StandardProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Panel');

const { bool, node, object, string } = PropTypes;

export interface IPanelHeaderProps
	extends StandardProps,
		React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
	description?: string;
}

const PanelHeader = (_props: IPanelHeaderProps): null => null;
PanelHeader.displayName = 'Panel.Header';
PanelHeader.peek = {
	description: `Content displayed at the top of the panel.`,
};
PanelHeader.propTypes = {
	description: string,
	children: node,
};
PanelHeader.propName = 'Header';

export interface IPanelFooterProps
	extends StandardProps,
		React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
	description?: string;
}
const PanelFooter = (_props: IPanelFooterProps): null => null;

PanelFooter.displayName = 'Panel.Footer';
PanelFooter.peek = {
	description: `Content displayed at the bottom of the panel.`,
};
PanelFooter.propTypes = {
	description: string,
	children: node,
};
PanelFooter.propName = 'Footer';

export interface IPanelProps
	extends StandardProps,
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		> {
	/** *Child Element* - Header contents. Only one \`Header\` is used. */
	Header?: React.ReactNode & { props: IPanelHeaderProps };

	/** *Child Element* - Footer contents. Only one \`Footer\` is used. */
	Footer?: React.ReactNode & { props: IPanelFooterProps };

	/** If set to true, creates a content section with no padding. */
	isGutterless: boolean;

	/** If set to false, removes margin around the Panel */
	hasMargin: boolean;

	/** If set to true, makes content overflow scrollable, when Panel has a set
	 * height. */
	isScrollable: boolean;
}

const defaultProps = {
	isGutterless: false,
	hasMargin: true,
	isScrollable: true,
};

export const Panel = (props: IPanelProps): React.ReactElement => {
	const {
		children,
		className,
		isGutterless,
		hasMargin,
		style,
		isScrollable,
		...passThroughs
	} = props;

	const headerChildProp = _.first(
		_.map(findTypes(props, Panel.Header), 'props')
	);
	const footerChildProp = _.first(
		_.map(findTypes(props, Panel.Footer), 'props')
	);

	return (
		<div
			{...passThroughs}
			className={cx('&', className, {
				'&-is-not-gutterless': !isGutterless,
				'&-has-margin': hasMargin,
				'&-is-scrollable': isScrollable,
			})}
			style={style}
		>
			{headerChildProp ? (
				<header
					{...headerChildProp}
					className={cx('&-Header', headerChildProp.className)}
				/>
			) : null}

			<section className={cx('&-content')}>{children}</section>

			{footerChildProp ? (
				<footer
					{...footerChildProp}
					className={cx('&-Footer', footerChildProp.className)}
				/>
			) : null}
		</div>
	);
};

Panel.defaultProps = defaultProps;
Panel.displayName = 'Panel';
Panel.peek = {
	description: `\`Panel\` is used to wrap content to better organize elements in window.`,
	categories: ['layout'],
};
Panel.propTypes = {
	/**
		Appended to the component-specific class names set on the root element.
	*/
	className: string,

	/*
	 *Child Element* - Header contents. Only one \`Header\` is used.
	 */
	Header: node,

	/**
	 *Child Element* - Footer contents. Only one \`Footer\` is used.
	 */
	Footer: node,

	/**
		Generally you should only have a single child element so the centering
		works correctly.
	*/
	children: node,

	/**
		If set to true, creates a content section with no padding.
	*/
	isGutterless: bool,

	/**
		Styles that are passed through to root element.
	*/
	style: object,

	/**
		If set to true, makes content overflow scrollable, when Panel has a set
		height.
	*/
	isScrollable: bool,
};
Panel.Header = PanelHeader;
Panel.Footer = PanelFooter;

export default Panel;
