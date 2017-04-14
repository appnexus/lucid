import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Overlay from '../Overlay/Overlay';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, getFirst, omitProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Dialog');

const { node, oneOf } = PropTypes;

const SMALL = 'small';
const MEDIUM = 'medium';
const LARGE = 'large';

/**
 * {"categories": ["layout"], "extend": "Overlay", "madeFrom": ["Portal", "Overlay"]}
 *
 * Dialog is used to pop open a window so the user doesn't lose the context of
 * the page behind it. Extra props are spread through to the underlying `Overlay`
 */
const Dialog = createClass({
	displayName: 'Dialog',

	components: {
		/**
		 * Renders a `<header>`.
		 */
		Header: createClass({
			displayName: 'Dialog.Header',
			propName: 'Header',
		}),
		/**
		 * Renders a `<footer>`.
		 */
		Footer: createClass({
			displayName: 'Dialog.Footer',
			propName: 'Footer',
		}),
	},

	propTypes: {
		...Overlay.propTypes,

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
		const { className, size, isShown, ...passThroughs } = this.props;

		const headerChildProp = _.get(
			getFirst(this.props, Dialog.Header),
			'props',
			{}
		);
		const footerChildProp = _.get(
			getFirst(this.props, Dialog.Footer),
			'props',
			null
		);

		return (
			<Overlay
				{...omitProps(passThroughs, Dialog, [], false)}
				{..._.pick(passThroughs, _.keys(Overlay.propTypes))}
				isShown={isShown}
				className={cx('&', className)}
			>
				<div
					className={cx('&-window', {
						'&-window-is-small': size === SMALL,
						'&-window-is-medium': size === MEDIUM,
						'&-window-is-large': size === LARGE,
					})}
				>
					<header {...headerChildProp} className={cx('&-header')} />

					<section className={cx('&-body')}>
						{this.props.children}
					</section>

					{footerChildProp &&
						<footer {...footerChildProp} className={cx('&-footer')} />}
				</div>
			</Overlay>
		);
	},
});

export default Dialog;
