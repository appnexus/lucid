import React from 'react';
import createClass from 'create-react-class';
import { SearchableMultiSelect, Resizer } from '../../../index';

const { Option } = SearchableMultiSelect;

export default createClass({
	getInitialState() {
		return {
			selectedLength: 0,
		};
	},
	handleChange(option: string, event: any) {
		let count = this.state.selectedLength;
		if (typeof event.props.children === 'string') {
			count--;
		} else {
			event.props.children.props.isSelected ? count-- : count++;
		}
		this.setState({
			selectedLength: count,
		});
	},
	handleRemoveAll(option: string, event: any) {
		this.setState({
			selectedLength: 0,
		});
	},
	render() {
		return (
			<Resizer>
				{(width) => {
					const responsiveMode = width >= 400 ? 'large' : 'small';

					return (
						<SearchableMultiSelect
							responsiveMode={responsiveMode}
							onRemoveAll={this.handleRemoveAll}
							onSelect={this.handleChange}
							Error={
								this.state.selectedLength > 1
									? null
									: 'Please select at least two options'
							}
						>
							<Option>Alabama</Option>
							<Option>Alaska</Option>
							<Option>Arizona</Option>
							<Option>Arkansas</Option>
							<Option>California</Option>
							<Option>Colorado</Option>
							<Option>Connecticut</Option>
							<Option>Delaware</Option>
							<Option>Florida</Option>
							<Option>Georgia</Option>
							<Option>Hawaii</Option>
							<Option>Idaho</Option>
							<Option>Illinois</Option>
							<Option>Indiana</Option>
							<Option>Iowa</Option>
							<Option>Kansas</Option>
							<Option>Kentucky</Option>
							<Option>Louisiana</Option>
							<Option>Maine</Option>
							<Option>Maryland</Option>
							<Option>Massachusetts</Option>
							<Option>Michigan</Option>
							<Option>Minnesota</Option>
							<Option>Mississippi</Option>
							<Option>Missouri</Option>
							<Option>Montana Nebraska</Option>
							<Option>Nevada</Option>
							<Option>New Hampshire</Option>
							<Option>New Jersey</Option>
							<Option>New Mexico</Option>
							<Option>New York</Option>
							<Option>North Carolina</Option>
							<Option>North Dakota</Option>
							<Option>Ohio</Option>
							<Option>Oklahoma</Option>
							<Option>Oregon</Option>
							<Option>Pennsylvania Rhode Island</Option>
							<Option>South Carolina</Option>
							<Option>South Dakota</Option>
							<Option>Tennessee</Option>
							<Option>Texas</Option>
							<Option>Utah</Option>
							<Option>Vermont</Option>
							<Option>Virginia</Option>
							<Option>Washington</Option>
							<Option>West Virginia</Option>
							<Option>Wisconsin</Option>
							<Option>Wyoming</Option>
						</SearchableMultiSelect>
					);
				}}
			</Resizer>
		);
	},
});
