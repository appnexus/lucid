import React from 'react';
import { Button, CheckIcon } from '../../../index';

export default React.createClass({
	render() {
		return (
			<section>
				<article>
					<Button>Default</Button>
					<Button><CheckIcon />Default</Button>
					<Button hasOnlyIcon={true}><CheckIcon /></Button>
					<Button isDisabled={true}>Default disabled</Button>
					<Button isActive={true}>Default active</Button>
				</article>
				<article>
					<Button size="short">Short</Button>
					<Button size="short"><CheckIcon />Short</Button>
					<Button size="short" hasOnlyIcon={true}><CheckIcon /></Button>
					<Button size="short" isDisabled={true}>Short disabled</Button>
					<Button size="short" isActive={true}>Short active</Button>
				</article>
				<article>
					<Button size="small">Small</Button>
					<Button size="small"><CheckIcon />Small</Button>
					<Button size="small" hasOnlyIcon={true}><CheckIcon /></Button>
					<Button size="small" isDisabled={true}>Small disabled</Button>
					<Button size="small" isActive={true}>Small active</Button>
				</article>
				<article>
					<Button size="large">Large</Button>
					<Button size="large"><CheckIcon />Large</Button>
					<Button size="large" hasOnlyIcon={true}><CheckIcon /></Button>
					<Button size="large" isDisabled={true}>Large disabled</Button>
					<Button size="large" isActive={true}>Large active</Button>
				</article>
			</section>
		);
	},
});
