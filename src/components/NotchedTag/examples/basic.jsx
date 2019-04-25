import React from 'react';
import createClass from 'create-react-class';
import { NotchedTag } from '../../../index';

const style = { display: 'inline-block', marginRight: '10px' };
export default createClass({
	render() {
		return (
			<div>
				<div>
					<NotchedTag style={style}>LRG</NotchedTag>
					<NotchedTag size="small" style={style}>
						SM
					</NotchedTag>
					<NotchedTag type="filled" style={style}>
						LRG
					</NotchedTag>
					<NotchedTag size="small" type="filled" style={style}>
						SM
					</NotchedTag>
				</div>
				<div>
					<NotchedTag tagStyle="style-two" style={style}>
						LRG
					</NotchedTag>
					<NotchedTag size="small" tagStyle="style-two" style={style}>
						SM
					</NotchedTag>
					<NotchedTag tagStyle="style-two" type="filled" style={style}>
						LRG
					</NotchedTag>
					<NotchedTag
						size="small"
						tagStyle="style-two"
						type="filled"
						style={style}
					>
						SM
					</NotchedTag>
				</div>
				<div>
					<NotchedTag tagStyle="style-three" style={style}>
						LRG
					</NotchedTag>
					<NotchedTag size="small" tagStyle="style-three" style={style}>
						SM
					</NotchedTag>
					<NotchedTag tagStyle="style-three" type="filled" style={style}>
						LRG
					</NotchedTag>
					<NotchedTag
						size="small"
						tagStyle="style-three"
						type="filled"
						style={style}
					>
						SM
					</NotchedTag>
				</div>
			</div>
		);
	},
});
