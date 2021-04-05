/* eslint-disable react/prop-types */
import _ from 'lodash';
import React, { createElement } from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import {
	StandardProps,
	getFirst,
	omitProps,
	Overwrite,
} from '../../util/component-types';
import { buildModernHybridComponent } from '../../util/state-management';
import TextField, { ITextFieldProps } from '../TextField/TextField';
import SearchIcon from '../Icon/SearchIcon/SearchIcon';
import reducers from './SearchField.reducers';
import { ITextFieldState } from '../TextField/TextField';

const cx = lucidClassNames.bind('&-SearchField');

const { bool, func, node, number, oneOfType, string } = PropTypes;

interface ISearchFieldIcon extends StandardProps {}

const SearchFieldIcon = (_props: ISearchFieldIcon): null => null;
SearchFieldIcon.peek = {
	description: `
		Icon this is displayed on the right side of the SearchField. Any of the lucid \`*Icon\` components should work.
	`,
};
SearchFieldIcon.displayName = 'SearchField.Icon';
SearchFieldIcon.propName = 'Icon';

interface ISearchFieldTextField extends ITextFieldProps {}

const SearchFieldTextField = (_props: ISearchFieldTextField): null => null;
SearchFieldTextField.peek = {
	description: `
		Icon this is displayed on the right side of the SearchField. Any of the lucid \`*Icon\` components should work.
	`,
};
SearchFieldTextField.displayName = 'SearchField.TextField';
SearchFieldTextField.propName = 'TextField';

export interface ISearchFieldState extends ITextFieldState {}

export interface ISearchFieldProps extends StandardProps {
	/** Fires an event every time the user types text into the TextField. */
	onChange: (
		value: string,
		{ event, props }: { event: React.FormEvent; props: ITextFieldProps }
	) => void;

	/** Fires an event, debounced by \`debounceLevel\`, when the user types text
	into the TextField. */
	onChangeDebounced?: (
		value: string,
		{ event, props }: { event: React.FormEvent; props: ITextFieldProps }
	) => void;

	/** Number of milliseconds to debounce the \`onChangeDebounced\` callback.
			Only useful if you provide an \`onChangeDebounced\` handler. */
	debounceLevel: number;

	/** Fires an event when the user hits "enter" from the SearchField. */
	onSubmit: (
		value: string,
		{ event, props }: { event: React.FormEvent; props: ITextFieldProps }
	) => void;

	/** Set the value of the input. */
	value: string | number;

	/** Controls the highlighting of the search icon. Should be passed \`true\`
			when the search text is valid, e.g. contains enough characters to perform
			a search. */
	isValid?: boolean;

	/** Disables the SearchField by greying it out. */
	isDisabled: boolean;

	/**n placeholder value */
	placeholder?: string;
}

type ISearchFieldPropsWithPassThroughs = Overwrite<
	React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	>,
	ISearchFieldProps
>;

class SearchField extends React.Component<
	ISearchFieldPropsWithPassThroughs,
	ISearchFieldState
> {
	static displayName = 'SearchField';
	static TextField = SearchFieldTextField;
	static Icon = SearchFieldIcon;

	static peek = {
		description: `
					This is a wrapper around TextField that styles it for a search
					use-case. The icon and TextField are customizable through child
					components.
				`,
		categories: ['controls', 'text'],
		madeFrom: ['TextField', 'SearchIcon'],
	};

	static reducers = reducers;

	static propTypes = {
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

		TextField: node`
			The TextField that Searchfield is composed of.
		`,
	};

	static defaultProps = {
		isDisabled: false,
		onChange: _.noop,
		onChangeDebounced: _.noop,
		debounceLevel: 500,
		onSubmit: _.noop,
		value: '',
	};

	render(): React.ReactNode {
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
				autoComplete,
				...passThroughs
			},
		} = this;

		const { Icon } = SearchField;

		const textFieldProps = _.get(
			getFirst(props, SearchField.TextField),
			'props'
		) || {
			isDisabled,
			onChange,
			onChangeDebounced,
			debounceLevel,
			onSubmit,
			placeholder,
			isMultiLine: false,
			value,
			autoComplete,
		};

		const textFieldElement = <TextField {...textFieldProps} />;
		const isIconActive = _.isUndefined(isValid)
			? !_.isEmpty(_.get(textFieldElement, 'props.value'))
			: isValid;
		const defaultIcon = (
			<SearchIcon
				size={12}
				className={cx('&-Icon', { '&-Icon-active': isIconActive })}
			/>
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
				{...omitProps(passThroughs, undefined, _.keys(SearchField.propTypes))}
				className={cx('&', className)}
			>
				{textFieldElement}
				<div className={cx('&-Icon-container')}>{icon}</div>
			</div>
		);
	}
}

export default buildModernHybridComponent<
	ISearchFieldPropsWithPassThroughs,
	ISearchFieldState,
	typeof SearchField
>(SearchField, { reducers });
export { SearchField as SearchFieldDumb };
