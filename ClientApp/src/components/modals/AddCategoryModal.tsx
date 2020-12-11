import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Spinner, Alert } from 'reactstrap';
import { AlertItem } from '../AlertItem';

import { Category, CategoryModelErrors } from 'src/store/categories/types';
import { parseCategoryErrors } from 'src/store/categories/actions';
import * as AlertTypes from 'src/store/alert/types';
import { Get, Post } from 'src/utils/apiFetch';

interface AddItemModalState {
    isActionPending: boolean;
    isOpened: boolean;
    alerts: AlertTypes.Alert[] | null;
    category: Category;
}

export class AddCategoryModal extends React.Component<{}, AddItemModalState> {
    constructor(props: any) {
        super(props);

        this.state = {
            alerts: null,
            isActionPending: false,
            isOpened: false,
            category: {
                name: '', description: ''
            }            
        }
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createCategory = this.createCategory.bind(this);
    }

    toggle() {
        this.setState(state => ({ ...state, isOpened: !this.state.isOpened }));
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        //Change value of edited field only, other state fields are same
        this.setState((state) => ({ ...state, category: { ...state.category, [name]: value } }));
    }

    handleSubmit() {
        if (this.state.category.name === '') {
            alert("Category name can not be null");
            return;
        }
        let item: Category = this.state.category;
        this.createCategory(item);
    }

    render() {
        return (
            <div>
                <Button color="success" onClick={this.toggle} block>Add</Button>
                <Modal isOpen={this.state.isOpened} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add category</ModalHeader>
                    <ModalBody>
                        {
                            this.state.alerts
                                ?
                                this.state.alerts.map((alert, i) => <AlertItem alert={alert} key={i} />)
                                :
                                null
                        }

                        <Label for="categoryNameInput">Category name(id):</Label>
                        <Input type="text" name="name" id="categoryNameInput" required
                            value={this.state.category.name} onChange={e => this.handleChange(e)} />

                        <Label for="categoryDescrInput">Category description:</Label>
                        <Input type="text" name="description" id="categoryDescrInput"
                            value={this.state.category.description || ''} onChange={e => this.handleChange(e)} />

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

    createCategory(category: Category) {
        this.setState(state => ({ ...state, isActionPending: true }));
        Post('api/categories', category)
            .then(res => {
                this.setState(state => ({ ...state, isActionPending: false }));
                if (res.isOk) {
                    let _category: Category = res.data as Category;
                    alert(`Created category ${_category.name}`);
                    this.setState(state => ({ ...state, isOpened: false, alerts: null }));
                } else {
                    // Create alerts, set in state
                    let alerts = parseCategoryErrors(res.data);
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