# prop-types-dom

React PropTypes validators for DOM nodes.

    - `domNode`: Ensure the prop has been supplied a DOM node, `undefined`, or `null`.
    - `domNode.isRequired`: Ensure the prop has been supplied a DOM node or `null`.
    - `domNodeOf(type: string)`: Ensure the prop has been supplied a DOM node with the specified HTML tag, `undefined`, or `null`.
    - `domNodeOf(type: string).isRequired`: Ensure the prop has been supplied a DOM node with the specified HTML tag or `null`.

`isRequired` variants allow `null` to be provided in order to prevent warnings from being emitted during initial render when passing a ref.
