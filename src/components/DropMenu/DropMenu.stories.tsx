import React from 'react';
import createClass from 'create-react-class';
import _ from 'lodash';
import { Button, DropMenuDumb as DropMenu } from './../../index';
import TextField from '../TextField/TextField';
import ChevronIcon from '../Icon/ChevronIcon/ChevronIcon';

export default {
	title: 'Helpers/DropMenu',
	component: DropMenu,
	parameters: {
		docs: {
			description: {
				component: (DropMenu as any).peek.description,
			},
		},
	},
};

/* Default */
export const Default = () => {
	const Component = createClass({
		getInitialState() {
			return {
				selectedIndices: [],
			};
		},

		handleSelect(optionIndex: any) {
			this.setState({
				selectedIndices: [optionIndex],
			});
		},

		render() {
			const { selectedIndices } = this.state;
			const options = ['Red', 'Green', 'Blue'];

			return (
				<DropMenu onSelect={this.handleSelect}>
					<DropMenu.Control>
						{_.isEmpty(selectedIndices)
							? 'Select'
							: options[_.last(selectedIndices) as any]}
					</DropMenu.Control>
					{_.map(options, (optionText, index) => (
						<DropMenu.Option key={'Option-' + index}>
							{optionText}
						</DropMenu.Option>
					))}
				</DropMenu>
			);
		},
	});

	return <Component />;
};
Default.storyName = 'Default';

/* Button Menu */
export const ButtonMenu = () => {
	const { Control, Option } = DropMenu;

	const Component = createClass({
		render() {
			return (
				<DropMenu>
					<Control>
						<Button>Select Color</Button>
					</Control>
					<Option>Red</Option>
					<Option>Green</Option>
					<Option>Blue</Option>
				</DropMenu>
			);
		},
	});

	return <Component />;
};
ButtonMenu.storyName = 'ButtonMenu';

/* Disabled */
export const Disabled = () => {
	const { Control, Option } = DropMenu;

	const Component = createClass({
		render() {
			return (
				<DropMenu isDisabled>
					<Control>
						<Button tabIndex={-1}>Select Color</Button>
					</Control>
					<Option>Red</Option>
					<Option>Green</Option>
					<Option>Blue</Option>
				</DropMenu>
			);
		},
	});

	return <Component />;
};
Disabled.storyName = 'Disabled';

/* Disabled Options */
export const DisabledOptions = () => {
	const { Control, Option } = DropMenu;

	const Component = createClass({
		render() {
			return (
				<DropMenu>
					<Control>
						<Button>Select Color</Button>
					</Control>
					<Option isDisabled>Red</Option>
					<Option>Green</Option>
					<Option isDisabled>Blue</Option>
				</DropMenu>
			);
		},
	});

	return <Component />;
};
DisabledOptions.storyName = 'DisabledOptions';

/* Grouped Options */
export const GroupedOptions = () => {
	const { Control, Option, OptionGroup } = DropMenu;

	const Component = createClass({
		render() {
			return (
				<DropMenu>
					<Control>
						<Button>Select Color</Button>
					</Control>

					<OptionGroup>
						<Option>Select Color</Option>
					</OptionGroup>

					<OptionGroup>
						Screen
						<Option>Red</Option>
						<Option>Green</Option>
						<Option>Blue</Option>
					</OptionGroup>

					<OptionGroup>
						Print
						<Option>Cyan</Option>
						<Option>Yellow</Option>
						<Option>Magenta</Option>
						<Option>Black</Option>
					</OptionGroup>
				</DropMenu>
			);
		},
	});

	return <Component />;
};
GroupedOptions.storyName = 'GroupedOptions';

/* Text Menu */
export const TextMenu = () => {
	const { Control, Option } = DropMenu;

	const Component = createClass({
		render() {
			return (
				<DropMenu>
					<Control>
						<TextField placeholder='Text DropMenu' />
					</Control>
					<Option>Red</Option>
					<Option>Green</Option>
					<Option>Blue</Option>
				</DropMenu>
			);
		},
	});

	return <Component />;
};
TextMenu.storyName = 'TextMenu';

/* Action Menu */
export const ActionMenu = () => {
	const { Control, Option } = DropMenu;

	const Component = createClass({
		render() {
			return (
				<DropMenu>
					<Control>
						Colors
						<ChevronIcon direction='down' />
					</Control>
					<Option>Red</Option>
					<Option>Green</Option>
					<Option>Blue</Option>
				</DropMenu>
			);
		},
	});

	return <Component />;
};
ActionMenu.storyName = 'ActionMenu';

/* No Wrapping */
export const NoWrapping = () => {
	const Component = createClass({
		render() {
			const options = [
				'Intentionally run off screen -- Adipisicing totam saepe officia repellat quo cupiditate ducimus hic? Quod temporibus corrupti eaque ullam quo nulla corporis !',
				'Adipisicing totam provident excepturi officia non cum alias? Labore possimus adipisci id eveniet numquam tempora totam est. Explicabo recusandae quo tempore',
				'Consectetur doloribus dignissimos exercitationem vel tempora praesentium nostrum eveniet inventore. Odit inventore quas optio id eum nisi. Minima consequuntur',
			];

			return (
				<div style={{ textAlign: 'right' }}>
					<DropMenu onSelect={this.handleSelect} alignment='center'>
						<DropMenu.Control>
							<Button>Click me</Button>
						</DropMenu.Control>

						{_.map(options, (optionText, index) => (
							<DropMenu.Option isWrapped={false} key={'Option-' + index}>
								{optionText}
							</DropMenu.Option>
						))}
					</DropMenu>
				</div>
			);
		},
	});

	return <Component />;
};
NoWrapping.storyName = 'NoWrapping';

/* Stateless */
export const Stateless = () => {
	const { Control, Option, OptionGroup } = DropMenu;

	const Component = createClass({
		render() {
			return (
				<DropMenu
					selectedIndices={[0]}
					focusedIndex={3}
					isExpanded
					direction='down'
				>
					<Control>
						<Button>Select Color</Button>
					</Control>

					<OptionGroup>
						Preferred
						<Option>Red</Option>
						<Option>Green</Option>
						<Option>Blue</Option>
					</OptionGroup>

					<Option>Orange</Option>
					<Option isDisabled>Violet</Option>
					<Option isDisabled>Brown</Option>
				</DropMenu>
			);
		},
	});

	return <Component />;
};
Stateless.storyName = 'Stateless';
