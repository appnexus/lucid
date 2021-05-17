import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

const lucidTheme = create({
	base: 'light',

	brandTitle: 'Lucid UI',
	brandUrl: 'https://github.com/appnexus/lucid',
	brandImage: 'logo.svg',

	appBg: 'white',
	appContentBg: 'white',
});

addons.setConfig({
	theme: lucidTheme,
	isToolshown: true,
	sidebar: {
		showRoots: true,
	},
});
