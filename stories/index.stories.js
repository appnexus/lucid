import React from 'react';
import { storiesOf } from '@storybook/react';
import '../src/index.less';
import { Transition, TransitionList } from './Transition';

storiesOf('Intro Stories', module)
	.add('Hello, world!', () => (
		<Transition>
			<h1>Story Time with Lucid UI</h1>
			<Transition delay={500}>
				<h3>by Oliver Gupte</h3>
			</Transition>
		</Transition>
	))
	.add('Story time!', () => (
		<Transition>
			<h1>Story time!</h1>
			<Transition delay={500}>
				<h3>This is Storybook!</h3>
			</Transition>
		</Transition>
	))
	.add('What is Storybook?', () => (
		<Transition>
			<h1>What is Storybook?</h1>
			<TransitionList
				items={[
					'component dev environment',
					'organizing variations in UI',
					'components isolated from storybook',
					'supports react, vue, and angular out of box',
				]}
			/>
		</Transition>
	))
	.add('Swiss army knife', () => (
		<Transition>
			<h1>Swiss army knife</h1>
			<TransitionList
				items={[
					[
						'tons of addons ',
						<a
							key="addongallery"
							href="https://storybook.js.org/addons/addon-gallery/"
						>
							Addon Gallery
						</a>,
					],
					'run locally or build to static site',
					'hot module reloading',
					'keyboard shortcuts',
					'testing',
				]}
			/>
		</Transition>
	))
	.add('Testing with Storybook', () => (
		<Transition>
			<h1>Testing with Storybook</h1>
			<TransitionList
				items={[
					'structural testing with jest snapshots (StoryShots)',
					'interaction testing with enzyme',
					'style testing with visual regression tools',
					'manual testing with humans (job sec)',
				]}
			/>
		</Transition>
	));

storiesOf('Dev Stories', module)
	.add('Developing in stories', () => (
		<Transition>
			<h1>Developing in stories</h1>
			<TransitionList items={['iterative', 'shareable', 'organized']} />
		</Transition>
	))
	.add('for example', () => (
		<Transition>
			<h1>For example...</h1>
		</Transition>
	));

//storiesOf('Transition Component', module)
//	.add('single transition', () => (
//		<Transition>
//			<h1>I am in a Transition</h1>
//		</Transition>
//	))
//	.add('nested transitions', () => (
//		<Transition>
//			<h1>I am in a nested Transition</h1>
//			<Transition>
//				<h1>I am in a nested Transition</h1>
//				<Transition>
//					<h1>I am in a nested Transition</h1>
//				</Transition>
//			</Transition>
//		</Transition>
//	))
//	.add('with delay', () => (
//		<Transition delay={1500}>
//			<h1>I am in a delayed Transition</h1>
//		</Transition>
//	))
//	.add('nested delayed transitions', () => (
//		<Transition delay={0}>
//			<h1>I am in a nested Transition</h1>
//			<Transition delay={1000}>
//				<h1>I am in a nested Transition</h1>
//				<Transition delay={2000}>
//					<h1>I am in a nested Transition</h1>
//				</Transition>
//			</Transition>
//		</Transition>
//	));

// TransitionList Component
// basic list
// with delay

storiesOf('Doc Stories', module)
	.add('Dev env vs gallery', () => (
		<Transition>
			<h1>Dev env vs gallery</h1>
			<TransitionList
				items={[
					'Storybook is a dev tool first',
					'simple docs and examples',
					'docs in storybook have limitations',
					'addons can help',
				]}
			/>
		</Transition>
	))
	.add('Case study', () => (
		<Transition>
			<h1>Lucid Docs!</h1>
			<a href="https://appnexus.github.io/lucid/">
				https://appnexus.github.io/lucid/
			</a>
		</Transition>
	));

storiesOf('End Story', module)
	.add('Thanks!', () => (
		<Transition>
			<h1>Thanks!</h1>
			<p>
				<a href="http://docspot.devnxs.net/projects/lucid/storybookshelf/">
					http://docspot.devnxs.net/projects/lucid/storybookshelf/
				</a>
			</p>
			<h3>Questions?</h3>
		</Transition>
	))
	.add('Last page', () => (
		<Transition>
			<h1>&lt;your story here&gt;</h1>
			<p>git clone git@github.com:appnexus/lucid.git</p>
			<p>cd lucid</p>
			<p>yarn</p>
			<p>npm run storybook</p>
			<p>write your own stories in stories/index.stories.js</p>
		</Transition>
	));
