import React from 'react';
import { storiesOf } from '@storybook/react';
import '../src/index.less';
import Button from '../src/components/Button/Button';

storiesOf('Intro Stories', module)
	.add('Hello, world!', () => (
		<section>
			<h1>Story Time with Lucid UI</h1>
			<h3>by Oliver Gupte</h3>
		</section>
	))
	.add('Story time!', () => (
		<section>
			<h1>Story time!</h1>
			<h3>This is Storybook!</h3>
		</section>
	))
	.add('What is Storybook?', () => (
		<section>
			<h1>What is Storybook?</h1>
			<ul>
				<li>component dev environment</li>
				<li>organizing variations in UI</li>
				<li>components isolated from storybook</li>
				<li>supports react, vue, and angular out of box</li>
			</ul>
		</section>
	))
	.add('Swiss army knife', () => (
		<section>
			<h1>Swiss army knife</h1>
			<ul>
				<li>
					tons of addons{' '}
					<a href="https://storybook.js.org/addons/addon-gallery/">
						Addon Gallery
					</a>
				</li>
				<li>run locally or build to static site</li>
				<li>hot module reloading</li>
				<li>keyboard shortcuts</li>
				<li>testing</li>
			</ul>
		</section>
	))
	.add('Testing with Storybook', () => (
		<section>
			<h1>Testing with Storybook</h1>
			<ul>
				<li>structural testing with jest snapshots (StoryShots)</li>
				<li>interaction testing with enzyme</li>
				<li>style testing with visual regression tools</li>
				<li>manual testing with humans (job sec)</li>
			</ul>
		</section>
	));

storiesOf('Dev Stories', module)
	.add('developing in stories', () => <Button>Hello Button</Button>)
	.add('for example', () => <Button>Hello Button</Button>);

//storiesOf('Button', module)
//	.add('with text', () => <Button>Hello Button</Button>)
//	.add('with some emoji', () => <Button>😀 😎 👍 💯</Button>);

storiesOf('Doc Stories', module)
	.add('Dev env vs gallery', () => <Button>Hello Button</Button>)
	.add('Lucid Docs!', () => (
		<section>
			<a href="http://docspot.devnxs.net/projects/lucid/storybook1/">
				Lucid Docs!
			</a>
		</section>
	));

storiesOf('End Story', module)
	.add('Thanks!', () => (
		<section>
			<h1>Thanks!</h1>
			<p>
				<a href="http://docspot.devnxs.net/projects/lucid/storybookshelf/">
					http://docspot.devnxs.net/projects/lucid/storybookshelf/
				</a>
			</p>
			<h3>Questions?</h3>
		</section>
	))
	.add('Last page', () => (
		<section>
			<h1>&lt;your story here&gt;</h1>
			<p>git clone git@github.com:appnexus/lucid.git</p>
			<p>cd lucid</p>
			<p>yarn</p>
			<p>npm run storybook</p>
			<p>write your own stories in stories/index.stories.js</p>
		</section>
	));
