import React from 'react';
import Button from '../Button';
import CheckIcon from '../../Icon/CheckIcon/CheckIcon';

export default React.createClass({
	render() {
		return (
			<section>
				<article>
					<Button>Default</Button>
					<Button><CheckIcon /> has icon</Button>
					<Button isDisabled={true}>Default</Button>
					<Button isActive={true}>Default</Button>
				</article>
				<article>
					<Button size='short'>Default</Button>
					<Button size='short' isDisabled={true}>Default</Button>
					<Button size='short' isActive={true}>Default</Button>
				</article>
				<article>
					<Button size='small'>Default</Button>
					<Button size='small' isDisabled={true}>Default</Button>
					<Button size='small' isActive={true}>Default</Button>
				</article>
				<article>
					<Button size='large'>Default</Button>
					<Button size='large'><CheckIcon /> has icon</Button>
					<Button size='large' isDisabled={true}>Default</Button>
					<Button size='large' isActive={true}>Default</Button>
				</article>
			</section>
		);
	}
});
