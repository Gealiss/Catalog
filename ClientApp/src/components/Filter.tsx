import * as React from 'react';
import { connect } from 'react-redux';

import { ApplicationState } from '../store/index';
import * as ItemActionCreators from '../store/items/actions';
import * as Counter from '../store/Counter';
import * as FilterStore from '../store/Filter';
import { ShopsState } from '../store/shops/types';
import { CategoriesState } from '../store/categories/types';
import { FilterState } from '../store/Filter';
import { Button, ButtonGroup, Card, CardBody, CardHeader, Collapse, Input, Label, UncontrolledCollapse } from 'reactstrap';


type FilterProps = ShopsState & CategoriesState
    & typeof ItemActionCreators & typeof Counter.actionCreators & typeof FilterStore.actionCreators;

class Filter extends React.Component<FilterProps, FilterState>{
    constructor(props: any) {
        super(props);
        this.state = {
            name: '',
            categoriesId: [],
            shopsId: [],
            priceAsc: false,
            priceDesc: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckBox = this.handleCheckBox.bind(this);
        this.resetRadioClick = this.resetRadioClick.bind(this);
        this.setRadioClick1 = this.setRadioClick1.bind(this);
        this.setRadioClick2 = this.setRadioClick2.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit() {
        this.props.resetCounter();

        // If filter is not set up
        if (this.state.name === '' && this.state.categoriesId?.length === 0 &&
            this.state.shopsId?.length === 0 &&
            this.state.priceAsc === false && this.state.priceDesc === false
        ) {
            this.props.setFilter({});
        } else {
            this.props.setFilter(this.state);
        }        
        this.props.requestItems();
    }

    // Handle radio clicks (order by price)
    resetRadioClick() {
        this.setState((state) => ({ ...state, priceAsc: false, priceDesc: false }));
    }
    setRadioClick1() {
        this.setState((state) => ({ ...state, priceAsc: true, priceDesc: false }));
    }
    setRadioClick2() {
        this.setState((state) => ({ ...state, priceAsc: false, priceDesc: true }));
    }

    handleCheckBox(e: React.SyntheticEvent<HTMLInputElement, Event>) {
        const { name, value } = e.currentTarget;

        let arr: string[] = this.state[name] as string[];

        // If elem was unchecked - delete its value from array
        if (!e.currentTarget.checked) {
            arr = arr.filter(e => e !== value);
            this.setState((state) => ({ ...state, [name]: arr }));
            return;
        }
        arr.push(value);
        this.setState((state) => ({ ...state, [name]: arr }));
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        //Change value of edited field only, other state fields are same
        this.setState((state) => ({ ...state, [name]: value }));
    }


    render() {
        return (
            <>
                <h5>Search by name:</h5>
                <Input type="text" name="name" id="itemNameInput"
                    value={this.state.name || ''} onChange={e => this.handleChange(e)} />

                <h5>Sort by category:</h5>
                <Button outline block color="secondary" id="togglerCategories">Categories</Button>
                <UncontrolledCollapse toggler="#togglerCategories">
                    <Card>
                        <CardBody>
                            {
                                this.props.categories.map((category, i) =>
                                    <p style={{ marginLeft: '1rem' }} key={i}>
                                        <Label check>
                                            <Input value={category.name} type="checkbox" name="categoriesId"
                                                onChange={e => this.handleCheckBox(e)} />{' '}{category.name}
                                        </Label>
                                    </p>
                                )
                            }
                        </CardBody>
                    </Card>
                </UncontrolledCollapse>

                <Button outline block color="secondary" id="togglerShops">Shops</Button>
                <UncontrolledCollapse toggler="#togglerShops">
                    <Card>
                        <CardBody>
                            {
                                this.props.shops.map((shop, i) =>
                                    <p style={{ marginLeft: '1rem' }} key={i}>
                                        <Label check>
                                            <Input value={shop.id} type="checkbox" name="shopsId"
                                                onChange={e => this.handleCheckBox(e)} />{' '}{shop.name}
                                        </Label>
                                    </p>
                                )
                            }
                        </CardBody>
                    </Card>
                </UncontrolledCollapse>

                <h5>Sort by price:</h5>
                <ButtonGroup>
                    <Button outline color="primary" onClick={this.resetRadioClick}>None</Button>
                    <Button outline color="primary" onClick={this.setRadioClick1}>Ascending</Button>
                    <Button outline color="primary" onClick={this.setRadioClick2}>Descending</Button>
                </ButtonGroup>

                <br />

                <Button onClick={this.handleSubmit} className="my-2">
                    Search
                </Button>

                <hr/>
            </>
        );
    }
}

export default connect(
    (state: ApplicationState) => ({ ...state.shops, ...state.categories, ...state.items }),
    { ...ItemActionCreators, ...Counter.actionCreators, ...FilterStore.actionCreators }
)(Filter)