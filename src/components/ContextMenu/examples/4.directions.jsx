import React from 'react';
import { ContextMenu, Button } from '../../../index';

export default React.createClass({

	render() {

		const style = {
			background: 'white',
			boxShadow: '1px 1px 4px black',
			padding: 4
		};

		return (
			<section>

				{_.map(['up', 'left', 'right', 'down'], direction => _.map(['start', 'center', 'end'], alignment => {
					return (
						<div style={{marginTop: '60px'}}>
							<ContextMenu
								{...{ direction, alignment }}
							>
								<ContextMenu.Target>
									Target
								</ContextMenu.Target>

								<ContextMenu.FlyOut style={style}>
									<div>{`direction: ${direction}`}</div>
									<div>{`alignment: ${alignment}`}</div>
								</ContextMenu.FlyOut>
							</ContextMenu>
						</div>
					);
				}))}

			</section>
		);
	}
});
