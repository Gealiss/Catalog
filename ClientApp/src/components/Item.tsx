import * as React from 'react';
import { Item } from '../store/items/types';
import { Price } from '../store/prices/types';
import { Get, Post } from 'src/utils/apiFetch';
import { Badge, Col, Row, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';

interface ItemComponentProps {
    item: Item;
}

interface ItemComponentState {
    isPriceLoading: boolean;
    itemPrice: Price | null;
}

export class ItemComponent extends React.Component<ItemComponentProps, ItemComponentState> {
    _isMounted: boolean;

    constructor(props: ItemComponentProps) {
        super(props);
        this.state = { isPriceLoading: false, itemPrice: null };
        this._isMounted = false;

        this.loadPrice = this.loadPrice.bind(this);
    }
    componentDidMount() {
        this._isMounted = true;
        this._isMounted && this.loadPrice();
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        let img: string = this.props.item.img == null || this.props.item.img === ''
            ? "/roflan.png" : this.props.item.img;
        // TODO: if all item prices are null
        return (
            <>
                <div className="col mb-3">
                    <div className="card h-100" id={this.props.item.id}>
                        <img src={img} className="card-img-top" alt="..."></img>
                        <div className="card-body">
                            <Link to={`item/${this.props.item.id}`}>
                                <h5 className="card-title">{this.props.item.name}</h5>
                            </Link>
                            {
                                this.state.itemPrice?.availability
                                    ? <Badge color="success">In stock</Badge>
                                    : <Badge color="secondary">Out of stock</Badge>
                            }
                            <p className="card-text">{this.props.item.description}</p>
                        </div>
                        <div className="card-footer">
                            <Row>
                                <Col>
                                    <small>Price from:</small>
                                </Col>

                                <Col>
                                    {
                                        this.state.isPriceLoading
                                            ? <Spinner size="sm" color="primary" /> : null
                                    }
                                    {
                                        this.state.itemPrice?.price
                                            ?
                                            <b>{this.state.itemPrice.price}</b>
                                            :
                                            <small>no info</small>
                                    }
                                </Col>
                            </Row>
                            
                        </div>
                    </div>
                </div>
            </>
        );
    }

    loadPrice() {
        this._isMounted && this.setState((state) => ({ ...state, isPriceLoading: true }));
        Get(`/api/priceHistory/minPrice/${this.props.item.id}`)
            .then(res => {
                this._isMounted && this.setState((state) => ({ ...state, isPriceLoading: false }));

                let itemPrice: Price = res.data as Price;
                if (res.isOk) {
                    this._isMounted && this.setState((state) => ({ ...state, itemPrice: itemPrice }));
                } else {
                    this._isMounted && this.setState((state) => ({ ...state, itemPrice: null }));
                }
            });
    }
}