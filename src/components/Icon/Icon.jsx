import React from 'react';
import classNames from 'classnames';
import { bindClassNames } from '../../util/style-helpers';

const boundClassNames = bindClassNames('Icon');

const {
	string,
	number,
	node,
	bool
} = React.PropTypes;

/**
 *
 * {"categories": ["icons", "_icon"]}
 *
 * A basic svg icon. Any props that are not explicitly called out below will be
 * passed through to the native `svg` component.
 */
const Icon = React.createClass({
	propTypes: {
		/**
		 * class names that are appended to the defaults
		 */
		className: string,
		/**
		 * size variations of the icons,
		 * size directly effects height and width but the developer should also be conscious of the relationship with viewbox.
		 */
		size: number,
		/**
		 * The viewbox is very important for SVGs.
		 * You can think of viewbox at the "artboard" for our SVG
		 * while Size is the presented height and width.
		 */
		viewBox: string,
		/**
		 * any valid SVG aspect ratio
		 */
		aspectRatio: string,
		/**
		 * true or false, is the icon also a badge (adds stlying)
		 */
		badge: bool,
		/**
		 * any valid React children
		 */
		children: node
	},

	getDefaultProps() {
		return {
			size: 16,
			aspectRatio: 'xMinYMin meet',
			badge: false
		};
	},

	render() {
		let {
			className,
			children,
			size,
			viewBox,
			aspectRatio,
			badge,
			...passThroughs
		} = this.props;

		let scopedClasses = boundClassNames('~', {
			'has-badge': badge,
		});
		// kind.charAt(0).toUpperCase() + kind.slice(1);

		return (
			<svg {...passThroughs}
				className={classNames(className, scopedClasses)}
				height={size} width={size}
				viewBox={viewBox || [0, 0, size, size].join(' ')}
				preserveAspectRatio={aspectRatio}>
				{children}
			</svg>
		);
	}
});

export default Icon;
