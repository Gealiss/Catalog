import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Spinner, InputGroup, InputGroupAddon } from 'reactstrap';
import { AlertItem } from '../AlertItem';

import { ApplicationState } from 'src/store/index';
import { Category, CategoriesState } from 'src/store/categories/types';
import { parseCategoryErrors } from 'src/store/categories/actions';
import * as AlertTypes from 'src/store/alert/types';
import { Put, Delete } from 'src/utils/apiFetch';

interface UpdateCategoryModalState {
    isActionPending: boolean;
    isOpened: boolean;
    alerts: AlertTypes.Alert[] | null;
    category: Category;
}

type UpdateCategoryModalProps = CategoriesState;

class UpdateCategoryModal extends React.Component<UpdateCategoryModalProps, UpdateCategoryModalState> {
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
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
    }

    toggle() {
        this.setState(state => ({ ...state, isOpened: !this.state.isOpened }));
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        //Change value of edited field only, other state fields are same
        this.setState((state) => ({ ...state, category: { ...state.category, [name]: value } }));
    }

    handleSelect(e: React.ChangeEvent<HTMLInputElement>) {
        // For select tag get shop from props by selected id
        const { value } = e.target;
        let category = this.props.categories.find(category => category.name === value);

        this.setState((state) => ({
            ...state, category:
                { name: value, description: category?.description || '' }
        }));
    }

    handleSubmit() {
        if (this.state.category.name.length < 3 || this.state.category.name.length > 30) {
            alert("Category must have a name. 3-30 chars.")
            return;
        }
        let category: Category = this.state.category;
        this.updateCategory(category);
    }

    render() {
        if (this.props.isCategoriesLoading) {
            alert("Categories is still loading");
            return;
        }
        return (
            <div>
                <Button color="warning" onClick={this.toggle} block>Update</Button>
                <Modal isOpen={this.state.isOpened} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Update category</ModalHeader>
                    <ModalBody>
                        {
                            this.state.alerts
                                ?
                                this.state.alerts.map((alert, i) => <AlertItem alert={alert} key={i} />)
                                :
                                null
                        }

                        <Label for="categoryNameInput">Category:</Label>
                        <Input type="select" name="id" id="categoryNameInput"
                            value={this.state.category.name} onChange={e => this.handleSelect(e)}>
                            <option value=''>Select category...</option>)
                            {
                                this.props.categories.map((category, i) =>
                                    <option key={i} value={category.name}>{category.name}</option>)
                            }
                        </Input>

                        <Label for="shopDescriptionInput">Category description:</Label>
                        <Input type="text" name="description" id="shopDescriptionInput"
                            value={this.state.category.description} onChange={e => this.handleChange(e)} />

                    </ModalBody>
                    <ModalFooter>
                        {
                            this.state.isActionPending ? <Spinner size="sm" color="primary" /> : null
                        }
                        <Button color="danger" onClick={this.deleteCategory}>Delete</Button>
                        <Button color="primary" onClick={this.handleSubmit}>Update</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

    deleteCategory() {
        this.setState(state => ({ ...state, isActionPending: true }));

        Delete(`api/categories/${this.state.category.name}`)
            .then(res => {
                this.setState(state => ({ ...state, isActionPending: false }));

                if (res.isOk) {
                    alert(`Category was deleted ${this.state.category.name}`);
                    this.setState(state => ({ ...state, isOpened: false, alerts: null }));
                } else if (res.status == 400) {
                    // If badrequest response
                    let alerts = parseCategoryErrors(res.data);
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

    updateCategory(category: Category) {
        this.setState(state => ({ ...state, isActionPending: true }));

        Put(`api/categories/${this.state.category.name}`, category)
            .then(res => {
                this.setState(state => ({ ...state, isActionPending: false }));

                if (res.isOk) {
                    alert(`Category was updated ${category.name}`);
                    this.setState(state => ({ ...state, isOpened: false, alerts: null }));
                } else if (res.status == 400) {
                    // If badrequest response
                    let alerts = parseCategoryErrors(res.data);
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
    (state: ApplicationState) => ({ ...state.categories })
)(UpdateCategoryModal);