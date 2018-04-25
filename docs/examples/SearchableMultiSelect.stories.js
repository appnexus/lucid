import { storiesOf } from '@storybook/react';
import { exampleStory } from '../../.storybook/lucid-docs-addon';

import SearchableMultiSelect from '../../src/components/SearchableMultiSelect/SearchableMultiSelect';
import WithFomattedOptionsExample from './SearchableMultiSelect/WithFormattedOptions';
import withFomattedOptionsExampleCode from '!!raw-loader!./SearchableMultiSelect/WithFormattedOptions';

storiesOf('SearchableMultiSelect', module).add(
	'with formatted options',
	exampleStory({
		component: SearchableMultiSelect,
		example: WithFomattedOptionsExample,
		code: withFomattedOptionsExampleCode,
		path: ['SearchableMultiSelect'],
		options: { showAddonPanel: true },
	})
);
