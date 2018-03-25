const { JSDOM } = require('jsdom');

/**
 * Creates a new JSDOM instance and patches the global environment.
 */
export default function createDom() {
    const dom = new JSDOM('');
    global.Element = dom.window.Element;
    global.document = dom.window.document;
    global.window = dom.window;
    global.navigator = {
        userAgent: 'node.js',
    };

    return dom;
}
