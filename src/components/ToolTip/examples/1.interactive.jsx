import _ from 'lodash';
import React from 'react';
import ToolTip from '../ToolTip';

const {
	Target,
	Title,
	Body
} = ToolTip;

export default React.createClass({
	getInitialState: () => ({ isExpanded: false }),
	render() {
		return (
			<section style={{ display: 'flex', flexDirection: 'row' }}>
				{_.map(['right', 'up', 'down', 'left'], direction =>
				   <section key={direction} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
						 {_.map(['start', 'center', 'end'], alignment =>
							 <section key={`${direction}${alignment}`} style={{ margin: '30px' }}>
								 <ToolTip
									 direction={direction}
									 alignment={alignment}
									 isExpanded={_.get(this.state, [direction, alignment, 'isExpanded'], false)}
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
										<div
											onMouseOver={() => this.setState({ [direction]: { [alignment]: { isExpanded: true }}})}
											onMouseOut={() => this.setState({ [direction]: { [alignment]: { isExpanded: false }}})}
										>
											Target {direction} {alignment}
										</div>
									</Target>
								</ToolTip>
							</section>)}
					 </section>
				)}
			</section>
		);
	}
});
