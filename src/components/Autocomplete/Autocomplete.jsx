import React from 'react';
import _ from 'lodash';
import { lucidClassNames } from '../../util/style-helpers';
import { createLucidComponentDefinition } from '../../util/component-definition';
import * as reducers from './Autocomplete.reducers';
import * as KEYCODE from '../../constants/key-code';
import DropMenu from '../DropMenu/DropMenu';
import CaretIcon from '../Icon/CaretIcon/CaretIcon';

const boundClassNames = lucidClassNames.bind('&-Autocomplete');

const {
	arrayOf,
	bool,
	func,
	object,
	shape,
	string
} = React.PropTypes;

/**
 *
 * {"categories": ["controls", "selectors"], "madeFrom": ["DropMenu"]}
 *
 * A selector control (like native `<select>`) which is used to select a single option from a dropdown list.
 * Supports option groups with and without labels.
 */

const Autocomplete = React.createClass(createLucidComponentDefinition({
	displayName: 'Autocomplete',

	reducers,

	propTypes: {
		/**
		 * Appended to the component-specific class names set on the root elements. Applies to *both* the control and the flyout menu.
		 */
		className: string,
		/**
		 * Styles that are passed through to root element.
		 */
		style: object,
		/**
		 * Disables the Autocomplete from being clicked or focused.
		 */
		isDisabled: bool,
		/**
		 * suggestions
		 */
		suggestions: arrayOf(string),
		/**
		 * value
		 */
		value: string,
		/**
		 * Object of DropMenu props which are passed thru to the underlying DropMenu component.
		 */
		DropMenu: shape(DropMenu.propTypes),
		/**
		 * Called when the input value changes.
		 */
		onChange: func,
		/**
		 * onSelect
		 */
		onSelect: func,
		/**
		 * onExpand
		 */
		onExpand: func,
	},

	getDefaultProps() {
		return {
			isDisabled: false,
			suggestions: [],
			value: '',
			onChange: _.noop,
			onSelect: _.noop,
			onExpand: _.noop,
			DropMenu: DropMenu.getDefaultProps()
		};
	},

	handleSelect(optionIndex, ...args) {
		const {
			suggestions,
			onChange,
			onSelect,
			DropMenu: {
				onCollapse
			}
		} = this.props;

		onChange(suggestions[optionIndex], ...args);
		onSelect(optionIndex, ...args);
	},

	handleInput(event) {
		const {
			onChange,
			onExpand,
			DropMenu: {
				onCollapse
			}
		} = this.props;

		onChange(event.target.value, {event, props: this.props});
		if (!_.isEmpty(event.target.value)) {
			onExpand();
		} else {
			onCollapse();
		}
	},

	getInputValue() {
		return _.get(this.refs, 'inputNode.value', this.props.value);
	},

	setInputValue(value) {
		if (this.refs.inputNode) {
			this.refs.inputNode.value = value;
		}
	},

	handleInputKeydown(event) {
		const {
			onExpand,
			DropMenu: {
				isExpanded,
				focusedIndex,
				onCollapse,
			}
		} = this.props;

		const value = this.getInputValue();

		if (event.keyCode === KEYCODE.Tab && isExpanded && focusedIndex !== null) {
			this.handleSelect(focusedIndex, event);
			event.preventDefault();
		}

		if (event.keyCode === KEYCODE.Space) {
			event.stopPropagation();
		}

		if (event.keyCode === KEYCODE.ArrowDown && !isExpanded) {
			event.stopPropagation();

			if (_.isEmpty(value)) {
				onExpand(event);
			}
		}

		if (event.keyCode === KEYCODE.Escape) {
			event.stopPropagation();
			onCollapse(event);
		}

		if (event.keyCode === KEYCODE.Enter && focusedIndex === null) {
			event.stopPropagation();
			onCollapse(event);
		}
	},

	handleControlClick(event) {
		const {
			onExpand,
			DropMenu: {
				isExpanded,
				onCollapse
			}
		} = this.props;

		const value = this.getInputValue();

		if (event.target === this.refs.inputNode) {
			if (_.isEmpty(value)) {
				onExpand(event);
			}

			event.stopPropagation();
		} else {
			if (isExpanded) {
				onCollapse(event);
			} else {
				if (_.isEmpty(value)) {
					onExpand(event);
				}
			}

			this.refs.inputNode.focus();
		}
	},

	componentDidMount() {
		const { value } = this.props;
		this.refs.inputNode.addEventListener('input', this.handleInput);
		this.setInputValue(value);
	},

	componentWillReceiveProps(nextProps) {
		const { value } = nextProps;
		if (value !== this.getInputValue()) {
			this.setInputValue(value);
		}
	},

	componentWillUnmount() {
		if (this.refs.inputNode) {
			this.refs.inputNode.removeEventListener('input', this.handleInput);
		}
	},

	render() {
		const {
			style,
			className,
			isDisabled,
			DropMenu: dropMenuProps,
			suggestions,
			...passThroughs
		} = this.props;

		const {
			direction,
			isExpanded
		} = dropMenuProps;

		const value = this.getInputValue();
		const valuePattern = new RegExp(_.escapeRegExp(value), 'i');

		return (
			<DropMenu
				{...dropMenuProps}
				isDisabled={isDisabled}
				selectedIndices={[]}
				className={boundClassNames('&', className)}
				onSelect={this.handleSelect}
				style={style}
			>
				<DropMenu.Control onClick={this.handleControlClick}>
					<div className={boundClassNames('&-Control', {
						'&-Control-is-expanded': isExpanded,
						'&-Control-is-disabled': isDisabled
					})}>
						<input
							{..._.omit(passThroughs, ['onChange', 'onSelect', 'onExpand', 'value', 'children'])}
							type='text'
							className={boundClassNames('&-Control-input')}
							ref='inputNode'
							onKeyDown={this.handleInputKeydown}
						/>
						<CaretIcon direction={isExpanded ? direction : 'down'} />
					</div>
				</DropMenu.Control>
				{value ? _.map(suggestions, (suggestion) => (
					<DropMenu.Option key={'AutocompleteOption' + suggestion} >
						{(() => {
							const [pre, match, post] = partitionText(suggestion, valuePattern, value.length);
							const formattedSuggestion = [];
							if (pre) {
								formattedSuggestion.push(
									<span key={`AutocompleteOption-suggestion-pre-${suggestion}`} className={boundClassNames('&-Option-suggestion-pre')}>{pre}</span>
								);
							}
							if (match) {
								formattedSuggestion.push(
									<span key={`AutocompleteOption-suggestion-match-${suggestion}`} className={boundClassNames('&-Option-suggestion-match')}>{match}</span>
								);
							}
							if (post) {
								formattedSuggestion.push(
									<span key={`AutocompleteOption-suggestion-post-${suggestion}`} className={boundClassNames('&-Option-suggestion-post')}>{post}</span>
								);
							}
							return formattedSuggestion;
						})()}
					</DropMenu.Option>)
				) : _.map(suggestions, (suggestion) => (
					<DropMenu.Option key={'AutocompleteOption' + suggestion} >{suggestion}</DropMenu.Option>)
				)}
			</DropMenu>
		);
	}
}));

function partitionText(text, pattern, length) {
	const index = text.search(pattern);
	if (index === -1) {
		return ['', '', text];
	} else if (index === 0) {
		return ['', text.substr(0, length), text.substring(length)];
	} else {
		return [text.substring(0, index), text.substr(index, length), text.substring(index + length)];
	}
}

export default Autocomplete;
