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

				<p>A paginator where textField is not disabled using TextField props, but disabled from Paginator props</p>

				<section>
					<Paginator
						isDisabled={true}
						hasPageSizeSelector
						showTotalObjects
						totalCount={12321313}
						SingleSelect={{
							DropMenu: { direction: 'up' },
						}}
						TextField={{
							isDisabled: false,
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
							onSubmit: (value) => {
								this.setState({ selectedPageIndex: value });
							},
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
