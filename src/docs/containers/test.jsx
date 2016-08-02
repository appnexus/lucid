import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';

const reqExamples = require.context('../../components/', true, /examples.*\.jsx?/i);

const { object } = React.PropTypes;
const cx = lucidClassNames.bind('Test');

const examples = _.map(reqExamples.keys(), path => reqExamples(path).default);

const All = React.createClass({
	getInitialState() {
		return {
			showButtons: false,
		};
	},

	propTypes: {
		router: object,
		location: object,
	},

	render() {

		return (
			<div className={cx('&')}>
				<h2>Test Page</h2>

				<p>A test page for functional testing.</p>

				{_.map(examples, (Example, i) => (
					<section key={i}>
						<Example />
					</section>
				))}

			</div>
		);
	},
});

export default All;
