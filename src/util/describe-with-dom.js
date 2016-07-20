function describeWithDOM(name, func) {
	describe(`${name} (functional tests using ${window.realOrFake})`, func);
}

describeWithDOM.only = function (name, func) {
	describe.only(`${name} (functional tests using ${window.realOrFake})`, func);
};

export default describeWithDOM;
