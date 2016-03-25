import React from 'react';
import SingleSelectStateless from '../SingleSelect';
import { buildStatefulComponent } from '../../../util/state-management';

const SingleSelect = buildStatefulComponent(SingleSelectStateless);
const {
	Placeholder,
	Option
} = SingleSelect;

export default React.createClass({
	getInitialState() {
		return {
			selectedIndex: null
		};
	},

	handleSelect(optionIndex) {
		this.setState({
			selectedIndex: optionIndex
		});
	},

	render() {
		return (
			<section>

				<SingleSelect onSelect={this.handleSelect}>
					<Placeholder>Select Color</Placeholder>
					<Option>Red</Option>
					<Option>Green</Option>
					<Option>Blue</Option>
				</SingleSelect>

				<section>
					Selected Index: {JSON.stringify(this.state.selectedIndex)}
				</section>
			</section>
		);
	}
});
