import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router';

import { lucidClassNames } from '../../util/style-helpers';
import * as components from '../../index';

const { object } = React.PropTypes;

const { Button, Expander } = components;
const icons = _.chain(components)
	.reduce((acc, val, key) => (
		acc.concat(_.endsWith(key, 'Icon') && key !== 'Icon' ? [[key, val]] : [])
	), [])
	.filter(([, Icon]) => !Icon._lucidIsPrivate)
	.sortBy(([name]) => name)
	.value();

const cx = lucidClassNames.bind('Icons');

const Icons = React.createClass({
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
		const {
			showButtons,
		} = this.state;

		return (
			<div className={cx('&')}>
				<h2>Icons</h2>

				<p>A list of all lucid Icons.</p>

				<section>
					<ul className={cx('&-list')}>
						{_.map(icons, ([name, Icon]) => (
							<li className={cx('&-list-item')} key={name}>
								<Link to={{
									pathname: `/components/${name}`,
									query: this.props.location.query,
								}}>
									<Icon className={cx('&-list-icon')} isClickable />
									{name}
								</Link>
							</li>
						))}
					</ul>
				</section>

				<Expander
					Label={`${showButtons ? 'Hide' : 'Show'} Button examples`}
					isExpanded={showButtons}
					onToggle={() => {
						this.setState({ showButtons: !showButtons });
					}}
				>
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
							</div>
						))}
					</section>
				</Expander>

			</div>
		);
	},
});

export default Icons;
