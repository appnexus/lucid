import React from 'react';

export default React.createClass({
	render() {
		return (
			<section>
				<section className="Grid-is-vertical">
					<article className="Grid-cell-is-third"></article>
					<article></article>
				</section>
				<section className="Grid-is-multiline">
					<article className="Grid-cell-is-half"></article>
					<article className="Grid-cell-is-quarter"></article>
					<article></article>
					<article className="Grid-cell-is-full"></article>
				</section>
				<section className="Grid-is-gutterless">
					<article className="Grid-cell-is-2"></article>
					<article className="Grid-cell-is-3"></article>
					<article className="Grid-cell-is-4"></article>
					<article className="Grid-cell-is-5"></article>
					<article className="Grid-cell-is-6"></article>
					<article className="Grid-cell-is-7"></article>
					<article className="Grid-cell-is-8"></article>
					<article className="Grid-cell-is-9"></article>
					<article className="Grid-cell-is-10"></article>
					<article className="Grid-cell-is-11"></article>
				</section>
			</section>
		);
	}
});
