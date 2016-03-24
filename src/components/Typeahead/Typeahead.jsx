import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';

import { lucidClassNames } from '../../util/style-helpers';
import { Tab as TAB } from '../../constants/key-code';

import DropMenu from '../DropMenu/DropMenu';
import TextField from '../TextField/TextField';

const {
	Control,
	Option,
	OptionGroup
} = DropMenu;

const boundClassNames = lucidClassNames.bind('&-Typeahead');

const {
	arrayOf,
	bool,
	func,
	number,
	oneOf,
	oneOfType,
	string
} = React.PropTypes;

/**
 * {"categories": ["controls", "text"], "madeFrom": ["DropMenu", "TextField"]}
 *
 * Blah blah blah.
 * 
 * Need to expose `onChange` so the consumer knows when the person has typed
 * something into the text field.
 * 
 * Need to expose `onSelect` so the consumer knows when the person has selected
 * something from the menu.
 * 
 * Need to expose `onBlur` so the consumer knows when the person has tabbed out
 * of the text field or clicked somewhere else on the page.
 */
const Typeahead = React.createClass({
	propTypes: {
		/**
		 * woot
		 */
		className: string,

		/**
		 * woot
		 */
		focusedIndex: number,

		/**
		 * woot
		 */
		isDisabled: bool,

		/**
		 * woot
		 */
		isExpanded: bool,

		/**
		 * woot
		 */
		menuDirection: oneOf([
			'down',
			'up'
		]),

		/**
		 * woot
		 */
		noSuggestionsMessage: string,

		/**
		 * woot
		 */
		onBlur: func,

		/**
		 * woot
		 */
		onChange: func,

		/**
		 * woot
		 */
		onFocusNext: func,

		/**
		 * woot
		 */
		onFocusPrev: func,

		/**
		 * woot
		 */
		onKeyDown: func,

		/**
		 * woot
		 */
		suggestions: arrayOf(string),

		/**
		 * woot
		 */
		value: oneOfType([
			number,
			string
		])
	},

	getDefaultProps() {
		return {
			focusedIndex: 0,
			isDisabled: false,
			isExpanded: false,
			menuDirection: 'down',
			noSuggestionsMessage: 'No results found',
			onBlur: _.noop,
			onChange: _.noop,
			onFocusNext: _.noop,
			onFocusPrev: _.noop,
			onKeyDown: _.noop,
			suggestions: [],
			value: ''
		};
	},

	render() {
		const {
			className,
			focusedIndex,
			isDisabled,
			isExpanded,
			menuDirection,
			noSuggestionsMessage,
			onBlur,
			onChange,
			onFocusNext,
			onFocusPrev,
			suggestions,
			value
		} = this.props;

		return (
			<DropMenu
				className={boundClassNames('&', {
					'&-is-disabled': isDisabled,
					'&-is-expanded': isExpanded
				}, className)}
				direction={menuDirection}
				focusedIndex={focusedIndex}
				isExpanded={isExpanded && !isDisabled}
				onCollapse={this.handleCollapsed}
				onFocusNext={onFocusNext}
				onFocusPrev={onFocusPrev}
				onSelect={this.handleSelectedSuggestion}
			>
				<Control>
					<TextField
						isDisabled={isDisabled}
						onChange={onChange}
						onKeyDown={this.handleKeyedDown}
						ref='woot'
						value={value}
					/>
				</Control>
				{isExpanded ? (
					suggestions.length > 0
							? _.map(suggestions, (suggestion) => (
								<Option key={suggestion}>{suggestion}</Option>
							))
							: <Option isDisabled={true}>{noSuggestionsMessage}</Option>
				) : null}
			</DropMenu>
		);
	},

	handleCollapsed(event) {
		if (event.currentTarget === window) {
			this.props.onBlur(event);
		}
	},

	handleKeyedDown(event) {
		if (event.keyCode === TAB) {
			this.props.onBlur(event);
		}

		this.props.onKeyDown(event);
	},

	handleSelectedSuggestion(selectedIndex, passThrough) {
		this.props.onChange(this.props.suggestions[selectedIndex], passThrough);
	}
});

export default Typeahead;