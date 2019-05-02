import React from 'react';
import createClass from 'create-react-class';
import { ToolTipDumb } from '../../../index';

const { Target, Title, Body } = ToolTipDumb;

export default createClass({
	getInitialState: () => ({ isExpanded: true }),
	render() {
		return (
			<section
				style={{
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<section
					style={{
						marginTop: 150,
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-around',
					}}
				>
					<div style={{ marginTop: 60, marginBottom: 60 }}>
						<ToolTipDumb isExpanded={this.state.isExpanded}>
							<Body>
								ToolTip is a utility component to create a transient message
								anchored to another component.
							</Body>
							<Target>
								<div>No Title or Close Button</div>
							</Target>
						</ToolTipDumb>
					</div>

					<div style={{ marginTop: 60, marginBottom: 60 }}>
						<ToolTipDumb
							isCloseable
							onClose={() => this.setState({ isExpanded: false })}
							isExpanded={this.state.isExpanded}
						>
							<Body>
								ToolTip is a utility component to create a transient message
								anchored to another component.
							</Body>
							<Target>
								<div>With Close Button</div>
							</Target>
						</ToolTipDumb>
					</div>

					<div style={{ marginTop: 60, marginBottom: 60 }}>
						<ToolTipDumb
							isCloseable
							onClose={() => this.setState({ isExpanded: false })}
							isExpanded={this.state.isExpanded}
						>
							<Title>Title</Title>
							<Body>
								ToolTip is a utility component to create a transient message
								anchored to another component.
							</Body>
							<Target>
								<div>With Title and Close Button</div>
							</Target>
						</ToolTipDumb>
					</div>
				</section>

				<section
					style={{
						marginTop: 150,
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-around',
					}}
				>
					<div style={{ marginTop: 60, marginBottom: 60 }}>
						<ToolTipDumb isLight isExpanded={this.state.isExpanded}>
							<Body>
								ToolTip is a utility component to create a transient message
								anchored to another component.
							</Body>
							<Target>
								<div>No Title or Close Button</div>
							</Target>
						</ToolTipDumb>
					</div>

					<div style={{ marginTop: 60, marginBottom: 60 }}>
						<ToolTipDumb
							isLight
							isCloseable
							onClose={() => this.setState({ isExpanded: false })}
							isExpanded={this.state.isExpanded}
						>
							<Body>
								ToolTip is a utility component to create a transient message
								anchored to another component.
							</Body>
							<Target>
								<div>With Close Button</div>
							</Target>
						</ToolTipDumb>
					</div>

					<div style={{ marginTop: 60, marginBottom: 60 }}>
						<ToolTipDumb
							isLight
							isCloseable
							onClose={() => this.setState({ isExpanded: false })}
							isExpanded={this.state.isExpanded}
						>
							<Title>Title</Title>
							<Body>
								ToolTip is a utility component to create a transient message
								anchored to another component.
							</Body>
							<Target>
								<div>With Title and Close Button</div>
							</Target>
						</ToolTipDumb>
					</div>
				</section>
			</section>
		);
	},
});
