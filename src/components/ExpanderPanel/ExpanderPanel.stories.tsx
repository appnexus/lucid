import _ from 'lodash';
import React from 'react';
import createClass from 'create-react-class';
import ExpanderPanel from './ExpanderPanel';

export default {
	title: 'Layout/ExpanderPanel',
	component: ExpanderPanel,
	parameters: {
		docs: {
			description: {
				component: (ExpanderPanel as any).peek.description,
			},
		},
	},
};

/* Basic */
export const Basic = () => {
	const Component = createClass({
		render() {
			return (
				<div>
					<ExpanderPanel>
						<ExpanderPanel.Header>Show More</ExpanderPanel.Header>
						{_.times(100, (n) => (
							<div key={n}>{_.repeat('-', 75 * Math.sin(n / 5))}</div>
						))}
					</ExpanderPanel>
				</div>
			);
		},
	});

	return <Component />;
};

/* No Padding */
export const NoPadding = () => {
	const Component = createClass({
		render() {
			return (
				<div>
					<ExpanderPanel hasPadding={false}>
						<ExpanderPanel.Header>Show More</ExpanderPanel.Header>
						{_.times(100, (n) => (
							<div key={n}>{_.repeat('-', 75 * Math.sin(n / 5))}</div>
						))}
					</ExpanderPanel>
				</div>
			);
		},
	});

	return <Component />;
};
NoPadding.storyName = 'NoPadding';

/* Basic With On Rest Callback */
export const BasicWithOnRestCallback = () => {
	const onRest = () => {
		alert('A big ball of wibbly wobbly, timey wimey stuff');
	};

	const Component = createClass({
		render() {
			return (
				<div>
					<ExpanderPanel onRest={onRest}>
						<ExpanderPanel.Header>Show More</ExpanderPanel.Header>
						{_.times(100, (n) => (
							<div key={n}>{_.repeat('-', 75 * Math.sin(n / 5))}</div>
						))}
					</ExpanderPanel>
				</div>
			);
		},
	});

	return <Component />;
};
BasicWithOnRestCallback.storyName = 'BasicWithOnRestCallback';
