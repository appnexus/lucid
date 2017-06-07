import _ from 'lodash';
import React from 'react';
import createClass from 'create-react-class';
import { ToolTip } from '../../../index';

const { Target, Title, Body } = ToolTip;

export default createClass({
	render() {
		return (
			<section style={{ display: 'flex', flexDirection: 'row' }}>
				{_.map(['right', 'up', 'down', 'left'], direction => (
					<section
						key={direction}
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							flexGrow: 1,
						}}
					>
						{_.map(['start', 'center', 'end'], alignment => (
							<section
								key={`${direction}${alignment}`}
								style={{ margin: '30px' }}
							>
								<ToolTip direction={direction} alignment={alignment}>
									<Title>
										Title: {direction} {alignment}
									</Title>
									<Body>
										ToolTip is a utility component to create a transient message anchored to another component.
										My direction is "{direction}".
										My alignment is "{alignment}".
									</Body>
									<Target>
										<div>
											Target {direction} {alignment}
										</div>
									</Target>
								</ToolTip>
							</section>
						))}
					</section>
				))}
			</section>
		);
	},
});
