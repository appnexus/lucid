import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers.js';
import {
	createClass,
	omitProps,
	getFirst,
} from '../../util/component-types.js';

const cx = lucidClassNames.bind('&-ProgressBar');

const { number, string, oneOf, node } = PropTypes;

const ProgressBar = createClass({
	displayName: 'ProgressBar',

	statics: {
		peek: {
			description: `
				A Progress Bar component is used to indicate progress in a procedure
				consisting of numerous discrete steps or continuous operation.
			`,

			categories: ['communication'],
		},
	},

	propName: 'ProgressBar',

	components: {
		Title: createClass({
			displayName: 'ProgressBar.Title',
			statics: {
				peek: {
					description: `
						Content displayed at the top of the ProgressBar.
					`,
				},
			},
			propName: 'Title',
		}),
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

		children: node,

		Title: node`
			*Child Element* - Title contents. Only one \`Title\` is used.
		`,
	},

	getDefaultProps() {
		return {
			kind: 'default',
			percentComplete: 0,
		};
	},

	render() {
		const { kind, percentComplete, className, ...passThroughs } = this.props;

		const titleChildProp = _.get(
			getFirst(this.props, ProgressBar.Title),
			'props',
			{}
		);

		return (
			<div
				{...omitProps(passThroughs, ProgressBar)}
				className={cx('&', className, {
					'&-default': kind === 'default',
					'&-success': kind === 'success',
					'&-danger': kind === 'danger',
					'&-info': kind === 'info',
					'&-warning': kind === 'warning',
				})}
			>
				<title {...titleChildProp} className={cx('&-title')} />
				<div className={cx('&-bar-container')}>
					<div
						className={cx(`&-bar`, `&-bar-${kind}`, {
							[`&-bar-${kind}-is-pulsed`]: percentComplete < 100,
						})}
					/>
					<div
						className={cx(`&-bar-overlay`)}
						style={{ width: `${100 - percentComplete}%` }}
					/>
				</div>
			</div>
		);
	},
});

export default ProgressBar;
