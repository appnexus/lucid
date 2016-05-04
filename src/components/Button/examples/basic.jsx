import React from 'react';
import { Button, CheckIcon } from '../../../index';

export default React.createClass({
	render() {
		return (
			<section>
				<article>
					<Button>Default</Button>
					<Button><CheckIcon /> has icon</Button>
					<Button isDisabled={true}>is disabled</Button>
					<Button isActive={true}>is active</Button>
				</article>
				<article>
					<Button size='short'>short</Button>
					<Button size='short' isDisabled={true}>short is disabled</Button>
					<Button size='short' isActive={true}>short is active</Button>
				</article>
				<article>
					<Button size='small'>small</Button>
					<Button size='small' isDisabled={true}>small is disabled</Button>
					<Button size='small' isActive={true}>small is active</Button>
				</article>
				<article>
					<Button size='large'>large</Button>
					<Button size='large'><CheckIcon /> large has icon</Button>
					<Button size='large' isDisabled={true}>large is disabled</Button>
					<Button size='large' isActive={true}>large is active</Button>
				</article>
			</section>
		);
	}
});
