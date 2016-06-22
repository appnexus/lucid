import _ from 'lodash';
import React from 'react';
import {Header, Overlay} from '../../index';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, findTypes }  from '../../util/component-types';


const cx = lucidClassNames.bind('&-Dialog');

const {
	arrayOf,
	node,
	oneOf,
	oneOfType,
	string,
} = React.PropTypes;

const SMALL = 'small';
const MEDIUM = 'medium';
const LARGE = 'large';

/**
 * {"categories": ["layout"], "extend": "Overlay", "madeFrom": ["Header", "Overlay", "Portal"]}
 *
 * Dialog is used to pop open a window so the user doesn't lose the context of
 * the page behind it. Extra props are spread through to the underlying `Overlay`
 */
const Dialog = createClass({
	displayName: 'Dialog',
	components: {
		Header: createClass({
			displayName: 'Dialog.Header',
			propName: 'Header',
		}),
		Footer: createClass({
			displayName: 'Dialog.Footer',
			propName: 'Footer',
		}),
	},

	propTypes: {
		/**
		 * any valid React children
		 */
		children: oneOfType([
			node,
			arrayOf(node),
		]),
		/**
		 * class names that are appended to the defaults
		 */
		className: string,
		/**
		 * Size variations that only affect the width of the dialog. All the sizes
		 * will grow in height until they get too big, at which point they will
		 * scroll inside.
		 */
		size: oneOf(['small', 'medium', 'large']),

		/**
		 * *Child Element* - Header contents. Only one `Header` is used.
		 */
		Header: node,

		/**
		 * *Child Element* - Footer contents. Only one `Footer` is used.
		 */
		Footer: node,
	},

	getDefaultProps() {
		return {
			size: MEDIUM,
		};
	},

	render() {
		const {
			children,
			className,
			size,
			...passThroughs,
		} = this.props;

		const headerChildProp = _.get(_.first(findTypes(this.props, Dialog.Header)), 'props', {});
		const footerChildProp = _.get(_.first(findTypes(this.props, Dialog.Footer)), 'props', {});

		return (
			<Overlay
				{...passThroughs}
				className={cx('&', className)}
			>
				<div
					className={cx('&-window', {
						'&-window-is-small': size === SMALL,
						'&-window-is-medium': size === MEDIUM,
						'&-window-is-large': size === LARGE,
					})}
				>
					<Header
						{...headerChildProp}
						className={cx('&-header')}
						/>
					<section className={cx('&-body')}>
						{children}
					</section>

					<footer
						{...footerChildProp}
						className={cx('&-footer')}
					/>
				</div>
			</Overlay>
		);
	},
});

export default Dialog;
