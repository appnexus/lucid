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

	handleShow(isShown: any) {
		this.setState({ isShown });
	},

	render() {
		return (
			<div>
				<Button onClick={_.partial(this.handleShow, !this.state.isShown)}>
					Toggle
				</Button>

				<Dialog
					isShown={this.state.isShown}
					handleClose={_.partial(this.handleShow, !this.state.isShown)}
					onBackgroundClick={_.partial(this.handleShow, false)}
					onEscape={_.partial(this.handleShow, false)}
					Header='Header'
					size='medium'
				>
					This `Dialog` has no footer!
				</Dialog>
			</div>
		);
	},
});
