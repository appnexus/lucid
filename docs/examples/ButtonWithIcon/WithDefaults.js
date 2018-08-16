import React from 'react';
import { ButtonWithIcon } from '../../../src/index.js';
import { CheckIcon } from '../../../src/components/Icon/CheckIcon/CheckIcon.jsx';

export default class extends React.Component {
	render() {
		return <ButtonWithIcon Icon={CheckIcon} />;
	}
}
