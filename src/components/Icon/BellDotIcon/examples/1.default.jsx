import React from 'react';
import createClass from 'create-react-class';
import { BellDotIcon } from '../../../../index';

export default createClass({
	render() {
		const whitespace = { padding: 10 };

		return (
			<>
				<div style={whitespace}>
					<span style={whitespace}>
						<BellDotIcon />
					</span>
				</div>
				<div style={whitespace}>
					<span style={whitespace}>
						<BellDotIcon featuredColor='info' hasDot />
					</span>
					<span style={whitespace}>
						<BellDotIcon featuredColor='success' hasDot />
					</span>
					<span style={whitespace}>
						<BellDotIcon featuredColor='warning' hasDot />
					</span>
					<span style={whitespace}>
						<BellDotIcon featuredColor='danger' hasDot />
					</span>
				</div>
			</>
		);
	},
});
