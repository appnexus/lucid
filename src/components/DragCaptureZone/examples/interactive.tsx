import _ from 'lodash';
import React from 'react';
import createClass from 'create-react-class';
import { DragCaptureZone } from '../../../index';

export default createClass({
	getInitialState() {
		return {
			events: [],
		};
	},

	render() {
		const { events } = this.state;

		return (
			<section
				style={{
					alignItems: 'center',
					display: 'flex',
				}}
			>
				<DragCaptureZone
					onDrag={this.handleDragged}
					onDragEnd={this.handleDragEnded}
					onDragStart={this.handleDragStarted}
				>
					<div
						style={{
							alignItems: 'center',
							backgroundColor: '#b7b7b7',
							display: 'flex',
							fontFamily: 'Helvetica, sans-serif',
							fontSize: '24px',
							fontWeight: 300,
							height: 300,
							justifyContent: 'center',
							textTransform: 'uppercase',
							width: 400,
						}}
					>
						Go wild!
					</div>
				</DragCaptureZone>
				<div
					style={{
						height: 300,
						marginLeft: 50,
						overflow: 'auto',
						width: 600,
					}}
				>
					{_.reverse(
						_.map(events, ({ coordinates, type }, index) => (
							<div key={index}>
								<div
									style={{
										fontWeight: 'bold',
									}}
								>
									{type}
								</div>
								<div>
									{`dx: ${coordinates.dX}, dy: ${coordinates.dY},
									px: ${coordinates.pageX}, py: ${coordinates.pageY}`}
								</div>
							</div>
						))
					)}
				</div>
			</section>
		);
	},

	handleDragEnded(coordinates) {
		this.setState({
			events: _.concat(this.state.events, {
				type: 'end',
				coordinates,
			}),
		});
	},

	handleDragStarted(coordinates) {
		this.setState({
			events: _.concat(this.state.events, {
				type: 'start',
				coordinates,
			}),
		});
	},

	handleDragged(coordinates) {
		const lastEvent = _.last(this.state.events);
		const alreadyDragging = lastEvent.type === 'start';

		this.setState({
			events: _.concat(
				alreadyDragging ? this.state.events : _.slice(this.state.events, 0, -1),
				{
					type: 'drag',
					coordinates,
				}
			),
		});
	},
});
