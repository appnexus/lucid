import _ from 'lodash';
import React from 'react';
import { Banner, Button } from '../../../index';

export default React.createClass({
	getInitialState() {
		return { isClosed: false };
	},

	handleChange(isClosed) {
		this.setState({
			isClosed,
		})
	},

	render() {
		return (
			<div>
				<Button onClick={_.partial(this.handleChange, !this.state.isClosed)} >
					Open/Close
				</Button>

				<br />

				<Banner
					isClosed={this.state.isClosed}
					onClose={_.partial(this.handleChange, true)}
				>
					Default
				</Banner>
			</div>
		);
	},
});
