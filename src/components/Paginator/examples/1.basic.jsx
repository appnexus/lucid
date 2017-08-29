import React from 'react';
import createReactClass from 'create-react-class';
import { Paginator } from '../../../index';

export default createReactClass({
	render() {
		return <Paginator totalCount={100} />;
	},
});
