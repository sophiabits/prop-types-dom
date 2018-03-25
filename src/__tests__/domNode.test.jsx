import React from 'react';

import callValidator from './lib/callValidator';
import createDom from './lib/createDom';

import domNode from '../domNode';

const assertFails = (validator, element, propName) => {
    const result = callValidator(validator, element, propName, '"domNode" tests');
    expect(result).toBeInstanceOf(Error);
}

const assertPasses = (validator, element, propName) => {
    const result = callValidator(validator, element, propName, '"domNode" test');
    expect(result).toBe(null);
};

describe('domNode', () => {
    it('passes when supplied null/undefined', () => {
        const dom = createDom();

        const elementNull = <div foo={null} />;
        const elementUndefined = <div />;

        assertPasses(domNode, elementNull, 'foo');
        assertPasses(domNode, elementUndefined, 'foo');
    });

    it('passes when supplied a DOM node', () => {
        const dom = createDom();
        const node = dom.window.document.createElement('div');

        const elementNode = <div foo={node} />;

        assertPasses(domNode, elementNode, 'foo');
    });

    it('fails when not supplied a DOM node', () => {
        const dom = createDom();

        const elementPlainObject = <div foo={{ }} />;
        const elementNumber = <div foo={5} />;

        assertFails(domNode, elementNumber, 'foo');
        assertFails(domNode, elementPlainObject, 'foo');
    });

    it('isRequired fails on undefined', () => {
        const dom = createDom();

        const elementUndefined = <div />;

        assertFails(domNode.isRequired, elementUndefined, 'foo');
    });

    it('isRequired passes on null', () => {
        const dom = createDom();

        const elementNull = <div foo={null} />;

        assertPasses(domNode.isRequired, elementNull, 'foo');
    });

    it('isRequired passes when passed a node', () => {
        const dom = createDom();
        const node = dom.window.document.createElement('div');

        const elementNode = <div foo={node} />;

        assertPasses(domNode.isRequired, elementNode, 'foo');
    })
});
