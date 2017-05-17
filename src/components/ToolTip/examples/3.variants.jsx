import _ from 'lodash';
import React from 'react';
import createClass from 'create-react-class';
import { ToolTipDumb } from '../../../index';

const { Target, Title, Body } = ToolTipDumb;

const kinds = ['primary', 'success', 'warning', 'danger', 'info', 'default'];
const rows = _.chunk(kinds, 3);

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
				{_.map(rows, row => (
					<section
						key={`${row}`}
						style={{
							marginTop: 150,
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-around',
						}}
					>
						{_.map(row, kind => (
							<ToolTipDumb key={kind} isExpanded kind={kind}>
								<Title>{_.capitalize(kind)}</Title>
								<Body>
									ToolTip is a utility component to create a transient message anchored to another component.
								</Body>
								<Target>
									<div>Target for {kind}</div>
								</Target>
							</ToolTipDumb>
						))}
					</section>
				))}
			</section>
		);
	},
});
