import React from 'react';
import createClass from 'create-react-class';
import { LoadingIcon, SearchFieldDumb as SearchField } from '../../../index';

export default createClass({
	render() {
		return (
			<div>
				<SearchField value="foo" />
				<SearchField placeholder="bar" />
				<SearchField isDisabled />
				<SearchField isValid={false} />
				<SearchField>
					<SearchField.Icon>
						<LoadingIcon />
					</SearchField.Icon>
				</SearchField>
				<SearchField value="foo">
					<SearchField.Icon>
						<LoadingIcon />
					</SearchField.Icon>
				</SearchField>
				<SearchField>
					<SearchField.TextField value="bar" />
				</SearchField>
			</div>
		);
	},
});
