import React from 'react';
import createClass from 'create-react-class';
import { Collapsible } from '../../../index';

const onRest = () => {
	alert(
		'I am and always will be the optimist. The hoper of far-flung hopes and the dreamer of improbable dreams.'
	);
};

export default createClass({
	getInitialState() {
		return {
			isExpanded: false,
		};
	},

	handleToggle() {
		this.setState({
			isExpanded: !this.state.isExpanded,
		});
	},

	render() {
		return (
			<section>
				<button onClick={this.handleToggle}>toggle</button>

				<Collapsible
					isExpanded={this.state.isExpanded}
					style={{ background: 'lightgray' }}
					onRest={onRest}
				>
					<p>
						Everybody knows that everybody dies. But not every day. Not today.
						Some days are special. Some days are so, so blessed. Some days,
						nobody dies at all. Now and then, every once in a very long while,
						every day in a million days, when the wind stands fair and the
						Doctor comes to call, everybody lives.
					</p>
				</Collapsible>
			</section>
		);
	},
});
