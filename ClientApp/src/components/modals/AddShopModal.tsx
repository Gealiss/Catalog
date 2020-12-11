import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Spinner, Alert } from 'reactstrap';
import { AlertItem } from '../AlertItem';

import { Shop, ShopModelErrors } from 'src/store/shops/types';
import { parseShopErrors } from 'src/store/shops/actions';
import * as AlertTypes from 'src/store/alert/types';
import { Get, Post } from 'src/utils/apiFetch';

interface AddItemModalState {
    isActionPending: boolean;
    isOpened: boolean;
    alerts: AlertTypes.Alert[] | null;
    shop: Shop;
}

export class AddShopModal extends React.Component<{}, AddItemModalState> {
    constructor(props: any) {
        super(props);

        this.state = {
            alerts: null,
            isActionPending: false,
            isOpened: false,
            shop: {
                id: '', name: '', description: ''
            }            
        }
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createShop = this.createShop.bind(this);
    }

    toggle() {
        this.setState(state => ({ ...state, isOpened: !this.state.isOpened }));
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        //Change value of edited field only, other state fields are same
        this.setState((state) => ({ ...state, shop: { ...state.shop, [name]: value } }));
    }

    handleSubmit() {
        if (this.state.shop.name === '') {
            alert("Shop name can not be null");
            return;
        }
        let item: Shop = this.state.shop;
        this.createShop(item);
    }

    render() {
        return (
            <div>
                <Button color="success" onClick={this.toggle} block>Add</Button>
                <Modal isOpen={this.state.isOpened} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add shop</ModalHeader>
                    <ModalBody>
                        {
                            this.state.alerts
                                ?
                                this.state.alerts.map((alert, i) => <AlertItem alert={alert} key={i} />)
                                :
                                null
                        }

                        <Label for="shopNameInput">Shop name:</Label>
                        <Input type="text" name="name" id="shopNameInput" required
                            value={this.state.shop.name} onChange={e => this.handleChange(e)} />

                        <Label for="itemDescriptionInput">Shop description:</Label>
                        <Input type="text" name="description" id="itemDescriptionInput"
                            value={this.state.shop.description || ''} onChange={e => this.handleChange(e)} />

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

    createShop(shop: Shop) {
        this.setState(state => ({ ...state, isActionPending: true }));
        Post('api/shops', shop)
            .then(res => {
                this.setState(state => ({ ...state, isActionPending: false }));
                if (res.isOk) {
                    let _shop: Shop = res.data as Shop;
                    alert(`Created shop ${_shop.name}, id: ${_shop.id}`);
                    this.setState(state => ({ ...state, isOpened: false, alerts: null }));
                } else {
                    // Create alerts, set in state
                    let alerts = parseShopErrors(res.data);
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