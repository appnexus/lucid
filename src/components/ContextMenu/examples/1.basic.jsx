import React from 'react';
import { ContextMenu, Button } from '../../../index';

export default React.createClass({
	render() {
		return (
			<ContextMenu>

				<ContextMenu.Target>
					<Button>Target</Button>
				</ContextMenu.Target>

				<ContextMenu.FlyOut style={{
					background: 'white',
					boxShadow: '1px 1px 4px black',
					padding: 4,
				}}>
					FlyOut
				</ContextMenu.FlyOut>
			</ContextMenu>
		);
	},
});
