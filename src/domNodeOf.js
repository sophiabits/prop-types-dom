const domNodeOf = (elementType) => {
    if (typeof elementType !== 'string') {
        throw new TypeError(`domNodeOf: must be supplied an element tag (string)`);
    }

    const validatorType = elementType.toUpperCase();

    const domNodeOfValidator = (props, propName, componentName) => {
        const value = props[propName];

        if (value == null) {
            return null;
        }

        if (!(value instanceof Element)) {
            return new TypeError(`${componentName}: ${propName} must be a ${elementType} DOM node, but received a '${typeof value}' instead.`);
        }

        if (value.tagName !== validatorType) {
            return new TypeError(`${componentName}: ${propName} must be a ${elementType} DOM node, but received a '${value.tagName.toLowerCase()}' node instead.`);
        }

        return null;
    };

    domNodeOfValidator.isRequired = (props, propName, componentName) => {
        if (props[propName] === undefined) {
            return new TypeError(`${componentName}: ${propName} must be a ${elementType} DOM node, but received null or undefined.`)
        }

        return domNodeOfValidator(props, propName, componentName);
    };

    return domNodeOfValidator;
};

export default domNodeOf;
