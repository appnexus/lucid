import { storiesOf } from '@storybook/react';
import { exampleStory } from '../../.storybook/lucid-docs-addon';

import ProgressBar from '../../src/components/ProgressBar/ProgressBar';
import WithDefaultsExample from './ProgressBar/WithDefaults';
import withDefaultsCode from '!!raw-loader!./ProgressBar/WithDefaults';
import VariousColorsExample from './ProgressBar/VariousColors';
import variousColorsCode from '!!raw-loader!./ProgressBar/VariousColors';
import WithTitleExample from './ProgressBar/WithTitle';
import withTitleCode from '!!raw-loader!./ProgressBar/WithTitle';

storiesOf('ProgressBar', module)
	.add(
		'default',
		exampleStory({
			component: ProgressBar,
			example: WithDefaultsExample,
			code: withDefaultsCode,
			path: ['ProgressBar'],
			options: { showAddonPanel: true },
		})
	)
	.add(
		'kinds',
		exampleStory({
			component: ProgressBar,
			example: VariousColorsExample,
			code: variousColorsCode,
			path: ['ProgressBar'],
			options: { showAddonPanel: true },
		})
	)
	.add(
		'with title',
		exampleStory({
			component: ProgressBar,
			example: WithTitleExample,
			code: withTitleCode,
			path: ['ProgressBar'],
			options: { showAddonPanel: true },
		})
	);
