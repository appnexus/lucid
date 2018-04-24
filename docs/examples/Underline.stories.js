import { storiesOf } from '@storybook/react';
import { exampleStory } from '../../.storybook/lucid-docs-addon';

import Underline from '../../src/components/Underline/Underline';
import WithDefaultsExample from './Underline/WithDefaults';
import withDefaultsCode from '!!raw-loader!./Underline/WithDefaults';

storiesOf('Underline', module).add(
	'with defaults',
	exampleStory({
		component: Underline,
		example: WithDefaultsExample,
		code: withDefaultsCode,
		path: ['Underline'],
		options: { showAddonPanel: true },
	})
);

/*
 * This is the same as calling the `exampleStory` function above:

import { withDescription, withProps, withCode } from '../../.storybook/lucid-docs-addon';

storiesOf('Underline', module)
	.add('with defaults',
		withDescription(Underline)(
			withProps(Underline)(
				withCode(withDefaultsCode)(
					WithDefaultsExample
				)
			)
		)
	);

*/
