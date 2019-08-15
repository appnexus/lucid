import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { findTypes, omitProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Panel');

const { bool, node, object, string } = PropTypes;

interface IPanelHeaderProps {
	description?: string;
	children?: React.ReactNode;
}
class PanelHeader extends React.Component<IPanelHeaderProps, {}, {}> {
	constructor(props: IPanelHeaderProps) {
		super(props);
	}
	static displayName = 'Panel.Header';
	static peek = {
		description: `
			Content displayed at the top of the panel.
		`,
	};
	static propName = 'Header';

	render(): React.ReactNode {
		return <div>{this.props.children}</div>;
	}
}

interface IPanelFooterProps {
	description?: string;
	children?: React.ReactNode;
}
class PanelFooter extends React.Component<IPanelFooterProps, {}, {}> {
	constructor(props: IPanelFooterProps) {
		super(props);
	}
	static displayName = 'Panel.Footer';
	static peek = {
		description: `
			Content displayed at the bottom of the panel.
		`,
	};
	static propName = 'Footer';

	render(): React.ReactNode {
		return <div>{this.props.children}</div>;
	}
}

export interface IPanelProps {
	/**
	 * Appended to the component-specific class names set on the root element.
	 */
	className?: string;

	/**
	 * *Child Element* - Header contents. Only one \`Header\` is used.
	 */
	Header?: React.ReactNode & { props: IPanelHeaderProps };

	/**
	 * *Child Element* - Footer contents. Only one \`Footer\` is used.
	 */
	Footer?: React.ReactNode & { props: IPanelFooterProps };

	/**
	 * Generally you should only have a single child element so the centering works
	 *  correctly.
	 */
	children?: React.ReactNode;

	/**
	 * If set to true, creates a content section with no padding.
	 */
	isGutterless?: boolean;

	/**
	 * If set to false, removes margin around the Panel
	 */
	hasMargin?: boolean;

	/**
	 * Styles that are passed through to root element.
	 */
	style?: object;

	/**
	 * If set to true, makes content overflow scrollable, when Panel has a set
	 * height.
	 */
	isScrollable?: boolean;
}

class Panel extends React.Component<IPanelProps, {}, {}> {
	constructor(props: IPanelProps) {
		super(props);
	}

	static displayName: 'Panel';
	static propName: 'Panel';
	static peek = {
		description: `
			Panel is used to wrap content to better organize elements in window.
		`,
		categories: ['layout'],
	};
	static propTypes = {
		className: string`
			Appended to the component-specific class names set on the root element.
		`,
		Header: node`
			*Child Element* - Header contents. Only one \`Header\` is used.
		`,
		Footer: node`
			*Child Element* - Footer contents. Only one \`Footer\` is used.
		`,
		children: node`
			Generally you should only have a single child element so the centering
			works correctly.
		`,
		isGutterless: bool`
			If set to true, creates a content section with no padding.
		`,
		hasMargin: bool`
			If set to false, removes margin around the Panel
		`,
		style: object`
			Styles that are passed through to root element.
		`,
		isScrollable: bool`
			If set to true, makes content overflow scrollable, when Panel has a set
			height.
		`,
	};

	static Header = PanelHeader;
	static Footer = PanelFooter;

	static defaultProps = {
		isGutterless: false,
		hasMargin: true,
		isScrollable: true,
	};

	render(): React.ReactNode {
		const {
			children,
			className,
			isGutterless,
			hasMargin,
			style,
			isScrollable,
			...passThroughs
		} = this.props;

		const headerChildProp = _.first(
			_.map(findTypes(this.props, Panel.Header), 'props')
		);
		const footerChildProp = _.first(
			_.map(findTypes(this.props, Panel.Footer), 'props')
		);

		return (
			<div
				{...omitProps<IPanelProps>(
					passThroughs,
					undefined,
					Object.keys(Panel.propTypes)
				)}
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
	}
}

export default Panel;
