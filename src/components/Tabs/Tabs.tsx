import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import {
	getFirst,
	findTypes,
	StandardProps,
	Overwrite,
} from '../../util/component-types';
import { buildModernHybridComponent } from '../../util/state-management';
import * as reducers from './Tabs.reducers';
import Badge from '../Badge/Badge';

const cx = lucidClassNames.bind('&-Tabs');

const { bool, func, node, number, string, any } = PropTypes;

/** TITLE */
export interface ITitleProps extends StandardProps {}
const Title = (props: ITitleProps): null => null;
Title.peek = {
	description: `\`Titles\` can be provided as a child or prop to a \`Tab\`.`,
};
Title.displayName = 'Tabs.Title';
Title.propName = 'Title';

/** TAB */
export interface ITabProps extends StandardProps {
	/** The index of this \`Tab\` within the list of \`Tabs\`. */
	index?: number;

	/**Styles a \`Tab\` as disabled. This is typically used with
			\`isProgressive\` to disable steps that have not been completed and
			should not be selected until the current step has been completed. */
	isDisabled?: boolean;

	/** If \`true\`, this \`Tab\` is the last \`Tab\` in the list of \`Tabs\`. */
	isLastTab?: boolean;

	/** If \`true\` then the active \`Tab\` will appear open on the bottom. */
	isOpen?: boolean;

	/** If \`true\`, the \`Tab\` will appear as a \`Progressive\` tab. */
	isProgressive?: boolean;

	/** If \`true\`, the \`Tab\` will appear selected. */
	isSelected?: boolean;

	/** Callback for when the user clicks a \`Tab\`. Called with the index of the
			\`Tab\` that was clicked. */
	onSelect?: (
		index: number,
		tabProps: ITabProps,
		event: React.MouseEvent<HTMLLIElement>
	) => void;

	/** The content to be rendered as the \`Title\` of the \`Tab\`. */
	Title?: string | (React.ReactNode & { props: ITitleProps });

	/** Optional prop that will show a count number next to the tab's title. */
	count?: number | string;

	/** Defaults to false.
			Allows the count bubble to grow large. Useful if working with huge numbers. */
	isVariableCountWidth?: boolean;
}

type ITabPropsWithPassThroughs = Overwrite<
	React.DetailedHTMLProps<React.HTMLAttributes<HTMLLIElement>, HTMLLIElement>,
	ITabProps
>;

const Tab = (props: ITabPropsWithPassThroughs): React.ReactElement => {
	const {
		isDisabled,
		isLastTab,
		isOpen,
		isProgressive,
		isSelected,
		Title,
		className,
		count,
		isVariableCountWidth,
		index = 0, // this defaults should not be invoked unless someone is using `Tab` outside of `Tabs`
		onSelect = _.noop, // this defaults should not be invoked unless someone is using `Tab` outside of `Tabs`
		...passThroughs
	} = props;
	const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
		if (!isDisabled) {
			onSelect(index, props, event);
		}
	};

	return (
		<li
			className={cx(
				'&-Tab',
				{
					'&-Tab-is-active': isSelected,
					'&-Tab-is-disabled': isDisabled,
					'&-Tab-is-active-and-open': isOpen && isSelected,
					'&-Tab-is-progressive': isProgressive && !isLastTab,
				},
				className
			)}
			onClick={handleClick}
			{...passThroughs}
		>
			<span className={cx('&-Tab-content')}>
				{Title}
				{!_.isNil(count) && (
					<Badge
						style={{
							marginLeft: '12px',
							width: isVariableCountWidth ? undefined : '20px',
							minWidth: '20px',
						}}
						type='stroke'
						kind={isSelected ? 'primary' : 'default'}
					>
						{count}
					</Badge>
				)}
			</span>
			{isProgressive && !isLastTab && (
				<span className={cx('&-Tab-arrow')}>
					<svg
						className={cx('&-Tab-arrow-svg')}
						viewBox={'0 0 8 37'}
						preserveAspectRatio='none'
					>
						<polyline
							className={cx('&-Tab-arrow-tab-line')}
							fill='#fff'
							points='0,0 1,1 0,1'
						/>
						<polyline
							className={cx('&-Tab-arrow-line')}
							fill='none'
							stroke='#fff'
							strokeWidth='1'
							points={'0,37 7.3,18.5 0,0'}
						/>
					</svg>
				</span>
			)}
		</li>
	);
};

