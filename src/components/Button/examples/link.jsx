import React from 'react';
import createReactClass from 'create-react-class';
import { Button, PlusIcon } from '../../../index';

export default createReactClass({
	render() {
		return (
			<section>
				<article>
					<Button kind="link">Link</Button>
					<Button kind="link" isDisabled={true}>Link disabled</Button>
					<Button kind="link"><PlusIcon />Link</Button>
					<Button kind="link" hasOnlyIcon><PlusIcon /></Button>
				</article>
			</section>
		);
	},
});
