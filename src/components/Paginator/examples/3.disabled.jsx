import React from 'react';
import { Paginator } from '../../../index';

export default React.createClass({

	render() {
		return (
			<div>
				<section style={{ marginBottom: '30px' }}>
					<Paginator isDisabled />
				</section>
				<section>
					<Paginator
						isDisabled
						hasPageSizeSelector
						totalPages={10}
						SingleSelect={{
							DropMenu: { direction: 'up' },
						}}
					/>
				</section>
			</div>
		);
	},

});
