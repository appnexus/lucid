import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router';

import { lucidClassNames } from '../../util/style-helpers';
import * as components from '../../index';

const { object } = React.PropTypes;

const { Button } = components;
const icons = _.chain(components)
	.reduce((acc, val, key) => (
		acc.concat(_.endsWith(key, 'Icon') && key !== 'Icon' ? [[key, val]] : [])
	), [])
	.sortBy(([name]) => name)
	.value();

const cx = lucidClassNames.bind('Icons');

const Icons = React.createClass({

	propTypes: {
		router: object,
		location: object,
	},

	render() {

		return (
			<div className={cx('&')}>
				<h2>Icons</h2>

				<p>A list of all lucid Icons.</p>

				<section>
					<ul className={cx('&-list')}>
						{_.map(icons, ([name, Icon]) => (
							<li className={cx('&-list-item')} key={name}>
								<Icon className={cx('&-list-icon')} />
								<Link to={{
									pathname: `/components/${name}`,
									query: this.props.location.query,
								}}>
									{name}
								</Link>
							</li>
						))}
					</ul>
				</section>

				<section className={cx('&-buttons')}>
					{_.map(icons, ([name, Icon]) => (
						<div className={cx('&-buttons-section')} key={name}>
							<Button size='short'><Icon /></Button>
							<Button size='small'><Icon /></Button>
							<Button ><Icon /></Button>
							<Button isActive ><Icon /></Button>
							<Button size='large'><Icon /></Button>
							<Button kind='primary' size='short'><Icon /></Button>
							<Button kind='primary' size='small'><Icon /></Button>
							<Button kind='primary' ><Icon /></Button>
							<Button kind='primary' isActive ><Icon /></Button>
							<Button kind='primary' size='large'><Icon /></Button>
							<Button kind='link' size='short'><Icon /></Button>
							<Button kind='link' size='small'><Icon /></Button>
							<Button kind='link' ><Icon /></Button>
							<Button kind='link' size='large'><Icon /></Button>
							<Button kind='success' size='short'><Icon /></Button>
							<Button kind='success' size='small'><Icon /></Button>
							<Button kind='success' ><Icon /></Button>
							<Button kind='success' isActive ><Icon /></Button>
							<Button kind='success' size='large'><Icon /></Button>
							<Button kind='warning' size='short'><Icon /></Button>
							<Button kind='warning' size='small'><Icon /></Button>
							<Button kind='warning' ><Icon /></Button>
							<Button kind='warning' isActive ><Icon /></Button>
							<Button kind='warning' size='large'><Icon /></Button>
							<Button kind='danger' size='short'><Icon /></Button>
							<Button kind='danger' size='small'><Icon /></Button>
							<Button kind='danger' ><Icon /></Button>
							<Button kind='danger' isActive ><Icon /></Button>
							<Button kind='danger' size='large'><Icon /></Button>
							<Button kind='info' size='short'><Icon /></Button>
							<Button kind='info' size='small'><Icon /></Button>
							<Button kind='info' ><Icon /></Button>
							<Button kind='info' isActive ><Icon /></Button>
							<Button kind='info' size='large'><Icon /></Button>
						</div>
					))}
				</section>

			</div>
		);
	},
});

export default Icons;
