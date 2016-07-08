import React from 'react';
import _ from 'lodash';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, getFirst, findTypes, rejectTypes } from '../../util/component-types';
import { scrollParentTo } from '../../util/dom-helpers';
import * as KEYCODE from '../../constants/key-code';
import * as reducers from './DropMenu.reducers';
import ContextMenu from '../ContextMenu/ContextMenu';

function joinArray(array, getSeparator) {
	return _.reduce(array, (newArray, element, index) => {
		newArray.push(element);
		if (index < _.size(array) - 1) {
			newArray.push(getSeparator(element, index, array));
		}
		return newArray;
	}, []);
}

const cx = lucidClassNames.bind('&-DropMenu');

const {
	any,
	arrayOf,
	bool,
	func,
	node,
	number,
	object,
	oneOf,
	string,
} = React.PropTypes;

/**
 *
 * {"categories": ["helpers"], "madeFrom": ["ContextMenu"]}
 *
 * This is a helper component used to render a menu of options attached to any control. Supports option groups with and without labels as well as special options with a `null` index for unselect.
 */
const DropMenu = createClass({
	displayName: 'DropMenu',

	reducers,

	components: {
		/**
		 * Renders a `<div>` that acts as the control target which the flyout menu is anchored to. Only one `Control` is used.
		 */
		Control: createClass({
			displayName: 'DropMenu.Control',
			propName: 'Control',
		}),
		/**
		 * A special kind of `Option` that is always rendered at the top of the menu and has an `optionIndex` of `null`. Useful for unselect.
		 */
		OptionGroup: createClass({
			displayName: 'DropMenu.OptionGroup',
			propName: 'OptionGroup',
		}),
		/**
		 * Renders a `<div>` that acts as an option in the menu.
		 */
		Option: createClass({
			displayName: 'DropMenu.Option',
			propName: 'Option',
			propTypes: {
				/**
				 * disables selection of the `Option`.
				 */
				isDisabled: bool,
			},
		}),
		/**
		 * A special kind of `Option` that is always rendered at the top of the menu and has an `optionIndex` of `null` used for deselecting.
		 */
		NullOption: createClass({
			displayName: 'DropMenu.NullOption',
			propName: 'NullOption',
		}),
	},

	propTypes: {
		/**
		 * Should be instances of {`DropMenu.Control`, `DropMenu.Option`, `DropMenu.OptionGroup`, `DropMenu.Nulloption`}. Other direct child elements will not render.
		 */
		children: node,
		/**
		 * Appended to the component-specific class names set on the root elements. Applies to *both* the control and the flyout menu.
		 */
		className: string,
		/**
		 * Styles that are passed through to root element.
		 */
		style: object,
		/**
		 * Disables the DropMenu from being clicked or focused.
		 */
		isDisabled: bool,
		/**
		 * Renders the flyout menu adjacent to the control.
		 */
		isExpanded: bool,
		/**
		 * Sets the direction the flyout menu will render relative to the control.
		 */
		direction: oneOf(['down', 'up']),
		/**
		 * An array of currently selected `DropMenu.Option` indices.
		 */
		selectedIndices: arrayOf(number),
		/**
		 * The currently focused index of `DropMenu.Option`. Can also be `null`.
		 */
		focusedIndex: number,
		/**
		 * The `id` of the flyout menu portal element that is appended to `document.body`. Defaults to a generated id.
		 */
		portalId: string,
		/**
		 * Styles that are passed through to the ContextMenu FlyOut element.
		 */
		flyOutStyle: object,
		/**
		 * Called when collapsed and the control is clicked, or when the control has focus and the Down Arrow is pressed.
		 */
		onExpand: func,
		/**
		 * Called when expanded and the user clicks the control or outside of the menu, or when the control has focus and the Escape key is pressed.
		 */
		onCollapse: func,
		/**
		 * Called when an option is clicked, or when an option has focus and the Enter key is pressed.
		 * Has the signature `(optionIndex, {props, event}) => {}` where optionIndex can be a number or `null`.
		 */
		onSelect: func,
		/**
		 * Called when expanded and the the Down Arrow key is pressed. Not called when focus is on the last option.
		 */
		onFocusNext: func,
		/**
		 * Called when expanded and the the Up Arrow key is pressed. Not called when focus is on the first option.
		 */
		onFocusPrev: func,
		/**
		 * Called when the mouse moves over an option.
		 * Has the signature `(optionIndex) => {}` where optionIndex can be a number or `null`.
		 */
		onFocusOption: func,
		/**
		 * *Child Element* - The control target which the flyout menu is anchored to. Only one `Control` is used.
		 */
		Control: any,
		/**
		 * *Child Element* - These are menu options. The `optionIndex` is in-order of rendering regardless of group nesting, starting with index `0`.
		 * Each `Option` may be passed a prop called `isDisabled` to disable selection of that `Option`.
		 * Any other props pass to Option will be available from the `onSelect` handler.
		 */
		Option: any,
		/**
		 * *Child Element* - Used to group `Option`s within the menu. Any non-`Option`s passed in will be rendered as a label for the group.
		 */
		OptionGroup: any,
		/**
		 * *Child Element* - A special kind of `Option` that is always rendered at the top of the menu and has an `optionIndex` of `null`. Useful for unselect.
		 */
		NullOption: any,
	},

	getDefaultProps() {
		return {
			isDisabled: false,
			isExpanded: false,
			direction: 'down',
			selectedIndices: [],
			focusedIndex: null,
			portalId: 'DropMenu-Portal-' + Math.random().toString(16).substr(2),
			flyOutStyle: { maxHeight: '18em' },
			onExpand: _.noop,
			onCollapse: _.noop,
			onSelect: _.noop,
			onFocusNext: _.noop,
			onFocusPrev: _.noop,
			onBelowFold: _.noop,
			onAboveFold: _.noop,
			onFocusOption: _.noop,
		};
	},

	getInitialState() {
		return {
			isMouseTriggered: false,
			optionGroups: [],
			flattenedOptionsData: [],
			ungroupedOptionData: [],
			optionGroupDataLookup: {},
		}
	},

	statics: {
		preprocessOptionData(props, ParentType=DropMenu) {
			const {
				OptionGroup,
				Option,
				NullOption,
			} = ParentType;

			const optionGroups = _.map(findTypes(props, OptionGroup), 'props'); // find all OptionGroup props
			const ungroupedOptions = _.map(findTypes(props, Option), 'props') // find all ungrouped Option props
			const nullOptions = NullOption ? _.map(findTypes(props, NullOption), 'props') : []; // find all NullOption props

			// flatten grouped options into array of objects to associate { index, group index, and props } for each option
			const groupedOptionData = _.reduce(optionGroups, (memo, optionGroupProps, optionGroupIndex) => {
				const groupedOptions = _.map(findTypes(optionGroupProps, Option), 'props'); // find all Option props for current group
				return memo.concat(_.map(groupedOptions, (optionProps, localOptionIndex) => {
					return {
						localOptionIndex,
						optionIndex: _.size(memo) + localOptionIndex, // add current index to current array length to get final option index
						optionGroupIndex, // store option group index to associate option back to group
						optionProps,
					};
				}));
			}, []);

			// create lookup object for options by their group index
			const optionGroupDataLookup = _.groupBy(groupedOptionData, 'optionGroupIndex');

			// store ungrouped options into array of objects to associate { index, and props } for each option
			const ungroupedOptionData = _.map(ungroupedOptions, (optionProps, localOptionIndex) => {
				return {
						localOptionIndex,
						optionIndex: _.size(groupedOptionData) + localOptionIndex, // add current index to grouped options array length to get final option index (grouped options rendered first)
						optionGroupIndex: null, // ungrouped options have no `optionGroupIndex`
						optionProps,
				};
			});

			// concatenate grouped options array with ungrouped options array to get flat list of all options
			const flattenedOptionsData = groupedOptionData.concat(ungroupedOptionData);

			return {
				optionGroups,
				optionGroupDataLookup,
				ungroupedOptionData,
				flattenedOptionsData,
				nullOptions,
			};
		},
	},

	getPreprocessedOptionData(props) {
		return DropMenu.preprocessOptionData(props, DropMenu);
	},

	handleKeydown(e) {
		const {
			isExpanded,
			focusedIndex,
			onExpand,
			onCollapse,
			onSelect,
			onFocusPrev,
			onFocusNext,
		} = this.props;

		const {
			flattenedOptionsData,
			nullOptions,
		} = this.state;

		this.setState({
			isMouseTriggered: false,
		});

		if (isExpanded) {
			if (e.keyCode === KEYCODE.Enter) {
				e.preventDefault();
				const focusedOptionData = _.get(flattenedOptionsData, focusedIndex, null);
				const focusedOptionProps = _.get(focusedOptionData, 'optionProps', {});
				if (focusedOptionData && !focusedOptionProps.isDisabled) {
					onSelect(focusedIndex, {props: focusedOptionProps, event: e});
				} else if (_.isNull(focusedIndex)) {
					onSelect(null, {props: _.first(nullOptions), event: e});
				}
			}
			if (e.keyCode === KEYCODE.Escape) {
				e.preventDefault();
				onCollapse(e);
			}
			if (e.keyCode === KEYCODE.ArrowUp) {
				if (_.isNumber(focusedIndex) || _.isNull(focusedIndex)) {
					if (focusedIndex === 0) {
						if (!_.isEmpty(nullOptions)) {
							e.preventDefault();
							onFocusPrev(e);
						}
					}
					if (focusedIndex > 0) {
						e.preventDefault();
						onFocusPrev(e);
					}
				} else {
					e.preventDefault();
					onFocusPrev(e);
				}
			}
			if (e.keyCode === KEYCODE.ArrowDown) {
				if (_.isNumber(focusedIndex)) {
					if (focusedIndex < _.size(flattenedOptionsData) - 1) {
						e.preventDefault();
						onFocusNext(e);
					}
				} else {
					e.preventDefault();
					onFocusNext(e);
				}
			}
		} else {
			if (e.keyCode === KEYCODE.ArrowDown) {
				e.preventDefault();
				onExpand(e);
			}
		}
	},

	handleClick(e) {
		const {
			isExpanded,
			onExpand,
			onCollapse,
		} = this.props;

		if (isExpanded) {
			onCollapse(e);
		} else {
			onExpand(e);
		}
	},

	handleMouseFocusOption(optionIndex, optionProps) {
		const {
			focusedIndex,
			onFocusOption,
		} = this.props;

		this.setState({
			isMouseTriggered: true,
		});

		if (!optionProps.isDisabled && focusedIndex !== optionIndex) {
			onFocusOption(optionIndex);
		}
	},

	handleSelectOption(optionIndex, optionProps, event) {
		const {
			onSelect,
		} = this.props;

		if (!optionProps.isDisabled) {
			onSelect(optionIndex, { props: optionProps, event: event });
		}
	},

	renderOption(optionProps, optionIndex, isGrouped) {
		const {
			selectedIndices,
			focusedIndex,
		} = this.props;

		const {
			isMouseTriggered,
		} = this.state;

		const {
			isDisabled,
		} = optionProps;

		const isFocused = optionIndex === focusedIndex;
		const isSelected = _.includes(selectedIndices, optionIndex);

		return (
			<div
				key={'DropMenuOption' + optionIndex}
				onMouseMove={() => this.handleMouseFocusOption(optionIndex, optionProps)}
				onClick={(event) => this.handleSelectOption(optionIndex, optionProps, event)}
				{...optionProps}
				className={cx(
					'&-Option', {
					'&-Option-is-grouped': isGrouped,
					'&-Option-is-focused': isFocused,
					'&-Option-is-selected': isSelected,
					'&-Option-is-disabled': isDisabled,
					'&-Option-is-null': _.isNull(optionIndex),
				}, optionProps.className)}
				ref={(optionDOMNode)=> {
					if (isFocused && !isMouseTriggered) {
						scrollParentTo(optionDOMNode);
					}
				}}
			/>
		);
	},

	componentWillMount() {
		// preprocess the options data before rendering
		this.setState(this.getPreprocessedOptionData(this.props));
	},

	componentWillReceiveProps(nextProps) {
		// only preprocess options data when it changes (via new props) - better performance than doing this each render
		this.setState(this.getPreprocessedOptionData(nextProps));
	},

	render() {
		const {
			className,
			style,
			isDisabled,
			isExpanded,
			direction,
			portalId,
			onCollapse,
			flyOutStyle,
		} = this.props;

		const {
			optionGroups,
			ungroupedOptionData,
			optionGroupDataLookup,
			nullOptions,
		} = this.state;

		const controlProps = _.get(getFirst(this.props, DropMenu.Control), 'props', {});

		return (
			<div className={cx('&', '&-base', {
				'&-is-expanded': isExpanded,
				'&-direction-down': isExpanded && direction === 'down',
				'&-direction-up': isExpanded && direction === 'up',
			}, className)} style={style}>
				<ContextMenu
					portalId={portalId}
					isExpanded={isExpanded}
					direction={direction}
					onClickOut={onCollapse}
					>
					<ContextMenu.Target>
						<div
							{...(!isDisabled ? {
								tabIndex: 0,
								onClick: this.handleClick,
								onKeyDown: this.handleKeydown,
							} : null)}
							{...controlProps}
							className={cx('&-Control', _.get(controlProps, 'className'))}
						/>
					</ContextMenu.Target>
					<ContextMenu.FlyOut className={cx('&', className)} style={flyOutStyle}>
						{
							_.map(nullOptions, (optionProps) => this.renderOption(optionProps, null))
							.concat(_.isEmpty(nullOptions) ? [] : [(<div key={'OptionGroup-divider-NullOption'} className={cx('&-OptionGroup-divider')} />)])
						}
						{
							joinArray(
								// for each option group,
								_.map(optionGroups, (optionGroupProps, optionGroupIndex) => {
									const labelElements = rejectTypes(optionGroupProps.children, [DropMenu.Control, DropMenu.OptionGroup, DropMenu.Option, DropMenu.NullOption]);
									// render label if there is one
									return (_.isEmpty(labelElements) ? [] : [
										<div {...optionGroupProps} className={cx('&-label', optionGroupProps.className)}>
											{labelElements}
										</div>,
									// render the options in the group
									]).concat(_.map(_.get(optionGroupDataLookup, optionGroupIndex), ({ optionProps, optionIndex }) => this.renderOption(optionProps, optionIndex, true)));
								// append all ungrouped options as another unlabeled group
								}).concat(_.isEmpty(ungroupedOptionData) ? [] : [_.map(ungroupedOptionData, ({ optionProps, optionIndex }) => this.renderOption(optionProps, optionIndex))]),
								(element, index) => (<div key={`OptionGroup-divider-${index}`} className={cx('&-OptionGroup-divider')} />) // separate each group with divider
							)
						}
					</ContextMenu.FlyOut>
				</ContextMenu>
			</div>
		);
	},
});

export default DropMenu;
