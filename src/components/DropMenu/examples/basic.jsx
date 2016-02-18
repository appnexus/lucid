import React from 'react';
import DropMenuStateless from '../DropMenu';
import { buildStatefulComponent } from '../../../util/state-management';

const DropMenu = buildStatefulComponent(DropMenuStateless, {setStateWithNewProps: true, replaceEvents: false});

export default React.createClass({
	getInitialState() {
		return {
		  selectedIndices: []
		};
	},

	handleSelect(optionIndex) {
		 console.log('selected <'+optionIndex+'>');
		 this.setState({
			selectedIndices: [optionIndex]
		 });
	},

	render() {
		const { selectedIndices } = this.state;
		const options = ['Banner','Interstitial','Video','Native'];

		return (
			<DropMenu onSelect={this.handleSelect} Control={_.isEmpty(selectedIndices) ? 'Select' : options[_.last(selectedIndices)]} Option={options} />
		);

		//return (
		//	<DropMenu onSelect={this.handleSelect}>
		//		<DropMenu.Control>{_.isEmpty(selectedIndices) ? 'Select' : options[_.last(selectedIndices)]}</DropMenu.Control>
		//		_.map(options, (optionText, index) => (
		//			<DropMenu.Option key={'Option-' + index}>{optionText}</DropMenu.Option>
		//		))
		//	</DropMenu>
		//);
	}
});
