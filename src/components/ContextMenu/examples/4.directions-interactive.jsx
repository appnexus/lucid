import _ from 'lodash';
import React from 'react';
import createClass from 'create-react-class';
import { ContextMenu, SingleSelect, TextField } from '../../../index';

const { CENTER, DOWN, END, LEFT, RIGHT, START, UP } = ContextMenu;

export default createClass({
	render() {
		const style = {
			background: 'white',
			boxShadow: '1px 1px 4px black',
			padding: 4,
		};

		const {
			direction,
			directonOffset,
			alignment,
			alignmentOffset,
			getAlignmentOffset,
		} = this.state || {};

		const directions = [UP, DOWN, LEFT, RIGHT];
		const alignments = [START, CENTER, END];

		return (
			<section>

				<section
					style={{
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<SingleSelect
						onSelect={i => this.setState({ direction: directions[i] })}
					>
						<SingleSelect.Placeholder>
							Select a direction
						</SingleSelect.Placeholder>
						{_.map(directions, direction => (
							<SingleSelect.Option key={direction}>
								{direction}
							</SingleSelect.Option>
						))}
					</SingleSelect>

					directonOffset:
					<TextField
						style={{ width: 100 }}
						value={directonOffset}
						onChange={directonOffset => this.setState({ directonOffset })}
					/>

					<SingleSelect
						onSelect={i => this.setState({ alignment: alignments[i] })}
					>
						<SingleSelect.Placeholder>
							Select an alignment
						</SingleSelect.Placeholder>
						{_.map(alignments, alignment => (
							<SingleSelect.Option key={alignment}>
								{alignment}
							</SingleSelect.Option>
						))}
					</SingleSelect>

					alignmentOffset:
					<TextField
						style={{ width: 100 }}
						value={alignmentOffset}
						onChange={alignmentOffset => this.setState({ alignmentOffset })}
					/>

					getAlignmentOffset:
					<TextField
						isDisabled={alignment !== CENTER}
						style={{ width: 100 }}
						value={getAlignmentOffset}
						onSubmit={getAlignmentOffset =>
							this.setState({ getAlignmentOffset })}
					/>
					<code>{getAlignmentOffset || null}</code>

				</section>

				<section
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						margin: '90px',
					}}
				>
					<ContextMenu
						direction={direction}
						directonOffset={
							_.isEmpty(directonOffset) ? 0 : _.parseInt(directonOffset)
						}
						alignment={alignment || undefined}
						alignmentOffset={
							_.isEmpty(alignmentOffset)
								? undefined
								: _.parseInt(alignmentOffset)
						}
						getAlignmentOffset={eval(getAlignmentOffset)}
					>

						<ContextMenu.Target>
							Target
						</ContextMenu.Target>

						<ContextMenu.FlyOut style={{ width: 210, ...style }}>
							<div>{`direction: ${direction || 'default'}`}</div>
							<div>{`directonOffset: ${directonOffset || 'default'}`}</div>
							<div>{`alignment: ${alignment || 'default'}`}</div>
							<div>{`alignmentOffset: ${alignmentOffset || 'default'}`}</div>
							<div
							>{`getAlignmentOffset: ${getAlignmentOffset || 'default'}`}</div>
						</ContextMenu.FlyOut>

					</ContextMenu>
				</section>
			</section>
		);
	},
});
