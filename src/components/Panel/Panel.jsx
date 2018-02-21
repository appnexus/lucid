import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, findTypes, omitProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Panel');

const { bool, node, object, string } = PropTypes;

const Panel = createClass({
	displayName: 'Panel',

	statics: {
		peek: {
			description: `
				Panel is used to wrap content to better organize elements in window.
			`,
			categories: ['layout'],
		},
	},

	propName: 'Panel',

	components: {
		Header: createClass({
			displayName: 'Panel.Header',
			statics: {
				peek: {
					description: `
						Content displayed at the top of the panel.
					`,
				},
			},
			propName: 'Header',
		}),
		Footer: createClass({
			displayName: 'Panel.Footer',
			statics: {
				peek: {
					description: `
						Content displayed at the bottom of the panel.
					`,
				},
			},
			propName: 'Footer',
		}),
	},

	propTypes: {
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
	},

	getDefaultProps() {
		return {
			isGutterless: false,
			hasMargin: true,
			isScrollable: true,
		};
	},

	render: function() {
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
				{...omitProps(passThroughs, Panel)}
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
	},
});

export default Panel;
