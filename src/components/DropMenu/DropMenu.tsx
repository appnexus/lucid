import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { lucidClassNames, uniqueName } from '../../util/style-helpers';
import {
	StandardProps,
	getFirst,
	rejectTypes,
	findTypes,
	Overwrite,
} from '../../util/component-types';
import { scrollParentTo } from '../../util/dom-helpers';
import { buildModernHybridComponent } from '../../util/state-management';
import * as KEYCODE from '../../constants/key-code';
import * as reducers from './DropMenu.reducers';
import ContextMenu from '../ContextMenu/ContextMenu';

function joinArray(
	array: React.ReactNode[],
	getSeparator: (
		element: React.ReactNode,
		index: number,
		array: React.ReactNode[]
	) => React.ReactNode
) {
	return _.reduce(
		array,
		(newArray: React.ReactNode[], element, index) => {
			newArray.push(element);
			if (index < _.size(array) - 1) {
				newArray.push(getSeparator(element, index, array));
			}
			return newArray;
		},
		[]
	);
}

function isOptionVisible(option: IOptionsData) {
	return !option.optionProps.isHidden;
}

const cx = lucidClassNames.bind('&-DropMenu');

const { any, arrayOf, bool, func, node, number, object, oneOf, string } =
	PropTypes;

/** Header */
export interface IDropMenuHeaderProps extends StandardProps {
	description?: string;
}

const Header = (_props: IDropMenuHeaderProps): null => null;
Header.displayName = 'DropMenu.Header';
Header.peek = {
	description: `
		An optional header to be displayed within the expanded Flyout,
		above all \`Option\`s.
	`,
};
Header.propName = 'Header';
Header.propTypes = {};

/** Control */
export interface IDropMenuControlProps extends StandardProps {
	description?: string;
}

const Control = (_props: IDropMenuControlProps): null => null;
Control.displayName = 'DropMenu.Control';
Control.peek = {
	description: `Renders a \`<div>\` that acts as the control target which the flyout menu is anchored to. Only one \`Control\` is used.`,
};
Control.propName = 'Control';
Control.propTypes = {};

/** Option Group */
export interface IDropMenuOptionGroupProps extends StandardProps {
	description?: string;
	isHidden?: boolean;
}

export type OptionGroupFC = (props: IDropMenuOptionGroupProps) => null;

const OptionGroup = (_props: IDropMenuOptionGroupProps): null => null;
OptionGroup.displayName = 'DropMenu.OptionGroup';
OptionGroup.peek = {
	description: `A special kind of \`Option\` that is always rendered at the top of the menu and has an \`optionIndex\` of \`null\`. Useful for unselect.`,
};
OptionGroup.propName = 'OptionGroup';
OptionGroup.propTypes = {
	/**
		hides the \`OptionGroup\` from the list.
	*/
	isHidden: bool,
};
OptionGroup.defaultProps = {
	isHidden: false,
};

/** Option */
export interface IDropMenuOptionProps extends StandardProps {
	isDisabled?: boolean;
	isHidden?: boolean;
	isWrapped?: boolean;
	Selected?: any;
}

const Option = (_props: IDropMenuOptionProps): null => null;
Option.displayName = 'DropMenu.Option';
Option.peek = {
	description: `
		Renders a \`<div>\` that acts as an option in the menu.
	`,
};
Option.propName = 'Option';
Option.propTypes = {
	/**
		disables selection of the \`Option\`.
	*/
	isDisabled: bool,

	/**
		hides the \`Option\` from the list.
	*/
	isHidden: bool,

	/**
		controls wrapping of the text.
	*/
	isWrapped: bool,
};
Option.defaultProps = {
	isDisabled: false,
	isHidden: false,
	isWrapped: true,
};

/** Null Option */
export interface IDropMenuNullOptionProps extends StandardProps {
	description?: string;
}

