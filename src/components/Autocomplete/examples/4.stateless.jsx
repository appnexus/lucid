/*eslint no-console: 0*/
import React from 'react';
import createClass from 'create-react-class';
import { AutocompleteDumb as Autocomplete } from '../../../index';

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

export default createClass({
	render() {
		return (
			<Autocomplete
				placeholder="Enter a word..."
				suggestions={wordlist}
				value="ab"
				onSelect={index => {
					console.log(`selected: ${wordlist[index]}`);
				}}
				DropMenu={{
					isExpanded: true,
					focusedIndex: 2,
					onCollapse: () => {
						console.log('onCollapse');
					},
				}}
			/>
		);
	},
});
