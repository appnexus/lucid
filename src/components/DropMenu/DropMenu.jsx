import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import { bindClassNames } from '../../util/style-helpers';
import { createLucidComponentDefinition } from '../../util/component-definition';
import { scrollParentTo } from '../../util/dom-helpers';
import * as KEYCODE from '../../constants/key-code';
import * as reducers from './DropMenu.reducers';
import ContextMenu from '../ContextMenu/ContextMenu';
import Caret from '../Caret/Caret';

const boundClassNames = bindClassNames('DropMenu');

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
		Control: {
			isDisabled: bool
		},
		Option: {
			isSelected: bool,
			isDisabled: bool,
			onSelect: func,
			onFocusOption: func
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
		style: object,
		isExpanded: bool,
		direction: oneOf(['down', 'up']),
		selectedIndices: arrayOf(number),
		focusedIndex: number,
		portalId: string,
		onExpand: func,
		onCollapse: func,
		onSelect: func,
		onFocusNext: func,
		onFocusPrev: func,
		onBelowFold: func,
		onAboveFold: func,
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
			isMouseTriggered: false
		}
	},

	handleKeydown(e) {
		let {
			isExpanded,
			focusedIndex,
			onExpand,
			onCollapse,
			onSelect,
			onFocusPrev,
			onFocusNext
		} = this.props;

		this.setState({
			isMouseTriggered: false
		});

		if (isExpanded) {
			e.preventDefault();
			if (_.includes([KEYCODE.Enter, KEYCODE.Space], e.keyCode)) {
				onSelect(focusedIndex);
			}
			if (e.keyCode === KEYCODE.Escape) {
				onCollapse(e);
			}
			if (e.keyCode === KEYCODE.ArrowUp) {
				onFocusPrev(e);
			}
			if (e.keyCode === KEYCODE.ArrowDown) {
				onFocusNext(e);
			}
		} else {
			if (_.includes([KEYCODE.Space, KEYCODE.ArrowDown], e.keyCode)) {
				e.preventDefault();
				onExpand(e);
			}
		}
	},

	handleClick(e) {
		let {
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
		let {
			onBelowFold,
			onAboveFold
		} = this.props;
		if (type === ContextMenu.BELOW_FOLD) {
			onBelowFold();
		} else if (type === ContextMenu.ABOVE_FOLD) {
			onAboveFold();
		}
	},

	handleMouseFocusOption(optionIndex) {
		let {
			focusedIndex,
			onFocusOption
		} = this.props;

		this.setState({
			isMouseTriggered: true
		});

		if (focusedIndex !== optionIndex) {
			onFocusOption(optionIndex);
		}
	},

	handleSelectOption(optionIndex) {
		let {
			onSelect
		} = this.props;

		onSelect(optionIndex);
	},

	renderOption(optionProps, optionIndex) {
		let {
			selectedIndices,
			focusedIndex,
		} = this.props;

		let {
			isMouseTriggered
		} = this.state;

		let isFocused = optionIndex === focusedIndex;
		let isSelected = _.includes(selectedIndices, optionIndex);

		return (
			<div
				className={boundClassNames(
					'Option', {
					'Option--focused': isFocused,
					'Option--selected': isSelected
				})}
				onMouseMove={() => this.handleMouseFocusOption(optionIndex)}
				onClick={() => this.handleSelectOption(optionIndex)}
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

	render() {
		let {
			className,
			style,
			isExpanded,
			direction,
			children,
			portalId,
			onCollapse
		} = this.props;

		let controlChildProps = DropMenu.Control.getAllAsProps(this.props, children);
		let optionChildProps = DropMenu.Option.getAllAsProps(this.props);
		let optionIndex = 0;
		let menuChildren = _.map(optionChildProps, (optionProps) => {
			let optionElement = this.renderOption(optionProps, optionIndex);
			optionIndex++;
			return optionElement;
		});
		menuChildren = menuChildren.concat(React.Children.map(children, (element) => {
			let newElement = element;
			if (element.type === DropMenu.Option) {
				newElement = this.renderOption(element.props, optionIndex)
				optionIndex++;
			}
			return newElement;
		}));

		return (
			<div className={classNames('lucid-DropMenu', className)} style={style}>
				<ContextMenu portalId={portalId} isExpanded={isExpanded} direction={direction} onChangeBounds={this.handleChangeBounds} onClickOut={onCollapse}>
					<ContextMenu.Target>
						<div
							className={boundClassNames('control')}
							tabIndex={0}
							onClick={this.handleClick}
							onKeyDown={this.handleKeydown}
						>{_.first(controlChildProps).children}<Caret direction={isExpanded ? direction : 'down'} color="black"/></div>
					</ContextMenu.Target>
					<ContextMenu.FlyOut style={{
						background: '#fafafa',
						border: 'solid 1px #d1d1d1',
						boxShadow:' 1px 1px 2px rgba(0, 0, 0, 0.2)',
						maxHeight: '8em',
						overflowY: 'auto'
					}}>
						{menuChildren}
					</ContextMenu.FlyOut>
				</ContextMenu>
			</div>
		);
	}
}));

export default DropMenu;
