import _ from 'lodash';
import React, { Component, ComponentType, isValidElement, ReactNode } from 'react';
import { IHybridCompatibleProps, Reducers, buildModernHybridComponent } from '../../util/state-management';

interface IExpanderLabelProps {
	description?: string;
	children?: React.ReactNode;
}

interface IExpanderProps extends IHybridCompatibleProps {
	/**
	 * Indicates that the component is in the "expanded" state when true and in
	 * the "unexpanded" state when false.
	 * */
	isExpanded: boolean;

	/**
	 * Called when the user clicks on the component's header.
	 * */
	onToggle: (
		isExpanded: boolean,
		{
			event,
			props,
		}: { event: React.MouseEvent<HTMLElement>; props: IExpanderProps }
	) => void;

	/** Child element whose children represents content to be shown next to the
	 * expander icon.
	 * */
	Label?: ReactNode & { props: IExpanderLabelProps };
	// Label?: React.ReactElement<IExpanderLabelProps, "Label">;

}

interface IExpanderState {
	isExpanded: boolean;
}

const reducers: Reducers<IExpanderProps, IExpanderState> = {
	onToggle: state => {
		return { ...state, isExpanded: state.isExpanded };
	},
};

const Label: React.SFC<IExpanderLabelProps> = props => {
	return (
		<div>{props.children}</div>
	);
};

export class ModernHybridDemoDumb extends Component<IExpanderProps, {}> {
	static displayName = 'Expander';
	constructor(props: IExpanderProps) {
		super(props);

		this.handleToggle = this.handleToggle.bind(this);
	}

	static defaultProps = {
		onToggle: _.noop,
		Label: <Label/>,
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
				<Label>{this.props.Label}</Label>
			</div>
		);
	}
}

export const ModernHybridDemoSmart = buildModernHybridComponent<IExpanderProps, IExpanderState>(
	ModernHybridDemoDumb,
	{ reducers }
);

