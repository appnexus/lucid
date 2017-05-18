import React from 'react';
import createClass from 'create-react-class';
import { PlusIcon, SingleSelect } from '../../../index';

const { Placeholder, Option } = SingleSelect;

export default createClass({
	render() {
		return (
			<SingleSelect>
				<Placeholder>
					<PlusIcon
						isBadge
						style={{ backgroundColor: 'gray', marginRight: 4 }}
					/>
					{' '}
					Add Color
				</Placeholder>
				<Option>
					<PlusIcon
						isBadge
						style={{ backgroundColor: 'red', marginRight: 4 }}
					/>
					{' '}
					Red
				</Option>
				<Option>
					<PlusIcon
						isBadge
						style={{ backgroundColor: 'green', marginRight: 4 }}
					/>
					{' '}
					Green
				</Option>
				<Option>
					<PlusIcon
						isBadge
						style={{ backgroundColor: 'blue', marginRight: 4 }}
					/>
					{' '}
					Blue
				</Option>
			</SingleSelect>
		);
	},
});
