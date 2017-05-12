import React from 'react';
import { Button } from '../../../index';

export default React.createClass({
	render() {
		return (
			<section>
				<article>
					<Button kind="warning">Warning</Button>
					<Button kind="warning" isDisabled={true}>Disabled</Button>
				</article>
				<article>
					<Button kind="warning" size="short">Short</Button>
					<Button kind="warning" size="short" isDisabled={true}>
						Short disabled
					</Button>
				</article>
				<article>
					<Button kind="warning" size="small">Small</Button>
					<Button kind="warning" size="small" isDisabled={true}>
						Small disabled
					</Button>
				</article>
				<article>
					<Button kind="warning" size="large">Large</Button>
					<Button kind="warning" size="large" isDisabled={true}>
						Large disabled
					</Button>
				</article>
			</section>
		);
	},
});
