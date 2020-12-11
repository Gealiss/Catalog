import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Spinner, Alert } from 'reactstrap';
import { AlertItem } from '../AlertItem';

import { Item, ItemModelErrors } from 'src/store/items/types';
import { parseItemErrors } from 'src/store/items/actions';
import * as AlertTypes from 'src/store/alert/types';
import { Get, Post } from 'src/utils/apiFetch';

interface AddItemModalState {
    isActionPending: boolean;
    isOpened: boolean;
    alerts: AlertTypes.Alert[] | null;
    id: string;
    name: string;
    category_name: string;
    description: string;
    img: string;
}

export class AddItemModal extends React.Component<{}, AddItemModalState> {
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
        this.createItem = this.createItem.bind(this);
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
        let item: Item = {
            id: this.state.id,
            name: this.state.name,
            category_name: this.state.category_name,
            description: this.state.description === '' ? undefined : this.state.description,
            img: this.state.img === '' ? undefined : this.state.img
        };
        this.setState(state => ({ ...state, isActionPending: true }));
        this.createItem(item);
    }

    render() {
        return (
            <div>
                <Button color="success" onClick={this.toggle} block>Add</Button>
                <Modal isOpen={this.state.isOpened} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add item</ModalHeader>
                    <ModalBody>
                        {
                            this.state.alerts
                                ?
                                this.state.alerts.map((alert, i) => <AlertItem alert={alert} key={i} />)
                                :
                                null
                        }

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
                        <Button color="primary" onClick={this.handleSubmit}>Add</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
            );
    }

    createItem(item: Item) {
        Post('api/items', item)
            .then(res => {
                this.setState(state => ({ ...state, isActionPending: false }));
                if (res.isOk) {
                    let item: Item = res.data as Item;
                    alert(`Created item ${item.name}, id: ${item.id}`);
                    this.setState(state => ({ ...state, isOpened: false, alerts: null }));
                } else {
                    // Create alerts, set in state
                    let alerts = parseItemErrors(res.data);
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