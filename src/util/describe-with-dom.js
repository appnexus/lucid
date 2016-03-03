export default function describeWithDOM(name, func) {
	describe(`${name} (functional tests using ${window.realOrFake})`, func);
}

