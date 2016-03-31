import React from 'react';
import ValidatedTextField from '../ValidatedTextField';

export default React.createClass({
	render() {
		return <ValidatedTextField Error='Nope, not even close!' />;
	}
});
