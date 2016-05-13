import _ from 'lodash';
import React from 'react';
import ToolTip from '../ToolTip';

const {
	Target,
	Title,
	Body
} = ToolTip;

export default React.createClass({
	render() {
		return (
			<section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				{_.map(['right', 'up', 'down', 'left'], direction => _.map(['start', 'center', 'end'], alignment =>
					 <section key={`${direction}${alignment}`} style={{ margin: '90px' }}>
						 <ToolTip
							 direction={direction}
							 alignment={alignment}
							 isExpanded={true}
							 style={{ maxWidth: 400 }}
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
						</ToolTip>
					</section>)
				)}
			</section>
		);
	}
});
