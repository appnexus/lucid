import React from 'react';
import { InfiniteSlidePanel, Button } from '../../../index';

const generateRGB = (n) => {
	const R = Math.floor((Math.sin(n/Math.PI) + 1) * 128);
	const G = Math.floor((Math.sin(2*n/Math.PI) + 1) * 128);
	const B = Math.floor((Math.sin(3*n/Math.PI) + 1) * 128);
	return `rgb(${R},${G},${B})`;
};

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

				<InfiniteSlidePanel
					totalSlides={12}
					slidesToShow={3}
					index={this.state.index}
					onSwipe={this.handleSwipe}
				>
					{(slideIndex) => (
						<div style={{
							width: '100%',
							height: '30vh',
							background: generateRGB(slideIndex),
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}>
							{slideIndex}
						</div>
					)}
				</InfiniteSlidePanel>
			</section>
		);
	},
});
