import _ from 'lodash';
import React, { useState } from 'react';
import createClass from 'create-react-class';
import { Meta, Story } from '@storybook/react';

import { Dialog, IDialogProps } from './Dialog';
import Button from '../Button/Button';
import SearchableMultiSelect from '../SearchableMultiSelect/SearchableMultiSelect';
import SingleSelect from '../SingleSelect/SingleSelect';
import CheckboxLabeled from '../CheckboxLabeled/CheckboxLabeled';
import SearchField from '../SearchField/SearchField';

export default {
	title: 'Layout/Dialog',
	component: Dialog,
	parameters: {
		docs: {
			description: {
				component: Dialog.peek.description,
			},
		},
		layout: 'centered',
	},
	args: Dialog.defaultProps,
	decorators: [
		(Story) => (
			<div style={{ margin: '3em' }}>
				<Story />
			</div>
		),
	],
} as Meta;

export const Basic: Story<IDialogProps> = (args) => {
	const [isShown, setIsShown] = useState(false);

	const handleShow = (isShown: boolean) => {
		setIsShown(isShown);
	};

	return (
		<div>
			<Button size='large' onClick={_.partial(handleShow, !isShown)}>
				Toggle
			</Button>

			<Dialog
				{...args}
				isShown={isShown}
				handleClose={_.partial(handleShow, !isShown)}
				Header='Header'
			>
				<div key={'info'}>
					For better UX, we recommend NOT handling onEscape and
					onBackgroundClick when isModal is true. The term "modal" implies that
					the user needs to interact with one of the buttons in the footer to
					exit the dialog.
				</div>
				{_.times(10).map((i) => {
					return <div key={i}>Body</div>;
				})}
				<Dialog.Footer>
					<Button
						kind='invisible'
						onClick={_.partial(handleShow, false)}
						style={{ marginRight: '9px' }}
					>
						Cancel
					</Button>
					<Button kind='primary'>Save</Button>
				</Dialog.Footer>
			</Dialog>
		</div>
	);
};
Basic.decorators = [(Story) => <div style={{ margin: '3em' }}>{Story()}</div>];

export const Small = () => {
	const Component = createClass({
		getInitialState() {
			return {
				isShown: false,
			};
		},

		handleShow(isShown: any) {
			this.setState({ isShown });
		},

		render() {
			return (
				<div>
					<Button
						size='large'
						onClick={_.partial(this.handleShow, !this.state.isShown)}
					>
						Toggle
					</Button>

					<Dialog
						isShown={this.state.isShown}
						handleClose={_.partial(this.handleShow, !this.state.isShown)}
						Header='Header'
					>
						<div key={'info'}>
							For better UX, we recommend NOT handling onEscape and
							onBackgroundClick when isModal is true. The term "modal" implies
							that the user needs to interact with one of the buttons in the
							footer to exit the dialog.
						</div>
						{_.times(10).map((i) => {
							return <div key={i}>Body</div>;
						})}
						<Dialog.Footer>
							<Button
								kind='invisible'
								onClick={_.partial(this.handleShow, false)}
								style={{ marginRight: '9px' }}
							>
								Cancel
							</Button>
							<Button kind='primary'>Save</Button>
						</Dialog.Footer>
					</Dialog>
				</div>
			);
		},
	});

	return <Component />;
};

/* Medium */
export const Medium = () => {
	const Component = createClass({
		getInitialState() {
			return {
				isShown: false,
			};
		},

		handleShow(isShown: any) {
			this.setState({ isShown });
		},

		render() {
			return (
				<div>
					<Button
						size='large'
						onClick={_.partial(this.handleShow, !this.state.isShown)}
					>
						Toggle
					</Button>

					<Dialog
						isShown={this.state.isShown}
						handleClose={_.partial(this.handleShow, !this.state.isShown)}
						Header='Header'
						size='medium'
					>
						<div key={'info'}>
							For better UX, we recommend NOT handling onEscape and
							onBackgroundClick when isModal is true. The term "modal" implies
							that the user needs to interact with one of the buttons in the
							footer to exit the dialog.
						</div>
						{_.times(50).map((i) => {
							return <div key={i}>Body</div>;
						})}
						<Dialog.Footer>
							<Button
								kind='invisible'
								onClick={_.partial(this.handleShow, false)}
								style={{ marginRight: '9px' }}
							>
								Cancel
							</Button>
							<Button kind='primary'>Save</Button>
						</Dialog.Footer>
					</Dialog>
				</div>
			);
		},
	});

	return <Component />;
};

