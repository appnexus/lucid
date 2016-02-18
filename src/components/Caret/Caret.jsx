import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';

// NOTE: Setting a reference here so we can
// inject this in our tests (Node doesn't have
// `btoa` in the global space).
// also, you have to to a 'typeof' test for undefined vars or 'use strict' will complain...
var btoa = typeof window !== 'undefined' && typeof window.btoa !== 'undefined' ? window.btoa : _.identity;

/**
 *
 * {"categories": ["glyph"]}
 *
 * A arrow carret icon that can point up or down
 */
var Caret = React.createClass({
	displayName: 'Caret',

	propTypes: {
		/**
		 * fill color for the arrow
		 */
		color: React.PropTypes.string,
		/**
		 * the direction the arrow points
		 */
		direction: React.PropTypes.oneOf(['up', 'down']),
		style: React.PropTypes.object,
		className: React.PropTypes.string
	},

	getDefaultProps: function () {
		return {
			color: 'white',
			direction: 'up'
		};
	},

	render: function () {
		var isDown = this.props.direction === 'down';
		var classes = classNames([
			'ArCaret',
			this.props.className,
			`ArCaret-${this.props.direction}`
		]);

		var dataUriPrefix = 'data:image/svg+xml;base64,';
		var downCaret = `
			<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13">
				<g>
					<title>Layer 1</title>
					<path d="m2.85617,4.56539l3.61864,3.86921l3.66901,-3.86921l-7.28765,0z" fill="${this.props.color}" marker-start="url(#se_marker_start_svg_1)" id="svg_1" />
				</g>
				<defs>
					<marker refY="50" refX="50" markerHeight="5" markerWidth="5" viewBox="0 0 100 100" orient="auto" markerUnits="strokeWidth" id="se_marker_start_svg_1">
						<path stroke-width="10" fill="none" d="m0,50l100,40l-30,-40l30,-40l-100,40z" id="svg_2" />
					</marker>
				</defs>
			</svg>`;

		var upCaret = `
			<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13">
				<g>
					<title>Layer 1</title>
					<path transform="rotate(-180 6.5,6.5) " d="m2.85617,4.56539l3.61864,3.86921l3.66901,-3.86921l-7.28765,0z" fill="${this.props.color}" marker-start="url(#se_marker_start_svg_1)" id="svg_1" />
				</g>
				<defs>
					<marker refY="50" refX="50" markerHeight="5" markerWidth="5" viewBox="0 0 100 100" orient="auto" markerUnits="strokeWidth" id="se_marker_start_svg_1">
						<path stroke-width="10" fill="none" d="m0,50l100,40l-30,-40l30,-40l-100,40z" id="svg_2" />
					</marker>
				</defs>
			</svg>`;

		var svg = isDown
			? dataUriPrefix + btoa(downCaret)
			: dataUriPrefix + btoa(upCaret);

		return (
			<img
				key='caret'
				ref='caret'
				className={classes}
				style={this.props.style}
				src={svg} />
		);
	}
});

export default Caret;
