import React from 'react';
import createClass from 'create-react-class';
import StickySection from './StickySection';

export default {
	title: 'Helpers/StickySection',
	component: StickySection,
	parameters: {
		docs: {
			description: {
				component: (StickySection as any).peek.description,
			},
		},
	},
};

/* With Lower Bound */
export const WithLowerBound = () => {
	const Component = createClass({
		render() {
			return (
				<section
					style={{
						color: 'rgba(128,128,128,.25)',
						width: 800,
						marginBottom: 700,
					}}
				>
					Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
					messenger bag viral migas. Artisan freegan cold-pressed offal,
					flexitarian shabby chic polaroid banjo four dollar toast four loko
					williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
					scenester actually cornhole locavore man bun chambray.
					<StickySection
						lowerBound={600}
						style={{ backgroundColor: '#2abbb0', color: 'white' }}
					>
						This section sticks to top!
					</StickySection>
					Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
					messenger bag viral migas. Artisan freegan cold-pressed offal,
					flexitarian shabby chic polaroid banjo four dollar toast four loko
					williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
					scenester actually cornhole locavore man bun chambray. Post-ironic
					health goth austin mixtape mlkshk. Cold-pressed ennui messenger bag
					viral migas. Artisan freegan cold-pressed offal, flexitarian shabby
					chic polaroid banjo four dollar toast four loko williamsburg.
					Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
					cornhole locavore man bun chambray. Post-ironic health goth austin
					mixtape mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan
					freegan cold-pressed offal, flexitarian shabby chic polaroid banjo
					four dollar toast four loko williamsburg. Taxidermy ramps fap vegan
					bushwick pug, kickstarter scenester actually cornhole locavore man bun
					chambray. Post-ironic health goth austin mixtape mlkshk. Cold-pressed
					ennui messenger bag viral migas. Artisan freegan cold-pressed offal,
					flexitarian shabby chic polaroid banjo four dollar toast four loko
					williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
					scenester actually cornhole locavore man bun chambray. Post-ironic
					health goth austin mixtape mlkshk. Cold-pressed ennui messenger bag
					viral migas. Artisan freegan cold-pressed offal, flexitarian shabby
					chic polaroid banjo four dollar toast four loko williamsburg.
					Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
					cornhole locavore man bun chambray. Post-ironic health goth austin
					mixtape mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan
					freegan cold-pressed offal, flexitarian shabby chic polaroid banjo
					four dollar toast four loko williamsburg. Taxidermy ramps fap vegan
					bushwick pug, kickstarter scenester actually cornhole locavore man bun
					chambray. Post-ironic health goth austin mixtape mlkshk. Cold-pressed
					ennui messenger bag viral migas. Artisan freegan cold-pressed offal,
					flexitarian shabby chic polaroid banjo four dollar toast four loko
					williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
					scenester actually cornhole locavore man bun chambray. Post-ironic
					health goth austin mixtape mlkshk. Cold-pressed ennui messenger bag
					viral migas. Artisan freegan cold-pressed offal, flexitarian shabby
					chic polaroid banjo four dollar toast four loko williamsburg.
					Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
					cornhole locavore man bun chambray. Post-ironic health goth austin
					mixtape mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan
					freegan cold-pressed offal, flexitarian shabby chic polaroid banjo
					four dollar toast four loko williamsburg. Taxidermy ramps fap vegan
					bushwick pug, kickstarter scenester actually cornhole locavore man bun
					chambray. Post-ironic health goth austin mixtape mlkshk. Cold-pressed
					ennui messenger bag viral migas. Artisan freegan cold-pressed offal,
					flexitarian shabby chic polaroid banjo four dollar toast four loko
					williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
					scenester actually cornhole locavore man bun chambray. Post-ironic
					health goth austin mixtape mlkshk. Cold-pressed ennui messenger bag
					viral migas. Artisan freegan cold-pressed offal, flexitarian shabby
					chic polaroid banjo four dollar toast four loko williamsburg.
					Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
					cornhole locavore man bun chambray. Post-ironic health goth austin
					mixtape mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan
					freegan cold-pressed offal, flexitarian shabby chic polaroid banjo
					four dollar toast four loko williamsburg. Taxidermy ramps fap vegan
					bushwick pug, kickstarter scenester actually cornhole locavore man bun
					chambray. Post-ironic health goth austin mixtape mlkshk. Cold-pressed
					ennui messenger bag viral migas. Artisan freegan cold-pressed offal,
					flexitarian shabby chic polaroid banjo four dollar toast four loko
					williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
					scenester actually cornhole locavore man bun chambray. Post-ironic
					health goth austin mixtape mlkshk. Cold-pressed ennui messenger bag
					viral migas. Artisan freegan cold-pressed offal, flexitarian shabby
					chic polaroid banjo four dollar toast four loko williamsburg.
					Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
					cornhole locavore man bun chambray. Post-ironic health goth austin
					mixtape mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan
					freegan cold-pressed offal, flexitarian shabby chic polaroid banjo
					four dollar toast four loko williamsburg. Taxidermy ramps fap vegan
					bushwick pug, kickstarter scenester actually cornhole locavore man bun
					chambray. Post-ironic health goth austin mixtape mlkshk. Cold-pressed
					ennui messenger bag viral migas. Artisan freegan cold-pressed offal,
					flexitarian shabby chic polaroid banjo four dollar toast four loko
					williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
					scenester actually cornhole locavore man bun chambray. Post-ironic
					health goth austin mixtape mlkshk. Cold-pressed ennui messenger bag
					viral migas. Artisan freegan cold-pressed offal, flexitarian shabby
					chic polaroid banjo four dollar toast four loko williamsburg.
					Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
					cornhole locavore man bun chambray. Post-ironic health goth austin
					mixtape mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan
					freegan cold-pressed offal, flexitarian shabby chic polaroid banjo
					four dollar toast four loko williamsburg. Taxidermy ramps fap vegan
					bushwick pug, kickstarter scenester actually cornhole locavore man bun
					chambray. Post-ironic health goth austin mixtape mlkshk. Cold-pressed
					ennui messenger bag viral migas. Artisan freegan cold-pressed offal,
					flexitarian shabby chic polaroid banjo four dollar toast four loko
					williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
					scenester actually cornhole locavore man bun chambray. Post-ironic
					health goth austin mixtape mlkshk. Cold-pressed ennui messenger bag
					viral migas. Artisan freegan cold-pressed offal, flexitarian shabby
					chic polaroid banjo four dollar toast four loko williamsburg.
					Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
					cornhole locavore man bun chambray. Post-ironic health goth austin
					mixtape mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan
					freegan cold-pressed offal, flexitarian shabby chic polaroid banjo
					four dollar toast four loko williamsburg. Taxidermy ramps fap vegan
					bushwick pug, kickstarter scenester actually cornhole locavore man bun
					chambray. Post-ironic health goth austin mixtape mlkshk. Cold-pressed
					ennui messenger bag viral migas. Artisan freegan cold-pressed offal,
					flexitarian shabby chic polaroid banjo four dollar toast four loko
					williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
					scenester actually cornhole locavore man bun chambray. Post-ironic
					health goth austin mixtape mlkshk. Cold-pressed ennui messenger bag
					viral migas. Artisan freegan cold-pressed offal, flexitarian shabby
					chic polaroid banjo four dollar toast four loko williamsburg.
					Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
					cornhole locavore man bun chambray. Post-ironic health goth austin
					mixtape mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan
					freegan cold-pressed offal, flexitarian shabby chic polaroid banjo
					four dollar toast four loko williamsburg. Taxidermy ramps fap vegan
					bushwick pug, kickstarter scenester actually cornhole locavore man bun
					chambray.
				</section>
			);
		},
	});

	return <Component />;
};
WithLowerBound.storyName = 'WithLowerBound';

