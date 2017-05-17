import React from 'react';
import createClass from 'create-react-class';
import { Portal } from '../../../index';

export default createClass({
	getInitialState() {
		return {
			left: 216,
			top: 460,
		};
	},

	handleClick(event) {
		const { height, width } = event.target.getBoundingClientRect();

		this.setState({
			left: event.pageX - width / 2,
			top: event.pageY - height / 2,
		});
	},

	render() {
		const { left, top } = this.state;
		return (
			<Portal
				portalId="example-portal123"
				style={{
					width: 128,
					height: 128,
					backgroundColor: '#2abbb0',
					color: '#fff',
					boxShadow: '0 0 36px rgba(0, 0, 0, 0.5)',
					transition: 'left .5s, top .5s',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					cursor: 'pointer',
					position: 'absolute',
					left: left,
					top: top,
				}}
				onClick={this.handleClick}
			>
				<section
					style={{
						pointerEvents: 'none',
						textAlign: 'center',
					}}
				>
					<p>
						click to move
					</p>
					<p>
						({left}, {top})
					</p>
					<p>
						inspect me
					</p>
				</section>
			</Portal>
		);
	},
});
