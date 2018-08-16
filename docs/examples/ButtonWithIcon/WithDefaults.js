import React from 'react';
import { ButtonWithIcon } from '../../../src/index.js';
import EditPageIcon from '../../../src/components/Icon/EditPageIcon/EditPageIcon';

export default class extends React.Component {
	render() {
		return <ButtonWithIcon icon={<EditPageIcon />} />;
	}
}
