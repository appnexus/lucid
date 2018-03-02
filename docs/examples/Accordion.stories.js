import { storiesOf } from '@storybook/react';
import { exampleStory } from '../../.storybook/lucid-docs-addon';

import Accordion from '../../src/components/Accordion/Accordion';
import OnSelectExample from './Accordion/onSelect';
import onSelectCode from '!!raw-loader!./Accordion/onSelect';

storiesOf('Accordion', module).add(
	'using onSelect',
	exampleStory({
		component: Accordion,
		example: OnSelectExample,
		code: onSelectCode,
		path: ['Accordion'],
		options: { showAddonPanel: true },
	})
);

/*
 * This is the same as calling the `exampleStory` function above:

import { withDescription, withProps, withCode } from '../../.storybook/lucid-docs-addon';

storiesOf('Accordion', module)
	.add('using onSelect',
		withDescription(Accordion)(
			withProps(Accordion)(
				withCode(onSelectCode)(
					OnSelectExample
				)
			)
		)
	);

*/
