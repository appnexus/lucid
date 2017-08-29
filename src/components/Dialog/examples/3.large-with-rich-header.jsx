import _ from 'lodash';
import React from 'react';
import createReactClass from 'create-react-class';
import Dialog from '../Dialog';
import Button from '../../Button/Button';

export default createReactClass({
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

				<Dialog isShown={this.state.isShown} size="large">
					<Dialog.Header>
						<i>Rich Header</i>
					</Dialog.Header>
					<div key={'info'}>
						For better UX, we recommend NOT handling onEscape and
						onBackgroundClick when isModal is true. The term "modal" implies that
						the user needs to interact with one of the buttons in the footer to
						exit the dialog.
					</div>
					{_.times(50).map(i => {
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
