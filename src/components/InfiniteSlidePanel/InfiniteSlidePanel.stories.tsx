import React from 'react';
import createClass from 'create-react-class';
import InfiniteSlidePanel from './InfiniteSlidePanel';
import Button from '../Button/Button';

export default {
	title: 'Private/InfiniteSlidePanel',
	component: InfiniteSlidePanel,
	parameters: {
		docs: {
			description: {
				component: (InfiniteSlidePanel as any).peek.description,
			},
		},
	},
};

/* Dynamic Content */
export const DynamicContent = () => {
	const generateRGB = (n: any) => {
		const R = Math.floor((Math.sin(n / Math.PI) + 1) * 128);
		const G = Math.floor((Math.sin((2 * n) / Math.PI) + 1) * 128);
		const B = Math.floor((Math.sin((3 * n) / Math.PI) + 1) * 128);
		return `rgb(${R},${G},${B})`;
	};

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
					<InfiniteSlidePanel
						totalSlides={12}
						slidesToShow={3}
						offset={this.state.offset}
						onSwipe={this.handleSwipe}
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
		},
	});

	return <Component />;
};
DynamicContent.storyName = 'DynamicContent';
