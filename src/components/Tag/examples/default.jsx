import React from 'react';

import Tag from '../Tag';

export default React.createClass({
	render() {
		return (
			<section>
				<section>
					<Tag>awesome</Tag>
					<Tag>excellent</Tag>
					<Tag>gnarly</Tag>
				</section>
				<section>
					<Tag isCloseable={true}>rad</Tag>
					<Tag isCloseable={true}>tubular</Tag>
				</section>
				<section>
					<Tag isCloseable={true}>
						magnificent
						<Tag isCloseable={true}>
							stupendous
							<Tag isCloseable={true}>
								amazing
								<Tag isCloseable={true}>incredible</Tag>
							</Tag>
						</Tag>
					</Tag>
				</section>
			</section>
		);
	}
});
