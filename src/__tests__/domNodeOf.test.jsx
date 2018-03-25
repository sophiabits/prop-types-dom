import React from 'react';

import callValidator from './lib/callValidator';
import createDom from './lib/createDom';

import domNodeOf from '../domNodeOf';

const assertFails = (validator, element, propName) => {
    const result = callValidator(validator, element, propName, '"domNodeOf" tests');
    expect(result).toBeInstanceOf(Error);
}

const assertPasses = (validator, element, propName) => {
    const result = callValidator(validator, element, propName, '"domNodeOf" test');
    expect(result).toBe(null);
};

describe('domNodeOf', () => {
    it('throws when not passed a tag type', () => {
        expect(() => domNodeOf()).toThrowError(TypeError);
        expect(() => domNodeOf(5)).toThrowError(TypeError);
        expect(() => domNodeOf({})).toThrowError(TypeError);
    });

    it('returns a validator when supplied a tag type', () => {
        expect(domNodeOf('div')).toBeInstanceOf(Function);
        expect(domNodeOf('div').isRequired).toBeInstanceOf(Function);
    });

    it('passes when supplied null/undefined', () => {
        const dom = createDom();
        const validator = domNodeOf('div');

        const elementNull = <div foo={null} />;
        const elementUndefined = <div />;

        assertPasses(validator, elementNull, 'foo');
        assertPasses(validator, elementUndefined, 'foo');
    });

    it('passes when supplied a DOM node of the correct type', () => {
        const dom = createDom();
        const validator = domNodeOf('div');
        const node = dom.window.document.createElement('div');

        const elementNode = <div foo={node} />;

        assertPasses(validator, elementNode, 'foo');
    });

    it('fails when not supplied a DOM node', () => {
        const dom = createDom();
        const validator = domNodeOf('div');

        const elementPlainObject = <div foo={{ }} />;
        const elementNumber = <div foo={5} />;

        assertFails(validator, elementNumber, 'foo');
        assertFails(validator, elementPlainObject, 'foo');
    });

    it('fails when passed a DOM node of incorrect type', () => {
        const dom = createDom();
        const node = dom.window.document.createElement('span');
        const validator = domNodeOf('div');

        const elementWrongNode = <div foo={node} />;

        assertFails(validator, elementWrongNode, 'foo');
    });

    it('isRequired fails on undefined', () => {
        const dom = createDom();
        const validator = domNodeOf('div').isRequired;

        const elementUndefined = <div />;

        assertFails(validator, elementUndefined, 'foo');
    });

    it('isRequired passes on null', () => {
        const dom = createDom();
        const validator = domNodeOf('div').isRequired;

        const elementNull = <div foo={null} />;

        assertPasses(validator, elementNull, 'foo');
    });

    it('isRequired passes when supplied a DOM node of correct type', () => {
        const dom = createDom();
        const node = dom.window.document.createElement('div');
        const validator = domNodeOf('div').isRequired;

        const elementNode = <div foo={node} />;

        assertPasses(validator, elementNode, 'foo');
    });
});
