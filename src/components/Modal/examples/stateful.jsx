import _ from 'lodash';
import React from 'react';
import Modal from '../Modal';
import Button from '../../Button/Button';
import { buildStatefulComponent } from '../../../util/state-management';

const StatefulModal = buildStatefulComponent(Modal);

export default React.createClass({
	getInitialState() {
		return {
			isClosed: true
		};
	},

	handleOpenClose(isClosed) {
		this.setState({
			isClosed: isClosed
		});
	},

	render() {
		return (
			<div>
				<Button
					onClick={_.partial(this.handleOpenClose, !this.state.isClosed)}
				>
					Toggle
				</Button>

				<StatefulModal
					width='300px'
					height='500px'
					isClosed={this.state.isClosed}
					onClose={_.partial(this.handleOpenClose, true)}
					Header='Header'
					Footer='Footer'
				>
					Body content
				</StatefulModal>
			</div>
		)
	}
});
