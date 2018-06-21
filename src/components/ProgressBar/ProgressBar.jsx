import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers.js';
import { createClass } from '../../util/component-types.js';

const cx = lucidClassNames.bind('&-ProgressBar');

const { number, string, oneOf, any, bool } = PropTypes;

const ProgressBar = createClass({
	displayName: 'Progress Bar',

	statics: {
		peek: {
			description: `
				A Progress Bar component is used to indicate progress in a procedure 
				consisting of numerous discrete steps or continuous operation.
			`,

			categories: ['communication'],
		},
	},

	propTypes: {
		className: string`
			Appended to the component-specific class names set on the root element.
		`,

		kind: oneOf(['default', 'success', 'danger', 'info', 'warning'])`
			Applies a color style for the kind of ProgressBar.
		`,

		percentComplete: number`
			Percentage ProgressBar is complete.
		`,

		children: any,

		hasTitle: bool`
			Whether or not a title is displayed above the ProgressBar.
		`,

		title: string`
			The title text that is displayed above ProgressBar.
		`,
	},

	getDefaultProps() {
		return {
			kind: 'default',
			percentComplete: 100,
			children: '\u00A0',
			title: '',
		};
	},

	render() {
		const { kind, percentComplete, children, title } = this.props;

		return (
			<div className={cx('&-title')}>
				{title}
				<div className={cx('&')}>
					<div
						className={percentComplete > 0 ? cx(`&-${kind}`) : null}
						style={{ width: `${percentComplete}%` }}
					>
						{children}
					</div>
				</div>
			</div>
		);
	},
});

export default ProgressBar;
