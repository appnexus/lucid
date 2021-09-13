import React from 'react';
import { SingleSelect } from '../../../index';

// eslint-disable-next-line react/prop-types
const OptionCols = ({ col1, col2 }: { col1: string; col2: string }) => (
	<div style={{ display: 'flex' }}>
		<div style={{ width: 100 }}>{col1}</div>
		<div>{col2}</div>
	</div>
);

export default class extends React.Component {
	render() {
		return (
			<SingleSelect>
				<SingleSelect.OptionGroup>
					<OptionCols col1='ID' col2='NAME' />

					<SingleSelect.Option Selected='Foo (1234)'>
						<OptionCols col1='1234' col2='Foo' />
					</SingleSelect.Option>

					<SingleSelect.Option Selected='Bar (2345)'>
						<OptionCols col1='2345' col2='Bar' />
					</SingleSelect.Option>

					<SingleSelect.Option Selected='Baz (3456)'>
						<OptionCols col1='3456' col2='Baz' />
					</SingleSelect.Option>
				</SingleSelect.OptionGroup>
			</SingleSelect>
		);
	}
}

// begin-hide-from-docs
export let notes = `
This allows you to have multiple columns of data in your dropdown. Use this when additional data is needed to make a selection.
`;
// end-hide-from-docs