/* With Lower Bound And Scroll Viewport Width */
export const WithLowerBoundAndScrollViewportWidth = () => {
	const Component = createClass({
		render() {
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
						viral migas. Artisan freegan cold-pressed offal, flexitarian shabby
						chic polaroid banjo four dollar toast four loko williamsburg.
						Taxidermy ramps fap vegan bushwick pug, kickstarter scenester
						actually cornhole locavore man bun chambray. Post-ironic health goth
						austin mixtape mlkshk. Cold-pressed ennui messenger bag viral migas.
						Artisan freegan cold-pressed offal, flexitarian shabby chic polaroid
						banjo four dollar toast four loko williamsburg. Taxidermy ramps fap
						vegan bushwick pug, kickstarter scenester actually cornhole locavore
						man bun chambray. Post-ironic health goth austin mixtape mlkshk.
						Cold-pressed ennui messenger bag viral migas. Artisan freegan
						cold-pressed offal, flexitarian shabby chic polaroid banjo four
						dollar toast four loko williamsburg. Taxidermy ramps fap vegan
						bushwick pug, kickstarter scenester actually cornhole locavore man
						bun chambray. Post-ironic health goth austin mixtape mlkshk.
						Cold-pressed ennui messenger bag viral migas. Artisan freegan
						cold-pressed offal, flexitarian shabby chic polaroid banjo four
						dollar toast four loko williamsburg. Taxidermy ramps fap vegan
						bushwick pug, kickstarter scenester actually cornhole locavore man
						bun chambray. Post-ironic health goth austin mixtape mlkshk.
						Cold-pressed ennui messenger bag viral migas. Artisan freegan
						cold-pressed offal, flexitarian shabby chic polaroid banjo four
						dollar toast four loko williamsburg. Taxidermy ramps fap vegan
						bushwick pug, kickstarter scenester actually cornhole locavore man
						bun chambray. Post-ironic health goth austin mixtape mlkshk.
						Cold-pressed ennui messenger bag viral migas. Artisan freegan
						cold-pressed offal, flexitarian shabby chic polaroid banjo four
						dollar toast four loko williamsburg. Taxidermy ramps fap vegan
						bushwick pug, kickstarter scenester actually cornhole locavore man
						bun chambray. Post-ironic health goth austin mixtape mlkshk.
						Cold-pressed ennui messenger bag viral migas. Artisan freegan
						cold-pressed offal, flexitarian shabby chic polaroid banjo four
						dollar toast four loko williamsburg. Taxidermy ramps fap vegan
						bushwick pug, kickstarter scenester actually cornhole locavore man
						bun chambray. Post-ironic health goth austin mixtape mlkshk.
						Cold-pressed ennui messenger bag viral migas. Artisan freegan
						cold-pressed offal, flexitarian shabby chic polaroid banjo four
						dollar toast four loko williamsburg. Taxidermy ramps fap vegan
						bushwick pug, kickstarter scenester actually cornhole locavore man
						bun chambray. Post-ironic health goth austin mixtape mlkshk.
						Cold-pressed ennui messenger bag viral migas. Artisan freegan
						cold-pressed offal, flexitarian shabby chic polaroid banjo four
						dollar toast four loko williamsburg. Taxidermy ramps fap vegan
						bushwick pug, kickstarter scenester actually cornhole locavore man
						bun chambray. Post-ironic health goth austin mixtape mlkshk.
						Cold-pressed ennui messenger bag viral migas. Artisan freegan
						cold-pressed offal, flexitarian shabby chic polaroid banjo four
						dollar toast four loko williamsburg. Taxidermy ramps fap vegan
						bushwick pug, kickstarter scenester actually cornhole locavore man
						bun chambray. Post-ironic health goth austin mixtape mlkshk.
						Cold-pressed ennui messenger bag viral migas. Artisan freegan
						cold-pressed offal, flexitarian shabby chic polaroid banjo four
						dollar toast four loko williamsburg. Taxidermy ramps fap vegan
						bushwick pug, kickstarter scenester actually cornhole locavore man
						bun chambray. Post-ironic health goth austin mixtape mlkshk.
						Cold-pressed ennui messenger bag viral migas. Artisan freegan
						cold-pressed offal, flexitarian shabby chic polaroid banjo four
						dollar toast four loko williamsburg. Taxidermy ramps fap vegan
						bushwick pug, kickstarter scenester actually cornhole locavore man
						bun chambray. Post-ironic health goth austin mixtape mlkshk.
						Cold-pressed ennui messenger bag viral migas. Artisan freegan
						cold-pressed offal, flexitarian shabby chic polaroid banjo four
						dollar toast four loko williamsburg. Taxidermy ramps fap vegan
						bushwick pug, kickstarter scenester actually cornhole locavore man
						bun chambray. Post-ironic health goth austin mixtape mlkshk.
						Cold-pressed ennui messenger bag viral migas. Artisan freegan
						cold-pressed offal, flexitarian shabby chic polaroid banjo four
						dollar toast four loko williamsburg. Taxidermy ramps fap vegan
						bushwick pug, kickstarter scenester actually cornhole locavore man
						bun chambray. Post-ironic health goth austin mixtape mlkshk.
						Cold-pressed ennui messenger bag viral migas. Artisan freegan
						cold-pressed offal, flexitarian shabby chic polaroid banjo four
						dollar toast four loko williamsburg. Taxidermy ramps fap vegan
						bushwick pug, kickstarter scenester actually cornhole locavore man
						bun chambray.
					</section>
				</section>
			);
		},
	});

	return <Component />;
};
WithLowerBoundAndScrollViewportWidth.storyName =
	'WithLowerBoundAndScrollViewportWidth';

