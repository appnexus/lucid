import React from 'react';
import createReactClass from 'create-react-class';
import { Button } from '../../../index';

export default createReactClass({
	render() {
		return (
			<section>
				<article>
					<Button kind="success">Success</Button>
					<Button kind="success" isDisabled={true}>Disabled</Button>
				</article>
				<article>
					<Button kind="success" size="short">Short</Button>
					<Button kind="success" size="short" isDisabled={true}>
						Short disabled
					</Button>
				</article>
				<article>
					<Button kind="success" size="small">Small</Button>
					<Button kind="success" size="small" isDisabled={true}>
						Small disabled
					</Button>
				</article>
				<article>
					<Button kind="success" size="large">Large</Button>
					<Button kind="success" size="large" isDisabled={true}>
						Large disabled
					</Button>
				</article>
			</section>
		);
	},
});
