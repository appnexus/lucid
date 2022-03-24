import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';

import Expander, { IExpanderProps } from './Expander';
import Button from '../Button/Button';
import EditIcon from '../Icon/EditIcon/EditIcon';
import CloseIcon from '../Icon/CloseIcon/CloseIcon';

export default {
	title: 'Layout/Expander',
	component: Expander,
	parameters: {
		docs: {
			description: {
				component: Expander.peek.description,
			},
		},
	},
	args: Expander.defaultProps,
} as Meta;

/* Basic */
export const Basic: Story<IExpanderProps> = (args) => {
	return (
		<Expander>
			<Expander.Label>Show Stuff</Expander.Label>
			<p>
				Tacos craft beer humblebrag meditation. Cold-pressed next level man bun
				readymade beard, wayfarers fanny pack keytar helvetica knausgaard
				biodiesel lumbersexual. Knausgaard echo park whatever four loko
				messenger bag hella. Cardigan church-key brooklyn letterpress artisan
				venmo, gastropub hella. Single-origin coffee selfies four loko,
				biodiesel health goth truffaut migas sustainable kale chips disrupt
				locavore meggings mustache actually retro. Mlkshk poutine flexitarian
				scenester 3 wolf moon, vice kinfolk chia blog ennui bitters brooklyn
				quinoa marfa. Literally before they sold out gochujang pork belly
				franzen.
			</p>
			<p>
				Sriracha put a bird on it chia, locavore wolf affogato tote bag neutra
				umami food truck austin keytar cronut man bun. Kitsch man braid occupy
				art party, tousled waistcoat tilde YOLO keytar street art selvage.
				Salvia pour-over keytar intelligentsia. Marfa yr stumptown, before they
				sold out lo-fi literally art party williamsburg blue bottle slow-carb
				brooklyn. Gochujang post-ironic aesthetic kickstarter, dreamcatcher four
				dollar toast whatever tattooed quinoa. Single-origin coffee blog lomo,
				freegan next level ramps small batch put a bird on it listicle
				stumptown. Stumptown mumblecore vinyl, mustache street art wayfarers
				lumbersexual everyday carry irony pitchfork gochujang pug DIY gentrify.
			</p>
			<p>
				Kale chips pug jean shorts cardigan, ramps plaid mlkshk photo booth
				migas whatever. Ramps affogato bespoke, crucifix ennui PBR&B
				asymmetrical meggings kombucha banh mi meh skateboard artisan man braid.
				Ugh semiotics intelligentsia sustainable, craft beer next level meggings
				before they sold out heirloom iPhone try-hard. Listicle blog literally
				marfa plaid brooklyn humblebrag retro, VHS thundercats man braid
				waistcoat ennui. Church-key knausgaard austin organic farm-to-table
				neutra franzen bespoke, mlkshk narwhal DIY raw denim retro. Mlkshk
				locavore try-hard roof party flexitarian. Letterpress beard fixie, umami
				waistcoat salvia ennui four loko seitan lomo franzen pickled shoreditch
				master cleanse.
			</p>
			<p>
				Tacos craft beer humblebrag meditation. Cold-pressed next level man bun
				readymade beard, wayfarers fanny pack keytar helvetica knausgaard
				biodiesel lumbersexual. Knausgaard echo park whatever four loko
				messenger bag hella. Cardigan church-key brooklyn letterpress artisan
				venmo, gastropub hella. Single-origin coffee selfies four loko,
				biodiesel health goth truffaut migas sustainable kale chips disrupt
				locavore meggings mustache actually retro. Mlkshk poutine flexitarian
				scenester 3 wolf moon, vice kinfolk chia blog ennui bitters brooklyn
				quinoa marfa. Literally before they sold out gochujang pork belly
				franzen.
			</p>
			<p>
				Sriracha put a bird on it chia, locavore wolf affogato tote bag neutra
				umami food truck austin keytar cronut man bun. Kitsch man braid occupy
				art party, tousled waistcoat tilde YOLO keytar street art selvage.
				Salvia pour-over keytar intelligentsia. Marfa yr stumptown, before they
				sold out lo-fi literally art party williamsburg blue bottle slow-carb
				brooklyn. Gochujang post-ironic aesthetic kickstarter, dreamcatcher four
				dollar toast whatever tattooed quinoa. Single-origin coffee blog lomo,
				freegan next level ramps small batch put a bird on it listicle
				stumptown. Stumptown mumblecore vinyl, mustache street art wayfarers
				lumbersexual everyday carry irony pitchfork gochujang pug DIY gentrify.
			</p>
			<p>
				Kale chips pug jean shorts cardigan, ramps plaid mlkshk photo booth
				migas whatever. Ramps affogato bespoke, crucifix ennui PBR&B
				asymmetrical meggings kombucha banh mi meh skateboard artisan man braid.
				Ugh semiotics intelligentsia sustainable, craft beer next level meggings
				before they sold out heirloom iPhone try-hard. Listicle blog literally
				marfa plaid brooklyn humblebrag retro, VHS thundercats man braid
				waistcoat ennui. Church-key knausgaard austin organic farm-to-table
				neutra franzen bespoke, mlkshk narwhal DIY raw denim retro. Mlkshk
				locavore try-hard roof party flexitarian. Letterpress beard fixie, umami
				waistcoat salvia ennui four loko seitan lomo franzen pickled shoreditch
				master cleanse.
			</p>
		</Expander>
	);
};
Basic.args = {
	...Expander.defaultProps,
};

