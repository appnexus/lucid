import React from 'react';
import Button from '../Button';

export default React.createClass({
	render() {
		return (
			<section>
				<article>
					<Button kind='success'>Success</Button>
					<Button kind='success' isDisabled={true}>Success</Button>
					<Button kind='success' isActive={true}>Success</Button>
				</article>
				<article>
					<Button kind='success' size='short'>Success</Button>
					<Button kind='success' size='short' isDisabled={true}>Success</Button>
					<Button kind='success' size='short' isActive={true}>Success</Button>
				</article>
				<article>
					<Button kind='success' size='small'>Success</Button>
					<Button kind='success' size='small' isDisabled={true}>Success</Button>
					<Button kind='success' size='small' isActive={true}>Success</Button>
				</article>
				<article>
					<Button kind='success' size='large'>Success</Button>
					<Button kind='success' size='large' isDisabled={true}>Success</Button>
					<Button kind='success' size='large' isActive={true}>Success</Button>
				</article>
			</section>
		);
	}
});
