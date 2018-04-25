import { storiesOf } from '@storybook/react';
import { exampleStory } from '../../.storybook/lucid-docs-addon';

import SearchableSelect from '../../src/components/SearchableSelect/SearchableSelect';
import WithFomattedOptionsExample from './SearchableSelect/WithFormattedOptions';
import withFomattedOptionsExampleCode from '!!raw-loader!./SearchableSelect/WithFormattedOptions';

storiesOf('SearchableSelect', module).add(
	'with formatted options',
	exampleStory({
		component: SearchableSelect,
		example: WithFomattedOptionsExample,
		code: withFomattedOptionsExampleCode,
		path: ['SearchableSelect'],
		options: { showAddonPanel: true },
	})
);
