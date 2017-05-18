import React from 'react';
import createClass from 'create-react-class';
import SlidePanel from '../SlidePanel';

import {
	AnalyzeDataIcon,
	Button,
	CalendarIcon,
	DuplicateIcon,
	EditPageIcon,
	FileIcon,
	FourSquaresIcon,
	ImageIcon,
	TableGearIcon,
} from '../../../index';

const Slide = SlidePanel.Slide;

export default createClass({
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

	handleSwipe(slidesSwiped) {
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
						<EditPageIcon style={{ width: '100%', height: '30vh' }} />
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
						<FourSquaresIcon style={{ width: '100%', height: '30vh' }} />
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
						<TableGearIcon style={{ width: '100%', height: '30vh' }} />
					</Slide>
				</SlidePanel>
			</section>
		);
	},
});
