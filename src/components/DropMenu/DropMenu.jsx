import React from 'react';
import _ from 'lodash';
import { lucidClassNames } from '../../util/style-helpers';
import { createLucidComponentDefinition } from '../../util/component-definition';
import { scrollParentTo } from '../../util/dom-helpers';
import { rejectNullElements } from '../../util/child-component';
import * as KEYCODE from '../../constants/key-code';
import * as reducers from './DropMenu.reducers';
import ContextMenu from '../ContextMenu/ContextMenu';

const boundClassNames = lucidClassNames.bind('&-DropMenu');

const {
	bool,
	string,
	oneOf,
	node,
	arrayOf,
	func,
	object,
	number
} = React.PropTypes;

/**
 *
 * {"categories": ["controls", "selectors"]}
 *
 * A basic drop menu. Any props that are not explicitly called out below will be
 * passed through.
 */
const DropMenu = React.createClass(createLucidComponentDefinition({
	displayName: 'DropMenu',

	reducers,

	childProps: {
		Control: {},
		OptionGroup: {},
		Option: {
			isDisabled: bool
		}
	},

	propTypes: {
		/**
		 * children
		 */
		children: node,
		/**
		 * class names that are appended to the defaults
		 */
		className: string,
		/**
		 * hlo
		 */
		style: object,
		/**
		 * hlo
		 */
		isExpanded: bool,
		/**
		 * hlo
		 */
		direction: oneOf(['down', 'up']),
		/**
		 * hlo
		 */
		selectedIndices: arrayOf(number),
		/**
		 * hlo
		 */
		focusedIndex: number,
		/**
		 * hlo
		 */
		portalId: string,
		/**
		 * hlo
		 */
		onExpand: func,
		/**
		 * hlo
		 */
		onCollapse: func,
		/**
		 * hlo
		 */
		onSelect: func,
		/**
		 * hlo
		 */
		onFocusNext: func,
		/**
		 * hlo
		 */
		onFocusPrev: func,
		/**
		 * hlo
		 */
		onBelowFold: func,
		/**
		 * hlo
		 */
		onAboveFold: func,
		/**
		 * hlo
		 */
		onFocusOption: func
	},

	getDefaultProps() {
		return {
			isExpanded: false,
			direction: 'down',
			selectedIndices: [],
			focusedIndex: null,
			portalId: 'DropMenu-Portal-' + Math.random().toString(16).substr(2)
		};
	},

	getInitialState() {
		return {
			isMouseTriggered: false,
			optionGroups: [],
			flattenedOptionsData: [],
			ungroupedOptionData: [],
			optionGroupDataLookup: {}
		}
	},

	statics: {
		preprocessOptionData(props, ParentType=DropMenu) {
			const {
				OptionGroup,
				Option
			} = ParentType;
			const optionGroups = OptionGroup.findInAllAsProps(props); // find all OptionGroup props
			const ungroupedOptions = Option.findInAllAsProps(props); // find all ungrouped Option props

			// flatten grouped options into array of objects to associate { index, group index, and props } for each option
			const groupedOptionData = _.reduce(optionGroups, (memo, optionGroupProps, optionGroupIndex) => {
				const groupedOptions = Option.findInAllAsProps(optionGroupProps); // find all Option props for current group
				return memo.concat(_.map(groupedOptions, (optionProps, localOptionIndex) => {
					return {
						localOptionIndex,
						optionIndex: _.size(memo) + localOptionIndex, // add current index to current array length to get final option index
						optionGroupIndex, // store option group index to associate option back to group
						optionProps
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
						optionProps
				};
			});

			// concatenate grouped options array with ungrouped options array to get flat list of all options
			const flattenedOptionsData = groupedOptionData.concat(ungroupedOptionData);

			return {
				optionGroups,
				optionGroupDataLookup,
				ungroupedOptionData,
				flattenedOptionsData
			};
		}
	},

	getPreprocessedOptionData(props) {
		return DropMenu.preprocessOptionData(props, DropMenu);
	},

	_getPreprocessedOptionData(props) {
		const optionGroups = DropMenu.OptionGroup.findInAllAsProps(props); // find all OptionGroup props
		const ungroupedOptions = DropMenu.Option.findInAllAsProps(props); // find all ungrouped Option props

		// flatten grouped options into array of objects to associate { index, group index, and props } for each option
		const groupedOptionData = _.reduce(optionGroups, (memo, optionGroupProps, optionGroupIndex) => {
			const groupedOptions = DropMenu.Option.findInAllAsProps(optionGroupProps); // find all Option props for current group
			return memo.concat(_.map(groupedOptions, (optionProps, localOptionIndex) => {
				return {
					localOptionIndex,
					optionIndex: _.size(memo) + localOptionIndex, // add current index to current array length to get final option index
					optionGroupIndex, // store option group index to associate option back to group
					optionProps
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
					optionProps
			};
		});

		// concatenate grouped options array with ungrouped options array to get flat list of all options
		const flattenedOptionsData = groupedOptionData.concat(ungroupedOptionData);

		return {
			optionGroups,
			optionGroupDataLookup,
			ungroupedOptionData,
			flattenedOptionsData
		};
	},

	handleKeydown(e) {
		const {
			isExpanded,
			focusedIndex,
			onExpand,
			onCollapse,
			onSelect,
			onFocusPrev,
			onFocusNext
		} = this.props;

		const {
			flattenedOptionsData
		} = this.state;

		this.setState({
			isMouseTriggered: false
		});

		if (isExpanded) {
			if (_.includes([KEYCODE.Enter, KEYCODE.Space], e.keyCode)) {
				e.preventDefault();
				if (_.isNumber(focusedIndex)
						&& _.get(flattenedOptionsData, focusedIndex)
						&& !_.get(flattenedOptionsData, `[${focusedIndex}]optionProps.isDisabled`, false)) {
					onSelect(focusedIndex);
				}
			}
			if (e.keyCode === KEYCODE.Escape) {
				e.preventDefault();
				onCollapse(e);
			}
			if (e.keyCode === KEYCODE.ArrowUp) {
				if (_.isNumber(focusedIndex)) {
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
			if (_.includes([KEYCODE.Space, KEYCODE.ArrowDown], e.keyCode)) {
				e.preventDefault();
				onExpand(e);
			}
		}
	},

	handleClick(e) {
		const {
			isExpanded,
			onExpand,
			onCollapse
		} = this.props;

		if (isExpanded) {
			onCollapse(e);
		} else {
			onExpand(e);
		}
	},

	handleChangeBounds(type) {
		const {
			onBelowFold,
			onAboveFold
		} = this.props;
		if (type === ContextMenu.BELOW_FOLD) {
			onBelowFold();
		} else if (type === ContextMenu.ABOVE_FOLD) {
			onAboveFold();
		}
	},

	handleMouseFocusOption(optionIndex, optionProps) {
		const {
			focusedIndex,
			onFocusOption
		} = this.props;

		this.setState({
			isMouseTriggered: true
		});

		if (!optionProps.isDisabled && focusedIndex !== optionIndex) {
			onFocusOption(optionIndex);
		}
	},

	handleSelectOption(optionIndex, optionProps) {
		const {
			onSelect
		} = this.props;

		if (!optionProps.isDisabled) {
			onSelect(optionIndex);
		}
	},

	renderOption(optionProps, optionIndex, isGrouped) {
		const {
			selectedIndices,
			focusedIndex,
		} = this.props;

		const {
			isMouseTriggered
		} = this.state;

		const {
			isDisabled
		} = optionProps;

		const isFocused = optionIndex === focusedIndex;
		const isSelected = _.includes(selectedIndices, optionIndex);

		return (
			<div
				className={boundClassNames(
					'&-Option', {
					'&-Option-grouped': isGrouped,
					'&-Option-focused': isFocused,
					'&-Option-selected': isSelected,
					'&-Option-disabled': isDisabled
				})}
				onMouseMove={() => this.handleMouseFocusOption(optionIndex, optionProps)}
				onClick={() => this.handleSelectOption(optionIndex, optionProps)}
				ref={(optionDOMNode)=> {
					if (isFocused && !isMouseTriggered) {
						scrollParentTo(optionDOMNode);
					}
				}}
				key={'DropMenuOption' + optionIndex}
			>
				{optionProps.children}
			</div>
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
			isExpanded,
			direction,
			portalId,
			onCollapse
		} = this.props;

		const {
			optionGroups,
			ungroupedOptionData,
			optionGroupDataLookup
		} = this.state;

		const controlProps = _.first(DropMenu.Control.findInAllAsProps(this.props));

		return (
			<div className={boundClassNames('&', '&-base', {
				'&-is-expanded': isExpanded,
				'&-direction-down': isExpanded && direction === 'down',
				'&-direction-up': isExpanded && direction === 'up'
			}, className)} style={style}>
				<ContextMenu portalId={portalId} isExpanded={isExpanded} direction={direction} onChangeBounds={this.handleChangeBounds} onClickOut={onCollapse}>
					<ContextMenu.Target>
						<div
							className={boundClassNames('&-Control')}
							tabIndex={0}
							onClick={this.handleClick}
							onKeyDown={this.handleKeydown}
						>{_.get(controlProps, 'children', null)}</div>
					</ContextMenu.Target>
					<ContextMenu.FlyOut className={boundClassNames('&', className)}>
						{
							// for each option group,
							_.map(optionGroups, (optionGroupProps, optionGroupIndex) => {
								const renderableLabelElements = rejectNullElements(optionGroupProps.children);
								// render label if there is one
								return (_.isEmpty(renderableLabelElements) ? [] : [
									<div className={boundClassNames('&-Label')}>
										{renderableLabelElements}
									</div>
								// plus any options in the group
								]).concat(_.map(_.get(optionGroupDataLookup, optionGroupIndex), ({ optionProps, optionIndex }) => this.renderOption(optionProps, optionIndex, true)))
								.concat([<div className={boundClassNames('&-OptionGroup-end')} />]);
							// then render all the ungrouped options at the end
							}).concat(_.map(ungroupedOptionData, ({ optionProps, optionIndex }) => this.renderOption(optionProps, optionIndex)))
						}
					</ContextMenu.FlyOut>
				</ContextMenu>
			</div>
		);
	}
}));

export default DropMenu;
