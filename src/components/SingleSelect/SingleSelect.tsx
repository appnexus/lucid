import React from 'react';
import PropTypes from 'react-peek/prop-types';
import _ from 'lodash';
import { lucidClassNames } from '../../util/style-helpers';
import { findTypes, getFirst, StandardProps } from '../../util/component-types';
import { buildModernHybridComponent } from '../../util/state-management';
import * as reducers from './SingleSelect.reducers';
import {
	IDropMenuProps,
	IDropMenuState,
	IDropMenuOptionProps,
	IDropMenuOptionGroupProps,
	DropMenuDumb as DropMenu,
	IOptionsData,
} from '../DropMenu/DropMenu';
import ChevronIcon from '../Icon/ChevronIcon/ChevronIcon';

const cx = lucidClassNames.bind('&-SingleSelect');

const { any, bool, func, node, number, object, shape, string, oneOfType } =
	PropTypes;

/** Placeholder Child Component */
export interface ISingleSelectPlaceholderProps extends StandardProps {
	description?: string;
}

const Placeholder = (_props: ISingleSelectPlaceholderProps): null => null;

Placeholder.displayName = 'SingleSelect.Placeholder';
Placeholder.peek = {
	description: `
        Content this is displayed when nothing is selected.
    `,
};
Placeholder.propName = 'Placeholder';

/** Option Child Component */
export interface ISingleSelectOptionProps extends IDropMenuOptionProps {
	description?: string;
	name?: string;
	/** Custom Option component (alias for `SingleSelect.Option.Selected`)  */
	Selected?: React.ReactNode;
}

const Selected = (_props: { children?: React.ReactNode }): null => null;

Selected.displayName = 'SingleSelect.Option.Selected';
Selected.peek = {
	description: `
        Customizes the rendering of the Option when it is selected
        and is displayed instead of the Placeholder.
    `,
};
Selected.propName = 'Selected';
Selected.propTypes = {};

const Option = (_props: ISingleSelectOptionProps): null => null;

Option.displayName = 'SingleSelect.Option';
Option.peek = {
	description: `
        A selectable option in the list.
    `,
};
Option.Selected = Selected;
Option.propName = 'Option';
Option.propTypes = {
	Selected: any`
        Customizes the rendering of the Option when it is selected and is
        displayed instead of the Placeholder.
    `,
	...DropMenu.Option.propTypes,
};
Option.defaultProps = DropMenu.Option.defaultProps;

const OptionGroup = (_props: IDropMenuOptionGroupProps): null => null;

OptionGroup.displayName = 'SingleSelect.OptionGroup';
OptionGroup.peek = {
	description: `
        Groups \`Option\`s together with a non-selectable heading.
    `,
};
OptionGroup.propName = 'OptionGroup';
OptionGroup.propTypes = DropMenu.OptionGroup.propTypes;
OptionGroup.defaultProps = DropMenu.OptionGroup.defaultProps;

type ISingleSelectDropMenuProps = Partial<IDropMenuProps>;

/** Single Select Component */
export interface ISingleSelectProps extends StandardProps {
	/** Custom Placeholder component (alias for `SingleSelect.Placeholder`)  */
	Placeholder?: React.ReactNode;

	/** Custom Option component (alias for `SingleSelect.Option`)  */
	Option?: React.ReactNode;

	//TODO: Remove? Seems like this belongs on OptionProps not SingleSelectProps
	/** Custom Option component (alias for `SingleSelect.Option.Selected`)  */
	Selected?: React.ReactNode;

	/** Custom OptionGroup component (alias for `SingleSelect.OptionGroup`)  */
	OptionGroup?: IDropMenuOptionGroupProps;

	hasReset: boolean;

	isSelectionHighlighted: boolean;

	isDisabled: boolean;

	isInvisible: boolean;

	selectedIndex: number | null;

	DropMenu: ISingleSelectDropMenuProps;

	maxMenuHeight?: number | string;

	showIcon?: boolean;

	onSelect?: (
		optionIndex: number | null,
		{
			props,
			event,
		}: {
			props: ISingleSelectOptionProps | undefined;
			event: React.MouseEvent | React.KeyboardEvent;
		}
	) => void;
}

export interface ISingleSelectState {
	selectedIndex: number | null;
	optionGroups: IDropMenuOptionGroupProps[];
	flattenedOptionsData: IOptionsData[];
	ungroupedOptionData: IOptionsData[];
	optionGroupDataLookup: { [key: number]: IOptionsData[] };
	DropMenu: IDropMenuState;
}