/* Large With Rich Header */
export const LargeWithRichHeader = () => {
	const Component = createClass({
		getInitialState() {
			return {
				isShown: false,
			};
		},

		handleShow(isShown: any) {
			this.setState({ isShown });
		},

		render() {
			return (
				<div>
					<Button
						size='large'
						onClick={_.partial(this.handleShow, !this.state.isShown)}
					>
						Toggle
					</Button>

					<Dialog
						isShown={this.state.isShown}
						handleClose={_.partial(this.handleShow, !this.state.isShown)}
						size='large'
					>
						<Dialog.Header>
							<i>Rich Header</i>
						</Dialog.Header>
						<div key={'info'}>
							For better UX, we recommend NOT handling onEscape and
							onBackgroundClick when isModal is true. The term "modal" implies
							that the user needs to interact with one of the buttons in the
							footer to exit the dialog.
						</div>
						{_.times(50).map((i) => {
							return <div key={i}>Body</div>;
						})}
						<Dialog.Footer>
							<Button
								kind='invisible'
								onClick={_.partial(this.handleShow, false)}
								style={{ marginRight: '9px' }}
							>
								Cancel
							</Button>
							<Button kind='primary'>Save</Button>
						</Dialog.Footer>
					</Dialog>
				</div>
			);
		},
	});

	return <Component />;
};

/* Complex */
export const Complex = () => {
	const style = {
		marginBottom: '3px',
	};

	const { Option } = SearchableMultiSelect;

	const { Placeholder, Option: SingleOption } = SingleSelect;

	const Component = createClass({
		getInitialState() {
			return {
				isShown: false,
				flavors: ['chocolate'],
			};
		},

		handleShow(isShown: any) {
			this.setState({ isShown });
		},

		handleSelectedChocolate(isSelected: any) {
			this.setState({
				flavors: isSelected
					? _.concat(this.state.flavors, 'chocolate')
					: _.without(this.state.flavors, 'chocolate'),
			});
		},

		handleSelectedStrawberry(isSelected: any) {
			this.setState({
				flavors: isSelected
					? _.concat(this.state.flavors, 'strawberry')
					: _.without(this.state.flavors, 'strawberry'),
			});
		},

		render() {
			return (
				<div>
					<Button
						size='large'
						onClick={_.partial(this.handleShow, !this.state.isShown)}
					>
						Toggle
					</Button>

					<Dialog
						isComplex
						isShown={this.state.isShown}
						handleClose={_.partial(this.handleShow, !this.state.isShown)}
						Header='Advanced Filters'
						size='medium'
					>
						<p style={{ fontSize: '16px' }}>Flavor</p>
						<CheckboxLabeled
							isSelected={_.includes(this.state.flavors, 'chocolate')}
							name='interactive-checkboxes'
							onSelect={this.handleSelectedChocolate}
							style={style}
						>
							<CheckboxLabeled.Label>Chocolate</CheckboxLabeled.Label>
						</CheckboxLabeled>
						<CheckboxLabeled
							isSelected={_.includes(this.state.flavors, 'strawberry')}
							name='interactive-checkboxes'
							onSelect={this.handleSelectedStrawberry}
							style={style}
						>
							<CheckboxLabeled.Label>Strawberry</CheckboxLabeled.Label>
						</CheckboxLabeled>

						<p style={{ fontSize: '16px', marginTop: '25px' }}>
							Flavor Combination Research
						</p>
						<SearchField placeholder='Sundae school...' />

						<p style={{ fontSize: '16px', marginTop: '25px' }}>Toppings</p>
						<SearchableMultiSelect responsiveMode='large'>
							<Option>cookie dough</Option>
							<Option>more ice cream</Option>
							<Option>mochi</Option>
							<Option>peanut butter cups</Option>
						</SearchableMultiSelect>

						<p style={{ fontSize: '16px', marginTop: '25px' }}>
							Ice Cream Breaks
						</p>
						<SingleSelect onSelect={this.handleSelect}>
							<Placeholder>You must select a break...</Placeholder>
							<SingleOption>10am</SingleOption>
							<SingleOption>11am</SingleOption>
							<SingleOption>1pm</SingleOption>
							<SingleOption>2pm</SingleOption>
						</SingleSelect>

						<Dialog.Footer>
							<Button
								kind='invisible'
								onClick={_.partial(this.handleShow, false)}
								style={{ marginRight: '9px' }}
							>
								Cancel
							</Button>
							<Button kind='primary'>Save</Button>
						</Dialog.Footer>
					</Dialog>
				</div>
			);
		},
	});

	return <Component />;
};

