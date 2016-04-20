import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';

const boundClassNames = lucidClassNames.bind('&-LandingPage');

const LandingPage = React.createClass({
	render() {
		return (
			<div className={boundClassNames('&')} >
				foo
			</div>
		);
	}
});

export default LandingPage;
