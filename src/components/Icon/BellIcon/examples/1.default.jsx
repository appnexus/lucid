import React from 'react';
import createClass from 'create-react-class';
import { BellIcon } from '../../../../index';

export default createClass({
	render() {
		const whitespace = { padding: 10 };

		return (
			<>
				<div style={whitespace}>
					<span style={whitespace}>
						<BellIcon />
					</span>
				</div>
				<div style={whitespace}>
					<span style={whitespace}>
						<BellIcon featuredColor='info' hasDot />
					</span>
					<span style={whitespace}>
						<BellIcon featuredColor='success' hasDot />
					</span>
					<span style={whitespace}>
						<BellIcon featuredColor='warning' hasDot />
					</span>
					<span style={whitespace}>
						<BellIcon featuredColor='danger' hasDot />
					</span>
				</div>
			</>
		);
	},
});
