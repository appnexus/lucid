import _ from 'lodash';
import React from 'react';
import Overlay from '../Overlay/Overlay';
import { lucidClassNames } from '../../util/style-helpers';
import { createLucidComponentDefinition }  from '../../util/component-definition';

const boundClassNames = lucidClassNames.bind('&-Dialog');

const {
	node,
	oneOf,
} = React.PropTypes;

/**
 * {"categories": ["layout"], "extend": "Overlay", "madeFrom": ["Portal", "Overlay"]}
 *
 * Dialog is used to pop open a window so the user doesn't lose the context of
 * the page behind it. Extra props are spread through to the underlying `Overlay`
 */
const Dialog = React.createClass(createLucidComponentDefinition({
	displayName: 'Dialog',

	childProps: {
		Header: null,
		Footer: null,
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
		Footer: node
	},

	getDefaultProps() {
		return {
			size: 'medium',
		};
	},

	render() {
		const {
			className,
			size,
			...passThroughs
		} = this.props;

		const headerChildProp = _.first(Dialog.Header.findInAllAsProps(this.props));
		const footerChildProp = _.first(Dialog.Footer.findInAllAsProps(this.props));

		return (
			<Overlay
				{...passThroughs}
				className={boundClassNames('&', className)}
			>
				<div
					className={boundClassNames('&-window', {
						'&-window-is-small': size === 'small',
						'&-window-is-medium': size === 'medium',
						'&-window-is-large': size === 'large',
					})}
				>
					<header
						{...headerChildProp}
						className={boundClassNames('&-header')}
					/>

					<section className={boundClassNames('&-body')}>
						{this.props.children}
					</section>

					<footer
						{...footerChildProp}
						className={boundClassNames('&-footer')}
					/>
				</div>
			</Overlay>
		);
	},
}));

export default Dialog;

