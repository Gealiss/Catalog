import * as React from 'react';
import { connect } from 'react-redux';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Spinner, Alert } from 'reactstrap';
import { AlertItem } from '../AlertItem';
import { ApplicationState } from 'src/store/index';
import { Price } from 'src/store/prices/types';
import { parsePriceErrors } from 'src/store/prices/actions';
import * as AlertTypes from 'src/store/alert/types';
import { Get, Post } from 'src/utils/apiFetch';

import { ShopsState } from 'src/store/shops/types';
import { ItemsState } from 'src/store/items/types';

interface AddPriceModalState {
    isActionPending: boolean;
    isOpened: boolean;
    alerts: AlertTypes.Alert[] | null;
    price: Price;
}

type AddPriceModalProps = ShopsState & ItemsState;

class AddPriceModal extends React.Component<AddPriceModalProps, AddPriceModalState> {
    constructor(props: any) {
        super(props);

        this.state = {
            alerts: null,
            isActionPending: false,
            isOpened: false,
            price: {
                id: '',
                item_id: '',
                shop_id: '',
                dateTime: undefined,
                availability: false,
                price: 0.01
            }
        }
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createPrice = this.createPrice.bind(this);
    }

    toggle() {
        this.setState(state => ({ ...state, isOpened: !this.state.isOpened }));
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value, checked } = e.target;
        // For checkbox change
        if (e.target.type === "checkbox") {
            this.setState((state) => ({ ...state, price: { ...state.price, [name]: checked } }));
            return;
        }
        //Change value of edited field only, other state fields are same
        this.setState((state) => ({ ...state, price: { ...state.price, [name]: value } }));
    }

    handleSubmit() {
        if (this.state.price.shop_id === '') {
            alert("Please, select a shop");
            return;
        }
        let price: Price = this.state.price;
        this.createPrice(price);
    }

    render() {
        if (this.props.isShopsLoading) {
            alert("Shops is still loading");
            return;
        }
        // Set first shop id in state as default
        return (
            <div>
                <Button color="info" onClick={this.toggle} block>Add price</Button>
                <Modal isOpen={this.state.isOpened} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add price</ModalHeader>
                    <ModalBody>
                        {
                            this.state.alerts
                                ?
                                this.state.alerts.map((alert, i) => <AlertItem alert={alert} key={i} />)
                                :
                                null
                        }

                        <Label for="itemidInput">Item id:</Label>
                        <Input type="text" name="item_id" id="itemidInput" required placeholder="24 char string"
                            value={this.state.price.item_id} onChange={e => this.handleChange(e)} />

                        <Label for="itemShopInput">Shop:</Label>
                        <Input type="select" name="shop_id" id="itemShopInput"
                            value={this.state.price.shop_id} onChange={e => this.handleChange(e)}>
                            <option value=''>Select shop...</option>)
                            {
                                this.props.shops.map((shop, i) =>
                                    <option key={i} value={shop.id}>{shop.name}</option>)
                            }
                        </Input>

                        <Label for="itemPriceInput">Item price:</Label>
                        <Input type="number" name="price" id="itemPriceInput" required
                            placeholder="0.01 - 1000000000" step={0.01} min={0.01} max={1000000000.00}
                            value={this.state.price.price} onChange={e => this.handleChange(e)} />

                        <Label for="itemCheckBox">If available:</Label>
                        <input id="itemCheckBox" type="checkbox" name="availability"
                                checked={this.state.price.availability} onChange={e => this.handleChange(e)} />

                    </ModalBody>
                    <ModalFooter>
                        {
                            this.state.isActionPending ? <Spinner size="sm" color="primary" /> : null
                        }
                        <Button color="primary" onClick={this.handleSubmit}>Add</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

    createPrice(price: Price) {
        this.setState(state => ({ ...state, isActionPending: true }));
        Post('api/priceHistory', price)
            .then(res => {
                this.setState(state => ({ ...state, isActionPending: false }));
                if (res.isOk) {
                    let _price: Price = res.data as Price;
                    alert(`Added price ${_price.price} to item ${_price.item_id}`);
                    this.setState(state => ({ ...state, isOpened: false, alerts: null }));
                } else {
                    // Create alerts, set in state
                    let alerts = parsePriceErrors(res.data);
                    if (alerts.length == 0) {
                        alerts.push({
                            type: AlertTypes.AlertMessageTypes.error,
                            title: "Error " + res.status,
                            message: ["Some error occured."]
                        });
                    }
                    this.setState(state => ({ ...state, alerts: alerts }));
                }
            });
    }
}

export default connect(
    (state: ApplicationState) => ({ ...state.items, ...state.shops })
)(AddPriceModal);