const defaultProps = {
	hasReset: true,
	isSelectionHighlighted: true,
	isDisabled: false,
	isInvisible: false,
	selectedIndex: null,
	showIcon: true,
	DropMenu: DropMenu.defaultProps,
};

class SingleSelect extends React.Component<
	ISingleSelectProps,
	ISingleSelectState
> {
	static displayName = 'SingleSelect';

	static peek = {
		description: `\`SingleSelect\` is a dropdown list.`,
		notes: {
			overview: `
						A dropdown list. When you click on the trigger a dropdown menu appears, allows you to choose one option, and execute relevant actions.
					`,
			intendedUse: `
						Allow users to select one option from a list of 3-10 options.
											
						**Styling notes**
						
						- Use the default style in forms. The blue outline helps users clearly see that a selection has been made.
						- Use \`isSelectedHighlighted='false'\` if the default selection is All or a null state. See the \`no selection highlighting\` example.
						- Use \`isInvisible\` for filters within a full page table header. See the \`invisible\` example.
					`,
			technicalRecommendations: `
					`,
		},
		categories: ['controls', 'selectors'],
		madeFrom: ['DropMenu'],
	};

	static defaultProps = defaultProps;
	static reducers = reducers;
	static Placeholder = Placeholder;
	static Option = Option;
	static Selected = Selected;
	static OptionGroup = OptionGroup;
	static NullOption = DropMenu.NullOption;
	static FixedOption = DropMenu.FixedOption;

	static propTypes = {
		children: node`
            Should be instances of: \`SingleSelect.Placeholder\`,
            \`SingleSelect.Option\`, \`SingleSelect.OptionGroup\`. Other direct
            child elements will not render.
        `,

		className: string`
            Appended to the component-specific class names set on the root elements.
            Applies to *both* the control and the flyout menu.
        `,

		style: object`
            Styles that are passed through to root element.
        `,

		isSelectionHighlighted: bool`
            Applies primary color styling to the control when an item is selected.
        `,

		hasReset: bool`
            Allows user to reset the \`optionIndex\` to \`null\` if they select the
            placeholder at the top of the options list.  If \`false\`, it will not
            render the placeholder in the menu.
        `,

		isDisabled: bool`
            Disables the \`SingleSelect\` from being clicked or focused.
        `,

		isInvisible: bool`
            Gives the effect of an 'invisible button'. Essentially, there is no grey border,
            but there is still a blue border on a selection.
        `,

		selectedIndex: number`
            The currently selected \`SingleSelect.Option\` index or \`null\` if
            nothing is selected.
        `,

		maxMenuHeight: oneOfType([number, string])`
            The max height of the fly-out menu.
        `,

		showIcon: bool`
						Show or hide the dropndown icon
				`,

		DropMenu: shape(DropMenu.propTypes)`
            Object of \`DropMenu\` props which are passed thru to the underlying \`DropMenu\`
            component.
        `,

		onSelect: func`
            Called when an option is selected.  Has the signature \`(optionIndex,
            {props, event}) => {}\` where \`optionIndex\` is the new
            \`selectedIndex\` or \`null\` and \`props\` are the \`props\` for the
            selected \`Option\`.
        `,

		Placeholder: any`
            *Child Element* - The content rendered in the control when there is no
            option is selected. Also rendered in the option list to remove current
            selection.
        `,

		Option: any`
            *Child Element* - A drop menu option. The \`optionIndex\` is in-order
            of rendering regardless of group nesting, starting with index \`0\`.
            Each \`Option\` may be passed a prop called \`isDisabled\` to disable
            selection of that \`Option\`.  Any other props pass to Option will be
            available from the \`onSelect\` handler.
        `,

		OptionGroup: any`
            *Child Element* - Used to group \`Option\`s within the menu. Any
            non-\`Option\`s passed in will be rendered as a label for the group.
        `,
	};

	UNSAFE_componentWillMount() {
		// preprocess the options data before rendering
		const {
			optionGroups,
			flattenedOptionsData,
			ungroupedOptionData,
			optionGroupDataLookup,
		} = DropMenu.preprocessOptionData(this.props, SingleSelect);

		this.setState({
			optionGroups,
			flattenedOptionsData,
			ungroupedOptionData,
			optionGroupDataLookup,
		});
	}

	UNSAFE_componentWillReceiveProps(nextProps: ISingleSelectProps): void {
		// only preprocess options data when it changes (via new props) - better performance than doing this each render
		const {
			optionGroups,
			flattenedOptionsData,
			ungroupedOptionData,
			optionGroupDataLookup,
		} = DropMenu.preprocessOptionData(nextProps, SingleSelect);

		this.setState({
			optionGroups,
			flattenedOptionsData,
			ungroupedOptionData,
			optionGroupDataLookup,
		});
	}

	render(): React.ReactNode {
		const {
			style,
			className,
			hasReset,
			isDisabled,
			isInvisible,
			isSelectionHighlighted,
			selectedIndex,
			maxMenuHeight,
			onSelect,
			showIcon,
			DropMenu: dropMenuProps,
		} = this.props;

		const { direction, isExpanded, flyOutStyle } = dropMenuProps;

		const {
			optionGroups,
			optionGroupDataLookup,
			ungroupedOptionData,
			flattenedOptionsData,
		} = this.state;

		const placeholderProps = _.first(
			_.map(findTypes(this.props, SingleSelect.Placeholder), 'props')
		);
		const placeholder = _.get(placeholderProps, 'children', 'Select');
		const isItemSelected = _.isNumber(selectedIndex);
		const isHighlighted =
			(!isDisabled && isItemSelected && isSelectionHighlighted) ||
			(isExpanded && isSelectionHighlighted);
		const isNullOptionSelected = selectedIndex === null;

		return (
			<DropMenu
				{...dropMenuProps}
				isDisabled={isDisabled}
				selectedIndices={_.isNumber(selectedIndex) ? [selectedIndex] : []}
				className={cx('&', className)}
				onSelect={onSelect}
				style={style}
				flyOutStyle={_.assign(
					{},
					flyOutStyle,
					!_.isNil(maxMenuHeight) ? { maxHeight: maxMenuHeight } : null
				)}
				ContextMenu={{ directonOffset: isNullOptionSelected ? -1 : 0 }}
			>
				<DropMenu.Control>
					<div
						tabIndex={0}
						className={cx('&-Control', {
							'&-Control-is-highlighted': isHighlighted,
							'&-Control-is-selected': isHighlighted,
							'&-Control-is-expanded': isExpanded,
							'&-Control-is-disabled': isDisabled,
							'&-Control-is-invisible': isInvisible,
							'&-Control-is-null-option': isNullOptionSelected,
						})}
					>
						<span
							{...(!isItemSelected ? placeholderProps : null)}
							className={cx(
								'&-Control-content',
								!isItemSelected ? _.get(placeholderProps, 'className') : null
							)}
						>
							{isItemSelected
								? _.get(
										getFirst(
											flattenedOptionsData[selectedIndex as number].optionProps,
											SingleSelect.Option.Selected
										),
										'props.children'
								  ) ||
								  flattenedOptionsData[selectedIndex as number].optionProps
										.children
								: placeholder}
						</span>

						{showIcon && (
							<ChevronIcon
								size={12}
								direction={isExpanded ? direction : 'down'}
							/>
						)}
					</div>
				</DropMenu.Control>

				{hasReset && isItemSelected ? (
					<DropMenu.NullOption {...placeholderProps}>
						{placeholder}
					</DropMenu.NullOption>
				) : null}
				{_.map(optionGroups, (optionGroupProps, optionGroupIndex) => (
					<DropMenu.OptionGroup
						key={'SingleSelectOptionGroup' + optionGroupIndex}
						{...optionGroupProps}
					>
						{optionGroupProps.children}
						{_.map(
							_.get(optionGroupDataLookup, optionGroupIndex),
							({ optionProps, optionIndex }) => (
								<DropMenu.Option
									key={'SingleSelectOption' + optionIndex}
									{..._.omit(optionProps, 'Selected')}
								/>
							)
						)}
					</DropMenu.OptionGroup>
				)).concat(
					// then render all the ungrouped options at the end
					_.map(ungroupedOptionData, ({ optionProps, optionIndex }) => (
						<DropMenu.Option
							key={'SingleSelectOption' + optionIndex}
							{..._.omit(optionProps, 'Selected')}
						/>
					))
				)}
			</DropMenu>
		);
	}
}

export default buildModernHybridComponent<
	ISingleSelectProps,
	ISingleSelectState,
	typeof SingleSelect
>(SingleSelect, { reducers });

export { SingleSelect as SingleSelectDumb };
