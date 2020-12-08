import * as React from 'react';
import * as ItemsStore from '../store/items/types';

interface ItemProviderProps {
    item: ItemsStore.Item;
}

//interface ItemProviderState {
//    readonly item: ItemsStore.Item;
//}

export class ItemComponent extends React.Component<ItemProviderProps> {
    render() {
        let img: string = this.props.item.img == null || this.props.item.img === ''
            ? "/roflan.png" : this.props.item.img;
        return (
            <>
                <div className="col mb-3">
                    <div className="card h-100" id={this.props.item.id}>
                        <img src={img} className="card-img-top" alt="..."></img>
                        <div className="card-body">
                            <h5 className="card-title">{this.props.item.name}</h5>
                            <p className="card-text">{this.props.item.description}</p>
                        </div>
                        <div className="card-footer">
                            <small className="text-muted">Price</small>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}