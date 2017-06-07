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

				<Dialog isShown={this.state.isShown} Header="Header" size="small">
					<div key={'info'}>
						For better UX, we recommend NOT handling onEscape and
						onBackgroundClick when isModal is true. The term "modal" implies that
						the user needs to interact with one of the buttons in the footer to
						exit the dialog.
					</div>
					{_.times(10).map(i => {
						return <div key={i}>Body</div>;
					})}
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