/* Standard */
export const Standard = () => {
	const Component = createClass({
		render() {
			return (
				<section
					style={{
						color: 'rgba(128,128,128,.25)',
						marginBottom: 700,
						height: 3000,
					}}
				>
					Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
					messenger bag viral migas. Artisan freegan cold-pressed offal,
					flexitarian shabby chic polaroid banjo four dollar toast four loko
					williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
					scenester actually cornhole locavore man bun chambray.
					<StickySection style={{ backgroundColor: '#2abbb0', color: 'white' }}>
						This section has no lower bounds!
					</StickySection>
					Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
					messenger bag viral migas. Artisan freegan cold-pressed offal,
					flexitarian shabby chic polaroid banjo four dollar toast four loko
					williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
					scenester actually cornhole locavore man bun chambray. Post-ironic
					health goth austin mixtape mlkshk. Cold-pressed ennui messenger bag
					viral migas. Artisan freegan cold-pressed offal, flexitarian shabby
					chic polaroid banjo four dollar toast four loko williamsburg.
					Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
					cornhole locavore man bun chambray. Post-ironic health goth austin
					mixtape mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan
					freegan cold-pressed offal, flexitarian shabby chic polaroid banjo
					four dollar toast four loko williamsburg. Taxidermy ramps fap vegan
					bushwick pug, kickstarter scenester actually cornhole locavore man bun
					chambray. Post-ironic health goth austin mixtape mlkshk. Cold-pressed
					ennui messenger bag viral migas. Artisan freegan cold-pressed offal,
					flexitarian shabby chic polaroid banjo four dollar toast four loko
					williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
					scenester actually cornhole locavore man bun chambray. Post-ironic
					health goth austin mixtape mlkshk. Cold-pressed ennui messenger bag
					viral migas. Artisan freegan cold-pressed offal, flexitarian shabby
					chic polaroid banjo four dollar toast four loko williamsburg.
					Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
					cornhole locavore man bun chambray. Post-ironic health goth austin
					mixtape mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan
					freegan cold-pressed offal, flexitarian shabby chic polaroid banjo
					four dollar toast four loko williamsburg. Taxidermy ramps fap vegan
					bushwick pug, kickstarter scenester actually cornhole locavore man bun
					chambray. Post-ironic health goth austin mixtape mlkshk. Cold-pressed
					ennui messenger bag viral migas. Artisan freegan cold-pressed offal,
					flexitarian shabby chic polaroid banjo four dollar toast four loko
					williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
					scenester actually cornhole locavore man bun chambray. Post-ironic
					health goth austin mixtape mlkshk. Cold-pressed ennui messenger bag
					viral migas. Artisan freegan cold-pressed offal, flexitarian shabby
					chic polaroid banjo four dollar toast four loko williamsburg.
					Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
					cornhole locavore man bun chambray. Post-ironic health goth austin
					mixtape mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan
					freegan cold-pressed offal, flexitarian shabby chic polaroid banjo
					four dollar toast four loko williamsburg. Taxidermy ramps fap vegan
					bushwick pug, kickstarter scenester actually cornhole locavore man bun
					chambray. Post-ironic health goth austin mixtape mlkshk. Cold-pressed
					ennui messenger bag viral migas. Artisan freegan cold-pressed offal,
					flexitarian shabby chic polaroid banjo four dollar toast four loko
					williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
					scenester actually cornhole locavore man bun chambray. Post-ironic
					health goth austin mixtape mlkshk. Cold-pressed ennui messenger bag
					viral migas. Artisan freegan cold-pressed offal, flexitarian shabby
					chic polaroid banjo four dollar toast four loko williamsburg.
					Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
					cornhole locavore man bun chambray. Post-ironic health goth austin
					mixtape mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan
					freegan cold-pressed offal, flexitarian shabby chic polaroid banjo
					four dollar toast four loko williamsburg. Taxidermy ramps fap vegan
					bushwick pug, kickstarter scenester actually cornhole locavore man bun
					chambray. Post-ironic health goth austin mixtape mlkshk. Cold-pressed
					ennui messenger bag viral migas. Artisan freegan cold-pressed offal,
					flexitarian shabby chic polaroid banjo four dollar toast four loko
					williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
					scenester actually cornhole locavore man bun chambray. Post-ironic
					health goth austin mixtape mlkshk. Cold-pressed ennui messenger bag
					viral migas. Artisan freegan cold-pressed offal, flexitarian shabby
					chic polaroid banjo four dollar toast four loko williamsburg.
					Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
					cornhole locavore man bun chambray. Post-ironic health goth austin
					mixtape mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan
					freegan cold-pressed offal, flexitarian shabby chic polaroid banjo
					four dollar toast four loko williamsburg. Taxidermy ramps fap vegan
					bushwick pug, kickstarter scenester actually cornhole locavore man bun
					chambray. Post-ironic health goth austin mixtape mlkshk. Cold-pressed
					ennui messenger bag viral migas. Artisan freegan cold-pressed offal,
					flexitarian shabby chic polaroid banjo four dollar toast four loko
					williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
					scenester actually cornhole locavore man bun chambray. Post-ironic
					health goth austin mixtape mlkshk. Cold-pressed ennui messenger bag
					viral migas. Artisan freegan cold-pressed offal, flexitarian shabby
					chic polaroid banjo four dollar toast four loko williamsburg.
					Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
					cornhole locavore man bun chambray. Post-ironic health goth austin
					mixtape mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan
					freegan cold-pressed offal, flexitarian shabby chic polaroid banjo
					four dollar toast four loko williamsburg. Taxidermy ramps fap vegan
					bushwick pug, kickstarter scenester actually cornhole locavore man bun
					chambray. Post-ironic health goth austin mixtape mlkshk. Cold-pressed
					ennui messenger bag viral migas. Artisan freegan cold-pressed offal,
					flexitarian shabby chic polaroid banjo four dollar toast four loko
					williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
					scenester actually cornhole locavore man bun chambray. Post-ironic
					health goth austin mixtape mlkshk. Cold-pressed ennui messenger bag
					viral migas. Artisan freegan cold-pressed offal, flexitarian shabby
					chic polaroid banjo four dollar toast four loko williamsburg.
					Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
					cornhole locavore man bun chambray. Post-ironic health goth austin
					mixtape mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan
					freegan cold-pressed offal, flexitarian shabby chic polaroid banjo
					four dollar toast four loko williamsburg. Taxidermy ramps fap vegan
					bushwick pug, kickstarter scenester actually cornhole locavore man bun
					chambray. Post-ironic health goth austin mixtape mlkshk. Cold-pressed
					ennui messenger bag viral migas. Artisan freegan cold-pressed offal,
					flexitarian shabby chic polaroid banjo four dollar toast four loko
					williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
					scenester actually cornhole locavore man bun chambray. Post-ironic
					health goth austin mixtape mlkshk. Cold-pressed ennui messenger bag
					viral migas. Artisan freegan cold-pressed offal, flexitarian shabby
					chic polaroid banjo four dollar toast four loko williamsburg.
					Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
					cornhole locavore man bun chambray. Post-ironic health goth austin
					mixtape mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan
					freegan cold-pressed offal, flexitarian shabby chic polaroid banjo
					four dollar toast four loko williamsburg. Taxidermy ramps fap vegan
					bushwick pug, kickstarter scenester actually cornhole locavore man bun
					chambray. Post-ironic health goth austin mixtape mlkshk. Cold-pressed
					ennui messenger bag viral migas. Artisan freegan cold-pressed offal,
					flexitarian shabby chic polaroid banjo four dollar toast four loko
					williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
					scenester actually cornhole locavore man bun chambray. Post-ironic
					health goth austin mixtape mlkshk. Cold-pressed ennui messenger bag
					viral migas. Artisan freegan cold-pressed offal, flexitarian shabby
					chic polaroid banjo four dollar toast four loko williamsburg.
					Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
					cornhole locavore man bun chambray. Post-ironic health goth austin
					mixtape mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan
					freegan cold-pressed offal, flexitarian shabby chic polaroid banjo
					four dollar toast four loko williamsburg. Taxidermy ramps fap vegan
					bushwick pug, kickstarter scenester actually cornhole locavore man bun
					chambray. Post-ironic health goth austin mixtape mlkshk. Cold-pressed
					ennui messenger bag viral migas. Artisan freegan cold-pressed offal,
					flexitarian shabby chic polaroid banjo four dollar toast four loko
					williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
					scenester actually cornhole locavore man bun chambray. Post-ironic
					health goth austin mixtape mlkshk. Cold-pressed ennui messenger bag
					viral migas. Artisan freegan cold-pressed offal, flexitarian shabby
					chic polaroid banjo four dollar toast four loko williamsburg.
					Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
					cornhole locavore man bun chambray. Post-ironic health goth austin
					mixtape mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan
					freegan cold-pressed offal, flexitarian shabby chic polaroid banjo
					four dollar toast four loko williamsburg. Taxidermy ramps fap vegan
					bushwick pug, kickstarter scenester actually cornhole locavore man bun
					chambray. Post-ironic health goth austin mixtape mlkshk. Cold-pressed
					ennui messenger bag viral migas. Artisan freegan cold-pressed offal,
					flexitarian shabby chic polaroid banjo four dollar toast four loko
					williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
					scenester actually cornhole locavore man bun chambray. Post-ironic
					health goth austin mixtape mlkshk. Cold-pressed ennui messenger bag
					viral migas. Artisan freegan cold-pressed offal, flexitarian shabby
					chic polaroid banjo four dollar toast four loko williamsburg.
					Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
					cornhole locavore man bun chambray. Post-ironic health goth austin
					mixtape mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan
					freegan cold-pressed offal, flexitarian shabby chic polaroid banjo
					four dollar toast four loko williamsburg. Taxidermy ramps fap vegan
					bushwick pug, kickstarter scenester actually cornhole locavore man bun
					chambray. Post-ironic health goth austin mixtape mlkshk. Cold-pressed
					ennui messenger bag viral migas. Artisan freegan cold-pressed offal,
					flexitarian shabby chic polaroid banjo four dollar toast four loko
					williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
					scenester actually cornhole locavore man bun chambray. Post-ironic
					health goth austin mixtape mlkshk. Cold-pressed ennui messenger bag
					viral migas. Artisan freegan cold-pressed offal, flexitarian shabby
					chic polaroid banjo four dollar toast four loko williamsburg.
					Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
					cornhole locavore man bun chambray. Post-ironic health goth austin
					mixtape mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan
					freegan cold-pressed offal, flexitarian shabby chic polaroid banjo
					four dollar toast four loko williamsburg. Taxidermy ramps fap vegan
					bushwick pug, kickstarter scenester actually cornhole locavore man bun
					chambray. Post-ironic health goth austin mixtape mlkshk. Cold-pressed
					ennui messenger bag viral migas. Artisan freegan cold-pressed offal,
					flexitarian shabby chic polaroid banjo four dollar toast four loko
					williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
					scenester actually cornhole locavore man bun chambray.
				</section>
			);
		},
	});

	return <Component />;
};
Standard.storyName = 'Standard';

