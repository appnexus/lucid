import React from 'react';
import createClass from 'create-react-class';
import { Button } from '../../../index';

export default createClass({
	render() {
		return (
			<section>
				<article>
					<Button kind="primary">Primary</Button>
					<Button kind="primary" isDisabled={true}>Disabled</Button>
				</article>
				<article>
					<Button kind="primary" size="short">Short</Button>
					<Button kind="primary" size="short" isDisabled={true}>
						Short disabled
					</Button>
				</article>
				<article>
					<Button kind="primary" size="small">Small</Button>
					<Button kind="primary" size="small" isDisabled={true}>
						Small disabled
					</Button>
				</article>
				<article>
					<Button kind="primary" size="large">Large</Button>
					<Button kind="primary" size="large" isDisabled={true}>
						Large disabled
					</Button>
				</article>
			</section>
		);
	},
});
