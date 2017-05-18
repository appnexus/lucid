import React from 'react';
import createClass from 'create-react-class';
import { ContextMenu } from '../../../index';

export default createClass({
	getInitialState() {
		return {
			isFileExpanded: false,
			fileDirection: 'down',
			isEditExpanded: false,
			editDirection: 'down',
		};
	},

	handleFileMenuToggle() {
		const { isFileExpanded } = this.state;

		this.setState({
			isFileExpanded: !isFileExpanded,
		});
	},

	handleEditMenuToggle() {
		const { isEditExpanded } = this.state;

		this.setState({
			isEditExpanded: !isEditExpanded,
		});
	},

	render() {
		const {
			isFileExpanded,
			fileDirection,
			isEditExpanded,
			editDirection,
		} = this.state;
		return (
			<section>

				<ContextMenu
					portalId="FileMenu-example"
					isExpanded={isFileExpanded}
					direction={fileDirection}
					onClickOut={this.handleFileMenuToggle}
				>

					<ContextMenu.Target>
						<div
							style={{
								background: isFileExpanded ? '#fafafa' : '#eaeaea',
								outline: 'solid 1px #d1d1d1',
								padding: '4px',
								cursor: 'pointer',
							}}
							onClick={this.handleFileMenuToggle}
						>
							File
						</div>
					</ContextMenu.Target>

					<ContextMenu.FlyOut
						style={{
							background: '#fafafa',
							outline: 'solid 1px #d1d1d1',
							boxShadow: ' 1px 1px 2px rgba(0, 0, 0, 0.2)',
							padding: '8px',
						}}
					>
						<div>New Window</div>
						<div>New File</div>
						<div>Open...</div>
						<div>Add Folder...</div>
						<div>Reopen Last Item</div>
						<hr />
						<div>Save</div>
						<div>Save As...</div>
						<div>Save All</div>
						<hr />
						<div>Close Tab</div>
						<div>Close Pane</div>
						<div>Close Window</div>
					</ContextMenu.FlyOut>

				</ContextMenu>

				<ContextMenu
					portalId="EditMenu-example"
					isExpanded={isEditExpanded}
					direction={editDirection}
					onClickOut={this.handleEditMenuToggle}
				>

					<ContextMenu.Target>
						<div
							style={{
								background: isEditExpanded ? '#fafafa' : '#eaeaea',
								outline: 'solid 1px #d1d1d1',
								padding: '4px',
								cursor: 'pointer',
							}}
							onClick={this.handleEditMenuToggle}
						>
							Edit
						</div>
					</ContextMenu.Target>

					<ContextMenu.FlyOut
						style={{
							background: '#fafafa',
							outline: 'solid 1px #d1d1d1',
							boxShadow: ' 1px 1px 2px rgba(0, 0, 0, 0.2)',
							padding: '8px',
						}}
					>
						<div>Undo</div>
						<div>Redo</div>
						<hr />
						<div>Cut</div>
						<div>Copy</div>
						<div>Paste</div>
						<div>Select All</div>
					</ContextMenu.FlyOut>

				</ContextMenu>

			</section>
		);
	},
});
