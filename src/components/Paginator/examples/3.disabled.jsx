import React from 'react';
import createReactClass from 'create-react-class';
import { Paginator } from '../../../index';

export default createReactClass({
	render() {
		return (
			<div>
				<section style={{ marginBottom: '30px' }}>
					<Paginator isDisabled totalCount={1} />
				</section>
				<section>
					<Paginator
						isDisabled
						hasPageSizeSelector
						totalCount={100}
						SingleSelect={{
							DropMenu: { direction: 'up' },
						}}
					/>
				</section>
			</div>
		);
	},
});
