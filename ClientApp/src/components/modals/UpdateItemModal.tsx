import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Spinner, InputGroup, InputGroupAddon } from 'reactstrap';
import { AlertItem } from '../AlertItem';

import { ApplicationState } from 'src/store/index';
import { Item, ItemsState, ItemModelErrors } from 'src/store/items/types';
import { CategoriesState } from 'src/store/categories/types';
import { parseItemErrors } from 'src/store/items/actions';
import * as AlertTypes from 'src/store/alert/types';
import { Put, Delete } from 'src/utils/apiFetch';

interface UpdateItemModalState {
    isActionPending: boolean;
    isOpened: boolean;
    alerts: AlertTypes.Alert[] | null;
    item: Item;
}

type UpdateItemModalProps = ItemsState & CategoriesState;

class UpdateItemModal extends React.Component<UpdateItemModalProps, UpdateItemModalState> {
    constructor(props: any) {
        super(props);

        this.state = {
            alerts: null,
            isActionPending: false,
            isOpened: false,
            item: {
                id: '', name: '', category_name: '', description: '', img: ''
            }            
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
        this.setState((state) => ({ ...state, item: { ...state.item, [name]: value } }));
    }

    handleSubmit() {
        // Check if item id is 24 chars length
        if (this.state.item.id.length != 24) {
            alert("Item id must be exactly 24 chars long.")
            return;
        }
        let item: Item = this.state.item;
        this.updateItem(item);
    }

    loadItem() {
        // If items is still loading, or loaded, but empty
        if (this.props.isLoading || this.props.items.length == 0) {
            alert("No items, or still loading.")
            return;
        }
        // Search item in global state by id from state
        let item: Item | undefined = this.props.items.find(item => item.id == this.state.item.id);
        if (!item) {
            alert("No item was found.")
            return;
        }
        // Set found item to state
        this.setState(state => ({ ...state, item: item ? item : state.item }));
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
                                value={this.state.item.id} onChange={e => this.handleChange(e)} />
                            <InputGroupAddon addonType="prepend">
                                <Button onClick={this.loadItem}>Find by id</Button>
                            </InputGroupAddon>
                        </InputGroup>

                        <Label for="itemNameInput">Item name:</Label>
                        <Input type="text" name="name" id="itemNameInput" required
                            value={this.state.item.name} onChange={e => this.handleChange(e)} />

                        <Label for="itemCategoryInput">Item category:</Label>
                        <Input type="select" name="category_name" id="itemCategoryInput"
                            value={this.state.item.category_name} onChange={e => this.handleChange(e)}>
                            <option value=''>Select category...</option>)
                            {
                                this.props.categories.map((category, i) =>
                                    <option key={i} value={category.name}>{category.name}</option>)
                            }
                        </Input>

                        <Label for="itemDescriptionInput">Item description:</Label>
                        <Input type="text" name="description" id="itemDescriptionInput"
                            value={this.state.item.description || ''} onChange={e => this.handleChange(e)} />

                        <Label for="itemImgInput">Item image URL:</Label>
                        <Input type="text" name="img" id="itemImgInput"
                            value={this.state.item.img || ''} onChange={e => this.handleChange(e)} />
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
        if (this.state.item.id.length != 24) {
            alert("Item id must be exactly 24 chars long.")
            return;
        }
        this.setState(state => ({ ...state, isActionPending: true }));

        Delete(`api/items/${this.state.item.id}`)
            .then(res => {
                this.setState(state => ({ ...state, isActionPending: false }));

                if (res.isOk) {
                    alert(`Item was deleted ${this.state.item.name}, id: ${this.state.item.id}`);
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

        Put(`api/items/${this.state.item.id}`, item)
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
    (state: ApplicationState) => ({ ...state.items, ...state.categories })
)(UpdateItemModal);