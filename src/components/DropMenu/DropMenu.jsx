import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { lucidClassNames } from '../../util/style-helpers';
import {
	createClass,
	getFirst,
	findTypes,
	rejectTypes,
	omitProps,
} from '../../util/component-types';
import { scrollParentTo } from '../../util/dom-helpers';
import { buildHybridComponent } from '../../util/state-management';
import * as KEYCODE from '../../constants/key-code';
import * as reducers from './DropMenu.reducers';
import ContextMenu from '../ContextMenu/ContextMenu';

function joinArray(array, getSeparator) {
	return _.reduce(
		array,
		(newArray, element, index) => {
			newArray.push(element);
			if (index < _.size(array) - 1) {
				newArray.push(getSeparator(element, index, array));
			}
			return newArray;
		},
		[]
	);
}

function isOptionVisible(option) {
	return !option.optionProps.isHidden;
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
} = PropTypes;

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
		 * An optional header to be displayed within the expanded Flyout, above all `Option`s.
		 */
		Header: createClass({
			displayName: 'DropMenu.Header',
			propName: 'Header',
		}),
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
			propTypes: {
				/**
				 * hides the `OptionGroup` from the list.
				 */
				isHidden: bool,
			},
			getDefaultProps() {
				return {
					isHidden: false,
				};
			},
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
				/**
				 * hides the `Option` from the list.
				 */
				isHidden: bool,
				/**
				 * controls wrapping of the text.
				 */
				isWrapped: bool,
			},
			getDefaultProps() {
				return {
					isDisabled: false,
					isHidden: false,
					isWrapped: true,
				};
			},
		}),
		/**
		 * A special kind of `Option` that is always rendered at the top of the menu and has an `optionIndex` of `null` used for deselecting.
		 */
		NullOption: createClass({
			displayName: 'DropMenu.NullOption',
			propName: 'NullOption',
		}),
		/**
		 * Props that are passed through to the underling ContextMenu.
		 */
		ContextMenu: createClass({
			displayName: 'DropMenu.ContextMenu',
			propName: 'ContextMenu',
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
		 * Sets the alignment the flyout menu will render relative to the control.
		 */
		alignment: oneOf(['start', 'center', 'end']),
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
		 * Styles that are passed through to the option container element.
		 */
		optionContainerStyle: object,
		/**
		 * Called when collapsed and the control is clicked, or when the control has focus and the Down Arrow is pressed.
		 * Has the signature `({ props, event }) => {}`
		 */
		onExpand: func,
		/**
		 * Called when expanded and the user clicks the control or outside of the menu, or when the control has focus and the Escape key is pressed
		 * Has the signature `({ props, event }) => {}`
		 */
		onCollapse: func,
		/**
		 * Called when an option is clicked, or when an option has focus and the Enter key is pressed.
		 * Has the signature `(optionIndex, {props, event}) => {}` where optionIndex can be a number or `null`.
		 */
		onSelect: func,
		/**
		 * Called when expanded and the the Down Arrow key is pressed. Not called when focus is on the last option.
		 * Has the signature `({ props, event }) => {}`
		 */
		onFocusNext: func,
		/**
		 * Called when expanded and the the Up Arrow key is pressed. Not called when focus is on the first option.
		 * Has the signature `({ props, event }) => {}`
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
		/**
		 * *Child Element* - An optional header to be displayed within the expanded Flyout, above all `Option`s.
		 */
		Header: any,
	},

	getDefaultProps() {
		return {
			isDisabled: false,
			isExpanded: false,
			direction: 'down',
			alignment: 'start',
			selectedIndices: [],
			focusedIndex: null,
			flyOutStyle: { maxHeight: '18em' },
			onExpand: _.noop,
			onCollapse: _.noop,
			onSelect: _.noop,
			onFocusNext: _.noop,
			onFocusPrev: _.noop,
			onFocusOption: _.noop,
			ContextMenu: ContextMenu.getDefaultProps(),
		};
	},

	getInitialState() {
		return {
			isMouseTriggered: false,
			optionGroups: [],
			flattenedOptionsData: [],
			ungroupedOptionData: [],
			optionGroupDataLookup: {},
			portalId: this.props.portalId || _.uniqueId('DropMenu-Portal-'),
		};
	},

	statics: {
		preprocessOptionData(props, ParentType = DropMenu) {
			const { OptionGroup, Option, NullOption } = ParentType;

			const optionGroups = _.map(findTypes(props, OptionGroup), 'props'); // find all OptionGroup props
			const ungroupedOptions = _.map(findTypes(props, Option), 'props'); // find all ungrouped Option props
			const nullOptions = NullOption
				? _.map(findTypes(props, NullOption), 'props')
				: []; // find all NullOption props

			// flatten grouped options into array of objects to associate { index, group index, and props } for each option
			const groupedOptionData = _.reduce(
				optionGroups,
				(memo, optionGroupProps, optionGroupIndex) => {
					const groupedOptions = _.map(
						findTypes(optionGroupProps, Option),
						'props'
					); // find all Option props for current group
					return memo.concat(
						_.map(groupedOptions, (optionProps, localOptionIndex) => {
							return {
								localOptionIndex,
								optionIndex: _.size(memo) + localOptionIndex, // add current index to current array length to get final option index
								optionGroupIndex, // store option group index to associate option back to group
								optionProps,
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
			const ungroupedOptionData = _.map(
				ungroupedOptions,
				(optionProps, localOptionIndex) => {
					return {
						localOptionIndex,
						optionIndex: _.size(groupedOptionData) + localOptionIndex, // add current index to grouped options array length to get final option index (grouped options rendered first)
						optionGroupIndex: null, // ungrouped options have no `optionGroupIndex`
						optionProps,
					};
				}
			);

			// concatenate grouped options array with ungrouped options array to get flat list of all options
			const flattenedOptionsData = groupedOptionData.concat(
				ungroupedOptionData
			);

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

	handleKeydown(event) {
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
					focusedIndex,
					null
				);
				const focusedOptionProps = _.get(focusedOptionData, 'optionProps', {});
				if (focusedOptionData && !focusedOptionProps.isDisabled) {
					onSelect(focusedIndex, { props: focusedOptionProps, event });
				} else if (_.isNull(focusedIndex)) {
					onSelect(null, { props: _.first(nullOptions), event });
				}
			}
			if (event.keyCode === KEYCODE.Escape) {
				event.preventDefault();
				onCollapse({ props, event });
			}
			if (event.keyCode === KEYCODE.ArrowUp) {
				if (_.isNumber(focusedIndex) || _.isNull(focusedIndex)) {
					if (focusedIndex === 0) {
						if (!_.isEmpty(nullOptions)) {
							event.preventDefault();
							onFocusOption(null, { props, event });
						}
					}
					if (focusedIndex > 0) {
						event.preventDefault();
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
					onFocusOption(
						_.findIndex(flattenedOptionsData, isOptionVisible, focusedIndex),
						{ props, event }
					);
				}
			}
		} else {
			if (event.keyCode === KEYCODE.ArrowDown) {
				event.preventDefault();
				onExpand({ props, event });
			}
		}
	},

	handleClick(event) {
		const { props, props: { isExpanded, onExpand, onCollapse } } = this;

		if (isExpanded) {
			onCollapse({ props, event });
		} else {
			onExpand({ props, event });
		}
	},

	handleMouseFocusOption(optionIndex, optionProps, event) {
		const { focusedIndex, onFocusOption } = this.props;

		this.setState({
			isMouseTriggered: true,
		});

		if (!optionProps.isDisabled && focusedIndex !== optionIndex) {
			onFocusOption(optionIndex, { props: optionProps, event });
		}
	},

	handleSelectOption(optionIndex, optionProps, event) {
		const { onSelect } = this.props;

		if (!optionProps.isDisabled) {
			onSelect(optionIndex, { props: optionProps, event });
		}
	},

	renderOption(optionProps, optionIndex, isGrouped) {
		const { selectedIndices, focusedIndex } = this.props;

		const { isMouseTriggered } = this.state;

		const { isDisabled, isHidden, isWrapped } = optionProps;

		const isFocused = optionIndex === focusedIndex;
		const isSelected = _.includes(selectedIndices, optionIndex);

		return (
			!isHidden &&
			<div
				key={'DropMenuOption' + optionIndex}
				{...omitProps(optionProps, DropMenu.Option)}
				onClick={event =>
					this.handleSelectOption(optionIndex, optionProps, event)}
				onMouseMove={event =>
					this.handleMouseFocusOption(optionIndex, optionProps, event)}
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
				ref={optionDOMNode => {
					if (isFocused && !isMouseTriggered) {
						scrollParentTo(
							optionDOMNode,
							this._header && this._header.offsetHeight
						);
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
			alignment,
			onCollapse,
			flyOutStyle,
			optionContainerStyle,
		} = this.props;

		const {
			optionGroups,
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
						{!_.isEmpty(headerProps) &&
							<div
								{...headerProps}
								className={cx('&-Header', headerProps.className)}
								onKeyDown={this.handleKeydown}
								ref={header => this._header = header}
							/>}
						<div
							className={cx('&-option-container')}
							style={_.assign({}, flyOutStyle, optionContainerStyle)}
						>
							{_.map(nullOptions, optionProps =>
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
							{joinArray(
								// for each option group,
								_.map(optionGroups, (optionGroupProps, optionGroupIndex) => {
									const groupedOptions =
										optionGroupDataLookup[optionGroupIndex];
									if (
										optionGroupProps.isHidden ||
										_.every(groupedOptions, { optionProps: { isHidden: true } })
									) {
										return null;
									}

									const labelElements = rejectTypes(optionGroupProps.children, [
										DropMenu.Control,
										DropMenu.OptionGroup,
										DropMenu.Option,
										DropMenu.NullOption,
									]);
									// render label if there is one
									return (_.isEmpty(labelElements)
										? []
										: [
												<div
													{...omitProps(optionGroupProps, DropMenu.OptionGroup)}
													className={cx('&-label', optionGroupProps.className)}
												>
													{labelElements}
												</div>,
												// render the options in the group
											]).concat(
										_.map(optionGroupDataLookup[optionGroupIndex], ({
											optionProps,
											optionIndex,
										}) => this.renderOption(optionProps, optionIndex, true))
									);
									// append all ungrouped options as another unlabeled group
								}).concat(
									_.isEmpty(ungroupedOptionData)
										? []
										: [
												_.map(ungroupedOptionData, ({
													optionProps,
													optionIndex,
												}) => this.renderOption(optionProps, optionIndex)),
											]
								),
								(element, index) =>
									element &&
									<div
										key={`OptionGroup-divider-${index}`}
										className={cx('&-OptionGroup-divider')}
									/> // separate each group with divider
							)}
						</div>
					</ContextMenu.FlyOut>
				</ContextMenu>
			</div>
		);
	},
});

export default buildHybridComponent(DropMenu);
export { DropMenu as DropMenuDumb };
