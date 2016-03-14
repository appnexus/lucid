import React from 'react';
import TextField from '../TextField';

export default React.createClass({
	render() {
		return (
			<div>
				<TextField />
				<TextField placeholder='Enter some text'/>
				<TextField value='Cant type me' isDisabled={true} />
				<TextField isMultiLine={true} rows={10} />
			</div>
		);
	}
});
