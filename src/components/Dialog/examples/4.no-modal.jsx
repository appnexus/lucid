import _ from 'lodash';
import React from 'react';
import createClass from 'create-react-class';
import { Button, Dialog } from '../../../index';

export default createClass({
	getInitialState() {
		return {
			isShown: false,
		};
	},

	handleShow(isShown) {
		this.setState({ isShown });
	},

	render() {
		return (
			<div>
				<Button onClick={_.partial(this.handleShow, !this.state.isShown)}>
					Toggle
				</Button>

				<Dialog
					isModal={false}
					isShown={this.state.isShown}
					onBackgroundClick={_.partial(this.handleShow, false)}
					onEscape={_.partial(this.handleShow, false)}
					Header="Header"
					size="small"
				>

					In most cases, you'll probably just use an isModal Dialog, but this
					example shows that the Dialog doesn't have to be a modal. Try
					pressing "escape" to close this Dialog.

					<Dialog.Footer>
						<Button kind="link" onClick={_.partial(this.handleShow, false)}>
							Cancel
						</Button>
						<Button kind="primary">Save</Button>
					</Dialog.Footer>

				</Dialog>
			</div>
		);
	},
});
