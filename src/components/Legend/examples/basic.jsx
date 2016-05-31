import _ from 'lodash';
import React from 'react';

import Legend from '../Legend';
import { ToolTip } from '../../../index';

const { Item } = Legend;

export default React.createClass({
	render() {
		return (
			<div>
				<Legend>
					{_.map(_.times(5), n => (
						<Item
							key={n}
							hasPoint
							color={n}
							children={`Partner ${n}`}
						/>
					))}
				</Legend>

				<br />

				<Legend>
					{_.map(_.times(5), n => (
						<Item
							key={n}
							hasPoint
							pointKind={n}
							color={n}
							children={`Partner ${n}`}
						/>
					))}
				</Legend>

				<br />

				<Legend>
					{_.map(_.times(5), n => (
						<Item
							key={n}
							hasLine
							color={n}
							children={`Partner ${n}`}
						/>
					))}
				</Legend>

				<br />

				<Legend>
					{_.map(_.times(5), n => (
						<Item
							key={n}
							hasPoint
							hasLine
							pointKind={n}
							color={n}
							children={`Partner ${n}`}
						/>
					))}
				</Legend>

				<br />

				<Legend orient='horizontal'>
					<Item hasLine>Revenue</Item>
					<Item hasLine>Loss</Item>
					<Item hasPoint color={1}>Partner 1</Item>
					<Item hasPoint color={2}>Partner 2</Item>
				</Legend>

				<Legend>
					<Item hasLine>Revenue</Item>
					<Item hasLine>Loss</Item>
					<Item hasPoint color={1}>Partner 1</Item>
					<Item hasPoint color={2}>Partner 2</Item>
				</Legend>

				<br />
				<br />
				<br />

				<ToolTip isExpanded={true} direction='right' alignment='end'>
					<ToolTip.Target>
						Tooltip example
					</ToolTip.Target>

					<ToolTip.Body>
						<Legend hasBorders={false}>
							<Item hasLine>Revenue</Item>
							<Item hasLine>Loss</Item>
							<Item hasPoint color={1}>Partner 1</Item>
							<Item hasPoint color={2}>Partner 2</Item>
						</Legend>
					</ToolTip.Body>
				</ToolTip>

			</div>
		);
	},
});

