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
						totalCount={12321313}
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

				<section>
					<p>
						The label can be changed using <code>objectLabel</code> and{' '}
						<code>objectLabelPlural</code>
					</p>
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

					<p>
						<code>objectLabelPlural</code> will default to appending an "s"
						after <code>objectLabel</code>.
					</p>
					<Paginator
						hasPageSizeSelector
						showTotalObjects
						totalCount={20}
						objectLabel='dog'
					/>
				</section>

				<section>
					<p>
						Pass a custom formatter function as{' '}
						<code>showTotalObjects(count)</code> to format the total count
						number.
					</p>
					<Paginator
						hasPageSizeSelector
						showTotalObjects={count => `--${count}--`}
						totalCount={20}
						objectLabel='object'
						objectLabelPlural='objects'
					/>
				</section>
			</div>
		);
	},
});
