import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { getFirst, StandardProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-ProgressBar');

const { number, string, oneOf, node } = PropTypes;

export interface ITitleProps extends StandardProps {}

export interface IProgressBarProps
	extends StandardProps,
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		> {
	/** Applies a color style for the kind of ProgressBar. */
	kind: 'default' | 'success' | 'danger' | 'info' | 'warning';

	/** Percentage ProgressBar is complete. */
	percentComplete: number;

	/** *Child Element* - Title contents. Only one \`Title\` is used. */
	Title?: string | (React.ReactNode & { props: ITitleProps });
}

const Title = (_props: ITitleProps): null => null;
Title.displayName = 'ProgressBar.Title';
Title.propName = 'Title';
Title.peek = {
	description: `Content displayed at the top of the \`ProgressBar\`.`,
};

const defaultProps = {
	kind: 'default' as const,
	percentComplete: 0,
};

export const ProgressBar = (props: IProgressBarProps): React.ReactElement => {
	const { kind, percentComplete, className, ...passThroughs } = props;

	const titleChildProp = _.get(getFirst(props, ProgressBar.Title), 'props', {});

	return (
		<div
			{...passThroughs}
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

ProgressBar.defaultProps = defaultProps;
ProgressBar.Title = Title;
ProgressBar.displayName = 'ProgressBar';
ProgressBar.peek = {
	description: `A \`ProgressBar\` is used to indicate progress in a procedure consisting of numerous discrete steps or continuous operation.`,
	categories: ['communication'],
};
ProgressBar.propTypes = {
	/**
		Appended to the component-specific class names set on the root element.
	*/
	className: string,

	/**
		Applies a color style for the kind of ProgressBar.
	*/
	kind: oneOf(['default', 'success', 'danger', 'info', 'warning']),

	/**
		Percentage ProgressBar is complete.
	*/
	percentComplete: number,

	children: node,

	/*
	 *Child Element* - Title contents. Only one \`Title\` is used.
	 */
	Title: node,
};

export default ProgressBar;
