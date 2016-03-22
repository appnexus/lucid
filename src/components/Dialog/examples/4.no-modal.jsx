import _ from 'lodash';
import React from 'react';
import Dialog from '../Dialog';
import Button from '../../Button/Button';

export default React.createClass({
	getInitialState() {
		return {
			isShown: false
		};
	},

	handleShow(isShown) {
		this.setState({
			isShown: isShown
		});
	},

	render() {
		return (
			<div>
				<Button
					onClick={_.partial(this.handleShow, !this.state.isShown)}
				>
					Toggle
				</Button>

				<Dialog
					isModal={false}
					isShown={this.state.isShown}
					onOverlayClick={_.partial(this.handleShow, false)}
					onEscape={_.partial(this.handleShow, false)}
					Header='Header'
					size='small'
				>
					When you aren't using the modal mode, it's a good idea to provide handlers for onEscape and onOverlayClick so the user can exit out easily.
					<Dialog.Footer>
						<Button
							kind='link'
							onClick={_.partial(this.handleShow, false)}
						>
							Cancel
						</Button>
						<Button kind='primary'>Save</Button>
					</Dialog.Footer>
				</Dialog>
			</div>
		)
	}
});
