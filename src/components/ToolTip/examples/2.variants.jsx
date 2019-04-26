import React from 'react';
import createClass from 'create-react-class';
import { ToolTipDumb } from '../../../index';

const { Target, Title, Body } = ToolTipDumb;

export default createClass({
	getInitialState: () => ({ isExpanded: true }),
	render() {
		return (
			<section style={{ marginTop: 60, marginBottom: 60 }}>
				<h4>No Title or Close Button</h4>
				<div style={{ marginTop: 60, marginBottom: 60 }}>
					<ToolTipDumb direction="right" isExpanded={this.state.isExpanded}>
						<Body>
							ToolTip is a utility component to create a transient message
							anchored to another component.
						</Body>
						<Target>
							<div>Target</div>
						</Target>
					</ToolTipDumb>
				</div>

				<h4>With Close Button</h4>
				<div style={{ marginTop: 60, marginBottom: 60 }}>
					<ToolTipDumb
						direction="right"
						isCloseable
						onClose={() => this.setState({ isExpanded: false })}
						isExpanded={this.state.isExpanded}
					>
						<Body>
							ToolTip is a utility component to create a transient message
							anchored to another component.
						</Body>
						<Target>
							<div>Target</div>
						</Target>
					</ToolTipDumb>
				</div>

				<h4>With Title and Close Button</h4>
				<div style={{ marginTop: 60, marginBottom: 60 }}>
					<ToolTipDumb
						direction="right"
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
							<div>Target</div>
						</Target>
					</ToolTipDumb>
				</div>

				<h4>With Title and Close Button (Light Version)</h4>
				<div style={{ marginTop: 60, marginBottom: 60 }}>
					<ToolTipDumb
						direction="right"
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
							<div>Target</div>
						</Target>
					</ToolTipDumb>
				</div>
			</section>
		);
	},
});
