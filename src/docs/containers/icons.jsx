import _ from 'lodash';
import React from 'react';

import { lucidClassNames } from '../../util/style-helpers';
import * as components from '../../index';

const { object } = React.PropTypes;

const { Button } = components;
const icons = _.reduce(components, (acc, val, key) =>
	_.assign(acc, _.endsWith(key, 'Icon') && key !== 'Icon'
		? { [key]: val }
		: {}
	), {});

const cx = lucidClassNames.bind('Icons');

const Icons = React.createClass({

	propTypes: {
		router: object,
		location: object,
	},

	render() {

		return (
			<div className={cx('&', 'Component')}>
				<h2>Icons</h2>

				<p>A list of all lucid Icons.</p>

				<section>
					<ul className={cx('&-list')}>
						{_.map(icons, (Icon, name) => (
							<li key={name}>
								<Button
									kind='link'
									onClick={() => this.props.router.push({
										pathname: `/components/${name}`,
										query: this.props.location.query,
									})}
								>
									<Icon /> {name}
								</Button>
							</li>
						))}
					</ul>
				</section>

			</div>
		);
	},
});

export default Icons;
