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
							<Selection responsiveMode={responsiveMode} Label="Default" />
							<Selection
								responsiveMode={responsiveMode}
								kind="container"
								Label="Container"
							/>
							<Selection
								responsiveMode={responsiveMode}
								kind="success"
								Label="Success"
							/>
							<Selection
								responsiveMode={responsiveMode}
								kind="danger"
								Label="Danger"
							/>
							<Selection
								responsiveMode={responsiveMode}
								kind="info"
								Label="Info"
							/>
							<Selection
								responsiveMode={responsiveMode}
								kind="warning"
								Label="Warning"
							/>
						</div>
					);
				}}
			</Resizer>
		);
	},
});
