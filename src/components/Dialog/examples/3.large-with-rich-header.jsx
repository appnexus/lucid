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
					isShown={this.state.isShown}
					size='large'
				>
					<Dialog.Header>
						<i>Rich Header</i>
					</Dialog.Header>
					{_.times(50).map((i) => {
						return <div key={i}>Body</div>
					})}
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
