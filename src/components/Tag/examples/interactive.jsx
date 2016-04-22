import _ from 'lodash';
import React from 'react';

import Tag from '../Tag';

export default React.createClass({
	getInitialState() {
		return {
			dope: true,
			gangsta: true,
			ill: true,
			phat: true,
			real: true,
			sick: true
		};
	},

	render() {
		return (
			<section>
				{_.map(this.state, (value, key) => value === true ? (
					<Tag
							isCloseable={true}
							key={key}
							onClose={_.partial(this.handleClosed, key)}
					>
						{key}
					</Tag>
				) : null)}
			</section>
		);
	},

	handleClosed(key) {
		this.setState({
			[key]: false
		});
	}
});
