import _, { omit } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import {
	findTypes,
	getFirst,
	Overwrite,
	StandardProps,
} from '../../util/component-types';
import { buildModernHybridComponent } from '../../util/state-management';
import * as reducers from './VerticalTabs.reducers';
import {
	IVerticalListMenuItemProps,
	VerticalListMenuDumb as VerticalListMenu,
} from '../VerticalListMenu/VerticalListMenu';

const cx = lucidClassNames.bind('&-VerticalTabs');

const { string, number, bool, func } = PropTypes;

/** Vertical Tabs Tab Child Component */
export interface IVerticalTabsTabProps extends StandardProps {
	/** Determines if the Tab is selected */
	isSelected?: boolean;

	/** Custom title for the tab */
	Title?: string;
}

const Tab = (_props: IVerticalTabsTabProps): null => null;

Tab.displayName = 'VerticalTabs.Tab';
Tab.peek = {
	description: `Content that will be rendered in a tab. Be sure to nest a \`Title\` inside each \`Tab\` or provide it as a prop.`,
};
Tab.propName = 'Tab';
Tab.propTypes = {
	/**
        Determines if the Tab is selected.
    */
	isSelected: bool,
};

/** Vertical Tabs Title Child Component */
const Title = (_props: StandardProps): null => null;

Title.displayName = 'VerticalTabs.Title';
Title.peek = {
	description: `A \`Title\` can be provided as a child or prop to a \`Tab\`.`,
};
Title.propName = 'Title';

/** Vertical Tabs Component */
interface IVerticalTabsPropsRaw extends StandardProps {
	/**
	 * Custom Tab component (alias for `VerticalTabs.Tab`)
	 */
	Tab?: React.ReactNode;

	/**
	 * Custom Title component (alias for `VerticalTabs.Title`)
	 */
	Title?: React.ReactNode;

	/**
	 * Indicates which of the \`VerticalTabs.Tab\` children is currently selected
	 */
	selectedIndex: number;

	/**
	 * Callback fired when the user selects a \`VerticalListMenu.Item\`.
	 */
	onSelect: (
		index: number,
		{
			event,
			props,
		}: {
			event: React.MouseEvent;
			props: IVerticalListMenuItemProps;
		}
	) => void;
}

export type IVerticalTabsProps = Overwrite<
	React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
	IVerticalTabsPropsRaw
>;

/** Default props for the VerticalTabs component */
const defaultProps = {
	selectedIndex: 0,
	onSelect: _.noop,
};

export interface IVerticalTabsState {
	selectedIndex: number;
}

class VerticalTabs extends React.Component<
	IVerticalTabsProps,
	IVerticalTabsState
> {
	static displayName = 'VerticalTabs';
	static propTypes = {
		/**
			Class names that are appended to the defaults.
		*/
		className: string,

		/**
			Indicates which of the \`VerticalTabs.Tab\` children is currently
			selected. The index of the last \`VerticalTabs.Tab\` child with
			\`isSelected\` equal to \`true\` takes precedence over this prop.
		*/
		selectedIndex: number,

		/**
			Callback for when the user clicks a tab. Called with the index of the tab
			that was clicked.  Signature: \`(index, { event, props}) => {}\`
		*/
		onSelect: func,
	};

	static defaultProps = defaultProps;
	static reducers = reducers;
	static Tab = Tab;
	static Title = Title;
	static peek = {
		description: `\`VerticalTabs\` provides vertically tabbed navigation. It has a flexible interface that allows tab content to be passed as regular React children or through props.`,
		categories: ['navigation'],
		madeFrom: ['VerticalListMenu'],
	};

	render(): React.ReactNode {
		const { className, onSelect, selectedIndex, ...passThroughs } = this.props;

		// Grab props array from each Tab
		const tabChildProps = _.map(
			findTypes(this.props, VerticalTabs.Tab),
			'props'
		);

		const selectedIndexFromChildren = _.findLastIndex(tabChildProps, {
			isSelected: true,
		});

		const actualSelectedIndex =
			selectedIndexFromChildren !== -1
				? selectedIndexFromChildren
				: selectedIndex;

		return (
			<div
				{...omit(passThroughs, [
					'className',
					'selectedIndex',
					'onSelect',
					'initialState',
					'callbackId',
				])}
				className={cx('&', className)}
			>
				<VerticalListMenu
					selectedIndices={[actualSelectedIndex]}
					onSelect={onSelect}
				>
					{_.map(tabChildProps, (tabChildProp, index) => (
						<VerticalListMenu.Item
							className={cx('&-Tab', {
								'&-Tab-is-active': actualSelectedIndex === index,
							})}
							key={index}
						>
							<span className={cx('&-Tab-content')}>
								{_.get(
									getFirst(tabChildProp, VerticalTabs.Title),
									'props.children',
									''
								)}
							</span>
						</VerticalListMenu.Item>
					))}
				</VerticalListMenu>
				<div className={cx('&-content')}>
					{_.get(tabChildProps, [actualSelectedIndex, 'children'])}
				</div>
			</div>
		);
	}
}

export default buildModernHybridComponent<
	IVerticalTabsProps,
	IVerticalTabsState,
	typeof VerticalTabs
>(VerticalTabs as any, { reducers });

export { VerticalTabs as VerticalTabsDumb };
