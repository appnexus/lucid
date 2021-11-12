// Required for all new components
import { common } from '../../util/generic-tests';
import ExampleComponent from './ExampleComponent';

describe('ExampleComponent', () => {
	//Some of our component conventions can be validated by running the `common` tests.
	common(ExampleComponent, { noExport: true });

	// Other tests...
});
