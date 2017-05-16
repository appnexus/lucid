import React from 'react';
import { Button } from '../../../index';

export default React.createClass({
	render() {
		return (
			<section>
				<article>
					<Button kind="danger">Danger</Button>
					<Button kind="danger" isDisabled={true}>Disabled</Button>
				</article>
				<article>
					<Button kind="danger" size="short">Short</Button>
					<Button kind="danger" size="short" isDisabled={true}>
						Short disabled
					</Button>
				</article>
				<article>
					<Button kind="danger" size="small">Small</Button>
					<Button kind="danger" size="small" isDisabled={true}>
						Small disabled
					</Button>
				</article>
				<article>
					<Button kind="danger" size="large">Large</Button>
					<Button kind="danger" size="large" isDisabled={true}>
						Large disabled
					</Button>
				</article>
			</section>
		);
	},
});
