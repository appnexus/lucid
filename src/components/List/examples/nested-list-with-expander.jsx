import _ from 'lodash';
import React from 'react';
import ListStateless from '../List';
import { buildStatefulComponent } from '../../../util/state-management';

const List = buildStatefulComponent(ListStateless);

export default React.createClass({
	render() {
		return (
			<List style={{ width: '200px' }}>
				<List.Item>Level one</List.Item>
				<List.Item hasExpander={true}>
					Level one with List
					<List>
						<List.Item>Level two</List.Item>
						<List.Item hasExpander={true}>
							Level two with List and lots of text. Lorem quos natus mollitia nihil quasi! Necessitatibus corporis aliquam quam laborum nesciunt quaerat. Nostrum distinctio officiis adipisci nulla unde repellat. Soluta eaque ex obcaecati molestiae provident aspernatur sit! Expedita et.
							<List>
								{_.times(50, (n) => {
									return <List.Item key={n}>Level three</List.Item>;
								})}
							</List>
						</List.Item>
						<List.Item>Level two</List.Item>
					</List>
				</List.Item>
				<List.Item>Level one</List.Item>
			</List>
		);
	}
});
