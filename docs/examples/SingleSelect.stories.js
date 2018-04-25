import { storiesOf } from '@storybook/react';
import { exampleStory } from '../../.storybook/lucid-docs-addon';

import SingleSelect from '../../src/components/SingleSelect/SingleSelect';
import WithFomattedOptionsExample from './SingleSelect/WithFormattedOptions';
import withFomattedOptionsExampleCode from '!!raw-loader!./SingleSelect/WithFormattedOptions';

storiesOf('SingleSelect', module).add(
	'with formatted options',
	exampleStory({
		component: SingleSelect,
		example: WithFomattedOptionsExample,
		code: withFomattedOptionsExampleCode,
		path: ['SingleSelect'],
		options: { showAddonPanel: true },
	})
);
