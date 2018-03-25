function noop() {
    return undefined;
}
noop.isRequired = noop;
function noopThunk() {
    return noop;
}

module.exports = {
    domNode: noop,
    domNodeOf: noopThunk,
};