export const InteractiveWithChangingLabels: Story<IExpanderProps> = (args) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const handleExpanded = (isExpanded: any) => {
		setIsExpanded(isExpanded);
	};

	return (
		<Expander isExpanded={isExpanded} onToggle={handleExpanded}>
			<Expander.Label>{isExpanded ? 'Show Less' : 'Show More'}</Expander.Label>
			<p>
				Artisan helvetica quinoa kogi fingerstache, biodiesel church-key blue
				bottle everyday carry schlitz seitan locavore. Retro +1 tilde, normcore
				post-ironic chillwave PBR&B umami. Mlkshk mumblecore meh, kitsch pickled
				wolf helvetica man bun cronut keffiyeh meggings ramps. Banh mi stumptown
				cronut wayfarers. Banh mi venmo street art chicharrones, put a bird on
				it yuccie cornhole poutine knausgaard echo park tilde retro. Occupy XOXO
				etsy meh pabst blue bottle. Photo booth four loko biodiesel, cornhole
				chicharrones echo park actually pork belly gochujang DIY gluten-free
				plaid microdosing salvia pinterest.
			</p>
			<p>
				Cred lumbersexual organic, echo park hashtag roof party pinterest shabby
				chic green juice salvia scenester hella ramps. Schlitz knausgaard
				church-key disrupt, four loko XOXO bicycle rights post-ironic four
				dollar toast fixie butcher mustache tousled humblebrag. Bushwick 8-bit
				swag, wolf intelligentsia kickstarter roof party cred meh semiotics
				flannel. Typewriter umami narwhal irony, slow-carb VHS street art
				cold-pressed wayfarers sriracha everyday carry church-key wolf
				humblebrag. Skateboard polaroid man braid organic, chambray mustache
				mixtape freegan humblebrag brunch ugh. Wayfarers VHS brooklyn, fashion
				axe green juice next level kombucha cray shabby chic lo-fi. Lumbersexual
				pug farm-to-table, authentic chartreuse street art church-key.
			</p>
			<p>
				3 wolf moon pickled messenger bag knausgaard venmo, retro aliquip
				portland asymmetrical cliche non pabst pinterest culpa. Laboris beard
				intelligentsia, pickled viral brooklyn YOLO tempor do cliche fugiat.
				Messenger bag fanny pack reprehenderit bicycle rights tilde, tumblr
				neutra do intelligentsia godard street art. Gentrify consectetur
				laboris, pug venmo literally you probably haven't heard of them actually
				locavore distillery commodo occupy franzen umami. Slow-carb bespoke
				pariatur four dollar toast, selfies tofu salvia artisan tousled meggings
				kinfolk chambray marfa direct trade single-origin coffee. Exercitation
				fap umami mollit deep v wolf, sint lomo sunt four dollar toast elit
				selvage vegan truffaut. Cillum pickled sartorial flexitarian chartreuse
				brooklyn.
			</p>
			<p>
				Artisan helvetica quinoa kogi fingerstache, biodiesel church-key blue
				bottle everyday carry schlitz seitan locavore. Retro +1 tilde, normcore
				post-ironic chillwave PBR&B umami. Mlkshk mumblecore meh, kitsch pickled
				wolf helvetica man bun cronut keffiyeh meggings ramps. Banh mi stumptown
				cronut wayfarers. Banh mi venmo street art chicharrones, put a bird on
				it yuccie cornhole poutine knausgaard echo park tilde retro. Occupy XOXO
				etsy meh pabst blue bottle. Photo booth four loko biodiesel, cornhole
				chicharrones echo park actually pork belly gochujang DIY gluten-free
				plaid microdosing salvia pinterest.
			</p>
			<p>
				Cred lumbersexual organic, echo park hashtag roof party pinterest shabby
				chic green juice salvia scenester hella ramps. Schlitz knausgaard
				church-key disrupt, four loko XOXO bicycle rights post-ironic four
				dollar toast fixie butcher mustache tousled humblebrag. Bushwick 8-bit
				swag, wolf intelligentsia kickstarter roof party cred meh semiotics
				flannel. Typewriter umami narwhal irony, slow-carb VHS street art
				cold-pressed wayfarers sriracha everyday carry church-key wolf
				humblebrag. Skateboard polaroid man braid organic, chambray mustache
				mixtape freegan humblebrag brunch ugh. Wayfarers VHS brooklyn, fashion
				axe green juice next level kombucha cray shabby chic lo-fi. Lumbersexual
				pug farm-to-table, authentic chartreuse street art church-key.
			</p>
			<p>
				3 wolf moon pickled messenger bag knausgaard venmo, retro aliquip
				portland asymmetrical cliche non pabst pinterest culpa. Laboris beard
				intelligentsia, pickled viral brooklyn YOLO tempor do cliche fugiat.
				Messenger bag fanny pack reprehenderit bicycle rights tilde, tumblr
				neutra do intelligentsia godard street art. Gentrify consectetur
				laboris, pug venmo literally you probably haven't heard of them actually
				locavore distillery commodo occupy franzen umami. Slow-carb bespoke
				pariatur four dollar toast, selfies tofu salvia artisan tousled meggings
				kinfolk chambray marfa direct trade single-origin coffee. Exercitation
				fap umami mollit deep v wolf, sint lomo sunt four dollar toast elit
				selvage vegan truffaut. Cillum pickled sartorial flexitarian chartreuse
				brooklyn.
			</p>
		</Expander>
	);
};

