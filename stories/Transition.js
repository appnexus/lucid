import React from 'react';
import { array, number } from 'react-peek/prop-types';

const delayTransform = ref => {
	setTimeout(() => {
		if (ref) {
			ref.style.transform = 'translateX(0px)';
		}
	}, 10);
};

export const Transition = props => (
	<section
		{...props}
		ref={delayTransform}
		style={{
			transition: `transform 500ms ${props.delay || 100}ms`,
			transform: 'translateX(-100%)',
		}}
	/>
);

Transition.propTypes = {
	delay: number,
};

Transition.defaultProps = {
	delay: 100,
};

export const TransitionList = ({ items }) => (
	<div>
		{items.map((item, index) => (
			<Transition key={index} delay={200 * (index + 1)}>
				<ul>
					<li>{item}</li>
				</ul>
			</Transition>
		))}
	</div>
);

TransitionList.propTypes = {
	items: array,
};

TransitionList.defaultProps = {
	items: [],
};