/* No Modal */
export const NoModal = () => {
	const Component = createClass({
		getInitialState() {
			return {
				isShown: false,
			};
		},

		handleShow(isShown: any) {
			this.setState({ isShown });
		},

		render() {
			return (
				<div>
					<Button
						size='large'
						onClick={_.partial(this.handleShow, !this.state.isShown)}
					>
						Toggle
					</Button>

					<Dialog
						isModal={false}
						isShown={this.state.isShown}
						handleClose={_.partial(this.handleShow, !this.state.isShown)}
						onBackgroundClick={_.partial(this.handleShow, false)}
						onEscape={_.partial(this.handleShow, false)}
						Header='Header'
						size='small'
					>
						In most cases, you'll probably just use an isModal Dialog, but this
						example shows that the Dialog doesn't have to be a modal. Try
						pressing "escape" to close this Dialog.
						<Dialog.Footer>
							<Button
								kind='invisible'
								onClick={_.partial(this.handleShow, false)}
								style={{ marginRight: '9px' }}
							>
								Cancel
							</Button>
							<Button kind='primary'>Save</Button>
						</Dialog.Footer>
					</Dialog>
				</div>
			);
		},
	});

	return <Component />;
};

/* No Footer */
export const NoFooter = () => {
	const Component = createClass({
		getInitialState() {
			return {
				isShown: false,
			};
		},

		handleShow(isShown: any) {
			this.setState({ isShown });
		},

		render() {
			return (
				<div>
					<Button
						size='large'
						onClick={_.partial(this.handleShow, !this.state.isShown)}
					>
						Toggle
					</Button>

					<Dialog
						isShown={this.state.isShown}
						handleClose={_.partial(this.handleShow, !this.state.isShown)}
						onBackgroundClick={_.partial(this.handleShow, false)}
						onEscape={_.partial(this.handleShow, false)}
						Header='Header'
						size='medium'
					>
						This `Dialog` has no footer!
					</Dialog>
				</div>
			);
		},
	});

	return <Component />;
};

/* No Gutters */
export const NoGutters = () => {
	const Component = createClass({
		getInitialState() {
			return {
				isShown: false,
			};
		},

		handleShow(isShown: any) {
			this.setState({ isShown });
		},

		render() {
			return (
				<div>
					<Button
						size='large'
						onClick={_.partial(this.handleShow, !this.state.isShown)}
					>
						Toggle
					</Button>

					<Dialog
						isShown={this.state.isShown}
						handleClose={_.partial(this.handleShow, !this.state.isShown)}
						onBackgroundClick={_.partial(this.handleShow, false)}
						onEscape={_.partial(this.handleShow, false)}
						Header='Header'
						size='medium'
						hasGutters={false}
					>
						This `Dialog` has no gutters!
					</Dialog>
				</div>
			);
		},
	});

	return <Component />;
};

/* No Close Button */
export const NoCloseButton = () => {
	const Component = createClass({
		getInitialState() {
			return {
				isShown: false,
			};
		},

		handleShow(isShown: any) {
			this.setState({ isShown });
		},

		render() {
			return (
				<div>
					<Button
						size='large'
						onClick={_.partial(this.handleShow, !this.state.isShown)}
					>
						Toggle
					</Button>

					<Dialog isShown={this.state.isShown} Header='Header' size='medium'>
						<div key={'info'}>
							For better UX, we recommend NOT handling onEscape and
							onBackgroundClick when isModal is true. The term "modal" implies
							that the user needs to interact with one of the buttons in the
							footer to exit the dialog.
						</div>
						{_.times(50).map((i) => {
							return <div key={i}>Body</div>;
						})}
						<Dialog.Footer>
							<Button
								kind='invisible'
								onClick={_.partial(this.handleShow, false)}
								style={{ marginRight: '9px' }}
							>
								Cancel
							</Button>
							<Button kind='primary'>Save</Button>
						</Dialog.Footer>
					</Dialog>
				</div>
			);
		},
	});

	return <Component />;
};
