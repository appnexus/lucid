import { shallow } from 'enzyme';
import React from 'react';
import { common } from '../../util/generic-tests';
import InfiniteSlidePanel from './InfiniteSlidePanel';

describe('InfiniteSlidePanel', () => {
	common(InfiniteSlidePanel, {
		getDefaultProps() {
			return {
				children: slideOffset => <span>{slideOffset}</span>,
			};
		},
	});

	describe('required children', () => {
		it('should throw if not passed a function or Slide as children', () => {
			expect(() => {
				shallow(<InfiniteSlidePanel />);
			}).toThrowErrorMatchingSnapshot();
		});

		it('should throw if child slide not passed a function child', () => {
			expect(() => {
				shallow(
					<InfiniteSlidePanel>
						<InfiniteSlidePanel.Slide>
							foo
						</InfiniteSlidePanel.Slide>
					</InfiniteSlidePanel>
				);
			}).toThrowErrorMatchingSnapshot();
		});

		it('should not throw if passed a Slide child element with function child', () => {
			expect(() => {
				shallow(
					<InfiniteSlidePanel>
						<InfiniteSlidePanel.Slide>
							{() => null}
						</InfiniteSlidePanel.Slide>
					</InfiniteSlidePanel>
				);
			}).not.toThrow();
		});

		it('should not throw if passed a function child', () => {
			expect(() => {
				shallow(
					<InfiniteSlidePanel>
						{() => null}
					</InfiniteSlidePanel>
				);
			}).not.toThrow();
		});
	});
});
