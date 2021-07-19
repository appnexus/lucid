import React from 'react';
import createClass from 'create-react-class';
import { Paginator } from '../../../index';

export default createClass({
	getInitialState() {
		return {
			selectedPageIndex: 0,
		};
	},
	render() {
		return (
			<div>
				<p>A paginator where textField is disabled using textFieldProps.</p>

				<section>
					<Paginator
						hasPageSizeSelector
						showTotalObjects
						totalCount={12321313}
						SingleSelect={{
							DropMenu: { direction: 'up' },
						}}
						TextField={{
							isDisabled: true,
						}}
					/>
				</section>

				<p>
					A paginator where textField is disabled using textFieldProps and is
					passed an index value.
				</p>

				<section>
					<Paginator
						hasPageSizeSelector
						showTotalObjects
						totalCount={12321313}
						SingleSelect={{
							DropMenu: { direction: 'up' },
						}}
						TextField={{
							value: 3,
							isDisabled: true,
						}}
					/>
				</section>

				<p>On submit</p>

				<section>
					<Paginator
						hasPageSizeSelector
						showTotalObjects
						totalCount={12321313}
						SingleSelect={{
							DropMenu: { direction: 'up' },
						}}
						TextField={{
							value: 3,
							isDisabled: true,
						}}
					/>
				</section>

				<p>On blur</p>

				<section>
					<Paginator
						hasPageSizeSelector
						showTotalObjects
						totalCount={12321313}
						SingleSelect={{
							DropMenu: { direction: 'up' },
						}}
						TextField={{
							value: this.state.selectedPageIndex,
							onBlur: (value) => {
								this.setState({ selectedPageIndex: value });
							},
						}}
					/>
				</section>
			</div>
		);
	},
});
