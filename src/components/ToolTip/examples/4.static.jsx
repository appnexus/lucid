import _ from 'lodash';
import React from 'react';
import createClass from 'create-react-class';
import { ToolTipDumb } from '../../../index';

const { Target, Title, Body } = ToolTipDumb;

export default createClass({
	render() {
		return (
			<section
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				{_.map(['right', 'up', 'down', 'left'], direction =>
					_.map(['start', 'center', 'end'], alignment => (
						<section
							key={`${direction}${alignment}`}
							style={{ margin: '90px' }}
						>
							<ToolTipDumb
								direction={direction}
								alignment={alignment}
								isExpanded={true}
							>
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
							</ToolTipDumb>
						</section>
					))
				)}
			</section>
		);
	},
});