Tab.peek = {
	description: `Content that will be rendered in a tab. Be sure to nest a \`Title\` inside each \`Tab\` or provide it as a prop. Props other than \`isDisabled\`, \`isSelected\`, and \`Title\` can be inferred from the parent \`Tabs\` component, but directly provided \`props\` will take precedence.`,
};

Tab.displayName = 'Tabs.Tab';

Tab.propName = 'Tab';

Tab.propTypes = {
	/**
			Class names that are appended to the defaults.
		*/
	className: string,

	/**
			The index of this \`Tab\` within the list of \`Tabs\`.
		*/
	index: number,

	/**
			Styles a \`Tab\` as disabled. This is typically used with
			\`isProgressive\` to disable steps that have not been completed and
			should not be selected until the current step has been completed.
		*/
	isDisabled: bool,

	/**
			If \`true\`, this \`Tab\` is the last \`Tab\` in the list of \`Tabs\`.
		*/
	isLastTab: bool,

	/**
			If \`true\` then the active \`Tab\` will appear open on the bottom.
		*/
	isOpen: bool,

	/**
			If \`true\`, the \`Tab\` will appear as a \`Progressive\` tab.
		*/
	isProgressive: bool,

	/**
			If \`true\`, the \`Tab\` will appear selected.
		*/
	isSelected: bool,

	/**
			Callback for when the user clicks a \`Tab\`. Called with the index of the
			\`Tab\` that was clicked.
		*/
	onSelect: func,

	/**
			The content to be rendered as the \`Title\` of the \`Tab\`.
		*/
	Title: node,

	/**
			Optional prop that will show a count number next to the tab's title.
		*/
	count: number,

	/**
			Defaults to false.
			Allows the count bubble to grow large. Useful if working with huge numbers.
		*/
	isVariableCountWidth: bool,
};

/** TABS */
export interface ITabsProps extends StandardProps {
	/** Indicates which of the \`Tabs.Tab\` children is currently selected. The
	index of the last \`Tabs.Tab\` child with \`isSelected\` equal to
	\`true\` takes precedence over this prop. */
	selectedIndex?: number;

	/** Callback for when the user clicks a tab. Called with the index of the tab
	that was clicked. */
	onSelect?: (
		index: number,
		{
			props,
			event,
		}: { props: ITabProps; event: React.MouseEvent<HTMLLIElement> }
	) => void;

	/** If \`true\` then the active tab will appear open on the bottom. */
	isOpen?: boolean;

	/** Style the tabs as a progression. This is typically used for a work flow
	where the user needs to move forward and backward through a series of
	steps. */
	isProgressive?: boolean;

	/** Provides a small bottom border that offers a barrier between the tab
	group and the rest of the page.
	Useful if the tabs are not anchored to anything. */
	isFloating?: boolean;

	/** Set the multiline className. This is typically used for styling the
	Tab.Title bar for improved readability when there are multiple React
	elements in the tab headers. */
	hasMultilineTitle?: boolean;

	/** If \`true\` the width will be evenly distributed to all tabs.  \`False\`
	typically used in conjunction with \`Tab.width\` */
	hasFullWidthTabs?: boolean;

	/** *Child Element* Can be used to define one or more individual \`Tab\`s in
	the sequence of \`Tabs\`. */
	Tab?: string | (React.ReactNode & { props: ITabProps });

	Title?: string | (React.ReactNode & { props: ITitleProps });
}

type ITabsPropsWithPassThroughs = Overwrite<
	React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
	ITabsProps
>;

export interface ITabsState {
	selectedIndex: number;
}

/** TODO: Remove this constant when the component is converted to a functional component */
const nonPassThroughs = [
	'className',
	'selectedIndex',
	'onSelect',
	'isOpen',
	'isProgressive',
	'isFloating',
	'hasMultilineTitle',
	'hasFullWidthTabs',
	'Tab',
];

