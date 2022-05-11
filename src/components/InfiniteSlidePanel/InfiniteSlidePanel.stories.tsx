import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';

import InfiniteSlidePanel, {
	IInfiniteSlidePanelSlideProps,
} from './InfiniteSlidePanel';
import Button from '../Button/Button';

export default {
	title: 'Private/InfiniteSlidePanel',
	component: InfiniteSlidePanel,
	parameters: {
		docs: {
			description: {
				component: InfiniteSlidePanel.peek.description,
			},
		},
	},
	args: InfiniteSlidePanel.defaultProps,
} as Meta;

/* Dynamic Content */
export const DynamicContent: Story = (args: IInfiniteSlidePanelSlideProps) => {
	const generateRGB = (n: any) => {
		const R = Math.floor((Math.sin(n / Math.PI) + 1) * 128);
		const G = Math.floor((Math.sin((2 * n) / Math.PI) + 1) * 128);
		const B = Math.floor((Math.sin((3 * n) / Math.PI) + 1) * 128);
		return `rgb(${R},${G},${B})`;
	};

	const [offset, setOffset] = useState(0);

	const handlePrev = () => {
		setOffset(offset - 1);
	};

	const handleNext = () => {
		setOffset(offset + 1);
	};

	const handleSwipe = (slidesSwiped: any) => {
		setOffset(offset + slidesSwiped);
	};

	return (
		<section>
			<Button onClick={handlePrev}>Backward</Button>
			<Button onClick={handleNext}>Forward</Button>
			<span style={{ marginLeft: 10 }}>Current offset: {offset}</span>
			<InfiniteSlidePanel
				{...args}
				totalSlides={12}
				slidesToShow={3}
				offset={offset}
				onSwipe={handleSwipe}
			>
				{(slideOffset) => (
					<div
						style={{
							width: '100%',
							height: '30vh',
							background: generateRGB(slideOffset),
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						{slideOffset}
					</div>
				)}
			</InfiniteSlidePanel>
		</section>
	);
};
