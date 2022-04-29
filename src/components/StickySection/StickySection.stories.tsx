import React from 'react';
import { Meta, Story } from '@storybook/react';

import StickySection, { IStickySectionProps } from './StickySection';

export default {
	title: 'Helpers/StickySection',
	component: StickySection,
	parameters: {
		docs: {
			description: {
				component: StickySection.peek.description,
			},
		},
	},
} as Meta;

/* With Lower Bound */
export const WithLowerBound: Story<IStickySectionProps> = (args) => {
	return (
		<section
			style={{
				color: 'rgba(128,128,128,.25)',
				width: 800,
				marginBottom: 700,
			}}
		>
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray.
			<StickySection
				{...(args as any)}
				lowerBound={600}
				style={{ backgroundColor: '#2abbb0', color: 'white' }}
			>
				This section sticks to top!
			</StickySection>
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
		</section>
	);
};

/* With Lower Bound And Scroll Viewport Width */
export const WithLowerBoundAndScrollViewportWidth: Story<
	IStickySectionProps
> = (args) => {
	return (
		<section
			style={{
				color: 'rgba(128,128,128,.25)',
				width: 800,
				overflow: 'auto',
			}}
		>
			<section style={{ width: 1000 }}>
				Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
				messenger bag viral migas. Artisan freegan cold-pressed offal,
				flexitarian shabby chic polaroid banjo four dollar toast four loko
				williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
				scenester actually cornhole locavore man bun chambray.
				<StickySection
					{...(args as any)}
					viewportWidth={800}
					lowerBound={1838}
					style={{ backgroundColor: '#2abbb0', color: 'white' }}
				>
					I scroll horizontally to match the content!
				</StickySection>
				Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
				messenger bag viral migas. Artisan freegan cold-pressed offal,
				flexitarian shabby chic polaroid banjo four dollar toast four loko
				williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
				scenester actually cornhole locavore man bun chambray. Post-ironic
				health goth austin mixtape mlkshk. Cold-pressed ennui messenger bag
				viral migas. Artisan freegan cold-pressed offal, flexitarian shabby chic
				polaroid banjo four dollar toast four loko williamsburg. Taxidermy ramps
				fap vegan bushwick pug, kickstarter scenester actually cornhole locavore
				man bun chambray. Post-ironic health goth austin mixtape mlkshk.
				Cold-pressed ennui messenger bag viral migas. Artisan freegan
				cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
				toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
				kickstarter scenester actually cornhole locavore man bun chambray.
				Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
				messenger bag viral migas. Artisan freegan cold-pressed offal,
				flexitarian shabby chic polaroid banjo four dollar toast four loko
				williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
				scenester actually cornhole locavore man bun chambray. Post-ironic
				health goth austin mixtape mlkshk. Cold-pressed ennui messenger bag
				viral migas. Artisan freegan cold-pressed offal, flexitarian shabby chic
				polaroid banjo four dollar toast four loko williamsburg. Taxidermy ramps
				fap vegan bushwick pug, kickstarter scenester actually cornhole locavore
				man bun chambray. Post-ironic health goth austin mixtape mlkshk.
				Cold-pressed ennui messenger bag viral migas. Artisan freegan
				cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
				toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
				kickstarter scenester actually cornhole locavore man bun chambray.
				Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
				messenger bag viral migas. Artisan freegan cold-pressed offal,
				flexitarian shabby chic polaroid banjo four dollar toast four loko
				williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
				scenester actually cornhole locavore man bun chambray. Post-ironic
				health goth austin mixtape mlkshk. Cold-pressed ennui messenger bag
				viral migas. Artisan freegan cold-pressed offal, flexitarian shabby chic
				polaroid banjo four dollar toast four loko williamsburg. Taxidermy ramps
				fap vegan bushwick pug, kickstarter scenester actually cornhole locavore
				man bun chambray. Post-ironic health goth austin mixtape mlkshk.
				Cold-pressed ennui messenger bag viral migas. Artisan freegan
				cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
				toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
				kickstarter scenester actually cornhole locavore man bun chambray.
				Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
				messenger bag viral migas. Artisan freegan cold-pressed offal,
				flexitarian shabby chic polaroid banjo four dollar toast four loko
				williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
				scenester actually cornhole locavore man bun chambray. Post-ironic
				health goth austin mixtape mlkshk. Cold-pressed ennui messenger bag
				viral migas. Artisan freegan cold-pressed offal, flexitarian shabby chic
				polaroid banjo four dollar toast four loko williamsburg. Taxidermy ramps
				fap vegan bushwick pug, kickstarter scenester actually cornhole locavore
				man bun chambray. Post-ironic health goth austin mixtape mlkshk.
				Cold-pressed ennui messenger bag viral migas. Artisan freegan
				cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
				toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
				kickstarter scenester actually cornhole locavore man bun chambray.
				Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
				messenger bag viral migas. Artisan freegan cold-pressed offal,
				flexitarian shabby chic polaroid banjo four dollar toast four loko
				williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
				scenester actually cornhole locavore man bun chambray. Post-ironic
				health goth austin mixtape mlkshk. Cold-pressed ennui messenger bag
				viral migas. Artisan freegan cold-pressed offal, flexitarian shabby chic
				polaroid banjo four dollar toast four loko williamsburg. Taxidermy ramps
				fap vegan bushwick pug, kickstarter scenester actually cornhole locavore
				man bun chambray. Post-ironic health goth austin mixtape mlkshk.
				Cold-pressed ennui messenger bag viral migas. Artisan freegan
				cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
				toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
				kickstarter scenester actually cornhole locavore man bun chambray.
				Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
				messenger bag viral migas. Artisan freegan cold-pressed offal,
				flexitarian shabby chic polaroid banjo four dollar toast four loko
				williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
				scenester actually cornhole locavore man bun chambray.
			</section>
		</section>
	);
};

/* Standard */
export const Standard: Story<IStickySectionProps> = (args) => {
	return (
		<section
			style={{
				color: 'rgba(128,128,128,.25)',
				marginBottom: 700,
				height: 3000,
			}}
		>
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray.
			<StickySection
				{...(args as any)}
				style={{ backgroundColor: '#2abbb0', color: 'white' }}
			>
				This section has no lower bounds!
			</StickySection>
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray.
		</section>
	);
};

/* Top Offset */
export const TopOffset: Story<IStickySectionProps> = (args) => {
	return (
		<section
			style={{
				color: 'rgba(128,128,128,.25)',
				marginBottom: 700,
				height: 3000,
			}}
		>
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray.
			<StickySection
				{...(args as any)}
				topOffset={100}
				style={{ backgroundColor: '#2abbb0', color: 'white' }}
			>
				This section has no lower bounds! but has a topOffset
			</StickySection>
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray. Post-ironic health goth austin mixtape
			mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan freegan
			cold-pressed offal, flexitarian shabby chic polaroid banjo four dollar
			toast four loko williamsburg. Taxidermy ramps fap vegan bushwick pug,
			kickstarter scenester actually cornhole locavore man bun chambray.
			Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
			messenger bag viral migas. Artisan freegan cold-pressed offal, flexitarian
			shabby chic polaroid banjo four dollar toast four loko williamsburg.
			Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
			cornhole locavore man bun chambray.
		</section>
	);
};
