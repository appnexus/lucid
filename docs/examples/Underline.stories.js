import { storiesOf } from '@storybook/react';
import { exampleStory } from '../../.storybook/lucid-docs-addon';

import Underline from '../../src/components/Underline/Underline';
import WithDefaultsExample from './Underline/WithDefaults';
import withDefaultsCode from '!!raw-loader!./Underline/WithDefaults';
import WithStringMatchExample from './Underline/WithStringMatch';
import withStringMatchCode from '!!raw-loader!./Underline/WithStringMatch';
import WithRegexMatchExample from './Underline/WithRegexMatch';
import withRegexMatchCode from '!!raw-loader!./Underline/WithRegexMatch';

storiesOf('Underline', module)
	.add(
		'with defaults',
		exampleStory({
			component: Underline,
			example: WithDefaultsExample,
			code: withDefaultsCode,
			path: ['Underline'],
			options: { showAddonPanel: true },
		})
	)
	.add(
		'with string match',
		exampleStory({
			component: Underline,
			example: WithStringMatchExample,
			code: withStringMatchCode,
			path: ['Underline'],
			options: { showAddonPanel: true },
		})
	)
	.add(
		'with regex match',
		exampleStory({
			component: Underline,
			example: WithRegexMatchExample,
			code: withRegexMatchCode,
			path: ['Underline'],
			options: { showAddonPanel: true },
		})
	);
