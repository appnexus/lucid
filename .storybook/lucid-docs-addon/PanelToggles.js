import React from 'react';
import Hoverable from './Hoverable';
import addons, { makeDecorator } from '@storybook/addons';
import ReactDOM from 'react-dom';

const portalElement = window.document.createElement('div');
window.parent.document.body.appendChild(portalElement);

export const withPanelToggles = makeDecorator({
	name: 'withPanelToggles',
	parameterName: 'panelToggles',
	skipIfNoParametersOrOptions: true,
	wrapper: (storyFn, context) => {
		const channel = addons.getChannel();
		const panelPortal = ReactDOM.createPortal(
			<PanelToggles
				handleToggleLayout={() => {
					channel.emit('lucid-docs-panel-layout-toggle');
				}}
				handleTogglePanel={() => {
					channel.emit('lucid-docs-panel-hide-toggle');
				}}
			/>,
			portalElement
		);
		return (
			<div>
				{storyFn(context)}
				{panelPortal}
			</div>
		);
	},
});

class PanelToggles extends React.Component {
	render() {
		return (
			<Hoverable>
				{hoverGroup => (
					<div
						style={{
							position: 'fixed',
							bottom: 11,
							right: 11,
							width: 60,
							height: 32,
							opacity: hoverGroup ? '1' : '0.6',
							zIndex: 999,
						}}
					>
						<Hoverable>
							{hover => (
								<div
									style={{
										position: 'absolute',
										bottom: 4,
										right: 32,
										width: 24,
										height: 24,
										backgroundColor: 'rgba(176,176,176,.5)',
										cursor: 'pointer',
										opacity: hover ? '1' : '0.6',
										transform: hoverGroup
											? 'translateX(0px)'
											: 'translateX(28px)',
										transition: 'transform 300ms',
									}}
									onClick={this.props.handleToggleLayout}
									title="Toggle Layout"
								>
									<div
										style={{
											position: 'absolute',
											bottom: 0,
											left: 0,
											width: 24,
											height: 8,
											backgroundColor: 'rgba(176,176,176,.5)',
										}}
									/>
									<div
										style={{
											position: 'absolute',
											top: 0,
											right: 0,
											width: 8,
											height: 24,
											backgroundColor: 'rgba(176,176,176,.5)',
										}}
									/>
								</div>
							)}
						</Hoverable>
						<Hoverable>
							{hover => (
								<div
									style={{
										position: 'absolute',
										bottom: 4,
										right: 4,
										width: 24,
										height: 24,
										backgroundColor: 'rgba(176,176,176,.5)',
										cursor: 'pointer',
										opacity: hover ? '1' : '0.6',
									}}
									onClick={this.props.handleTogglePanel}
									title="Toggle Panel"
								>
									<div
										style={{
											position: 'absolute',
											bottom: 0,
											left: 0,
											width: 24,
											height: 8,
											backgroundColor: 'rgba(176,176,176,.125)',
											outline: '2px dashed rgba(176,176,176,.5)',
											outlineOffset: -1,
										}}
									/>
								</div>
							)}
						</Hoverable>
					</div>
				)}
			</Hoverable>
		);
	}
}

export default PanelToggles;
