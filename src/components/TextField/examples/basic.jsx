import React from 'react';
import TextField from '../TextField';

export default React.createClass({
	render() {
		return (
			<div>
				<TextField style={{width: '300px'}} />
				<TextField placeholder='Enter some text'/>
				<TextField Error='No bueno' />
				<TextField value='Cant type me' isDisabled={true} />
				<TextField isMultiLine={true} rows={10} />
			</div>
		);
	}
});
