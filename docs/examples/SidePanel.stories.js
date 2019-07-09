import { storiesOf } from '@storybook/react';
import { exampleStory } from '../../.storybook/lucid-docs-addon';

import SidePanel from '../../src/components/SidePanel/SidePanel';
import WithDefaultsExample from './SidePanel/WithDefaults';
import withDefaultsCode from '!!raw-loader!./SidePanel/WithDefaults';
import WithHeaderExample from './SidePanel/WithHeader';
import withHeaderCode from '!!raw-loader!./SidePanel/WithHeader';
import WithLeftPositionExample from './SidePanel/WithLeftPosition';
import withLeftPositionCode from '!!raw-loader!./SidePanel/WithLeftPosition';
import WithResizeExample from './SidePanel/WithResize';
import withResizeCode from '!!raw-loader!./SidePanel/WithResize';
import WithoutResizeExample from './SidePanel/WithoutResize';
import withoutResizeCode from '!!raw-loader!./SidePanel/WithoutResize';
import WithTopMarginExample from './SidePanel/WithTopMargin';
import withTopMarginCode from '!!raw-loader!./SidePanel/WithTopMargin';
import WithoutAnimationExample from './SidePanel/WithoutAnimation';
import witouthAnimationCode from '!!raw-loader!./SidePanel/WithoutAnimation';
import NoModalExample from './SidePanel/NoModal';
import noModalCode from '!!raw-loader!./SidePanel/NoModal';

storiesOf('SidePanel', module)
	.add(
		'with defaults',
		exampleStory({
			component: SidePanel,
			example: WithDefaultsExample,
			code: withDefaultsCode,
			path: ['SidePanel'],
		})
	)
	.add(
		'with header & close button',
		exampleStory({
			component: SidePanel,
			example: WithHeaderExample,
			code: withHeaderCode,
			path: ['SidePanel'],
		})
	)
	.add(
		'with left position',
		exampleStory({
			component: SidePanel,
			example: WithLeftPositionExample,
			code: withLeftPositionCode,
			path: ['SidePanel'],
		})
	)
	.add(
		'with resizing',
		exampleStory({
			component: SidePanel,
			example: WithResizeExample,
			code: withResizeCode,
			path: ['SidePanel'],
		})
	)
	.add(
		'without resizing',
		exampleStory({
			component: SidePanel,
			example: WithoutResizeExample,
			code: withoutResizeCode,
			path: ['SidePanel'],
		})
	)
	.add(
		'with top margin',
		exampleStory({
			component: SidePanel,
			example: WithTopMarginExample,
			code: withTopMarginCode,
			path: ['SidePanel'],
		})
	)
	.add(
		'without animation',
		exampleStory({
			component: SidePanel,
			example: WithoutAnimationExample,
			code: witouthAnimationCode,
			path: ['SidePanel'],
		})
	)
	.add(
		'no modal',
		exampleStory({
			component: SidePanel,
			example: NoModalExample,
			code: noModalCode,
			path: ['SidePanel'],
		})
	);
