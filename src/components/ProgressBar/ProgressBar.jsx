import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers.js';
import { createClass } from '../../util/component-types.js';

const cx = lucidClassNames.bind('&-ProgressBar');

const { number, string, oneOf, any } = PropTypes;

const style = {
	root: {
		display: 'flex',
		margin: '8px 0',
		border: '1px solid #f4f4f4',
	},
};

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

		// not sure what this is or what it does?
		children: any,
	},

	getDefaultProps() {
		return {
			kind: 'default',
			percentComplete: 50,
			children: '\u00A0',
		};
	},

	render() {
		const { kind, percentComplete, children } = this.props;

		return (
			<div className={cx('&')}>
				<div
					className={cx(`&-${kind}`)}
					style={{
						width: `${percentComplete}%`,
					}}
				>
					{children}
				</div>
			</div>
		);
	},
});

export default ProgressBar;
