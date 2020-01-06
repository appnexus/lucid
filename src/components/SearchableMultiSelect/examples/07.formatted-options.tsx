import React from 'react';
import _ from 'lodash';
import { SearchableMultiSelect } from '../../../index';

// eslint-disable-next-line react/prop-types
interface Props {
	match?: any
}
type P = Props & React.HTMLProps<HTMLParagraphElement> & React.HTMLAttributes<HTMLParagraphElement>;
function P({ 
	children,
	...rest
  }: P) {
	return (
	  <p 
		{...rest}
	  >
	   {children}     
	  </p>
	)
  }

const OptionCols: any = ({ col1, col2, textMatch }: {
	col1: string,
	col2: string,
	textMatch: string
}) => (
	<div style={{ display: 'flex' }}>
		<div style={{ width: 100 }}>
			<P match={textMatch}>{col1}</P>
		</div>
		<div>
			<P match={textMatch}>{col2}</P>
		</div>
	</div>
);

const optionFilter = (searchText: string, { filterText }: {
	filterText: string
}) => {
	if (filterText) {
		return new RegExp(_.escapeRegExp(searchText), 'i').test(filterText);
	}
	return true;
};

export default class extends React.Component {
	render() {
		return (
			<SearchableMultiSelect optionFilter={optionFilter}>
				<SearchableMultiSelect.OptionGroup Selected=''>
					<div style={{ marginLeft: 27 }}>
						<OptionCols col1='ID' col2='NAME' />
					</div>

					<SearchableMultiSelect.Option filterText='Foo' Selected='Foo (1234)'>
						{({ searchText }: { searchText: string} ) => (
							<OptionCols col1='1234' col2='Foo' textMatch={searchText} />
						)}
					</SearchableMultiSelect.Option>

					<SearchableMultiSelect.Option filterText='Bar' Selected='Bar (2345)'>
						{({ searchText }: { searchText: string}) => (
							<OptionCols col1='2345' col2='Bar' textMatch={searchText} />
						)}
					</SearchableMultiSelect.Option>

					<SearchableMultiSelect.Option filterText='Baz' Selected='Baz (3456)'>
						{({ searchText }: { searchText: string}) => (
							<OptionCols col1='3456' col2='Baz' textMatch={searchText} />
						)}
					</SearchableMultiSelect.Option>
				</SearchableMultiSelect.OptionGroup>
			</SearchableMultiSelect>
		);
	}
}
