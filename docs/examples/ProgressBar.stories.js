import { storiesOf } from '@storybook/react';
import { exampleStory } from '../../.storybook/lucid-docs-addon';

import ProgressBar from '../../src/components/ProgressBar/ProgressBar';
import WithDefaultsExample from './ProgressBar/WithDefaults';
import withDefaultsCode from '!!raw-loader!./ProgressBar/WithDefaults';
import VariousColorsExample from './ProgressBar/VariousColors';
import variousColorsCode from '!!raw-loader!./ProgressBar/VariousColors';

storiesOf('ProgressBar', module)
	.add(
		'defaults',
		exampleStory({
			component: ProgressBar,
			example: WithDefaultsExample,
			code: withDefaultsCode,
			path: ['ProgressBar'],
			options: { showAddonPanel: true },
		})
	)
	.add(
		'various colors',
		exampleStory({
			component: ProgressBar,
			example: VariousColorsExample,
			code: variousColorsCode,
			path: ['ProgressBar'],
			options: { showAddonPanel: true },
		})
	);