const NullOption = (_props: IDropMenuNullOptionProps): null => null;
NullOption.displayName = 'DropMenu.NullOption';
NullOption.peek = {
	description: `A special kind of \`Option\` that is always rendered at the top of the menu and has an \`optionIndex\` of \`null\` used for deselecting.`,
};
NullOption.propName = 'NullOption';
NullOption.propTypes = {};

/** Fixed Option */
export interface IDropMenuFixedOptionProps extends StandardProps {
	description?: string;
	isDisabled: boolean;
	isHidden: boolean;
	isWrapped: boolean;
}

const FixedOption = (_props: IDropMenuFixedOptionProps): null => null;
FixedOption.displayName = 'DropMenu.FixedOption';
FixedOption.peek = {
	description: `
		A special kind of \`Option\` that is always rendered at the top of
		the menu.
	`,
};
FixedOption.propName = 'FixedOption';
FixedOption.propTypes = {
	/**
		disables selection of the \`Option\`.
	*/
	isDisabled: bool,

	/**
		hides the \`Option\` from the list.
	*/
	isHidden: bool,

	/**
		controls wrapping of the text.
	*/
	isWrapped: bool,
};
FixedOption.defaultProps = {
	isDisabled: false,
	isHidden: false,
	isWrapped: true,
};

/** Context Menu */
export interface IDropMenuContextMenuProps extends StandardProps {
	description?: string;
}

const DropMenuContextMenu = (_props: IDropMenuContextMenuProps): null => null;
DropMenuContextMenu.displayName = 'DropMenu.ContextMenu';
DropMenuContextMenu.peek = {
	description: `Props that are passed through to the underlying ContextMenu.`,
};
DropMenuContextMenu.propName = 'ContextMenu';
DropMenuContextMenu.propTypes = {
	children: node /**/,
};

/** Drop Menu */
export interface IDropMenuProps extends StandardProps {
	/** Disables the DropMenu from being clicked or focused. */
	isDisabled?: boolean;

	/** Renders the flyout menu adjacent to the control. */
	isExpanded?: boolean;

	/** Sets the direction the flyout menu will render relative to the control. */
	direction?: 'down' | 'up';

	/** Sets the alignment the flyout menu will render relative to the control. */
	alignment?: 'start' | 'center' | 'end';

	/** An array of currently selected \`DropMenu.Option\` indices. */
	selectedIndices?: number[] | null;

	/** The currently focused index of \`DropMenu.Option\`. Can also be \`null\`. */
	focusedIndex?: number | null;

	/** The \`id\` of the flyout menu portal element that is appended to
			\`document.body\`. Defaults to a generated id. */
	portalId?: string;

	/** Styles that are passed through to the ContextMenu FlyOut element. */
	flyOutStyle?: object;

	/** Styles that are passed through to the option container element. */
	optionContainerStyle?: object;

	/** Called when collapsed and the control is clicked, or when the control has
			focus and the Down Arrow is pressed. */
	onExpand?: ({
		props,
		event,
	}: {
		props: IDropMenuPropsWithPassThroughs;
		event: React.KeyboardEvent | React.MouseEvent;
	}) => void;

	/** Called when expanded and the user clicks the control or outside of the
			menu, or when the control has focus and the Escape key is pressed */
	onCollapse?: ({
		props,
		event,
	}: {
		props: IDropMenuPropsWithPassThroughs;
		event: React.KeyboardEvent | React.MouseEvent;
	}) => void;

	/** Called when an option is clicked, or when an option has focus and the
			Enter key is pressed. */
	onSelect?: (
		optionIndex: any,
		{
			props,
			event,
		}: {
			props: IDropMenuOptionProps | undefined;
			event: React.KeyboardEvent | React.MouseEvent;
		}
	) => void;

	/** Called when expanded and the the Down Arrow key is pressed. Not called
			when focus is on the last option. */
	onFocusNext?: ({
		props,
		event,
	}: {
		props: IDropMenuPropsWithPassThroughs;
		event: React.KeyboardEvent;
	}) => void;

