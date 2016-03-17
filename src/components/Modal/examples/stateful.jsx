import _ from 'lodash';
import React from 'react';
import Modal from '../Modal';
import Button from '../../Button/Button';
import { buildStatefulComponent } from '../../../util/state-management';

const StatefulModal = buildStatefulComponent(Modal);

export default React.createClass({
	getInitialState() {
		return {
			isClosed: false
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
				>
					{_.times(50).map(() => {
						return <div>Body</div>
					})}
					<StatefulModal.Footer>
						<Button kind='link'>Cancel</Button>
						<Button kind='primary'>Save</Button>
					</StatefulModal.Footer>
				</StatefulModal>
			</div>
		)
	}
});
