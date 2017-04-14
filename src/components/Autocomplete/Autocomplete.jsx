import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { createClass } from '../../util/component-types';
import { lucidClassNames } from '../../util/style-helpers';
import { buildHybridComponent } from '../../util/state-management';
import { partitionText } from '../../util/text-manipulation';
import * as reducers from './Autocomplete.reducers';
import * as KEYCODE from '../../constants/key-code';
import { DropMenuDumb as DropMenu } from '../DropMenu/DropMenu';

const cx = lucidClassNames.bind('&-Autocomplete');

const { arrayOf, bool, func, object, shape, string } = PropTypes;

/**
 *
 * {"categories": ["controls", "text"], "madeFrom": ["DropMenu"]}
 *
 * A text input with suggested values displayed in an attached menu.
 */

const Autocomplete = createClass({
	displayName: 'Autocomplete',

	_isPrivate: true,

	reducers,

	propTypes: {
		/**
		 * Appended to the component-specific class names set on the root elements.
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
		 * Array of suggested text input values shown in drop menu.
		 */
		suggestions: arrayOf(string),
		/**
		 * Text value of the input.
		 */
		value: string,
		/**
		 * Object of DropMenu props which are passed thru to the underlying DropMenu component.
		 */
		DropMenu: shape(DropMenu.propTypes),
		/**
		 * Called when the input value changes.
		 * Has the signature `(value, {props, event}) => {}` where value is a string.
		 */
		onChange: func,
		/**
		 * Called when a suggestion is selected from the menu.
		 * Has the signature `(optionIndex, {props, event}) => {}` where optionIndex is a number.
		 */
		onSelect: func,
		/**
		 * Called when menu is expected to expand.
		 * Has the signature `({props, event}) => {}`.
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
			DropMenu: DropMenu.getDefaultProps(),
		};
	},

	handleSelect(optionIndex, { event }) {
		const { suggestions, onChange, onSelect } = this.props;

		onChange(suggestions[optionIndex], { event, props: this.props });
		onSelect(optionIndex, { event, props: this.props });
	},

	handleInput(event) {
		const { onChange, onExpand, DropMenu: { onCollapse } } = this.props;

		onChange(event.target.value, { event, props: this.props });
		if (!_.isEmpty(event.target.value)) {
			onExpand({ event, props: this.props });
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
			DropMenu: { isExpanded, focusedIndex, onCollapse },
		} = this.props;

		const value = this.getInputValue();

		if (event.keyCode === KEYCODE.Tab && isExpanded && focusedIndex !== null) {
			this.handleSelect(focusedIndex, { event, props: this.props });
			event.preventDefault();
		}

		if (event.keyCode === KEYCODE.ArrowDown && !isExpanded) {
			event.stopPropagation();

			if (_.isEmpty(value)) {
				onExpand({ event, props: this.props });
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
		const { onExpand, DropMenu: { isExpanded, onCollapse } } = this.props;

		if (event.target === this.refs.inputNode) {
			onExpand({ event, props: this.props });
		} else {
			if (isExpanded) {
				onCollapse(event);
			} else {
				onExpand({ event, props: this.props });
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

		const { isExpanded } = dropMenuProps;

		const value = this.getInputValue();
		const valuePattern = new RegExp(_.escapeRegExp(value), 'i');

		return (
			<DropMenu
				{...dropMenuProps}
				isDisabled={isDisabled}
				selectedIndices={[]}
				className={cx('&', className)}
				onSelect={this.handleSelect}
				style={style}
			>
				<DropMenu.Control onClick={this.handleControlClick}>
					<div
						className={cx('&-Control', {
							'&-Control-is-expanded': isExpanded,
							'&-Control-is-disabled': isDisabled,
						})}
					>
						<input
							{..._.omit(passThroughs, [
								'onChange',
								'onSelect',
								'onExpand',
								'value',
								'children',
							])}
							type="text"
							className={cx('&-Control-input')}
							ref="inputNode"
							onKeyDown={this.handleInputKeydown}
							disabled={isDisabled}
						/>
					</div>
				</DropMenu.Control>
				{value
					? _.map(suggestions, suggestion => (
							<DropMenu.Option key={'AutocompleteOption' + suggestion}>
								{(() => {
									const [pre, match, post] = partitionText(
										suggestion,
										valuePattern,
										value.length
									);
									const formattedSuggestion = [];
									if (pre) {
										formattedSuggestion.push(
											<span
												key={`AutocompleteOption-suggestion-pre-${suggestion}`}
												className={cx('&-Option-suggestion-pre')}
											>
												{pre}
											</span>
										);
									}
									if (match) {
										formattedSuggestion.push(
											<span
												key={`AutocompleteOption-suggestion-match-${suggestion}`}
												className={cx('&-Option-suggestion-match')}
											>
												{match}
											</span>
										);
									}
									if (post) {
										formattedSuggestion.push(
											<span
												key={`AutocompleteOption-suggestion-post-${suggestion}`}
												className={cx('&-Option-suggestion-post')}
											>
												{post}
											</span>
										);
									}
									return formattedSuggestion;
								})()}
							</DropMenu.Option>
						))
					: _.map(suggestions, suggestion => (
							<DropMenu.Option key={'AutocompleteOption' + suggestion}>
								{suggestion}
							</DropMenu.Option>
						))}
			</DropMenu>
		);
	},
});

export default buildHybridComponent(Autocomplete);
export { Autocomplete as AutocompleteDumb };
