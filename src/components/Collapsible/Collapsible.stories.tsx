import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';

import Collapsible, { ICollapsibleProps } from './Collapsible';
import Button from '../Button/Button';
import SingleSelect from '../SingleSelect/SingleSelect';

export default {
	title: 'Utility/Collapsible',
	component: Collapsible,
	parameters: {
		docs: {
			description: {
				component: Collapsible.peek.description,
			},
		},
	},
} as Meta;

/* Toggle Expand */
export const ToggleExpand: Story<ICollapsibleProps> = (args) => {
	const [isExpanded, setIsExpanded] = useState(true);

	const handleToggle = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<section>
			<Button onClick={handleToggle}>toggle</Button>

			<Collapsible
				{...args}
				isExpanded={isExpanded}
				style={{ background: '#f4f2f2', padding: 10 }}
			>
				<p>
					Kitsch aesthetic gluten-free bitters affogato, you probably haven't
					heard of them DIY in cornhole sunt meditation man braid cardigan.
					Selfies stumptown sriracha, small batch williamsburg synth organic
					aute mlkshk beard venmo normcore XOXO freegan chambray. Freegan
					delectus next level nostrud intelligentsia swag. Pabst delectus
					selfies kale chips, duis pariatur locavore iPhone. Chia 3 wolf moon
					tofu messenger bag pop-up intelligentsia. Pinterest excepteur yuccie
					four dollar toast DIY. Plaid drinking vinegar locavore id mustache.
				</p>
				<p>
					Flexitarian gentrify taxidermy, bitters chambray swag etsy brunch kogi
					pork belly authentic. Direct trade put a bird on it ad bespoke,
					occaecat marfa cliche nisi aliquip kale chips synth readymade. Odio
					austin keytar pour-over fugiat. Pickled everyday carry laborum
					sartorial pinterest labore, organic voluptate banh mi kitsch. Leggings
					austin thundercats cliche. Neutra typewriter sapiente, intelligentsia
					semiotics +1 esse ex authentic aesthetic banh mi drinking vinegar
					knausgaard. Id tousled culpa, ut chia cillum actually fashion axe
					cronut forage assumenda tilde ramps.
				</p>
			</Collapsible>
		</section>
	);
};

/* Not Animated */
export const NotAnimated: Story<ICollapsibleProps> = (args) => {
	const [isExpanded, setIsExpanded] = useState(true);

	const handleToggle = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<section>
			<Button onClick={handleToggle}>toggle</Button>

			<Collapsible
				{...args}
				isAnimated={false}
				isExpanded={isExpanded}
				style={{ background: '#f4f2f2', padding: 10 }}
			>
				<p>
					Kitsch aesthetic gluten-free bitters affogato, you probably haven't
					heard of them DIY in cornhole sunt meditation man braid cardigan.
					Selfies stumptown sriracha, small batch williamsburg synth organic
					aute mlkshk beard venmo normcore XOXO freegan chambray. Freegan
					delectus next level nostrud intelligentsia swag. Pabst delectus
					selfies kale chips, duis pariatur locavore iPhone. Chia 3 wolf moon
					tofu messenger bag pop-up intelligentsia. Pinterest excepteur yuccie
					four dollar toast DIY. Plaid drinking vinegar locavore id mustache.
				</p>
				<p>
					Flexitarian gentrify taxidermy, bitters chambray swag etsy brunch kogi
					pork belly authentic. Direct trade put a bird on it ad bespoke,
					occaecat marfa cliche nisi aliquip kale chips synth readymade. Odio
					austin keytar pour-over fugiat. Pickled everyday carry laborum
					sartorial pinterest labore, organic voluptate banh mi kitsch. Leggings
					austin thundercats cliche. Neutra typewriter sapiente, intelligentsia
					semiotics +1 esse ex authentic aesthetic banh mi drinking vinegar
					knausgaard. Id tousled culpa, ut chia cillum actually fashion axe
					cronut forage assumenda tilde ramps.
				</p>
			</Collapsible>
		</section>
	);
};

