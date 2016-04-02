import React from 'react';
import Button from '../Button';
import PlusIcon from '../../Icon/PlusIcon/PlusIcon';

export default React.createClass({
	render() {
		return (
			<section>
				<Button kind='link'>Link</Button>
				<Button kind='link' isDisabled={true}>Link</Button>
				<Button kind='link'><PlusIcon />Link</Button>
			</section>
		);
	}
});
