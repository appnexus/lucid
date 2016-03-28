import React from 'react';
import Autocomplete from '../Autocomplete';


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
  'awesome'
];

export default React.createClass({

	render() {
		return (
			<Autocomplete
				placeholder='Enter a word...'
				suggestions={wordlist}
				value='ab'
				onSelect={(index) => {console.log(`selected: ${wordlist[index]}`)}}
				DropMenu={{
					isExpanded: true,
					focusedIndex: 2,
					onCollapse: () => {console.log('onCollapse')}
				}}
			/>
		);
	}
});
