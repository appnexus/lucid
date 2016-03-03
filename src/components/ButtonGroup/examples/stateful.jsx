import React from 'react';
import ButtonGroup from '../ButtonGroup';
import { buildStatefulComponent } from '../../../util/state-management';

var StatefulButtonGroup = buildStatefulComponent(ButtonGroup);

export default React.createClass({
	render() {
		return (
			<StatefulButtonGroup>
				<StatefulButtonGroup.Button>Zero</StatefulButtonGroup.Button>
				<StatefulButtonGroup.Button>One</StatefulButtonGroup.Button>
				<StatefulButtonGroup.Button>Two</StatefulButtonGroup.Button>
				<StatefulButtonGroup.Button>Three</StatefulButtonGroup.Button>
			</StatefulButtonGroup>
		);
	}
});
