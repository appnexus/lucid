import _, { omit } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import { lucidClassNames } from '../../util/style-helpers';
import { getFirst, StandardProps } from '../../util/component-types';
import Switch from '../Switch/Switch';
import { useState } from 'react';
import { useEffect } from 'react';

const cx = lucidClassNames.bind('&-SwitchLabeled');
const { any, node, object, string } = PropTypes;

const defaultProps = {
	isDisabled: false,
	isSelected: false,
	onSelect: _.noop,
};

const defaultState = {
	_labelKey: 0,
};

export interface ISwitchLabeledProps extends StandardProps {
	isDisabled: boolean;
	isSelected: boolean;
	onSelect: any;
}

const SwitchLabeled = (props: ISwitchLabeledProps) => {
	const {
		className,
		isDisabled,
		isSelected,
		onSelect,
		style,
		...passThroughs
	} = props;

	const [state, setState] = useState(defaultState);

	const currentLabel = _.get(
		getFirst(props, SwitchLabeled.Label),
		'props.children',
		null
	);

	useEffect(() => {
		setState({ _labelKey: state._labelKey + 1 });
	}, [currentLabel]);

	const labelChildProps = _.get(getFirst(props, SwitchLabeled.Label), 'props');

	const isShown = !!labelChildProps;

	return (
		<label
			className={cx(
				'&',
				{
					'&-is-disabled': isDisabled,
					'&-is-selected': isSelected,
				},
				className
			)}
			style={style}
		>
			<Switch
				className={className}
				isDisabled={isDisabled}
				isSelected={isSelected}
				onSelect={onSelect}
				{...omit(
					passThroughs,
					[
						'className',
						'style',
						'Label',
						'isDisabled',
						'isSelected',
						'onSelect',
						'isIncludeExclude',
					].concat('initialState')
				)}
			/>
			{labelChildProps && (
				<CSSTransition
					in={isShown}
					classNames={cx('&-text')}
					timeout={100}
					style={{ position: 'relative' }}
					className={cx('&-text')}
					unmountOnExit
				>
					<span key={state._labelKey}>
						{labelChildProps.children || labelChildProps}
					</span>
				</CSSTransition>
			)}
		</label>
	);
};

SwitchLabeled.defaultProps = defaultProps;

SwitchLabeled.displayName = 'SwitchLabeled';

SwitchLabeled.peek = {
	description: `A composite of the \`Switch\` component and the native \`label\` element.`,
	categories: ['controls', 'toggles'],
	madeFrom: ['Switch'],
};

const Label = () => {
	return null;
};

Label.displayName = 'SwitchLabeled.Label';

Label.peek = {
	description: `Label to be shown alongside the \`Switch\`.`,
};

Label.propName = 'Label';

Label.propTypes = {
	/**
		Used to identify the purpose of this switch to the user -- can be any
		renderable content.
	*/
	children: node,
};

SwitchLabeled.propTypes = {
	...Switch.propTypes,

	/**
		Appended to the component-specific class names set on the root element.
	*/
	className: string,

	/**
		Passed through to the root element.
	*/
	style: object,

	/**
		Child element whose children are used to identify the purpose of this
		switch to the user.
	*/
	Label: any,
};

SwitchLabeled.Label = Label;

export default SwitchLabeled;