	/** Called when expanded and the the Up Arrow key is pressed. Not called when
			focus is on the first option. */
	onFocusPrev?: ({
		props,
		event,
	}: {
		props: IDropMenuPropsWithPassThroughs;
		event: React.KeyboardEvent;
	}) => void;

	onFocusOption?: (
		optionIndex: number | null,
		{
			props,
			event,
		}: {
			props: IDropMenuPropsWithPassThroughs;
			event: React.KeyboardEvent | React.MouseEvent;
		}
	) => void;

	/** *Child Element* - The control target which the flyout menu is anchored
			to. Only one \`Control\` is used. */
	Control?: React.ReactNode;

	/** *Child Element* - These are menu options. The \`optionIndex\` is in-order
			of rendering regardless of group nesting, starting with index \`0\`.
			Each \`Option\` may be passed a prop called \`isDisabled\` to disable
			selection of that \`Option\`.  Any other props pass to Option will be
			available from the \`onSelect\` handler. */
	Option?: React.ReactNode;

	/** *Child Element* - Used to group \`Option\`s within the menu. Any
			non-\`Option\`s passed in will be rendered as a label for the group. */
	OptionGroup?: React.ReactNode;

	/** *Child Element* - A special kind of \`Option\` that is always rendered at
			the top of the menu and has an \`optionIndex\` of \`null\`. Useful for
			unselect. */
	NullOption?: React.ReactNode;

	/** *Child Element* - An optional header to be displayed within the expanded
			Flyout, above all \`Option\`s. */
	Header?: React.ReactNode;

	/** *Child Element* - props pass through to the underlying ContextMenu
			component */
	ContextMenu?: React.ReactNode;

	/** *Child Element* - A special kind of \`Option\` that is always rendered at the top of
			the menu. */
	FixedOption?: React.ReactNode;
}

type IDropMenuPropsWithPassThroughs = Overwrite<
	React.DetailedHTMLProps<React.DOMAttributes<HTMLDivElement>, HTMLDivElement>,
	IDropMenuProps
>;

/** TODO: Remove the nonPassThroughs when the component is converted to a functional component */
const nonPassThroughs = [
	'children',
	'className',
	'style',
	'isDisabled',
	'isExpanded',
	'direction',
	'alignment',
	'selectedIndices',
	'focusedIndex',
	'portalId',
	'flyOutStyle',
	'optionContainerStyle',
	'onExpand',
	'onCollapse',
	'onSelect',
	'onFocusNext',
	'onFocusPrev',
	'onFocusOption',
	'Control',
	'Option',
	'OptionGroup',
	'NullOption',
	'Header',
	'ContextMenu',
	'FixedOption',
	'initialState',
	'callbackId',
];

export interface IOptionsData {
	localOptionIndex: number;
	optionIndex: number;
	optionGroupIndex: number | null;
	optionProps: IDropMenuOptionProps;
}

export interface IHasOptionChildren<
	OptionGroupProps,
	OptionProps,
	NullOptionProps,
	FixedOptionProps
> {
	OptionGroup: (_props: OptionGroupProps) => null;
	Option: (_props: OptionProps) => null;
	NullOption: (_props: NullOptionProps) => null;
	FixedOption: (_props: FixedOptionProps) => null;
}

export interface IDropMenuState {
	isMouseTriggered: boolean;
	optionGroups: IDropMenuOptionGroupProps[];
	flattenedOptionsData: IOptionsData[];
	ungroupedOptionData: IOptionsData[];
	optionGroupDataLookup: { [key: number]: IOptionsData[] };
	fixedOptionData: IOptionsData[];
	portalId: string;
	isExpanded: boolean;
	focusedIndex: number | null;
	selectedIndices: number[];
	nullOptions: IDropMenuNullOptionProps[];
	optionGroupIndex: number | null;
	optionProps: [];
}

class DropMenu extends React.Component<
	IDropMenuPropsWithPassThroughs,
	IDropMenuState
