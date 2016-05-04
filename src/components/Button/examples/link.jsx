import React from 'react';
import { Button, PlusIcon } from '../../../index';

export default React.createClass({
	render() {
		return (
			<section>
				<article>
					<Button kind='link'>Link</Button>
					<Button kind='link' isDisabled={true}>Link is disabled</Button>
					<Button kind='link'><PlusIcon />Link has icon</Button>
				</article>
			</section>
		);
	}
});
