import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Spinner, InputGroup, InputGroupAddon } from 'reactstrap';
import { AlertItem } from '../AlertItem';

import { ApplicationState } from 'src/store/index';
import { Shop, ShopsState } from 'src/store/shops/types';
import { parseShopErrors } from 'src/store/shops/actions';
import * as AlertTypes from 'src/store/alert/types';
import { Put, Delete } from 'src/utils/apiFetch';

interface UpdateShopModalState {
    isActionPending: boolean;
    isOpened: boolean;
    alerts: AlertTypes.Alert[] | null;
    shop: Shop;
}

type UpdateShopModalProps = ShopsState;

class UpdateShopModal extends React.Component<UpdateShopModalProps, UpdateShopModalState> {
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
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateShop = this.updateShop.bind(this);
        this.deleteShop = this.deleteShop.bind(this);
    }

    toggle() {
        this.setState(state => ({ ...state, isOpened: !this.state.isOpened }));
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        //Change value of edited field only, other state fields are same
        this.setState((state) => ({ ...state, shop: { ...state.shop, [name]: value } }));
    }

    handleSelect(e: React.ChangeEvent<HTMLInputElement>) {
        // For select tag get shop from props by selected id
        const { value } = e.target;
        let shop = this.props.shops.find(shop => shop.id === value);

        this.setState((state) => ({
            ...state, shop:
                { id: value, name: shop?.name || '', description: shop?.description || '' }
        }));
    }

    handleSubmit() {
        // Check if shop id is 24 chars length
        if (this.state.shop.id.length !== 24) {
            alert("Shop id is empty or not exactly 24 chars long.")
            return;
        }
        if (this.state.shop.name.length < 3 || this.state.shop.name.length > 50) {
            alert("Shop must have a name. 3-50 chars.")
            return;
        }
        let item: Shop = this.state.shop;
        this.updateShop(item);
    }

    render() {
        if (this.props.isShopsLoading) {
            alert("Shops is still loading");
            return;
        }
        return (
            <div>
                <Button color="warning" onClick={this.toggle} block>Update</Button>
                <Modal isOpen={this.state.isOpened} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Update shop</ModalHeader>
                    <ModalBody>
                        {
                            this.state.alerts
                                ?
                                this.state.alerts.map((alert, i) => <AlertItem alert={alert} key={i} />)
                                :
                                null
                        }

                        <Label for="shopIdInput">Shop:</Label>
                        <Input type="select" name="id" id="shopIdInput"
                            value={this.state.shop.id} onChange={e => this.handleSelect(e)}>
                            <option value=''>Select shop...</option>)
                            {
                                this.props.shops.map((shop, i) =>
                                    <option key={i} value={shop.id}>{shop.name}</option>)
                            }
                        </Input>

                        <Label for="shopNameInput">New shop name:</Label>
                        <Input type="text" name="name" id="shopNameInput" required
                            value={this.state.shop.name} onChange={e => this.handleChange(e)} />

                        <Label for="shopDescriptionInput">Item description:</Label>
                        <Input type="text" name="description" id="shopDescriptionInput"
                            value={this.state.shop.description} onChange={e => this.handleChange(e)} />

                    </ModalBody>
                    <ModalFooter>
                        {
                            this.state.isActionPending ? <Spinner size="sm" color="primary" /> : null
                        }
                        <Button color="danger" onClick={this.deleteShop}>Delete</Button>
                        <Button color="primary" onClick={this.handleSubmit}>Update</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

    deleteShop() {
        // Check if shop id is 24 chars length
        if (this.state.shop.id.length !== 24) {
            alert("Shop id must be exactly 24 chars long.")
            return;
        }
        this.setState(state => ({ ...state, isActionPending: true }));

        Delete(`api/shops/${this.state.shop.id}`)
            .then(res => {
                this.setState(state => ({ ...state, isActionPending: false }));

                if (res.isOk) {
                    alert(`Shop was deleted ${this.state.shop.name}, id: ${this.state.shop.id}`);
                    this.setState(state => ({ ...state, isOpened: false, alerts: null }));
                } else if (res.status == 400) {
                    // If badrequest response
                    let alerts = parseShopErrors(res.data);
                    if (alerts.length == 0) {
                        alerts.push({
                            type: AlertTypes.AlertMessageTypes.error,
                            title: "Error " + res.status,
                            message: ["Some error occured."]
                        });
                    }
                    this.setState(state => ({ ...state, alerts: alerts }));
                } else {
                    // If other error response
                    let alerts: AlertTypes.Alert[] = [
                        {
                            type: AlertTypes.AlertMessageTypes.error,
                            title: "Error " + res.status,
                            message: ["Some error occured."]
                        }
                    ];
                    this.setState(state => ({ ...state, alerts: alerts }));
                }
            });
    }

    updateShop(shop: Shop) {
        this.setState(state => ({ ...state, isActionPending: true }));

        Put(`api/shops/${this.state.shop.id}`, shop)
            .then(res => {
                this.setState(state => ({ ...state, isActionPending: false }));

                if (res.isOk) {
                    alert(`Shop was updated ${shop.name}, id: ${shop.id}`);
                    this.setState(state => ({ ...state, isOpened: false, alerts: null }));
                } else if (res.status == 400) {
                    // If badrequest response
                    let alerts = parseShopErrors(res.data);
                    if (alerts.length == 0) {
                        alerts.push({
                            type: AlertTypes.AlertMessageTypes.error,
                            title: "Error " + res.status,
                            message: ["Some error occured."]
                        });
                    }
                    this.setState(state => ({ ...state, alerts: alerts }));
                } else {
                    // If other error response
                    let alerts: AlertTypes.Alert[] = [
                        {
                            type: AlertTypes.AlertMessageTypes.error,
                            title: "Error " + res.status,
                            message: ["Some error occured."]
                        }
                    ];
                    this.setState(state => ({ ...state, alerts: alerts }));
                }
            });
    }
}

export default connect(
    (state: ApplicationState) => ({ ...state.shops })
)(UpdateShopModal);