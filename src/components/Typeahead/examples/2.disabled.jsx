import React from 'react';
import Typeahead from '../Typeahead';

const style = {
	marginBottom: '10px'
};

export default () => (
	<section>
		<section style={style}>
			<Typeahead isDisabled={true} />
		</section>
	</section>
);
