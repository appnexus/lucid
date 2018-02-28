import React from 'react';
import { storiesOf } from '@storybook/react';
import '../src/index.less';
import Button from '../src/components/Button/Button';
import SingleSelect from '../src/components/SingleSelect/SingleSelect';

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
	.add('Developing in stories', () => (
		<section>
			<h1>Developing in stories</h1>
			<ul>
				<li>iterative</li>
				<li>shareable</li>
				<li>organized</li>
			</ul>
		</section>
	))
	.add('for example', () => (
		<section>
			<h1>For example...</h1>
		</section>
	));

//storiesOf('Button', module)
//	.add('with text', () => <Button>Hello Button</Button>)
//	.add('with some emoji', () => <Button>😀 😎 👍 💯</Button>);

class AddSelect extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedIndex: null,
			addedItems: [],
		};
		this.handleSelect = this.handleSelect.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
	}

	handleSelect(selectedIndex) {
		this.setState({
			selectedIndex,
		});
	}

	handleAdd() {
		const { addedItems, selectedIndex } = this.state;
		this.setState({
			addedItems: [...addedItems, this.props.items[selectedIndex]],
		});
	}

	render() {
		return (
			<div>
				<SingleSelect onSelect={this.handleSelect} Option={this.props.items} />
				<Button style={{ marginLeft: 10 }} onClick={this.handleAdd}>
					Add +
				</Button>
				<ul>{this.state.addedItems.map(item => <li>{item}</li>)}</ul>
			</div>
		);
	}
}

//storiesOf('AddSelect', module)
//	.add('basic', () => (<AddSelect items={['foo', 'bar', 'baz']}/>))

storiesOf('Doc Stories', module)
	.add('Dev env vs gallery', () => (
		<section>
			<h1>Dev env vs gallery</h1>
			<ul>
				<li>Storybook is a dev tool first</li>
				<li>simple docs and examples</li>
				<li>docs in storybook have limitations</li>
				<li>addons can help</li>
			</ul>
		</section>
	))
	.add('Case study', () => (
		<section>
			<h1>Lucid Docs!</h1>
			<a href="https://appnexus.github.io/lucid/">
				https://appnexus.github.io/lucid/
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
