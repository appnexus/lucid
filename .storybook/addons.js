import '@storybook/addon-options/register';
import '@storybook/addon-links/register';

if (process.env.NODE_ENV === 'documentation') {
	require('./lucid-docs-addon/register');
}
