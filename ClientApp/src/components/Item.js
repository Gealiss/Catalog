import * as React from 'react';
//interface ItemProviderState {
//    readonly item: ItemsStore.Item;
//}
export class ItemComponent extends React.Component {
    render() {
        let img = this.props.item.img == null || this.props.item.img === ''
            ? "/roflan.png" : this.props.item.img;
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "col mb-3" },
                React.createElement("div", { className: "card h-100", id: this.props.item.id },
                    React.createElement("img", { src: img, className: "card-img-top", alt: "..." }),
                    React.createElement("div", { className: "card-body" },
                        React.createElement("h5", { className: "card-title" }, this.props.item.name),
                        React.createElement("p", { className: "card-text" }, this.props.item.description)),
                    React.createElement("div", { className: "card-footer" },
                        React.createElement("small", { className: "text-muted" }, "Price"))))));
    }
}
//# sourceMappingURL=Item.js.map