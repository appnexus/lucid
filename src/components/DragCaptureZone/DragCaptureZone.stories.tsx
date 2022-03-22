import _, { concat, slice, reverse, map } from 'lodash';
import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';

import DragCaptureZone, { IDragCaptureZoneProps } from './DragCaptureZone';

export default {
	title: 'Utility/DragCaptureZone',
	component: DragCaptureZone,
	parameters: {
		docs: {
			description: {
				component: (DragCaptureZone as any).peek.description,
			},
		},
	},
	args: DragCaptureZone.defaultProps,
	decorators: [
		(Story) => (
			<div style={{ margin: '2em' }}>
				<Story />
			</div>
		),
	],
} as Meta;

/* Interactive */
export const Interactive: Story<IDragCaptureZoneProps> = (args) => {
	const [events, setEvents] = useState<Array<{ type; coordinates }>>([]);

	const handleDragEnded = (coordinates: any) => {
		const newEndEvents = concat(events, { type: 'end', coordinates });
		setEvents([...newEndEvents]);
	};

	const handleDragStarted = (coordinates: any) => {
		const newStartEvents = concat(events, { type: 'start', coordinates });
		setEvents([...newStartEvents]);
	};

	const handleDragged = (coordinates: any) => {
		const lastEvent: any = _.last(events);
		const alreadyDragging = lastEvent.type === 'start';

		const newDraggedEvents = concat(
			alreadyDragging ? events : slice(events, 0, -1),
			{ type: 'drag', coordinates }
		);
		setEvents([...newDraggedEvents]);
	};

	return (
		<section
			style={{
				alignItems: 'center',
				display: 'flex',
			}}
		>
			<DragCaptureZone
				onDrag={handleDragged}
				onDragEnd={handleDragEnded}
				onDragStart={handleDragStarted}
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
				{reverse(
					map(events, ({ type, coordinates }, index) => (
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
};
