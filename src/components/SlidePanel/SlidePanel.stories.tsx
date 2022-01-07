import React from 'react';
import createClass from 'create-react-class';
import SlidePanel from './SlidePanel';
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
				component: (SlidePanel as any).peek.description,
			},
		},
	},
};

/* Looped Slides */
export const LoopedSlides = () => {
	const Slide = SlidePanel.Slide;

	const Component = createClass({
		getInitialState() {
			return {
				offset: 0,
			};
		},

		handlePrev() {
			this.setState({
				offset: this.state.offset - 1,
			});
		},

		handleNext() {
			this.setState({
				offset: this.state.offset + 1,
			});
		},

		handleSwipe(slidesSwiped: any) {
			this.setState({
				offset: this.state.offset + slidesSwiped,
			});
		},

		render() {
			return (
				<section>
					<Button onClick={this.handlePrev}>Backward</Button>
					<Button onClick={this.handleNext}>Forward</Button>
					Current offset: {this.state.offset}
					<SlidePanel
						slidesToShow={2}
						offset={this.state.offset}
						onSwipe={this.handleSwipe}
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
		},
	});

	return <Component />;
};
LoopedSlides.storyName = 'LoopedSlides';
