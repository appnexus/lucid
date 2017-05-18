import React from 'react';
import createClass from 'create-react-class';
import _ from 'lodash';
import { DropMenu, Button } from '../../../index';

export default createClass({
	render() {
		const options = [
			'Intentionally run off screen -- Adipisicing totam saepe officia repellat quo cupiditate ducimus hic? Quod temporibus corrupti eaque ullam quo nulla corporis !',
			'Adipisicing totam provident excepturi officia non cum alias? Labore possimus adipisci id eveniet numquam tempora totam est. Explicabo recusandae quo tempore',
			'Consectetur doloribus dignissimos exercitationem vel tempora praesentium nostrum eveniet inventore. Odit inventore quas optio id eum nisi. Minima consequuntur',
		];

		return (
			<div style={{ textAlign: 'right' }}>
				<DropMenu onSelect={this.handleSelect} alignment="center">
					<DropMenu.Control>
						<Button>Click me</Button>
					</DropMenu.Control>

					{_.map(options, (optionText, index) => (
						<DropMenu.Option isWrapped={false} key={'Option-' + index}>
							{optionText}
						</DropMenu.Option>
					))}
				</DropMenu>
			</div>
		);
	},
});
