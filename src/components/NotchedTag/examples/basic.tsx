import React from 'react';
import createClass from 'create-react-class';
import { NotchedTag } from '../../../index';

const style = { display: 'inline-block', marginRight: '10px' };
export default createClass({
	render() {
		return (
			<div>
				<div>
					<NotchedTag style={style}>ADV</NotchedTag>
					<NotchedTag size='small' style={style}>
						ADV
					</NotchedTag>
					<NotchedTag type='filled' style={style}>
						ADV
					</NotchedTag>
					<NotchedTag size='small' type='filled' style={style}>
						ADV
					</NotchedTag>
				</div>
				<div>
					<NotchedTag tagStyle='style-two' style={style}>
						IO
					</NotchedTag>
					<NotchedTag size='small' tagStyle='style-two' style={style}>
						IO
					</NotchedTag>
					<NotchedTag tagStyle='style-two' type='filled' style={style}>
						IO
					</NotchedTag>
					<NotchedTag
						size='small'
						tagStyle='style-two'
						type='filled'
						style={style}
					>
						IO
					</NotchedTag>
				</div>
				<div>
					<NotchedTag tagStyle='style-three' style={style}>
						LI
					</NotchedTag>
					<NotchedTag size='small' tagStyle='style-three' style={style}>
						LI
					</NotchedTag>
					<NotchedTag tagStyle='style-three' type='filled' style={style}>
						LI
					</NotchedTag>
					<NotchedTag
						size='small'
						tagStyle='style-three'
						type='filled'
						style={style}
					>
						LI
					</NotchedTag>
				</div>
			</div>
		);
	},
});
