import React from 'react';
import { ValidatedTextField } from '../../../index';

export default React.createClass({
	render() {
		return <ValidatedTextField Error='Nope, not even close!' />;
	}
});
