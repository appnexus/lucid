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

		hasLabel: bool`
			Displays ther percent complete within the ProgressBar.
		`,
	},

	getDefaultProps() {
		return {
			kind: 'default',
			percentComplete: 50,
			children: '\u00A0',
			hasLabel: false,
		};
	},

	render() {
		const { kind, percentComplete, children, hasLabel } = this.props;

		return (
			<div className={cx('&')}>
				<div
					className={percentComplete > 0 ? cx(`&-${kind}`) : null}
					style={{ width: `${percentComplete}%` }}
				>
					{hasLabel ? `${percentComplete}%` : null}
					{children}
				</div>
			</div>
		);
	},
});

export default ProgressBar;
