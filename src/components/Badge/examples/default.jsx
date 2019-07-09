import React from 'react';
import createClass from 'create-react-class';
import { Badge } from '../../../index';

const style = { marginBottom: '10px', marginRight: '10px' };

export default createClass({
	render() {
		return (
			<div>
				<div>
					<Badge style={style}>Badge</Badge>
					<Badge style={style} type='stroke'>
						Badge
					</Badge>
				</div>
				<div>
					<Badge style={style} kind='primary'>
						Badge
					</Badge>
					<Badge style={style} kind='primary' type='stroke'>
						Badge
					</Badge>
				</div>
				<div>
					<Badge style={style} kind='success'>
						Badge
					</Badge>
					<Badge style={style} kind='success' type='stroke'>
						Badge
					</Badge>
				</div>
				<div>
					<Badge style={style} kind='danger'>
						Badge
					</Badge>
					<Badge style={style} kind='danger' type='stroke'>
						Badge
					</Badge>
				</div>
			</div>
		);
	},
});
