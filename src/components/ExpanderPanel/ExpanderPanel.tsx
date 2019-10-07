import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import {
	getFirst,
	omitProps,
	StandardProps,
	FC,
} from '../../util/component-types';
import { buildHybridComponent } from '../../util/state-management';
import { IExpanderState } from '../Expander/Expander';
import ChevronIcon from '../Icon/ChevronIcon/ChevronIcon';
import Collapsible from '../Collapsible/Collapsible';
import Button from '../Button/Button';
import Panel from '../Panel/Panel';

import * as reducers from '../Expander/Expander.reducers';

const cx = lucidClassNames.bind('&-ExpanderPanel');

const { any, bool, func, node, object, string } = PropTypes;

interface IExpanderPanelHeaderProps extends StandardProps {
	description?: string;
}

const Header: FC<IExpanderPanelHeaderProps> = (): null => null;
Header.displayName = 'ExpanderPanel.Header';
Header.peek = {
	description: `
		Renders a \`<span>\` of content next to the \`ChevronIcon\` in the
		\`Panel.Header\`
	`,
};
Header.propName = 'Header';
Header.propTypes = {
	children: node`
		Used to identify the purpose of this switch to the user -- can be any
		renderable content.
	`,
};

interface IExpanderPanelProps extends StandardProps {
	/** Indicates that the component is in the "expanded" state when true and in
			the "unexpanded" state when false. */
	isExpanded?: boolean;

	/** Indicates that the component is in the "disabled" state when true and in
			the "enabled" state when false. */
	isDisabled?: boolean;

	/** Controls the presence of padding on the inner content. */
	hasPadding?: boolean;

	/** Called when the user clicks on the component's header.
			Signature: \`(isExpanded, { event, props }) => {}\` */
	onToggle: (
		isExpanded: boolean,
		{
			event,
			props,
		}: {
			event: React.MouseEvent;
			props: IExpanderPanelProps;
		}
	) => void;

	/** prop alternative to Header child component passed through to the
			underlying ExpanderPanel */
	Header?: React.ReactNode;
}

class ExpanderPanel extends React.Component<
	IExpanderPanelProps,
	IExpanderState
> {
	static displayName = 'ExpanderPanel';
	static Header = Header;
	static propTypes = {
		children: node`
			Expandable content.
		`,

		className: string`
			Appended to the component-specific class names set on the root element.
		`,

		isExpanded: bool`
			Indicates that the component is in the "expanded" state when true and in
			the "unexpanded" state when false.
		`,

		isDisabled: bool`
			Indicates that the component is in the "disabled" state when true and in
			the "enabled" state when false.
		`,

		hasPadding: bool`
			Controls the presence of padding on the inner content.
		`,

		onToggle: func`
			Called when the user clicks on the component's header.
			Signature: \`(isExpanded, { event, props }) => {}\`
		`,

		style: object`
			Passed through to the root element.
		`,

		Header: any`
			prop alternative to Header child component passed through to the
			underlying ExpanderPanel
		`,
	};

	static definition = {
		statics: {
			Header,
			reducers,
			peek: {
				description: `
					This is a container that provides a toggle that controls when the
					content is shown.
				`,
				categories: ['layout'],
				madeFrom: ['ChevronIcon', 'Expander', 'Panel'],
			},
		},
	};

	static defaultProps = {
		isExpanded: false,
		onToggle: _.noop,
		hasPadding: true,
	};

	handleToggle = (event: React.MouseEvent) => {
		if (!this.props.isDisabled) {
			this.props.onToggle(!this.props.isExpanded, {
				event,
				props: this.props,
			});
		}
	};

	render() {
		const {
			children,
			className,
			isExpanded,
			isDisabled,
			hasPadding,
			style,
			...passThroughs
		} = this.props;

		const headerChildProps = _.get(
			getFirst(this.props, ExpanderPanel.Header),
			'props'
		);

		return (
			<Panel
				{...omitProps(passThroughs, undefined, _.keys(ExpanderPanel), false)}
				className={cx(
					'&',
					{
						'&-is-collapsed': !isExpanded,
						'&-is-disabled': isDisabled,
					},
					className
				)}
				style={style}
				isGutterless={!hasPadding}
			>
				<Panel.Header className={cx('&-header')} onClick={this.handleToggle}>
					<Button className={cx('&-icon')} kind='invisible' hasOnlyIcon={true}>
						<ChevronIcon direction={isExpanded ? 'up' : 'down'} />
					</Button>

					<span {...headerChildProps} />
				</Panel.Header>

				<Collapsible
					isExpanded={isExpanded}
					className={cx('&-content', {
						'&-content-is-expanded': isExpanded,
					})}
				>
					<div className={cx('&-content-inner')}>{children}</div>
				</Collapsible>
			</Panel>
		);
	}
}

export default buildHybridComponent(ExpanderPanel);
export { ExpanderPanel as ExpanderPanelDumb };