/* Interactive With Changing Labels And Additional Label Content */
export const InteractiveWithChangingLabelsAndAdditionalLabelContent: Story<
	IExpanderProps
> = (args) => {
	return (
		<Expander>
			<Expander.Label>Show Stuff</Expander.Label>
			<Expander.AdditionalLabelContent>
				<Button kind='invisible'>
					<EditIcon />
					Edit
				</Button>
				<Button kind='invisible'>
					<CloseIcon />
					Clear All
				</Button>
			</Expander.AdditionalLabelContent>
			<p>
				Tacos craft beer humblebrag meditation. Cold-pressed next level man bun
				readymade beard, wayfarers fanny pack keytar helvetica knausgaard
				biodiesel lumbersexual. Knausgaard echo park whatever four loko
				messenger bag hella. Cardigan church-key brooklyn letterpress artisan
				venmo, gastropub hella. Single-origin coffee selfies four loko,
				biodiesel health goth truffaut migas sustainable kale chips disrupt
				locavore meggings mustache actually retro. Mlkshk poutine flexitarian
				scenester 3 wolf moon, vice kinfolk chia blog ennui bitters brooklyn
				quinoa marfa. Literally before they sold out gochujang pork belly
				franzen.
			</p>
			<p>
				Sriracha put a bird on it chia, locavore wolf affogato tote bag neutra
				umami food truck austin keytar cronut man bun. Kitsch man braid occupy
				art party, tousled waistcoat tilde YOLO keytar street art selvage.
				Salvia pour-over keytar intelligentsia. Marfa yr stumptown, before they
				sold out lo-fi literally art party williamsburg blue bottle slow-carb
				brooklyn. Gochujang post-ironic aesthetic kickstarter, dreamcatcher four
				dollar toast whatever tattooed quinoa. Single-origin coffee blog lomo,
				freegan next level ramps small batch put a bird on it listicle
				stumptown. Stumptown mumblecore vinyl, mustache street art wayfarers
				lumbersexual everyday carry irony pitchfork gochujang pug DIY gentrify.
			</p>
			<p>
				Kale chips pug jean shorts cardigan, ramps plaid mlkshk photo booth
				migas whatever. Ramps affogato bespoke, crucifix ennui PBR&B
				asymmetrical meggings kombucha banh mi meh skateboard artisan man braid.
				Ugh semiotics intelligentsia sustainable, craft beer next level meggings
				before they sold out heirloom iPhone try-hard. Listicle blog literally
				marfa plaid brooklyn humblebrag retro, VHS thundercats man braid
				waistcoat ennui. Church-key knausgaard austin organic farm-to-table
				neutra franzen bespoke, mlkshk narwhal DIY raw denim retro. Mlkshk
				locavore try-hard roof party flexitarian. Letterpress beard fixie, umami
				waistcoat salvia ennui four loko seitan lomo franzen pickled shoreditch
				master cleanse.
			</p>
			<p>
				Tacos craft beer humblebrag meditation. Cold-pressed next level man bun
				readymade beard, wayfarers fanny pack keytar helvetica knausgaard
				biodiesel lumbersexual. Knausgaard echo park whatever four loko
				messenger bag hella. Cardigan church-key brooklyn letterpress artisan
				venmo, gastropub hella. Single-origin coffee selfies four loko,
				biodiesel health goth truffaut migas sustainable kale chips disrupt
				locavore meggings mustache actually retro. Mlkshk poutine flexitarian
				scenester 3 wolf moon, vice kinfolk chia blog ennui bitters brooklyn
				quinoa marfa. Literally before they sold out gochujang pork belly
				franzen.
			</p>
			<p>
				Sriracha put a bird on it chia, locavore wolf affogato tote bag neutra
				umami food truck austin keytar cronut man bun. Kitsch man braid occupy
				art party, tousled waistcoat tilde YOLO keytar street art selvage.
				Salvia pour-over keytar intelligentsia. Marfa yr stumptown, before they
				sold out lo-fi literally art party williamsburg blue bottle slow-carb
				brooklyn. Gochujang post-ironic aesthetic kickstarter, dreamcatcher four
				dollar toast whatever tattooed quinoa. Single-origin coffee blog lomo,
				freegan next level ramps small batch put a bird on it listicle
				stumptown. Stumptown mumblecore vinyl, mustache street art wayfarers
				lumbersexual everyday carry irony pitchfork gochujang pug DIY gentrify.
			</p>
			<p>
				Kale chips pug jean shorts cardigan, ramps plaid mlkshk photo booth
				migas whatever. Ramps affogato bespoke, crucifix ennui PBR&B
				asymmetrical meggings kombucha banh mi meh skateboard artisan man braid.
				Ugh semiotics intelligentsia sustainable, craft beer next level meggings
				before they sold out heirloom iPhone try-hard. Listicle blog literally
				marfa plaid brooklyn humblebrag retro, VHS thundercats man braid
				waistcoat ennui. Church-key knausgaard austin organic farm-to-table
				neutra franzen bespoke, mlkshk narwhal DIY raw denim retro. Mlkshk
				locavore try-hard roof party flexitarian. Letterpress beard fixie, umami
				waistcoat salvia ennui four loko seitan lomo franzen pickled shoreditch
				master cleanse.
			</p>
		</Expander>
	);
};

/** IsExpanded */
export const IsExpanded: Story<IExpanderProps> = (args) => {
	return (
		<Expander isExpanded={true}>
			<Expander.Label>Show Less</Expander.Label>
			<p>
				You can't get rid of me. Keep clicking that icon as much as you want,
				but I'm here to stay!
			</p>
		</Expander>
	);
};

/* Highlighted */
export const Highlighted: Story<IExpanderProps> = (args) => {
	return (
		<Expander kind='highlighted'>
			<Expander.Label>Show Less</Expander.Label>
			<p>
				You can't get rid of me. Keep clicking that icon as much as you want,
				but I'm here to stay!
			</p>
		</Expander>
	);
};
