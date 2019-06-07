import React from 'react';
import createClass from 'create-react-class';
import { Paginator } from '../../../index';

export default createClass({
	render() {
		return (
			<div>
				<p>A paginator displaying a total count of objects.</p>

				<section>
					<Paginator
						hasPageSizeSelector
						showTotalObjects
						totalCount={101}
						SingleSelect={{
							DropMenu: { direction: 'up' },
						}}
					/>

					<p>
						Total count is hidden if <code>totalCount</code> is not a valid
						number
					</p>

					<Paginator
						hasPageSizeSelector
						showTotalObjects
						SingleSelect={{
							DropMenu: { direction: 'up' },
						}}
					/>
				</section>

				<p>
					The label can be changed using <code>objectLabel</code> and{' '}
					<code>objectLabelPlural</code>
				</p>
				<section>
					<Paginator
						hasPageSizeSelector
						showTotalObjects
						totalCount={1}
						objectLabel='singular object'
					/>
					<Paginator
						hasPageSizeSelector
						showTotalObjects
						totalCount={2}
						objectLabelPlural='is more than one'
					/>
				</section>
			</div>
		);
	},
});
