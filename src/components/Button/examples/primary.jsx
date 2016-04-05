import React from 'react';
import Button from '../Button';

export default React.createClass({
	render() {
		return (
			<section>
				<article>
					<Button kind='primary'>Primary</Button>
					<Button kind='primary' isDisabled={true}>Primary</Button>
					<Button kind='primary' isActive={true}>Primary</Button>
				</article>
				<article>
					<Button kind='primary' size='short'>Primary</Button>
					<Button kind='primary' size='short' isDisabled={true}>Primary</Button>
					<Button kind='primary' size='short' isActive={true}>Primary</Button>
				</article>
				<article>
					<Button kind='primary' size='small'>Primary</Button>
					<Button kind='primary' size='small' isDisabled={true}>Primary</Button>
					<Button kind='primary' size='small' isActive={true}>Primary</Button>
				</article>
				<article>
					<Button kind='primary' size='large'>Primary</Button>
					<Button kind='primary' size='large' isDisabled={true}>Primary</Button>
					<Button kind='primary' size='large' isActive={true}>Primary</Button>
				</article>
			</section>
		);
	}
});
