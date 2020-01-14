import React from 'react';
import createClass from 'create-react-class';
import { RadioGroup, SingleSelect } from '../../../index';

const style = {
	marginRight: '13px',
};

export default createClass({
	render() {
		return (
			<RadioGroup>
				<RadioGroup.RadioButton style={style}>
					<RadioGroup.Label>Alvin</RadioGroup.Label>
				</RadioGroup.RadioButton>
				<RadioGroup.RadioButton style={style}>
					<RadioGroup.Label>
						Simon
						<RadioGroup>
							<RadioGroup.RadioButton>
								<RadioGroup.Label>1</RadioGroup.Label>
							</RadioGroup.RadioButton>
							<RadioGroup.RadioButton>
								<RadioGroup.Label>2</RadioGroup.Label>
							</RadioGroup.RadioButton>
						</RadioGroup>
					</RadioGroup.Label>
				</RadioGroup.RadioButton>
				<RadioGroup.RadioButton style={style}>
					<RadioGroup.Label>
						<SingleSelect>
							<SingleSelect.Option>One</SingleSelect.Option>
							<SingleSelect.Option>Two</SingleSelect.Option>
						</SingleSelect>
					</RadioGroup.Label>
				</RadioGroup.RadioButton>
			</RadioGroup>
		);
	},
});
