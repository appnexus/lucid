import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import createClass from 'create-react-class';

import { lucidClassNames } from '../../util/style-helpers';
import * as components from '../../index';

const { object } = PropTypes;

const { Button, Expander } = components;
const icons = _.flow(
	x =>
		_.reduce(
			x,
			(acc, val, key) =>
				acc.concat(
					_.endsWith(key, 'Icon') && key !== 'Icon' ? [[key, val]] : []
				),
			[]
		),
	x => _.filter(x, ([, Icon]) => !Icon._lucidIsPrivate),
	x => _.sortBy(x, ([name]) => name)
)(components);

const cx = lucidClassNames.bind('Icons');

const Icons = createClass({
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
		const { showButtons } = this.state;

		return (
			<div className={cx('&')}>
				<h2>Icons</h2>

				<p>A list of all lucid Icons.</p>

				<section>
					<ul className={cx('&-list')}>
						{_.map(icons, ([name, Icon]) => (
							<li className={cx('&-list-item')} key={name}>
								<Link
									to={{
										pathname: `/components/${name}`,
										query: this.props.location.query,
									}}
								>
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
								<Button hasOnlyIcon size="short"><Icon /></Button>
								<Button hasOnlyIcon size="small"><Icon /></Button>
								<Button hasOnlyIcon><Icon /></Button>
								<Button hasOnlyIcon isActive><Icon /></Button>
								<Button hasOnlyIcon size="large"><Icon /></Button>
								<Button hasOnlyIcon kind="primary" size="short">
									<Icon />
								</Button>
								<Button hasOnlyIcon kind="primary" size="small">
									<Icon />
								</Button>
								<Button hasOnlyIcon kind="primary"><Icon /></Button>
								<Button hasOnlyIcon kind="primary" isActive><Icon /></Button>
								<Button hasOnlyIcon kind="primary" size="large">
									<Icon />
								</Button>
							</div>
						))}
					</section>
				</Expander>

			</div>
		);
	},
});

export default Icons;
