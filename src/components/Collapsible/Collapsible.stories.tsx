import React from 'react';
import createClass from 'create-react-class';
import { Collapsible, SingleSelect } from './../../index';

export default {
	title: 'Utility/Collapsible',
	component: Collapsible,
	parameters: {
		docs: {
			description: {
				component: (Collapsible as any).peek.description,
			},
		},
	},
};

/* Toggle Expand */
export const ToggleExpand = () => {
	const Component = createClass({
		getInitialState() {
			return {
				isExpanded: true,
			};
		},

		handleToggle() {
			this.setState({
				isExpanded: !this.state.isExpanded,
			});
		},

		render() {
			return (
				<section>
					<button onClick={this.handleToggle}>toggle</button>

					<Collapsible
						isExpanded={this.state.isExpanded}
						style={{ background: 'lightgray' }}
					>
						<p>
							Kitsch aesthetic gluten-free bitters affogato, you probably
							haven't heard of them DIY in cornhole sunt meditation man braid
							cardigan. Selfies stumptown sriracha, small batch williamsburg
							synth organic aute mlkshk beard venmo normcore XOXO freegan
							chambray. Freegan delectus next level nostrud intelligentsia swag.
							Pabst delectus selfies kale chips, duis pariatur locavore iPhone.
							Chia 3 wolf moon tofu messenger bag pop-up intelligentsia.
							Pinterest excepteur yuccie four dollar toast DIY. Plaid drinking
							vinegar locavore id mustache.
						</p>
						<p>
							Flexitarian gentrify taxidermy, bitters chambray swag etsy brunch
							kogi pork belly authentic. Direct trade put a bird on it ad
							bespoke, occaecat marfa cliche nisi aliquip kale chips synth
							readymade. Odio austin keytar pour-over fugiat. Pickled everyday
							carry laborum sartorial pinterest labore, organic voluptate banh
							mi kitsch. Leggings austin thundercats cliche. Neutra typewriter
							sapiente, intelligentsia semiotics +1 esse ex authentic aesthetic
							banh mi drinking vinegar knausgaard. Id tousled culpa, ut chia
							cillum actually fashion axe cronut forage assumenda tilde ramps.
						</p>
					</Collapsible>
				</section>
			);
		},
	});

	return <Component />;
};
ToggleExpand.storyName = 'ToggleExpand';

/* Not Animated */
export const NotAnimated = () => {
	const Component = createClass({
		getInitialState() {
			return {
				isExpanded: true,
			};
		},

		handleToggle() {
			this.setState({
				isExpanded: !this.state.isExpanded,
			});
		},

		render() {
			return (
				<section>
					<button onClick={this.handleToggle}>toggle</button>

					<Collapsible
						isAnimated={false}
						isExpanded={this.state.isExpanded}
						style={{ background: 'lightgray' }}
					>
						<p>
							Kitsch aesthetic gluten-free bitters affogato, you probably
							haven't heard of them DIY in cornhole sunt meditation man braid
							cardigan. Selfies stumptown sriracha, small batch williamsburg
							synth organic aute mlkshk beard venmo normcore XOXO freegan
							chambray. Freegan delectus next level nostrud intelligentsia swag.
							Pabst delectus selfies kale chips, duis pariatur locavore iPhone.
							Chia 3 wolf moon tofu messenger bag pop-up intelligentsia.
							Pinterest excepteur yuccie four dollar toast DIY. Plaid drinking
							vinegar locavore id mustache.
						</p>
						<p>
							Flexitarian gentrify taxidermy, bitters chambray swag etsy brunch
							kogi pork belly authentic. Direct trade put a bird on it ad
							bespoke, occaecat marfa cliche nisi aliquip kale chips synth
							readymade. Odio austin keytar pour-over fugiat. Pickled everyday
							carry laborum sartorial pinterest labore, organic voluptate banh
							mi kitsch. Leggings austin thundercats cliche. Neutra typewriter
							sapiente, intelligentsia semiotics +1 esse ex authentic aesthetic
							banh mi drinking vinegar knausgaard. Id tousled culpa, ut chia
							cillum actually fashion axe cronut forage assumenda tilde ramps.
						</p>
					</Collapsible>
				</section>
			);
		},
	});

	return <Component />;
};
NotAnimated.storyName = 'NotAnimated';

