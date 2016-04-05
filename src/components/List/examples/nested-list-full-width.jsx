import React from 'react';
import ListStateless from '../List';
import { buildStatefulComponent } from '../../../util/state-management';

const List = buildStatefulComponent(ListStateless);

export default React.createClass({
	render() {
		return (
			<List>
				<List.Item>Level one</List.Item>
				<List.Item isExpanded={true}>
					Level one with List
					<List>
						<List.Item>Level two</List.Item>
						<List.Item>Level two</List.Item>
					</List>
				</List.Item>
				<List.Item isExpanded={true}>
					Level one with List
					<List>
						<List.Item>Level two</List.Item>
						<List.Item isExpanded={false}>
							Level two with closed List
							<List>
								<List.Item>Level three</List.Item>
								<List.Item>Level three</List.Item>
								<List.Item>Level three</List.Item>
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
