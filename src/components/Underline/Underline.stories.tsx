import React from 'react';
import { Underline } from './../../index';

export default {
	title: 'Controls/Underline',
	component: Underline,
	parameters: {
		docs: {
			description: {
				component: (Underline as any).peek.description,
			},
		},
	},
};

/* With Defaults */
export const WithDefaults = () => {
	return <Underline>foo bar baz</Underline>;
};
WithDefaults.storyName = 'WithDefaults';

/* With Regex Match */
export const WithRegexMatch = () => {
	return <Underline match={/foo?/i}>foo bar baz</Underline>;
};
WithRegexMatch.storyName = 'WithRegexMatch';

/* With String Match */
export const WithStringMatch = () => {
	return <Underline match='bar'>foo bar baz</Underline>;
};
WithStringMatch.storyName = 'WithStringMatch';