class Tabs extends React.Component<ITabsPropsWithPassThroughs, ITabsState> {
	static displayName = 'Tabs';
	static Title = Title;
	static Tab = Tab;

	static reducers = reducers;

	static peek = {
		description: `\`Tabs\` provides tabbed navigation. It has a flexible interface that allows \`tab\` content to be passed as regular \`React\` children or through \`props\`.`,
		categories: ['navigation'],
	};

	static propTypes = {
		/**
			Class names that are appended to the defaults.
		*/
		className: string,

		/**
			Indicates which of the \`Tabs.Tab\` children is currently selected. The
			index of the last \`Tabs.Tab\` child with \`isSelected\` equal to
			\`true\` takes precedence over this prop.
		*/
		selectedIndex: number,

		/**
			Callback for when the user clicks a tab. Called with the index of the tab
			that was clicked.
		*/
		onSelect: func,

		/**
			If \`true\` then the active tab will appear open on the bottom.
		*/
		isOpen: bool,

		/**
			Style the tabs as a progression. This is typically used for a work flow
			where the user needs to move forward and backward through a series of
			steps.
		*/
		isProgressive: bool,

		/**
			Provides a small bottom border that offers a barrier between the tab
			group and the rest of the page.
			Useful if the tabs are not anchored to anything.
		*/
		isFloating: bool,

		/**
			Set the multiline className. This is typically used for styling the
			Tab.Title bar for improved readability when there are multiple React
			elements in the tab headers.
		*/
		hasMultilineTitle: bool,

		/**
			If \`true\` the width will be evenly distributed to all tabs.  \`False\`
			typically used in conjunction with \`Tab.width\`
		*/
		hasFullWidthTabs: bool,

		Tab: any /**
			*Child Element* Can be used to define one or more individual \`Tab\`s in
			the sequence of \`Tabs\`.
		*/,
	};

	static defaultProps = {
		selectedIndex: 0,
		onSelect: _.noop,
		isOpen: true,
		isProgressive: false,
		isFloating: false,
		hasMultilineTitle: false,
		hasFullWidthTabs: false,
	};

	handleClicked = (
		index: number,
		tabProps: ITabProps,
		event: React.MouseEvent<HTMLLIElement>
	): void => {
		const { onSelect } = this.props;

		onSelect && onSelect(index, { event, props: tabProps });
	};

	render() {
		const {
			className,
			hasMultilineTitle,
			isOpen,
			isProgressive,
			selectedIndex,
			hasFullWidthTabs,
			isFloating,
			...passThroughs
		} = this.props;

		// Grab props array from each Tab
		const tabChildProps = _.map(findTypes(this.props, Tab), 'props');

		const selectedIndexFromChildren = _.findLastIndex(tabChildProps, {
			isSelected: true,
		});

		const actualSelectedIndex =
			selectedIndexFromChildren !== -1
				? selectedIndexFromChildren
				: selectedIndex;
		return (
			<div
				{...(_.omit(passThroughs, nonPassThroughs) as any)}
				className={cx('&', className)}
			>
				<ul
					className={cx('&-bar', {
						'&-bar-is-multiline': hasMultilineTitle,
						'&-variable-width': !hasFullWidthTabs,
						'&-floating': isFloating,
					})}
				>
					{_.map(tabChildProps, (tabProps, index) => (
						<Tab
							key={index}
							index={index}
							isLastTab={index === tabChildProps.length - 1}
							isOpen={isOpen}
							isProgressive={isProgressive}
							isSelected={index === actualSelectedIndex}
							onSelect={this.handleClicked}
							Title={_.get(
								getFirst(tabProps, Tabs.Title),
								'props.children',
								''
							)}
							{...tabProps}
						/>
					))}
				</ul>
				<div className={cx('&-content')}>
					{_.get(tabChildProps, [
						_.isUndefined(actualSelectedIndex) ? '' : actualSelectedIndex,
						'children',
					])}
				</div>
			</div>
		);
	}
}

export default buildModernHybridComponent<ITabsProps, ITabsState, typeof Tabs>(
	Tabs,
	{ reducers }
);
export { Tabs as TabsDumb };
