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
			<section
				style={{
					display: 'flex',
					flexDirection: 'row',
					margin: '0 60px'
				}}
			>

				{_.map(['left', 'up', 'down', 'right'], direction => {
					return (
						<section key={direction} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
							{_.map(['start', 'center', 'end'], alignment => _.map([0, 15, -15], directonOffset => _.map([0, 15, -15], alignmentOffset => (
								<div key={`${alignment}${alignmentOffset}${directonOffset}`} style={{marginTop: '120px'}}>
									<ContextMenu
										{...{
											direction,
											directonOffset,
											alignment,
											alignmentOffset,
										}}
										>
											<ContextMenu.Target>
												Target
											</ContextMenu.Target>

											<ContextMenu.FlyOut style={style}>
												<div>{`direction: ${direction}`}</div>
												<div>{`directonOffset: ${directonOffset}`}</div>
												<div>{`alignment: ${alignment}`}</div>
												<div>{`alignmentOffset: ${alignmentOffset}`}</div>
											</ContextMenu.FlyOut>
										</ContextMenu>
									</div>
							 ))))}
						 </section>
					 );
			 })}

			</section>
		);
	}
});
