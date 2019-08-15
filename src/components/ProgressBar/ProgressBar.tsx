import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { omitProps, getFirst, FC } from '../../util/component-types';

const cx = lucidClassNames.bind('&-ProgressBar');

const { number, string, oneOf, node } = PropTypes;

interface ITitleProps {
	children: React.ReactNode;
}

interface IProgressBarProps {
	/** Appended to the component-specific class names set on the root element. */
	className: string;

	/** Applies a color style for the kind of ProgressBar. */
	kind: 'default' | 'success' | 'danger' | 'info' | 'warning';

	/** Percentage ProgressBar is complete. */
	percentComplete: number;

	children: React.ReactNode;

	/** *Child Element* - Title contents. Only one \`Title\` is used. */
	Title: string | React.ReactNode & { props: ITitleProps };
}

interface IProgressBarFC extends FC<IProgressBarProps> {
	Title: Title;
}

const Title: FC<ITitleProps> = (props): null => null;
Title.propName = 'Title';
Title.peek = {
	description: `
		Content displayed at the top of the ProgressBar.
	`,
};

const ProgressBar: IProgressBarFC = (props): React.ReactElement => {
	const {
		kind = 'default',
		percentComplete = 0,
		className,
		...passThroughs
	} = props;

	const titleChildProp = _.get(getFirst(props, ProgressBar.Title), 'props', {});

	return (
		<div
			{...omitProps(passThroughs, undefined, _.keys(ProgressBar.propTypes))}
			className={cx('&', className, {
				'&-default': kind === 'default',
				'&-success': kind === 'success',
				'&-danger': kind === 'danger',
				'&-info': kind === 'info',
				'&-warning': kind === 'warning',
			})}
		>
			<title {...titleChildProp} className={cx('&-title')} />
			<div className={cx('&-bar-container')}>
				<div
					className={cx(`&-bar`, `&-bar-${kind}`, {
						[`&-bar-${kind}-is-pulsed`]: percentComplete < 100,
					})}
				/>
				<div
					className={cx(`&-bar-overlay`)}
					style={{ width: `${100 - percentComplete}%` }}
				/>
			</div>
		</div>
	);
};

ProgressBar.Title = Title;
ProgressBar.displayName = 'ProgressBar';
ProgressBar.peek = {
	description: `
				A Progress Bar component is used to indicate progress in a procedure
				consisting of numerous discrete steps or continuous operation.
			`,

	categories: ['communication'],
};
ProgressBar.propTypes = {
	className: string`
		Appended to the component-specific class names set on the root element.
	`,

	kind: oneOf(['default', 'success', 'danger', 'info', 'warning'])`
		Applies a color style for the kind of ProgressBar.
	`,

	percentComplete: number`
		Percentage ProgressBar is complete.
	`,

	children: node,

	Title: node`
		*Child Element* - Title contents. Only one \`Title\` is used.
	`,
};

export default ProgressBar;
