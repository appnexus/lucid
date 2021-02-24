import React from 'react';
import { shallow } from 'enzyme';
import { common } from '../../util/generic-tests';
import ProgressBar from './ProgressBar';

describe('ProgressBar', () => {
	common(ProgressBar, {
		selectRoot: (wrapper: any) => wrapper.find('.lucid-ProgressBar'),
	} as any);

	describe('render', () => {
		it('should render a ProgressBar', () => {
			const wrapper = shallow(<ProgressBar />);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('props', () => {
		describe('kind', () => {
			it('should match snapshot for default', () => {
				expect(shallow(<ProgressBar kind='default' />)).toMatchSnapshot();
			});

			it('should match snapshot for success', () => {
				expect(shallow(<ProgressBar kind='success' />)).toMatchSnapshot();
			});

			it('should match snapshot for warning', () => {
				expect(shallow(<ProgressBar kind='warning' />)).toMatchSnapshot();
			});

			it('should match snapshot for danger', () => {
				expect(shallow(<ProgressBar kind='danger' />)).toMatchSnapshot();
			});

			it('should match snapshot for info', () => {
				expect(shallow(<ProgressBar kind='info' />)).toMatchSnapshot();
			});
		});

		describe('percentComplete', () => {
			it('should display length of ProgressBar', () => {
				expect(shallow(<ProgressBar percentComplete={75} />)).toMatchSnapshot();
			});
		});
	});

	describe('childComponents', () => {
		describe('Title', () => {
			it('should render a header', () => {
				expect(
					shallow(
						<ProgressBar>
							<ProgressBar.Title>Title</ProgressBar.Title>
						</ProgressBar>
					)
				).toMatchSnapshot();
			});
		});
	});
});
