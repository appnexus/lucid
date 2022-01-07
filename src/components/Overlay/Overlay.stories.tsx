import _ from 'lodash';
import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';

import { IOverlayProps } from './Overlay';
import Overlay from './Overlay';
import Button from '../Button/Button';

export default {
	title: 'Utility/Overlay',
	component: Overlay,
	parameters: {
		docs: {
			description: {
				component: Overlay.peek.description,
			},
		},
	},
} as Meta;

/* BASIC */
export const Basic: Story<IOverlayProps> = (args) => {
	const [isShown, setIsShown] = useState(false);

	const handleOpenClose = (isShown: any) => {
		setIsShown(isShown);
	};

	return (
		<div>
			<Button onClick={_.partial(handleOpenClose, !isShown)}>Toggle</Button>

			<Overlay
				{...args}
				isShown={isShown}
				onEscape={_.partial(handleOpenClose, false)}
				onBackgroundClick={_.partial(handleOpenClose, false)}
			>
				<div style={{ color: '#fff' }}>
					User cannot interact with the background (except scrolling).
				</div>
			</Overlay>
		</div>
	);
};

/* No Modal */
export const NoModal: Story<IOverlayProps> = (args) => {
	const [isShown, setIsShown] = useState(false);

	const handleOpenClose = (isShown: any) => {
		setIsShown(isShown);
	};

	return (
		<div>
			<Button onClick={_.partial(handleOpenClose, !isShown)}>Toggle</Button>

			<Overlay
				{...args}
				isShown={isShown}
				isModal={false}
				onEscape={_.partial(handleOpenClose, false)}
			>
				<div
					style={{
						backgroundColor: '#eee',
						padding: '100px',
					}}
				>
					User can still interact with the background.
					<Button
						onClick={_.partial(handleOpenClose, false)}
						style={{ marginLeft: '10px' }}
					>
						Close
					</Button>
				</div>
			</Overlay>
		</div>
	);
};
