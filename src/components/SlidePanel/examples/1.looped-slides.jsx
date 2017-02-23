import React from 'react';
import {
	SlidePanel,

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

export default React.createClass({
	getInitialState() {
		return {
			index: 0,
		};
	},

	handlePrev() {
		this.setState({
			index: this.state.index - 1,
		});
	},

	handleNext() {
		this.setState({
			index: this.state.index + 1,
		});
	},

	handleSwipe(slidesSwiped) {
		this.setState({
			index: this.state.index + slidesSwiped,
		});
	},

	render() {
		return (
			<section>
				<Button onClick={this.handlePrev}>Backward</Button>
				<Button onClick={this.handleNext}>Forward</Button>
				Current Index: {this.state.index}

				<SlidePanel slidesToShow={2} index={this.state.index} onSwipe={this.handleSwipe} isLooped={true}>
					<Slide><AnalyzeDataIcon style={{width: '100%', height: '30vh', background: 'whitesmoke'}}/></Slide>
					<Slide><CalendarIcon style={{width: '100%', height: '30vh'}} /></Slide>
					<Slide><DuplicateIcon style={{width: '100%', height: '30vh', background: 'whitesmoke'}} /></Slide>
					<Slide><EditPageIcon style={{width: '100%', height: '30vh'}} /></Slide>
					<Slide><FileIcon style={{width: '100%', height: '30vh', background: 'whitesmoke'}} /></Slide>
					<Slide><FourSquaresIcon style={{width: '100%', height: '30vh'}} /></Slide>
					<Slide><ImageIcon style={{width: '100%', height: '30vh', background: 'whitesmoke'}} /></Slide>
					<Slide><TableGearIcon style={{width: '100%', height: '30vh'}} /></Slide>
				</SlidePanel>
			</section>
		);
	},
});
