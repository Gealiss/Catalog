import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Spinner, Alert, InputGroup, InputGroupAddon } from 'reactstrap';
import { AlertItem } from '../AlertItem';

import { ApplicationState } from 'src/store/index';
import { Item, ItemsState, ItemModelErrors } from 'src/store/items/types';
import { parseItemErrors } from 'src/store/items/actions';
import * as AlertTypes from 'src/store/alert/types';
import { Put, Delete } from 'src/utils/apiFetch';

interface UpdateItemModalState {
    isActionPending: boolean;
    isOpened: boolean;
    alerts: AlertTypes.Alert[] | null;
    id: string;
    name: string;
    category_name: string;
    description: string;
    img: string;
}

class UpdateItemModal extends React.Component<ItemsState, UpdateItemModalState> {
    constructor(props: any) {
        super(props);

        this.state = {
            alerts: null,
            isActionPending: false,
            isOpened: false,
            id: '', name: '', category_name: '', description: '', img: ''
        }
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.loadItem = this.loadItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    toggle() {
        this.setState(state => ({ ...state, isOpened: !this.state.isOpened }));
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        //Change value of edited field only, other state fields are same
        this.setState((state) => ({ ...state, [name]: value }));
    }

    handleSubmit() {
        // Check if item id is 24 chars length
        if (this.state.id.length != 24) {
            alert("Item id must be exactly 24 chars long.")
            return;
        }
        let item: Item = {
            id: this.state.id,
            name: this.state.name,
            category_name: this.state.category_name,
            description: this.state.description === '' ? undefined : this.state.description,
            img: this.state.img === '' ? undefined : this.state.img
        };
        this.updateItem(item);
    }

    loadItem() {
        // If items is still loading or loaded, but empty
        if (this.props.isLoading || this.props.items.length == 0) {
            alert("No items, or still loading.")
            return;
        }
        // Search item in global state by id from state
        let item: Item | undefined = this.props.items.find(item => item.id == this.state.id);
        if (!item) {
            alert("No item was found.")
            return;
        }
        // Set found item to state
        this.setState(state => (
            {
                ...state,
                name: item?.name ? item.name : '',
                category_name: item?.category_name ? item.category_name : '',
                description: item?.description ? item.description : '',
                img: item?.img ? item.img : ''
            })
        );
    }

    render() {
        return (
            <div>
                <Button color="warning" onClick={this.toggle} block>Update</Button>
                <Modal isOpen={this.state.isOpened} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Update item</ModalHeader>
                    <ModalBody>
                        {
                            this.state.alerts
                                ?
                                this.state.alerts.map((alert, i) => <AlertItem alert={alert} key={i} />)
                                :
                                null
                        }

                        <InputGroup>
                            <Input type="text" name="id" id="itemIdInput" required
                                placeholder="24 char string"
                                value={this.state.id} onChange={e => this.handleChange(e)} />
                            <InputGroupAddon addonType="prepend">
                                <Button onClick={this.loadItem}>Find by id</Button>
                            </InputGroupAddon>
                        </InputGroup>

                        <Label for="itemNameInput">Item name:</Label>
                        <Input type="text" name="name" id="itemNameInput" required
                            value={this.state.name} onChange={e => this.handleChange(e)} />

                        <Label for="itemCategoryInput">Item category:</Label>
                        <Input type="text" name="category_name" id="itemCategoryInput" required
                            value={this.state.category_name} onChange={e => this.handleChange(e)} />

                        <Label for="itemDescriptionInput">Item description:</Label>
                        <Input type="text" name="description" id="itemDescriptionInput"
                            value={this.state.description} onChange={e => this.handleChange(e)} />

                        <Label for="itemImgInput">Item image URL:</Label>
                        <Input type="text" name="img" id="itemImgInput"
                            value={this.state.img} onChange={e => this.handleChange(e)} />
                    </ModalBody>
                    <ModalFooter>
                        {
                            this.state.isActionPending ? <Spinner size="sm" color="primary" /> : null
                        }
                        <Button color="danger" onClick={this.deleteItem}>Delete</Button>
                        <Button color="primary" onClick={this.handleSubmit}>Update</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

    deleteItem() {
        // Check if item id is 24 chars length
        if (this.state.id.length != 24) {
            alert("Item id must be exactly 24 chars long.")
            return;
        }
        this.setState(state => ({ ...state, isActionPending: true }));

        Delete(`api/items/${this.state.id}`)
            .then(res => {
                this.setState(state => ({ ...state, isActionPending: false }));

                if (res.isOk) {
                    alert(`Item was deleted ${this.state.name}, id: ${this.state.id}`);
                    this.setState(state => ({ ...state, isOpened: false, alerts: null }));
                } else if (res.status == 400) {
                    // If badrequest response
                    let alerts = parseItemErrors(res.data);
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

    updateItem(item: Item) {
        this.setState(state => ({ ...state, isActionPending: true }));

        Put(`api/items/${this.state.id}`, item)
            .then(res => {
                this.setState(state => ({ ...state, isActionPending: false }));

                if (res.isOk) {
                    alert(`Item was updated ${item.name}, id: ${item.id}`);
                    this.setState(state => ({ ...state, isOpened: false, alerts: null }));
                } else if (res.status == 400) {
                    // If badrequest response
                    let alerts = parseItemErrors(res.data);
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
    (state: ApplicationState) => state.items
)(UpdateItemModal);