import Example from './1.basic.jsx';
import { Accordion } from '../../../index';

Example.peek = {
	exampleOf: Accordion,
	title: 'Basic Accordian',
	description: `
		This example show the basic usage of an Accordion component.
	`,
	position: 1,
	sourceCodeFile: './1.basic.jsx',
	code: code =>
		code.replace(
			`import { Accordion } from '../../../index';`,
			`import Accordion from 'lucid-ui/Accordion';`
		),
};

export default Example;