> {
	private _header: React.RefObject<HTMLDivElement>;

	constructor(props: IDropMenuPropsWithPassThroughs) {
		super(props);
		this.state = {
			optionGroups: [],
			flattenedOptionsData: [],
			ungroupedOptionData: [],
			optionGroupDataLookup: {},
			nullOptions: [],
			fixedOptionData: [],
			isMouseTriggered: false,
			portalId: this.props.portalId || uniqueName('DropMenu-Portal-'),
			isExpanded: false,
			focusedIndex: null,
			optionGroupIndex: null,
			optionProps: [],
			selectedIndices: [],
			...(this.getPreprocessedOptionData(props) as any), // TODO: typescript hack that should be removed
		};

		this._header = React.createRef<HTMLDivElement>();
	}

	static displayName = 'DropMenu';

	static ContextMenu = DropMenuContextMenu;
	static FixedOption = FixedOption;
	static NullOption = NullOption;
	static Option = Option;
	static OptionGroup = OptionGroup;
	static Control = Control;
	static Header = Header;

	static peek = {
		ContextMenu: DropMenuContextMenu,
		description: `\`DropMenu\` is a helper component used to render a menu of options attached to any control. Supports option groups with and without labels as well as special options with a \`null\` index for unselect.`,
		categories: ['helpers'],
		madeFrom: ['ContextMenu'],
	};

	static reducers = reducers;

	static propTypes = {
		/**
			Should be instances of: \`DropMenu.Control\`, \`DropMenu.Option\`,
			\`DropMenu.OptionGroup\`, \`DropMenu.Nulloption\`. Other direct child
			elements will not render.
		*/
		children: node,

		className: string /**
			Appended to the component-specific class names set on the root elements.
			Applies to *both* the control and the flyout menu.
		*/,

		/**
			Styles that are passed through to root element.
		*/
		style: object,

		/**
			Disables the DropMenu from being clicked or focused.
		*/
		isDisabled: bool,

		/**
			Renders the flyout menu adjacent to the control.
		*/
		isExpanded: bool,

		/**
			Sets the direction the flyout menu will render relative to the control.
		*/
		direction: oneOf(['down', 'up']),

		/**
			Sets the alignment the flyout menu will render relative to the control.
		*/
		alignment: oneOf(['start', 'center', 'end']),

		/**
			An array of currently selected \`DropMenu.Option\` indices.
		*/
		selectedIndices: arrayOf(number),

		/**
			The currently focused index of \`DropMenu.Option\`. Can also be \`null\`.
		*/
		focusedIndex: number,

		/**
			The \`id\` of the flyout menu portal element that is appended to
			\`document.body\`. Defaults to a generated id.
		*/
		portalId: string,

		/**
			Styles that are passed through to the ContextMenu FlyOut element.
		*/
		flyOutStyle: object,

		/**
			Styles that are passed through to the option container element.
		*/
		optionContainerStyle: object,

		/**
			Called when collapsed and the control is clicked, or when the control has
			focus and the Down Arrow is pressed.  Has the signature
			\`({ props, event }) => {}\`
		*/
		onExpand: func,

		/**
			Called when expanded and the user clicks the control or outside of the
			menu, or when the control has focus and the Escape key is pressed Has the
			signature \`({ props, event }) => {}\`
		*/
		onCollapse: func,

		/**
			Called when an option is clicked, or when an option has focus and the
			Enter key is pressed.  Has the signature
			\`(optionIndex, {props, event}) => {}\`
			where optionIndex can be a number or \`null\`.
		*/
		onSelect: func,

		/**
			Called when expanded and the the Down Arrow key is pressed. Not called
			when focus is on the last option.  Has the signature
			\`({ props, event }) => {}\`
		*/
		onFocusNext: func,

		/**
			Called when expanded and the the Up Arrow key is pressed. Not called when
			focus is on the first option.  Has the signature
			\`({ props, event }) => {}\`
		*/
		onFocusPrev: func,

		/**
			Called when the mouse moves over an option.  Has the signature
			\`(optionIndex) => {}\` where optionIndex can be a number or \`null\`.
		*/
		onFocusOption: func,

		Control: any /**
			*Child Element* - The control target which the flyout menu is anchored
			to. Only one \`Control\` is used.
		*/,

		Option: any /**
			*Child Element* - These are menu options. The \`optionIndex\` is in-order
			of rendering regardless of group nesting, starting with index \`0\`.
			Each \`Option\` may be passed a prop called \`isDisabled\` to disable
			selection of that \`Option\`.  Any other props pass to Option will be
			available from the \`onSelect\` handler.
		*/,

		OptionGroup: any /**
			*Child Element* - Used to group \`Option\`s within the menu. Any
			non-\`Option\`s passed in will be rendered as a label for the group.
		*/,

		NullOption: any /**
			*Child Element* - A special kind of \`Option\` that is always rendered at
			the top of the menu and has an \`optionIndex\` of \`null\`. Useful for
			unselect.
		*/,

		Header: any /**
			*Child Element* - An optional header to be displayed within the expanded
			Flyout, above all \`Option\`s.
		*/,

		ContextMenu: any /**
			*Child Element* - props pass through to the underlying ContextMenu
			component
		*/,

		FixedOption: any /**
			*Child Element* - A special kind of \`Option\` that is always rendered at the top of
			the menu.
		*/,
	};

	static defaultProps = {
		isDisabled: false,
		isExpanded: false,
		direction: 'down' as const,
		alignment: 'start' as const,
		selectedIndices: [],
		focusedIndex: null,
		flyOutStyle: { maxHeight: '18em' },
		onExpand: _.noop,
		onCollapse: _.noop,
		onSelect: _.noop,
		onFocusNext: _.noop,
		onFocusPrev: _.noop,
		onFocusOption: _.noop,
		portalId: '',
		optionContainerStyle: {},
		ContextMenu: ContextMenu.defaultProps,
	};

	getPreprocessedOptionData = (props: IDropMenuPropsWithPassThroughs) => {
		return DropMenu.preprocessOptionData(props, DropMenu);
	};

	static preprocessOptionData = <
		OptionGroupProps extends IDropMenuOptionGroupProps,
		OptionProps extends IDropMenuOptionProps,
		NullOptionProps extends IDropMenuNullOptionProps,
		FixedOptionProps extends IDropMenuFixedOptionProps
	>(
		props: StandardProps,
		ParentType: IHasOptionChildren<
			OptionGroupProps,
			OptionProps,
			NullOptionProps,
			FixedOptionProps
		>
	) => {
		const { OptionGroup, Option, NullOption, FixedOption } = ParentType;

		const optionGroups = _.map(findTypes(props, OptionGroup), 'props'); // find all OptionGroup props
		const fixedOptions = _.map(findTypes(props, FixedOption), 'props'); // find all FixedOption props
		const ungroupedOptions = _.map(findTypes(props, Option), 'props'); // find all ungrouped Option props
		const nullOptions = NullOption
			? _.map(findTypes(props, NullOption), 'props')
			: []; // find all NullOption props

		const fixedOptionData: IOptionsData[] = _.map(
			fixedOptions,
			(optionProps, localOptionIndex) => {
				return {
					localOptionIndex,
					optionIndex: localOptionIndex,
					optionGroupIndex: null, // ungrouped options have no `optionGroupIndex`
					optionProps,
				};
			}
		);

		// flatten grouped options into array of objects to associate { index, group index, and props } for each option
		const groupedOptionData: IOptionsData[] = _.reduce(
			optionGroups,
			(memo: IOptionsData[], optionGroupProps, optionGroupIndex) => {
				const groupedOptions = _.map(
					findTypes(optionGroupProps, Option),
					'props'
				); // find all Option props for current group
				return memo.concat(
					_.map(groupedOptions, (optionProps, localOptionIndex) => {
						return {
							localOptionIndex,
							optionIndex:
								_.size(memo) + _.size(fixedOptionData) + localOptionIndex, // add current index to current array length to get final option index
							optionGroupIndex, // store option group index to associate option back to group
							optionProps: {
								isHidden: false,
								...optionProps,
							},
						};
					})
				);
			},
			[]
		);

		// create lookup object for options by their group index
		const optionGroupDataLookup = _.groupBy(
			groupedOptionData,
			'optionGroupIndex'
		);

		// store ungrouped options into array of objects to associate { index, and props } for each option
		const ungroupedOptionData: IOptionsData[] = _.map(
			ungroupedOptions,
			(optionProps, localOptionIndex) => {
				return {
					localOptionIndex,
					optionIndex:
						_.size(groupedOptionData) +
						_.size(fixedOptionData) +
						localOptionIndex, // add current index to grouped options array length to get final option index (grouped options rendered first)
					optionGroupIndex: null, // ungrouped options have no `optionGroupIndex`
					optionProps: {
						isHidden: false,
						...optionProps,
					},
				};
			}
		);

		// concatenate grouped options array with ungrouped options array to get flat list of all options
		const flattenedOptionsData = _.concat(
			fixedOptionData,
			groupedOptionData,
			ungroupedOptionData
		);

		return {
			optionGroups,
			optionGroupDataLookup,
			fixedOptionData,
			ungroupedOptionData,
			flattenedOptionsData,
			nullOptions,
		};
	};

	handleKeydown = (event: React.KeyboardEvent) => {
		const {
			props,
			props: {
				isExpanded,
				focusedIndex,
				onExpand,
				onCollapse,
				onSelect,
				onFocusOption,
			},
		} = this;

		const { flattenedOptionsData, nullOptions } = this.state;

		this.setState({
			isMouseTriggered: false,
		});

		if (isExpanded) {
			if (event.keyCode === KEYCODE.Enter) {
				event.preventDefault();
				const focusedOptionData = _.get(
					flattenedOptionsData,
					_.isNil(focusedIndex) ? '' : focusedIndex,
					null
				);
				const focusedOptionProps = _.get(
					focusedOptionData,
					'optionProps',
					Option.defaultProps
				) as IDropMenuPropsWithPassThroughs;
				if (focusedOptionData && !focusedOptionProps.isDisabled) {
					onSelect &&
						onSelect(focusedIndex, { props: focusedOptionProps, event });
				} else if (_.isNull(focusedIndex)) {
					onSelect && onSelect(null, { props: _.first(nullOptions), event });
				}
			}
			if (event.keyCode === KEYCODE.Escape) {
				event.preventDefault();
				onCollapse && onCollapse({ props, event });
			}
			if (event.keyCode === KEYCODE.ArrowUp) {
				if (_.isNumber(focusedIndex) || _.isNull(focusedIndex)) {
					if (focusedIndex === 0) {
						if (!_.isEmpty(nullOptions)) {
							event.preventDefault();
							onFocusOption && onFocusOption(null, { props, event });
						}
					}
					if (!_.isNil(focusedIndex) && focusedIndex > 0) {
						event.preventDefault();
						onFocusOption &&
							onFocusOption(
								_.findLastIndex(
									flattenedOptionsData,
									isOptionVisible,
									focusedIndex - 1
								),
								{ props, event }
							);
					}
				} else {
					event.preventDefault();
					focusedIndex &&
						onFocusOption &&
						onFocusOption(
							_.findLastIndex(
								flattenedOptionsData,
								isOptionVisible,
								focusedIndex - 1
							),
							{ props, event }
						);
				}
			}
			if (event.keyCode === KEYCODE.ArrowDown) {
				if (_.isNumber(focusedIndex)) {
					if (focusedIndex < _.size(flattenedOptionsData) - 1) {
						event.preventDefault();
						onFocusOption &&
							onFocusOption(
								_.findIndex(
									flattenedOptionsData,
									isOptionVisible,
									focusedIndex + 1
								),
								{ props, event }
							);
					}
				} else {
					event.preventDefault();
					onFocusOption &&
						onFocusOption(
							_.findIndex(
								flattenedOptionsData,
								isOptionVisible,
								!_.isNil(focusedIndex) ? focusedIndex : undefined
							),
							{ props, event }
						);
				}
			}
		} else {
			if (event.keyCode === KEYCODE.ArrowDown) {
				event.preventDefault();
				onExpand && onExpand({ props, event });
			}
		}
	};

	handleClick = (event: React.MouseEvent) => {
		const {
			props,
			props: { isExpanded, onExpand, onCollapse },
		} = this;

		if (isExpanded) {
			onCollapse && onCollapse({ props, event });
		} else {
			onExpand && onExpand({ props, event });
		}
	};

	handleMouseFocusOption = (
		optionIndex: number | null,
		optionProps: IDropMenuOptionProps,
		event: React.MouseEvent
	) => {
		const { focusedIndex, onFocusOption } = this.props;

		this.setState({
			isMouseTriggered: true,
		});

		if (!optionProps.isDisabled && focusedIndex !== optionIndex) {
			onFocusOption && onFocusOption(optionIndex, { props: this.props, event });
		}
	};

	handleSelectOption = (
		optionIndex: number | null,
		optionProps: IDropMenuOptionProps,
		event: React.KeyboardEvent | React.MouseEvent
	) => {
		const { onSelect } = this.props;

		if (!optionProps.isDisabled) {
			onSelect && onSelect(optionIndex, { props: optionProps, event });
		}
	};

	renderOption = (
		optionProps: IDropMenuOptionProps,
		optionIndex: number | null,
		isGrouped = false
	) => {
		const { selectedIndices, focusedIndex } = this.props;

		const { isMouseTriggered } = this.state;

		const { isDisabled, isHidden, isWrapped } = optionProps;

		const isFocused = optionIndex === focusedIndex;
		const isSelected = _.includes(selectedIndices, optionIndex);

		return isHidden ? null : (
			<div
				key={'DropMenuOption' + optionIndex}
				{..._.omit(optionProps, [
					'isDisabled',
					'isHidden',
					'isWrapped',
					'Selected',
					'Selection',
					'initialState',
					'callbackId',
				])}
				onClick={(event) =>
					this.handleSelectOption(optionIndex, optionProps, event)
				}
				onMouseMove={(event) =>
					this.handleMouseFocusOption(optionIndex, optionProps, event)
				}
				className={cx(
					'&-Option',
					{
						'&-Option-is-grouped': isGrouped,
						'&-Option-is-focused': isFocused,
						'&-Option-is-selected': isSelected,
						'&-Option-is-disabled': isDisabled,
						'&-Option-is-null': _.isNull(optionIndex),
						'&-Option-is-wrapped': isWrapped,
					},
					optionProps.className
				)}
				ref={(optionHTMLElement) => {
					if (isFocused && !isMouseTriggered) {
						scrollParentTo(
							optionHTMLElement,
							this._header && this._header.current
								? this._header.current.offsetHeight
								: undefined
						);
					}
				}}
			/>
		);
	};

	UNSAFE_componentWillReceiveProps = (
		nextProps: IDropMenuPropsWithPassThroughs
	) => {
		// only preprocess options data when it changes (via new props) - better performance than doing this each render
		this.setState(this.getPreprocessedOptionData(nextProps));
	};

	render() {
		const {
			className,
			style,
			isDisabled,
			isExpanded,
			direction,
			alignment,
			onCollapse,
			flyOutStyle,
			optionContainerStyle,
			...passThroughs
		} = this.props;

		const {
			optionGroups,
			fixedOptionData,
			ungroupedOptionData,
			optionGroupDataLookup,
			nullOptions,
			portalId,
		} = this.state;

		const contextMenuProps = _.get(
			getFirst(this.props, DropMenu.ContextMenu),
			'props',
			{}
		);
		const controlProps = _.get(
			getFirst(this.props, DropMenu.Control),
			'props',
			{}
		);
		const headerProps = _.get(
			getFirst(this.props, DropMenu.Header),
			'props',
			{}
		);

		return (
			<div
				className={cx(
					'&',
					'&-base',
					{
						'&-is-expanded': isExpanded,
						'&-direction-down': isExpanded && direction === 'down',
						'&-direction-up': isExpanded && direction === 'up',
					},
					className
				)}
				style={style}
				{...(_.omit(passThroughs, nonPassThroughs) as any)}
			>
				<ContextMenu
					{...contextMenuProps}
					portalId={portalId}
					isExpanded={isExpanded}
					direction={direction}
					alignment={alignment}
					onClickOut={onCollapse}
				>
					<ContextMenu.Target>
						<div
							{...(!isDisabled
								? {
										tabIndex: 0,
										onClick: this.handleClick,
										onKeyDown: this.handleKeydown,
								  }
								: null)}
							{...controlProps}
							className={cx('&-Control', _.get(controlProps, 'className'))}
						/>
					</ContextMenu.Target>
					<ContextMenu.FlyOut
						className={cx('&', className)}
						style={flyOutStyle}
					>
						{!_.isEmpty(headerProps) && (
							<div
								{...headerProps}
								className={cx('&-Header', headerProps.className)}
								onKeyDown={this.handleKeydown}
								ref={this._header}
							/>
						)}
						<div
							className={cx('&-option-container')}
							style={_.assign({}, flyOutStyle, optionContainerStyle)}
						>
							{_.map(nullOptions, (optionProps) =>
								this.renderOption(optionProps, null)
							).concat(
								_.isEmpty(nullOptions)
									? []
									: [
											<div
												key={'OptionGroup-divider-NullOption'}
												className={cx('&-OptionGroup-divider')}
											/>,
									  ]
							)}
							{
								// fixed options go first
								_.map(fixedOptionData, ({ optionProps, optionIndex }) =>
									this.renderOption(optionProps, optionIndex)
								)
							}
							{joinArray(
								// for each option group,
								_.map(
									optionGroups,
									(optionGroupProps, optionGroupIndex): React.ReactNode => {
										const groupedOptions =
											optionGroupDataLookup[optionGroupIndex];
										if (
											optionGroupProps.isHidden ||
											_.every(groupedOptions, {
												optionProps: { isHidden: true },
											})
										) {
											return null;
										}

										const labelElements = rejectTypes(
											optionGroupProps.children,
											[
												DropMenu.Control,
												DropMenu.OptionGroup,
												DropMenu.Option,
												DropMenu.NullOption,
											]
										);
										// render label if there is one
										return (
											_.isEmpty(labelElements)
												? ([] as React.ReactNode[])
												: [
														<div
															{..._.omit(optionGroupProps, [
																'isHidden',
																'initialState',
																'callbackId',
															])}
															key={'OptionGroup-label' + optionGroupIndex}
															className={cx(
																'&-label',
																optionGroupProps.className
															)}
														>
															{labelElements}
														</div>,
														// render the options in the group
												  ]
										).concat(
											_.map(
												optionGroupDataLookup[optionGroupIndex],
												({ optionProps, optionIndex }) =>
													this.renderOption(optionProps, optionIndex, true)
											)
										);
										// append all ungrouped options as another unlabeled group
									}
								).concat(
									_.isEmpty(ungroupedOptionData)
										? []
										: [
												_.map(
													ungroupedOptionData,
													({ optionProps, optionIndex }) =>
														this.renderOption(optionProps, optionIndex)
												),
										  ]
								),
								(element, index) =>
									element && (
										<div
											key={`OptionGroup-divider-${index}`}
											className={cx('&-OptionGroup-divider')}
										/>
									) // separate each group with divider
							)}
						</div>
					</ContextMenu.FlyOut>
				</ContextMenu>
			</div>
		);
	}
}

export default buildModernHybridComponent<
	IDropMenuPropsWithPassThroughs,
	IDropMenuState,
	typeof DropMenu
>(DropMenu as any, { reducers });
export { DropMenu as DropMenuDumb, NullOption, OptionGroup };
