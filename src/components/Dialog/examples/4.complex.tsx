import _ from 'lodash';
import React from 'react';
import createClass from 'create-react-class';
import {
	Button,
	Dialog,
	CheckboxLabeled,
	SearchField,
	SearchableMultiSelect,
	SingleSelect,
} from '../../../index';

const style = {
	marginBottom: '3px',
};

const { Option } = SearchableMultiSelect;

const { Placeholder, Option: SingleOption } = SingleSelect;

export default createClass({
	getInitialState() {
		return {
			isShown: false,
			flavors: ['chocolate'],
		};
	},

	handleShow(isShown: any) {
		this.setState({ isShown });
	},

	handleSelectedChocolate(isSelected: any) {
		this.setState({
			flavors: isSelected
				? _.concat(this.state.flavors, 'chocolate')
				: _.without(this.state.flavors, 'chocolate'),
		});
	},

	handleSelectedStrawberry(isSelected: any) {
		this.setState({
			flavors: isSelected
				? _.concat(this.state.flavors, 'strawberry')
				: _.without(this.state.flavors, 'strawberry'),
		});
	},

	render() {
		return (
			<div>
				<Button onClick={_.partial(this.handleShow, !this.state.isShown)}>
					Toggle
				</Button>

				<Dialog
					isComplex
					isShown={this.state.isShown}
					handleClose={_.partial(this.handleShow, !this.state.isShown)}
					Header='Advanced Filters'
					size='medium'
				>
					<p style={{ fontSize: '16px' }}>Flavor</p>
					<CheckboxLabeled
						isSelected={_.includes(this.state.flavors, 'chocolate')}
						name='interactive-checkboxes'
						onSelect={this.handleSelectedChocolate}
						style={style}
					>
						<CheckboxLabeled.Label>Chocolate</CheckboxLabeled.Label>
					</CheckboxLabeled>
					<CheckboxLabeled
						isSelected={_.includes(this.state.flavors, 'strawberry')}
						name='interactive-checkboxes'
						onSelect={this.handleSelectedStrawberry}
						style={style}
					>
						<CheckboxLabeled.Label>Strawberry</CheckboxLabeled.Label>
					</CheckboxLabeled>

					<p style={{ fontSize: '16px', marginTop: '25px' }}>
						Flavor Combination Research
					</p>
					<SearchField placeholder='Sundae school...' />

					<p style={{ fontSize: '16px', marginTop: '25px' }}>Toppings</p>
					<SearchableMultiSelect responsiveMode='large'>
						<Option>cookie dough</Option>
						<Option>more ice cream</Option>
						<Option>mochi</Option>
						<Option>peanut butter cups</Option>
					</SearchableMultiSelect>

					<p style={{ fontSize: '16px', marginTop: '25px' }}>
						Ice Cream Breaks
					</p>
					<SingleSelect onSelect={this.handleSelect}>
						<Placeholder>You must select a break...</Placeholder>
						<SingleOption>10am</SingleOption>
						<SingleOption>11am</SingleOption>
						<SingleOption>1pm</SingleOption>
						<SingleOption>2pm</SingleOption>
					</SingleSelect>

					<Dialog.Footer>
						<Button
							kind='invisible'
							onClick={_.partial(this.handleShow, false)}
							style={{ marginRight: '9px' }}
						>
							Cancel
						</Button>
						<Button kind='primary'>Save</Button>
					</Dialog.Footer>
				</Dialog>
			</div>
		);
	},
});