/* Unmount Children On Collapse */
export const UnmountChildrenOnCollapse: Story<ICollapsibleProps> = (args) => {
	const [isExpanded, setIsExpanded] = useState(true);

	const handleToggle = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<section>
			<Button onClick={handleToggle}>toggle</Button>

			<Collapsible
				{...args}
				isExpanded={isExpanded}
				style={{ background: '#f4f2f2', padding: 10 }}
			>
				<p>
					Kitsch aesthetic gluten-free bitters affogato, you probably haven't
					heard of them DIY in cornhole sunt meditation man braid cardigan.
					Selfies stumptown sriracha, small batch williamsburg synth organic
					aute mlkshk beard venmo normcore XOXO freegan chambray. Freegan
					delectus next level nostrud intelligentsia swag. Pabst delectus
					selfies kale chips, duis pariatur locavore iPhone. Chia 3 wolf moon
					tofu messenger bag pop-up intelligentsia. Pinterest excepteur yuccie
					four dollar toast DIY. Plaid drinking vinegar locavore id mustache.
				</p>
				<SingleSelect DropMenu={{ isExpanded: true }}>
					<SingleSelect.Option>Will</SingleSelect.Option>
					<SingleSelect.Option>Not</SingleSelect.Option>
					<SingleSelect.Option>Remain</SingleSelect.Option>
				</SingleSelect>
				<p>
					Flexitarian gentrify taxidermy, bitters chambray swag etsy brunch kogi
					pork belly authentic. Direct trade put a bird on it ad bespoke,
					occaecat marfa cliche nisi aliquip kale chips synth readymade. Odio
					austin keytar pour-over fugiat. Pickled everyday carry laborum
					sartorial pinterest labore, organic voluptate banh mi kitsch. Leggings
					austin thundercats cliche. Neutra typewriter sapiente, intelligentsia
					semiotics +1 esse ex authentic aesthetic banh mi drinking vinegar
					knausgaard. Id tousled culpa, ut chia cillum actually fashion axe
					cronut forage assumenda tilde ramps.
				</p>
			</Collapsible>
		</section>
	);
};

/* Render Children On Collapse */
export const RenderChildrenOnCollapse: Story<ICollapsibleProps> = (args) => {
	const [isExpanded, setIsExpanded] = useState(true);

	const handleToggle = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<section>
			<Button onClick={handleToggle}>toggle</Button>

			<Collapsible
				{...args}
				isMountControlled={false}
				isExpanded={isExpanded}
				style={{ background: '#f4f2f2', padding: 10 }}
			>
				<p>
					Kitsch aesthetic gluten-free bitters affogato, you probably haven't
					heard of them DIY in cornhole sunt meditation man braid cardigan.
					Selfies stumptown sriracha, small batch williamsburg synth organic
					aute mlkshk beard venmo normcore XOXO freegan chambray. Freegan
					delectus next level nostrud intelligentsia swag. Pabst delectus
					selfies kale chips, duis pariatur locavore iPhone. Chia 3 wolf moon
					tofu messenger bag pop-up intelligentsia. Pinterest excepteur yuccie
					four dollar toast DIY. Plaid drinking vinegar locavore id mustache.
				</p>
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<SingleSelect DropMenu={{ isExpanded: true }}>
						<SingleSelect.Option>Will</SingleSelect.Option>
						<SingleSelect.Option>Stay</SingleSelect.Option>
						<SingleSelect.Option>Rendered</SingleSelect.Option>
					</SingleSelect>
				</div>
				<p>
					Flexitarian gentrify taxidermy, bitters chambray swag etsy brunch kogi
					pork belly authentic. Direct trade put a bird on it ad bespoke,
					occaecat marfa cliche nisi aliquip kale chips synth readymade. Odio
					austin keytar pour-over fugiat. Pickled everyday carry laborum
					sartorial pinterest labore, organic voluptate banh mi kitsch. Leggings
					austin thundercats cliche. Neutra typewriter sapiente, intelligentsia
					semiotics +1 esse ex authentic aesthetic banh mi drinking vinegar
					knausgaard. Id tousled culpa, ut chia cillum actually fashion axe
					cronut forage assumenda tilde ramps.
				</p>
			</Collapsible>
		</section>
	);
};

/* Toggle With On Rest Callback */
export const ToggleWithOnRestCallback: Story<ICollapsibleProps> = (args) => {
	const onRest = () => {
		alert(
			'I am and always will be the optimist. The hoper of far-flung hopes and the dreamer of improbable dreams.'
		);
	};

	const [isExpanded, setIsExpanded] = useState(false);

	const handleToggle = () => {
		setIsExpanded(!isExpanded);
	};
	return (
		<section>
			<Button onClick={handleToggle}>toggle</Button>

			<Collapsible
				{...args}
				isExpanded={isExpanded}
				style={{ background: '#f4f2f2', padding: 10 }}
				onRest={onRest}
			>
				<p>
					Everybody knows that everybody dies. But not every day. Not today.
					Some days are special. Some days are so, so blessed. Some days, nobody
					dies at all. Now and then, every once in a very long while, every day
					in a million days, when the wind stands fair and the Doctor comes to
					call, everybody lives.
				</p>
			</Collapsible>
		</section>
	);
};
ToggleWithOnRestCallback.storyName = 'Toggle With OnRest Callback';