/* Unmount Children On Collapse */
export const UnmountChildrenOnCollapse = () => {
	const Component = createClass({
		getInitialState() {
			return {
				isExpanded: true,
			};
		},

		handleToggle() {
			this.setState({
				isExpanded: !this.state.isExpanded,
			});
		},

		render() {
			return (
				<section>
					<button onClick={this.handleToggle}>toggle</button>

					<Collapsible
						isExpanded={this.state.isExpanded}
						style={{ background: 'lightgray' }}
					>
						<p>
							Kitsch aesthetic gluten-free bitters affogato, you probably
							haven't heard of them DIY in cornhole sunt meditation man braid
							cardigan. Selfies stumptown sriracha, small batch williamsburg
							synth organic aute mlkshk beard venmo normcore XOXO freegan
							chambray. Freegan delectus next level nostrud intelligentsia swag.
							Pabst delectus selfies kale chips, duis pariatur locavore iPhone.
							Chia 3 wolf moon tofu messenger bag pop-up intelligentsia.
							Pinterest excepteur yuccie four dollar toast DIY. Plaid drinking
							vinegar locavore id mustache.
						</p>
						<SingleSelect DropMenu={{ isExpanded: true }}>
							<SingleSelect.Option>Will</SingleSelect.Option>
							<SingleSelect.Option>Not</SingleSelect.Option>
							<SingleSelect.Option>Remain</SingleSelect.Option>
						</SingleSelect>
						<p>
							Flexitarian gentrify taxidermy, bitters chambray swag etsy brunch
							kogi pork belly authentic. Direct trade put a bird on it ad
							bespoke, occaecat marfa cliche nisi aliquip kale chips synth
							readymade. Odio austin keytar pour-over fugiat. Pickled everyday
							carry laborum sartorial pinterest labore, organic voluptate banh
							mi kitsch. Leggings austin thundercats cliche. Neutra typewriter
							sapiente, intelligentsia semiotics +1 esse ex authentic aesthetic
							banh mi drinking vinegar knausgaard. Id tousled culpa, ut chia
							cillum actually fashion axe cronut forage assumenda tilde ramps.
						</p>
					</Collapsible>
				</section>
			);
		},
	});

	return <Component />;
};
UnmountChildrenOnCollapse.storyName = 'UnmountChildrenOnCollapse';

/* Render Children On Collapse */
export const RenderChildrenOnCollapse = () => {
	const Component = createClass({
		getInitialState() {
			return {
				isExpanded: true,
			};
		},

		handleToggle() {
			this.setState({
				isExpanded: !this.state.isExpanded,
			});
		},

		render() {
			return (
				<section>
					<button onClick={this.handleToggle}>toggle</button>

					<Collapsible
						isMountControlled={false}
						isExpanded={this.state.isExpanded}
						style={{ background: 'lightgray' }}
					>
						<p>
							Kitsch aesthetic gluten-free bitters affogato, you probably
							haven't heard of them DIY in cornhole sunt meditation man braid
							cardigan. Selfies stumptown sriracha, small batch williamsburg
							synth organic aute mlkshk beard venmo normcore XOXO freegan
							chambray. Freegan delectus next level nostrud intelligentsia swag.
							Pabst delectus selfies kale chips, duis pariatur locavore iPhone.
							Chia 3 wolf moon tofu messenger bag pop-up intelligentsia.
							Pinterest excepteur yuccie four dollar toast DIY. Plaid drinking
							vinegar locavore id mustache.
						</p>
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<SingleSelect DropMenu={{ isExpanded: true }}>
								<SingleSelect.Option>Will</SingleSelect.Option>
								<SingleSelect.Option>Stay</SingleSelect.Option>
								<SingleSelect.Option>Rendered</SingleSelect.Option>
							</SingleSelect>
						</div>
						<p>
							Flexitarian gentrify taxidermy, bitters chambray swag etsy brunch
							kogi pork belly authentic. Direct trade put a bird on it ad
							bespoke, occaecat marfa cliche nisi aliquip kale chips synth
							readymade. Odio austin keytar pour-over fugiat. Pickled everyday
							carry laborum sartorial pinterest labore, organic voluptate banh
							mi kitsch. Leggings austin thundercats cliche. Neutra typewriter
							sapiente, intelligentsia semiotics +1 esse ex authentic aesthetic
							banh mi drinking vinegar knausgaard. Id tousled culpa, ut chia
							cillum actually fashion axe cronut forage assumenda tilde ramps.
						</p>
					</Collapsible>
				</section>
			);
		},
	});

	return <Component />;
};
RenderChildrenOnCollapse.storyName = 'RenderChildrenOnCollapse';

/* Toggle With On Rest Callback */
export const ToggleWithOnRestCallback = () => {
	const onRest = () => {
		alert(
			'I am and always will be the optimist. The hoper of far-flung hopes and the dreamer of improbable dreams.'
		);
	};

	const Component = createClass({
		getInitialState() {
			return {
				isExpanded: false,
			};
		},

		handleToggle() {
			this.setState({
				isExpanded: !this.state.isExpanded,
			});
		},

		render() {
			return (
				<section>
					<button onClick={this.handleToggle}>toggle</button>

					<Collapsible
						isExpanded={this.state.isExpanded}
						style={{ background: 'lightgray' }}
						onRest={onRest}
					>
						<p>
							Everybody knows that everybody dies. But not every day. Not today.
							Some days are special. Some days are so, so blessed. Some days,
							nobody dies at all. Now and then, every once in a very long while,
							every day in a million days, when the wind stands fair and the
							Doctor comes to call, everybody lives.
						</p>
					</Collapsible>
				</section>
			);
		},
	});

	return <Component />;
};
ToggleWithOnRestCallback.storyName = 'ToggleWithOnRestCallback';
