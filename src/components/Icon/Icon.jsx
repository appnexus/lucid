import React from 'react';
import classNames from 'classnames';
import { bindClassNames } from '../../util/style-helpers';

const boundClassNames = bindClassNames('Icon');

const {
	any,
	string,
	number,
	bool
} = React.PropTypes;

/**
 *
 * {"categories": ["visual design", "icons"]}
 *
 * A basic svg icon. Any props that are not explicitly called out below will be
 * passed through to the native `svg` component.
 */
const Icon = React.createClass({
	propTypes: {
		/**
		 * Classes that are appended to the component defaults. This prop is run
		 * through the `classnames` library.
		 */
		className: any,
		/**
		 * Size variations of the icons. `size` directly effects height and width
		 * but the developer should also be conscious of the relationship with
		 * `viewBox`.
		 */
		size: number,
		/**
		 * `viewBox` is very important for SVGs. You can think of `viewBox` as the
		 * "artboard" for our SVG while `size` is the presented height and width.
		 */
		viewBox: string,
		/**
		 * Any valid SVG aspect ratio.
		 */
		aspectRatio: string,
		/**
		 * Add badge styling.
		 */
		isBadge: bool,
		/**
		 * Any valid React children.
		 */
		children: any
	},

	getDefaultProps() {
		return {
			size: 18,
			aspectRatio: 'xMidYMid meet',
			viewBox: '0 0 18 18',
			isBadge: false
		};
	},

	render() {
		let {
			className,
			children,
			size,
			viewBox,
			aspectRatio,
			isBadge,
			...passThroughs
		} = this.props;

		let scopedClasses = boundClassNames('~', {
			'is-badge': isBadge,
		});

		return (
			<svg
				{...passThroughs}
				className={classNames(className, scopedClasses)}
				width={size}
				height={size}
				viewBox={viewBox}
				preserveAspectRatio={aspectRatio}
			>
				{children}
			</svg>
		);
	}
});

export default Icon;
