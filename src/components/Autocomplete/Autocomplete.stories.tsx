import React from 'react';
import _ from 'lodash';
import createClass from 'create-react-class';
import { Story, Meta } from '@storybook/react';

import { AutocompleteDumb as Autocomplete } from './Autocomplete';

export default {
	title: 'Controls/Autocomplete',
	component: Autocomplete,
	parameters: {
		docs: {
			description: {
				component: (Autocomplete as any).peek.description,
			},
		},
	},
} as Meta;

/* Basic */
export const Basic: Story = () => {
	const Component = createClass({
		render() {
			return (
				<Autocomplete
					placeholder='Enter a word...'
					suggestions={[
						'Portland',
						'pinky and the brain',
						'playa please',
						'porridge',
						'portal',
						'potent potables',
						'potent',
					]}
				/>
			);
		},
	});

	return <Component />;
};

/* Interactive */
export const Interactive = () => {
	const wordlist = [
		'abaft',
		'abounding',
		'abrasive',
		'accidental',
		'actor',
		'addition',
		'adhesive',
		'adjustment',
		'advertisement',
		'applaud',
		'appreciate',
		'awesome',
		'ball',
		'beautiful',
		'beef',
		'bell',
		'bent',
		'bite-sized',
		'bitter',
		'black',
		'bloody',
		'bulb',
		'bump',
		'calculator',
		'camp',
		'care',
		'care',
		'caring',
		'celery',
		'challenge',
		'chase',
		'cherries',
		'chew',
		'choke',
		'circle',
		'clean',
		'club',
		'coat',
		'cold',
		'colossal',
		'command',
		'competition',
		'confuse',
		'continue',
		'crawl',
		'curve',
		'cute',
		'dad',
		'damaged',
		'death',
		'debonair',
		'decorate',
		'deeply',
		'delicious',
		'destroy',
		'destruction',
		'diligent',
		'disapprove',
		'discussion',
		'doubtful',
		'dress',
		'drop',
		'dust',
		'eatable',
		'educate',
		'efficacious',
		'elegant',
		'elfin',
		'embarrassed',
		'enjoy',
		'envious',
		'exchange',
		'excited',
		'existence',
		'fast',
		'fear',
		'flight',
		'float',
		'food',
		'force',
		'fork',
		'frightening',
		'geese',
		'ghost',
		'giant',
		'gigantic',
		'glow',
		'goofy',
		'grandiose',
		'great',
		'grumpy',
		'guide',
		'hair',
		'hall',
		'head',
		'heat',
		'hesitant',
		'hill',
		'home',
		'horn',
		'hospital',
		'hurt',
		'idea',
		'ill-informed',
		'immense',
		'imminent',
		'insect',
		'insurance',
		'intelligent',
		'iron',
		'jaded',
		'jagged',
		'jeans',
		'jelly',
		'judge',
		'kitty',
		'kneel',
		'knot',
		'knotty',
		'letter',
		'level',
		'lie',
		'lip',
		'literate',
		'loaf',
		'lovely',
		'madly',
		'meaty',
		'men',
		'merciful',
		'messy',
		'minister',
		'modern',
		'multiply',
		'muscle',
		'mysterious',
		'natural',
		'naughty',
		'neat',
		'note',
		'nut',
		'nutritious',
		'obedient',
		'obsolete',
		'old-fashioned',
		'onerous',
		'opposite',
		'order',
		'oval',
		'painstaking',
		'paint',
		'pale',
		'parallel',
		'parched',
		'park',
		'past',
		'pencil',
		'perfect',
		'permit',
		'phobic',
		'picture',
		'pin',
		'pink',
		'please',
		'plug',
		'pop',
		'possess',
		'preserve',
		'pretty',
		'print',
		'puffy',
		'pushy',
		'quarter',
		'race',
		'racial',
		'raise',
		'rampant',
		'rare',
		'record',
		'release',
		'retire',
		'rhetorical',
		'rhyme',
		'ring',
		'road',
		'rub',
		'rule',
		'savory',
		'scared',
		'screw',
		'seemly',
		'selfish',
		'shape',
		'shiver',
		'shrill',
		'sign',
		'signal',
		'silk',
		'silky',
		'silly',
		'simplistic',
		'sister',
		'skillful',
		'sleep',
		'small',
		'smash',
		'society',
		'sofa',
		'soggy',
		'song',
		'sound',
		'soup',
		'sparkling',
		'spiders',
		'spot',
		'stage',
		'standing',
		'stare',
		'steep',
		'stiff',
		'store',
		'stranger',
		'swanky',
		'taste',
		'tasteless',
		'tax',
		'telling',
		'territory',
		'third',
		'thirsty',
		'thumb',
		'tiny',
		'toe',
		'touch',
		'transport',
		'tremble',
		'trite',
		'twist',
		'two',
		'umbrella',
		'unkempt',
		'unlock',
		'unnatural',
		'unsightly',
		'uttermost',
		'wait',
		'walk',
		'wander',
		'warn',
		'weary',
		'wholesale',
		'willing',
		'winter',
		'worthless',
		'writer',
		'zippy',
	];

	const Component = createClass({
		getInitialState() {
			return {
				value: '',
			};
		},

		handleChange(value: any) {
			this.setState({
				value,
			});
		},

		render() {
			const { value } = this.state;
			const valuePattern = new RegExp(_.escapeRegExp(value), 'i');
			const filteredWordList =
				value !== ''
					? _.filter(wordlist, (word) => valuePattern.test(word))
					: wordlist;

			return (
				<section>
					<section>Current Value: {this.state.value}</section>

					<Autocomplete
						placeholder='Enter a word...'
						suggestions={
							_.size(filteredWordList) <= 1 &&
							_.first(filteredWordList) === value
								? []
								: filteredWordList
						}
						onChange={this.handleChange}
					/>
				</section>
			);
		},
	});

	return <Component />;
};

/* Disabled */
export const Disabled = () => {
	const Component = createClass({
		render() {
			return (
				<section style={{ minHeight: 100 }}>
					<Autocomplete placeholder='Enter a word...' isDisabled />
				</section>
			);
		},
	});

	return <Component />;
};

/* Stateless */
export const Stateless = () => {
	/*eslint no-console: 0*/

	const wordlist = [
		'abaft',
		'abounding',
		'abrasive',
		'accidental',
		'actor',
		'addition',
		'adhesive',
		'adjustment',
		'advertisement',
		'applaud',
		'appreciate',
		'awesome',
		'abracadabra alakazam hocus pocus shazam say the magic word please if you will thank you very much',
	];

	const Component = createClass({
		render() {
			return (
				<Autocomplete
					placeholder='Enter a word...'
					suggestions={wordlist}
					value='ab'
					onSelect={(index: any) => {
						console.warn(`selected: ${wordlist[index]}`);
					}}
					DropMenu={{
						isExpanded: true,
						focusedIndex: 2,
						onCollapse: () => {
							console.warn('onCollapse');
						},
					}}
				/>
			);
		},
	});

	return <Component />;
};
