import React from 'react';
import createClass from 'create-react-class';
import { Selection, Resizer } from '../../../index';

export default createClass({
	render() {
		return (
			<Resizer>
				{width => {
					const responsiveMode = width >= 768 ? 'large' : 'small';

					return (
						<div>
							<div style={{ margin: '10px' }}>
								<Selection
									isSmall
									responsiveMode={responsiveMode}
									Label="Default"
								/>
							</div>

							<div style={{ margin: '10px' }}>
								<Selection
									isSmall
									responsiveMode={responsiveMode}
									kind="container"
									Label="Container"
								/>
							</div>

							<div style={{ margin: '10px' }}>
								<Selection
									isSmall
									responsiveMode={responsiveMode}
									kind="success"
									Label="Success"
								/>
							</div>

							<div style={{ margin: '10px' }}>
								<Selection
									isSmall
									responsiveMode={responsiveMode}
									kind="danger"
									Label="Danger"
								/>
							</div>

							<div style={{ margin: '10px' }}>
								<Selection
									isSmall
									responsiveMode={responsiveMode}
									kind="info"
									Label="Info"
								/>
							</div>

							<div style={{ margin: '10px' }}>
								<Selection
									isSmall
									responsiveMode={responsiveMode}
									kind="warning"
									Label="Warning"
								/>
							</div>
						</div>
					);
				}}
			</Resizer>
		);
	},
});
