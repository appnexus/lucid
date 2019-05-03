import _ from 'lodash';
import React, { createElement } from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, getFirst, omitProps } from '../../util/component-types';
import { buildHybridComponent } from '../../util/state-management';

import TextField from '../TextField/TextField';
import SearchIcon from '../Icon/SearchIcon/SearchIcon';

import reducers from './SearchField.reducers';

const cx = lucidClassNames.bind('&-SearchField');

const { bool, func, node, number, oneOfType, string } = PropTypes;

const SearchField = createClass({
	displayName: 'SearchField',

	statics: {
		peek: {
			description: `
				This is a wrapper around TextField that styles it for a search
				use-case. The icon and TextField are customizable through child
				components.
			`,
			categories: ['controls', 'text'],
			madeFrom: ['TextField', 'SearchIcon'],
		},
	},

	components: {
		TextField,
		Icon: createClass({
			displayName: 'SearchField.Icon',
			statics: {
				peek: {
					description: `
						Icon this is displayed on the right side of the SearchField. Any of
						the lucid \`*Icon\` components should work.
					`,
				},
			},
			propName: 'Icon',
		}),
	},

	reducers,

	propTypes: {
		onChange: func`
			Fires an event every time the user types text into the TextField.
			Signature: \`(value, { event, props }) => {}\`
		`,

		onChangeDebounced: func`
			Fires an event, debounced by \`debounceLevel\`, when the user types text
			into the TextField.  Signature: \`(value, { event, props }) => {}\`
		`,

		debounceLevel: number`
			Number of milliseconds to debounce the \`onChangeDebounced\` callback.
			Only useful if you provide an \`onChangeDebounced\` handler.
		`,

		onSubmit: func`
			Fires an event when the user hits "enter" from the SearchField.
			Signature: \`(value, { event, props }) => {}\`
		`,

		value: oneOfType([number, string])`
			Set the value of the input.
		`,

		isValid: bool`
			Controls the highlighting of the search icon. Should be passed \`true\`
			when the search text is valid, e.g. contains enough characters to perform
			a search.
		`,

		isDisabled: bool`
			Disables the SearchField by greying it out.
		`,

		placeholder: string`
			placeholder value
		`,

		className: string`
			Appended to the component-specific class names set on the root element.
		`,

		Icon: node`
			Icon this is displayed on the right side of the SearchField. Any of the
			lucid \`*Icon\` components should work.
		`,
	},

	getDefaultProps() {
		return {
			isDisabled: false,
			onChange: _.noop,
			onChangeDebounced: _.noop,
			debounceLevel: 500,
			onSubmit: _.noop,
			value: '',
		};
	},

	render() {
		const {
			props,
			props: {
				className,
				isDisabled,
				isValid,
				onChange,
				onChangeDebounced,
				debounceLevel,
				onSubmit,
				placeholder,
				value,
				...passThroughs
			},
		} = this;

		const { Icon, TextField } = SearchField;

		const textFieldProps = {
			isDisabled,
			onChange,
			onChangeDebounced,
			debounceLevel,
			onSubmit,
			placeholder,
			isMultiLine: false,
			value,
		};

		const textFieldElement = getFirst(props, TextField) || (
			<TextField {...textFieldProps} />
		);
		const isIconActive = _.isUndefined(isValid)
			? !_.isEmpty(_.get(textFieldElement, 'props.value'))
			: isValid;
		const defaultIcon = (
			<SearchIcon className={cx('&-Icon', { '&-Icon-active': isIconActive })} />
		);
		const iconElement = getFirst(props, Icon);
		const iconChildren = _.get(iconElement, 'props.children');
		const icon = iconChildren
			? createElement(iconChildren.type, {
					...iconChildren.props,
					className: cx(
						'&-Icon',
						{ '&-Icon-active': isIconActive },
						iconChildren.props.className
					),
				})
			: defaultIcon;

		return (
			<div
				{...omitProps(passThroughs, SearchField)}
				className={cx('&', className)}
			>
				{textFieldElement}
				<div className={cx('&-Icon-container')}>{icon}</div>
			</div>
		);
	},
});

export default buildHybridComponent(SearchField);
export { SearchField as SearchFieldDumb };
