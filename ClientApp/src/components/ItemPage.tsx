import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { ApplicationState } from '../store/index';
import { Redirect } from 'react-router-dom';

import { Item, ItemPrice, ItemsState } from '../store/items/types';
import * as ItemActionCreators from '../store/items/actions';
import { Get, Post } from 'src/utils/apiFetch';

import { Badge, Col, Row, Spinner } from 'reactstrap';

interface ItemPageState {
    isPricesLoading: boolean;
    itemPrices: ItemPrice[] | null;
}

type ItemPageProps = ItemsState & typeof ItemActionCreators & RouteComponentProps<{ itemId: string }>;

class ItemPage extends React.Component<ItemPageProps, ItemPageState> {
    item: Item | undefined;

    constructor(props: any) {
        super(props);
        this.state = { isPricesLoading: false, itemPrices: null };

        // Try to get item by provided id
        this.item = undefined;
        this.loadPrices = this.loadPrices.bind(this);
    }

    componentDidMount() {
        this.loadPrices();
    }

    public render() {
        if (this.props.isLoading) {
            return <> Loading... <Spinner size="xl" color="primary" /> </>
        }

        this.item = this.props.items.find(item => item.id == this.props.match.params.itemId);
        if (!this.item) {
            return <Redirect to="/" />;
        }

        let img: string = !this.item.img || this.item.img === ''
            ? "/roflan.png" : this.item.img;
        return (
            <>
                <Row>
                    <Col>
                        <img src={ img } className="img-fluid" alt="Item image" />
                    </Col>

                    <Col>
                        <h2>{this.item.name} <Badge color="info">{this.item.category_name}</Badge></h2>
                        <h3>Prices:</h3>
                        {
                            this.state.isPricesLoading ? <Spinner size="sm" color="primary" /> : null
                        }
                        {
                            this.state.itemPrices
                                ?
                                this.state.itemPrices.map((price, i) =>
                                    <Row key={i}>
                                        <Col>
                                            <p>{price.shop}</p>
                                        </Col>

                                        <Col>
                                            <b>{price.price}</b>
                                        </Col>

                                        <Col>
                                            {
                                                price.availability
                                                    ? <Badge color="success">In stock</Badge>
                                                    : <Badge color="secondary">Out of stock</Badge>
                                            }
                                        </Col>
                                    </Row>
                                    )
                                : <small>no info</small>
                        }
                        
                        <hr />
                        <p>{this.item.description}</p>
                    </Col>
                </Row>
            </>
        );
    }

    public loadPrices() {
        this.setState((state) => ({ ...state, isPricesLoading: true }));
        Get(`/api/priceHistory/prices/${this.props.match.params.itemId}`)
            .then(res => {
                this.setState((state) => ({ ...state, isPricesLoading: false }));

                let itemPrices: ItemPrice[] = res.data as ItemPrice[];
                if (res.isOk) {
                    this.setState((state) => ({ ...state, itemPrices: itemPrices }));
                } else {
                    this.setState((state) => ({ ...state, itemPrices: null }));
                }
            });
    }
}

export default connect(
    (state: ApplicationState) => state.items,
    ItemActionCreators
)(ItemPage);