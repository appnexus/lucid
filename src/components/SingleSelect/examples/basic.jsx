import React from 'react';
import { buildStatefulComponent } from '../../../util/state-management';
import SingleSelectStateless from '../../SingleSelect/SingleSelect';

const SingleSelect = buildStatefulComponent(SingleSelectStateless);

export default React.createClass({
	getInitialState() {
		return {};
	},

	handleSelect(selectedIndex) {
		console.log(`selected index: ${selectedIndex}`);
	},

	render() {
		let {
			Option,
			OptionGroup
		} = SingleSelect;

		return (
			<section>
				<SingleSelect onSelect={this.handleSelect} Placeholder='Select One'>
					<OptionGroup>
						Preferred
						<Option>foo</Option>
						<Option isDisabled>bar</Option>
						<Option>baz</Option>
					</OptionGroup>

					<OptionGroup>
						Available
						<Option>spam</Option>
						<Option>ham</Option>
						<Option>eggs</Option>
					</OptionGroup>

					<Option>aaaa</Option>
					<Option>bbb</Option>
					<Option>cccc</Option>
				</SingleSelect>

				<SingleSelect isDisabled selectedIndex={3} onSelect={this.handleSelect} Placeholder='Select One'>
					<Option>aaaa</Option>
					<Option>bb</Option>
					<Option isDisabled>ccc</Option>
					<Option>dddddddddd</Option>
					<Option>eeeeee</Option>
					<Option>ffffffffffff</Option>
					<Option>ggggggggggggggggggggg</Option>
				</SingleSelect>

				<SingleSelect onSelect={this.handleSelect} Placeholder='Pick One' Option={['Foo', 'Bar', 'Bax', 'Bay', 'Baz']} />
			</section>
		);
	}
});
