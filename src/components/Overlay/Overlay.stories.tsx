import _ from 'lodash';
import React from 'react';
import createClass from 'create-react-class';
import Overlay from './Overlay';
import Button from '../Button/Button';

export default {
	title: 'Utility/Overlay',
	component: Overlay,
	parameters: {
		docs: {
			description: {
				component: (Overlay as any).peek.description,
			},
		},
	},
};

/* Default */
export const Default = () => {
	const Component = createClass({
		getInitialState() {
			return {
				isShown: false,
			};
		},

		handleOpenClose(isShown: any) {
			this.setState({
				isShown: isShown,
			});
		},

		render() {
			return (
				<div>
					<Button
						onClick={_.partial(this.handleOpenClose, !this.state.isShown)}
					>
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

	return <Component />;
};
Default.storyName = 'Default';

/* No Modal */
export const NoModal = () => {
	const Component = createClass({
		getInitialState() {
			return {
				isShown: false,
			};
		},

		handleOpenClose(isShown: any) {
			this.setState({
				isShown: isShown,
			});
		},

		render() {
			return (
				<div>
					<Button
						onClick={_.partial(this.handleOpenClose, !this.state.isShown)}
					>
						Toggle
					</Button>

					<Overlay
						isShown={this.state.isShown}
						isModal={false}
						onEscape={_.partial(this.handleOpenClose, false)}
					>
						<div
							style={{
								backgroundColor: '#eee',
								padding: '100px',
							}}
						>
							User can still interact with the background.
							<Button onClick={_.partial(this.handleOpenClose, false)}>
								Close
							</Button>
						</div>
					</Overlay>
				</div>
			);
		},
	});

	return <Component />;
};
NoModal.storyName = 'NoModal';