/* Top Offset */
export const TopOffset = () => {
	const Component = createClass({
		render() {
			return (
				<section
					style={{
						color: 'rgba(128,128,128,.25)',
						marginBottom: 700,
						height: 3000,
					}}
				>
					Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
					messenger bag viral migas. Artisan freegan cold-pressed offal,
					flexitarian shabby chic polaroid banjo four dollar toast four loko
					williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
					scenester actually cornhole locavore man bun chambray.
					<StickySection
						topOffset={100}
						style={{ backgroundColor: '#2abbb0', color: 'white' }}
					>
						This section has no lower bounds! but has a topOffset
					</StickySection>
					Post-ironic health goth austin mixtape mlkshk. Cold-pressed ennui
					messenger bag viral migas. Artisan freegan cold-pressed offal,
					flexitarian shabby chic polaroid banjo four dollar toast four loko
					williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
					scenester actually cornhole locavore man bun chambray. Post-ironic
					health goth austin mixtape mlkshk. Cold-pressed ennui messenger bag
					viral migas. Artisan freegan cold-pressed offal, flexitarian shabby
					chic polaroid banjo four dollar toast four loko williamsburg.
					Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
					cornhole locavore man bun chambray. Post-ironic health goth austin
					mixtape mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan
					freegan cold-pressed offal, flexitarian shabby chic polaroid banjo
					four dollar toast four loko williamsburg. Taxidermy ramps fap vegan
					bushwick pug, kickstarter scenester actually cornhole locavore man bun
					chambray. Post-ironic health goth austin mixtape mlkshk. Cold-pressed
					ennui messenger bag viral migas. Artisan freegan cold-pressed offal,
					flexitarian shabby chic polaroid banjo four dollar toast four loko
					williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
					scenester actually cornhole locavore man bun chambray. Post-ironic
					health goth austin mixtape mlkshk. Cold-pressed ennui messenger bag
					viral migas. Artisan freegan cold-pressed offal, flexitarian shabby
					chic polaroid banjo four dollar toast four loko williamsburg.
					Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
					cornhole locavore man bun chambray. Post-ironic health goth austin
					mixtape mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan
					freegan cold-pressed offal, flexitarian shabby chic polaroid banjo
					four dollar toast four loko williamsburg. Taxidermy ramps fap vegan
					bushwick pug, kickstarter scenester actually cornhole locavore man bun
					chambray. Post-ironic health goth austin mixtape mlkshk. Cold-pressed
					ennui messenger bag viral migas. Artisan freegan cold-pressed offal,
					flexitarian shabby chic polaroid banjo four dollar toast four loko
					williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
					scenester actually cornhole locavore man bun chambray. Post-ironic
					health goth austin mixtape mlkshk. Cold-pressed ennui messenger bag
					viral migas. Artisan freegan cold-pressed offal, flexitarian shabby
					chic polaroid banjo four dollar toast four loko williamsburg.
					Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
					cornhole locavore man bun chambray. Post-ironic health goth austin
					mixtape mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan
					freegan cold-pressed offal, flexitarian shabby chic polaroid banjo
					four dollar toast four loko williamsburg. Taxidermy ramps fap vegan
					bushwick pug, kickstarter scenester actually cornhole locavore man bun
					chambray. Post-ironic health goth austin mixtape mlkshk. Cold-pressed
					ennui messenger bag viral migas. Artisan freegan cold-pressed offal,
					flexitarian shabby chic polaroid banjo four dollar toast four loko
					williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
					scenester actually cornhole locavore man bun chambray. Post-ironic
					health goth austin mixtape mlkshk. Cold-pressed ennui messenger bag
					viral migas. Artisan freegan cold-pressed offal, flexitarian shabby
					chic polaroid banjo four dollar toast four loko williamsburg.
					Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
					cornhole locavore man bun chambray. Post-ironic health goth austin
					mixtape mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan
					freegan cold-pressed offal, flexitarian shabby chic polaroid banjo
					four dollar toast four loko williamsburg. Taxidermy ramps fap vegan
					bushwick pug, kickstarter scenester actually cornhole locavore man bun
					chambray. Post-ironic health goth austin mixtape mlkshk. Cold-pressed
					ennui messenger bag viral migas. Artisan freegan cold-pressed offal,
					flexitarian shabby chic polaroid banjo four dollar toast four loko
					williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
					scenester actually cornhole locavore man bun chambray. Post-ironic
					health goth austin mixtape mlkshk. Cold-pressed ennui messenger bag
					viral migas. Artisan freegan cold-pressed offal, flexitarian shabby
					chic polaroid banjo four dollar toast four loko williamsburg.
					Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
					cornhole locavore man bun chambray. Post-ironic health goth austin
					mixtape mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan
					freegan cold-pressed offal, flexitarian shabby chic polaroid banjo
					four dollar toast four loko williamsburg. Taxidermy ramps fap vegan
					bushwick pug, kickstarter scenester actually cornhole locavore man bun
					chambray. Post-ironic health goth austin mixtape mlkshk. Cold-pressed
					ennui messenger bag viral migas. Artisan freegan cold-pressed offal,
					flexitarian shabby chic polaroid banjo four dollar toast four loko
					williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
					scenester actually cornhole locavore man bun chambray. Post-ironic
					health goth austin mixtape mlkshk. Cold-pressed ennui messenger bag
					viral migas. Artisan freegan cold-pressed offal, flexitarian shabby
					chic polaroid banjo four dollar toast four loko williamsburg.
					Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
					cornhole locavore man bun chambray. Post-ironic health goth austin
					mixtape mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan
					freegan cold-pressed offal, flexitarian shabby chic polaroid banjo
					four dollar toast four loko williamsburg. Taxidermy ramps fap vegan
					bushwick pug, kickstarter scenester actually cornhole locavore man bun
					chambray. Post-ironic health goth austin mixtape mlkshk. Cold-pressed
					ennui messenger bag viral migas. Artisan freegan cold-pressed offal,
					flexitarian shabby chic polaroid banjo four dollar toast four loko
					williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
					scenester actually cornhole locavore man bun chambray. Post-ironic
					health goth austin mixtape mlkshk. Cold-pressed ennui messenger bag
					viral migas. Artisan freegan cold-pressed offal, flexitarian shabby
					chic polaroid banjo four dollar toast four loko williamsburg.
					Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
					cornhole locavore man bun chambray. Post-ironic health goth austin
					mixtape mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan
					freegan cold-pressed offal, flexitarian shabby chic polaroid banjo
					four dollar toast four loko williamsburg. Taxidermy ramps fap vegan
					bushwick pug, kickstarter scenester actually cornhole locavore man bun
					chambray. Post-ironic health goth austin mixtape mlkshk. Cold-pressed
					ennui messenger bag viral migas. Artisan freegan cold-pressed offal,
					flexitarian shabby chic polaroid banjo four dollar toast four loko
					williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
					scenester actually cornhole locavore man bun chambray. Post-ironic
					health goth austin mixtape mlkshk. Cold-pressed ennui messenger bag
					viral migas. Artisan freegan cold-pressed offal, flexitarian shabby
					chic polaroid banjo four dollar toast four loko williamsburg.
					Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
					cornhole locavore man bun chambray. Post-ironic health goth austin
					mixtape mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan
					freegan cold-pressed offal, flexitarian shabby chic polaroid banjo
					four dollar toast four loko williamsburg. Taxidermy ramps fap vegan
					bushwick pug, kickstarter scenester actually cornhole locavore man bun
					chambray. Post-ironic health goth austin mixtape mlkshk. Cold-pressed
					ennui messenger bag viral migas. Artisan freegan cold-pressed offal,
					flexitarian shabby chic polaroid banjo four dollar toast four loko
					williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
					scenester actually cornhole locavore man bun chambray. Post-ironic
					health goth austin mixtape mlkshk. Cold-pressed ennui messenger bag
					viral migas. Artisan freegan cold-pressed offal, flexitarian shabby
					chic polaroid banjo four dollar toast four loko williamsburg.
					Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
					cornhole locavore man bun chambray. Post-ironic health goth austin
					mixtape mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan
					freegan cold-pressed offal, flexitarian shabby chic polaroid banjo
					four dollar toast four loko williamsburg. Taxidermy ramps fap vegan
					bushwick pug, kickstarter scenester actually cornhole locavore man bun
					chambray. Post-ironic health goth austin mixtape mlkshk. Cold-pressed
					ennui messenger bag viral migas. Artisan freegan cold-pressed offal,
					flexitarian shabby chic polaroid banjo four dollar toast four loko
					williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
					scenester actually cornhole locavore man bun chambray. Post-ironic
					health goth austin mixtape mlkshk. Cold-pressed ennui messenger bag
					viral migas. Artisan freegan cold-pressed offal, flexitarian shabby
					chic polaroid banjo four dollar toast four loko williamsburg.
					Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
					cornhole locavore man bun chambray. Post-ironic health goth austin
					mixtape mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan
					freegan cold-pressed offal, flexitarian shabby chic polaroid banjo
					four dollar toast four loko williamsburg. Taxidermy ramps fap vegan
					bushwick pug, kickstarter scenester actually cornhole locavore man bun
					chambray. Post-ironic health goth austin mixtape mlkshk. Cold-pressed
					ennui messenger bag viral migas. Artisan freegan cold-pressed offal,
					flexitarian shabby chic polaroid banjo four dollar toast four loko
					williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
					scenester actually cornhole locavore man bun chambray. Post-ironic
					health goth austin mixtape mlkshk. Cold-pressed ennui messenger bag
					viral migas. Artisan freegan cold-pressed offal, flexitarian shabby
					chic polaroid banjo four dollar toast four loko williamsburg.
					Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
					cornhole locavore man bun chambray. Post-ironic health goth austin
					mixtape mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan
					freegan cold-pressed offal, flexitarian shabby chic polaroid banjo
					four dollar toast four loko williamsburg. Taxidermy ramps fap vegan
					bushwick pug, kickstarter scenester actually cornhole locavore man bun
					chambray. Post-ironic health goth austin mixtape mlkshk. Cold-pressed
					ennui messenger bag viral migas. Artisan freegan cold-pressed offal,
					flexitarian shabby chic polaroid banjo four dollar toast four loko
					williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
					scenester actually cornhole locavore man bun chambray. Post-ironic
					health goth austin mixtape mlkshk. Cold-pressed ennui messenger bag
					viral migas. Artisan freegan cold-pressed offal, flexitarian shabby
					chic polaroid banjo four dollar toast four loko williamsburg.
					Taxidermy ramps fap vegan bushwick pug, kickstarter scenester actually
					cornhole locavore man bun chambray. Post-ironic health goth austin
					mixtape mlkshk. Cold-pressed ennui messenger bag viral migas. Artisan
					freegan cold-pressed offal, flexitarian shabby chic polaroid banjo
					four dollar toast four loko williamsburg. Taxidermy ramps fap vegan
					bushwick pug, kickstarter scenester actually cornhole locavore man bun
					chambray. Post-ironic health goth austin mixtape mlkshk. Cold-pressed
					ennui messenger bag viral migas. Artisan freegan cold-pressed offal,
					flexitarian shabby chic polaroid banjo four dollar toast four loko
					williamsburg. Taxidermy ramps fap vegan bushwick pug, kickstarter
					scenester actually cornhole locavore man bun chambray.
				</section>
			);
		},
	});

	return <Component />;
};
TopOffset.storyName = 'TopOffset';
