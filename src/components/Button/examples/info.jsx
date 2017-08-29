import React from 'react';
import createReactClass from 'create-react-class';
import { Button } from '../../../index';

export default createReactClass({
	render() {
		return (
			<section>
				<article>
					<Button kind="info">Info</Button>
					<Button kind="info" isDisabled={true}>Disabled</Button>
				</article>
				<article>
					<Button kind="info" size="short">Short</Button>
					<Button kind="info" size="short" isDisabled={true}>
						Short disabled
					</Button>
				</article>
				<article>
					<Button kind="info" size="small">Small</Button>
					<Button kind="info" size="small" isDisabled={true}>
						Small disabled
					</Button>
				</article>
				<article>
					<Button kind="info" size="large">Large</Button>
					<Button kind="info" size="large" isDisabled={true}>
						Large disabled
					</Button>
				</article>
			</section>
		);
	},
});
