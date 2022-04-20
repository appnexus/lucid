import _, { omit } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { lucidClassNames } from '../../util/style-helpers';
import {
	filterTypes,
	getFirst,
	StandardProps,
} from '../../util/component-types';
import { buildModernHybridComponent } from '../../util/state-management';
import { IButtonProps, Button } from '../Button/Button';
import { ButtonGroupDumb as ButtonGroup } from '../ButtonGroup/ButtonGroup';
import ChevronIcon from '../Icon/ChevronIcon/ChevronIcon';
import {
	IDropMenuState,
	IDropMenuProps,
	DropMenuDumb as DropMenu,
} from '../DropMenu/DropMenu';
import * as reducers from './SplitButton.reducers';

const cx = lucidClassNames.bind('&-SplitButton');

const { bool, func, node, oneOf, shape, string } = PropTypes;

/** SplitButton Button Child Component */
export interface ISplitButtonButtonChildProps extends StandardProps {
	/** Disables selection of the \`Button\`. */
	isDisabled?: boolean;
}

const ButtonChild = (_props: ISplitButtonButtonChildProps): null => null;

ButtonChild.displayName = 'SplitButton.ButtonChild';
ButtonChild.peek = {
	description: `
		One of many potential \`Button\`s to render in this
		\`SplitButton\`. The first \`Button\` will be used as the Primary
		button, while all others will be rendered within the \`DropMenu\`
		below.
	`,
};
ButtonChild.propTypes = {
	/**
		The children to render within the \`Button\`.
	*/
	children: node,
	/**
		Disables selection of the \`Button\`.
	*/
	isDisabled: bool,
	/**
		Called when the user clicks the \`Button\`.  Signature:
		\`({ props, event }) => {}\`
	*/
	onClick: func,
};

/** SplitButton */
export interface ISplitButtonProps extends StandardProps {
	/** Sets the direction the flyout menu will render relative to the SplitButton. */
	direction: 'up' | 'down';

	/** Style variations of the SplitButton. */
	kind?: 'primary' | 'danger';

	/** Size variations of the SplitButton. */
	size?: 'short' | 'small' | 'large';

	/** Form element type variations of SplitButton. Passed through to DOM Button. */
	type?: string;

	/** *Child Element* - props pass through to the underlying DropMenu component */
	DropMenu: IDropMenuProps;
}

class SplitButton extends React.Component<ISplitButtonProps> {
	static displayName = 'SplitButton';
	static Button = ButtonChild;

	static peek = {
		description: `\`SplitButton\` allows you to combine a single main \`Button\` together with a list of additional \`Buttons\` with actions which will be rendered within a \`DropMenu\`.`,
		categories: ['controls', 'buttons'],
		madeFrom: ['Button', 'DropMenu'],
	};

	static reducers = reducers;

	static propTypes = {
		/**
			Object of DropMenu props which are passed through to the underlying
			DropMenu component.
		*/
		DropMenu: shape(DropMenu.propTypes),

		/**
			All children should be \`ButtonGroup.Button\`s and they support the same
			props as \`Button\`s.
		*/
		children: node,

		/**
			Appended to the component-specific class names set on the root element.
			Value is run through the \`classnames\` library.
		*/
		className: string,

		/**
			Sets the direction the flyout menu will render relative to the
			SplitButton.
		*/
		direction: oneOf(['up', 'down']),

		/**
			Style variations of the SplitButton.
		*/
		kind: oneOf(['primary', 'danger']),

		/**
			Size variations of the SplitButton.
		*/
		size: oneOf(['short', 'small', 'large']),

		/**
			Form element type variations of SplitButton. Passed through to DOM
			Button.
		*/
		type: string,
	};

	static defaultProps = {
		direction: 'down' as const,
		type: 'button' as const,
		DropMenu: DropMenu.defaultProps,
	};

	// Handles select events in the DropMenu
	handleSelect = (
		optionIndex: number | null,
		{
			event,
		}: {
			event:
				| React.KeyboardEvent<Element>
				| React.MouseEvent<Element, MouseEvent>;
		}
	): void => {
		const buttonChildProps = _.map(
			filterTypes(this.props.children, SplitButton.Button),
			'props'
		);
		if (optionIndex !== null) {
			this.handleButtonClick(buttonChildProps[optionIndex + 1], event);
		}
	};

	// Handles clicks on the Primary Button
	handleClick = ({
		event,
	}: {
		event: React.MouseEvent<HTMLButtonElement>;
	}): void => {
		const clickedButtonProps = _.get(
			getFirst(this.props, SplitButton.Button),
			'props'
		);

		// Stop propagation to prevent this `Click` from expanding the `DropMenu`
		event.stopPropagation();
		this.handleButtonClick(clickedButtonProps, event);
	};

	// Handles clicks within handleClick and handleSelect
	handleButtonClick = (buttonProps: IButtonProps, event: any): void => {
		const {
			DropMenu: { onCollapse },
		} = this.props;

		onCollapse && onCollapse({ props: this.props.DropMenu, event });

		if (_.has(buttonProps, 'onClick')) {
			buttonProps.onClick({ event, props: buttonProps });
		}
	};

	render() {
		const {
			className,
			kind,
			direction,
			type,
			size,
			DropMenu: dropMenuProps,
			...passThroughs
		} = this.props;

		const { isExpanded } = dropMenuProps;

		const [primaryButtonProps, ...buttonChildProps] = _.map(
			filterTypes(this.props.children, SplitButton.Button),
			'props'
		);

		return (
			<DropMenu
				{...dropMenuProps}
				{...omit(passThroughs, [
					'DropMenu',
					'children',
					'className',
					'direction',
					'kind',
					'size',
					'type',
					'initialState',
					'callbackId',
				])}
				direction={direction}
				className={cx('&', className)}
				onSelect={this.handleSelect}
			>
				<DropMenu.Control>
					<ButtonGroup>
						<Button
							{...primaryButtonProps}
							className={cx(
								'&-Button-primary',
								_.get(primaryButtonProps, 'className')
							)}
							kind={kind}
							type={type}
							size={size}
							onClick={this.handleClick}
						/>
						<Button
							className={cx('&-Button-drop')}
							size={size}
							hasOnlyIcon={true}
							isActive={isExpanded}
							kind={kind}
							isDisabled={_.every(
								[primaryButtonProps, ...buttonChildProps],
								'isDisabled'
							)}
						>
							<ChevronIcon
								className={cx('&-ChevronIcon')}
								direction={direction}
								size={10}
							/>
						</Button>
					</ButtonGroup>
				</DropMenu.Control>
				{_.map(buttonChildProps, (buttonChildProp, index) => (
					<DropMenu.Option {...buttonChildProp} key={index} />
				))}
			</DropMenu>
		);
	}
}

export default buildModernHybridComponent<
	ISplitButtonProps,
	IDropMenuState,
	typeof SplitButton
>(SplitButton as any, { reducers });

export { SplitButton as SplitButtonDumb };
