import _ from 'lodash';
import React from 'react';
import createClass from 'create-react-class';
import { Button, Overlay } from '../../../index';

export default createClass({
	getInitialState() {
		return {
			isShown: false,
		};
	},

	handleOpenClose(isShown) {
		this.setState({
			isShown: isShown,
		});
	},

	render() {
		return (
			<div>
				<Button onClick={_.partial(this.handleOpenClose, !this.state.isShown)}>
					Toggle
				</Button>

				<Overlay
					isShown={this.state.isShown}
					onEscape={_.partial(this.handleOpenClose, false)}
					onBackgroundClick={_.partial(this.handleOpenClose, false)}
				>
					<div style={{ color: '#fff' }}>
						User cannot interact with the background (except scrolling).
					</div>
				</Overlay>
			</div>
		);
	},
});
