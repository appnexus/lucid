import React from 'react';
import createReactClass from 'create-react-class';
import { PlusIcon, SingleSelect } from '../../../index';

const { Placeholder, Option } = SingleSelect;

export default createReactClass({
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
