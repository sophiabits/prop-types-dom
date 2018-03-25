const domNode = (props, propName, componentName) => {
    const value = props[propName];

    if (value == null) {
        return null;
    }

    // TODO: how should this work during SSR?
    if (!(props[propName] instanceof Element)) {
        return new TypeError(`${componentName}: ${propName} must be a DOM node, but received a '${typeof value}' instead.`);
    }

    return null;
}

domNode.isRequired = (props, propName, componentName) => {
    if (props[propName] === undefined) {
        return new TypeError(`${componentName}: ${propName} must be a DOM node, but received null or undefined.`)
    }

    return domNode(props, propName, componentName);
};

export default domNode;
