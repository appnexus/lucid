import _ from 'lodash';
import React, { Component, ComponentType, isValidElement } from 'react';
import { buildModernHybridComponent, IHybridCompatibleProps, Reducers } from '../../util/state-management';
import PropTypes from 'react-peek/prop-types';
import { findTypes } from '../../util/component-types';
import { createSelector } from 'reselect';


interface IExpanderProps extends IHybridCompatibleProps {
	isExpanded: boolean;
	onToggle: (
		isExpanded: boolean,
		{
			event,
			props,
		}: { event: React.MouseEvent<HTMLElement>; props: IExpanderProps }
	) => void;
}

interface IExpanderState {
	isExpanded: boolean;
}

const reducers: Reducers<IExpanderProps, IExpanderState> = {
	onToggle: state => {
		return { ...state, isExpanded: state.isExpanded };
	},
};

export class ModernHybridDemoDumb extends Component<IExpanderProps, {}> {
	static displayName = 'Expander';
	constructor(props: IExpanderProps) {
		super(props);

		this.handleToggle = this.handleToggle.bind(this);
	}

	static defaultProps = {
		onToggle: _.noop,
	};

	handleToggle(event: React.MouseEvent<HTMLElement>) {
		this.props.onToggle(!this.props.isExpanded, {
			event,
			props: this.props,
		});
	}

	render() {
		return (
			<div>
				{this.props.isExpanded ? 'yes' : 'no'}
				<button onClick={this.handleToggle}>click me</button>
			</div>
		);
	}
}

export default buildModernHybridComponent<IExpanderProps, IExpanderState>(
	ModernHybridDemoDumb,
	{ reducers }
);
