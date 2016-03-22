import React from 'react';

import Tag from '../Tag';

export default React.createClass({
	render() {
		return (
			<section>
				<section>
					<Tag>awesome</Tag>
					<Tag>choice</Tag>
					<Tag>gnarly</Tag>
				</section>
				<section>
					<Tag isCloseable={true}>rad</Tag>
					<Tag isCloseable={true}>tubular</Tag>
				</section>
			</section>
		);
	}
});
