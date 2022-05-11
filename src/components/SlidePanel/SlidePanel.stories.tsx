import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';

import SlidePanel, { ISlidePanelSlideProps } from './SlidePanel';
import Button from '../Button/Button';
import AnalyzeDataIcon from '../Icon/AnalyzeDataIcon/AnalyzeDataIcon';
import CalendarIcon from '../Icon/CalendarIcon/CalendarIcon';
import DuplicateIcon from '../Icon/DuplicateIcon/DuplicateIcon';
import EditIcon from '../Icon/EditIcon/EditIcon';
import FileIcon from '../Icon/FileIcon/FileIcon';
import ImageIcon from '../Icon/ImageIcon/ImageIcon';
import SettingsIcon from '../Icon/SettingsIcon/SettingsIcon';

export default {
	title: 'Private/SlidePanel',
	component: SlidePanel,
	parameters: {
		docs: {
			description: {
				component: SlidePanel.peek.description,
			},
		},
	},
	args: SlidePanel.defaultProps,
} as Meta;

/* Looped Slides */
export const LoopedSlides: Story<ISlidePanelSlideProps> = (args) => {
	const Slide = SlidePanel.Slide;

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
			Current offset: {offset}
			<SlidePanel
				{...args}
				slidesToShow={2}
				offset={offset}
				onSwipe={handleSwipe}
				isLooped={true}
			>
				<Slide>
					<AnalyzeDataIcon
						style={{
							width: '100%',
							height: '30vh',
							background: 'whitesmoke',
						}}
					/>
				</Slide>
				<Slide>
					<CalendarIcon style={{ width: '100%', height: '30vh' }} />
				</Slide>
				<Slide>
					<DuplicateIcon
						style={{
							width: '100%',
							height: '30vh',
							background: 'whitesmoke',
						}}
					/>
				</Slide>
				<Slide>
					<EditIcon style={{ width: '100%', height: '30vh' }} />
				</Slide>
				<Slide>
					<FileIcon
						style={{
							width: '100%',
							height: '30vh',
							background: 'whitesmoke',
						}}
					/>
				</Slide>
				<Slide>
					<ImageIcon
						style={{
							width: '100%',
							height: '30vh',
							background: 'whitesmoke',
						}}
					/>
				</Slide>
				<Slide>
					<SettingsIcon style={{ width: '100%', height: '30vh' }} />
				</Slide>
			</SlidePanel>
		</section>
	);
};
