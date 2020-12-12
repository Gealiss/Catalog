import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, ButtonGroup, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Col, Row, Spinner } from 'reactstrap';

import { AddItemModal } from './modals/AddItemModal';
import { AddCategoryModal } from './modals/AddCategoryModal';
import { AddShopModal } from './modals/AddShopModal';
import UpdateItemModal from './modals/UpdateItemModal';
import UpdateShopModal from './modals/UpdateShopModal';
import UpdateCategoryModal from './modals/UpdateCategoryModal';
import AddPriceModal from './modals/AddPriceModal';

import * as ItemActionCreators from '../store/items/actions';
import { ApplicationState } from '../store/index';
import { UserState, UserRoles } from '../store/user/types';
import { ItemsState } from '../store/items/types';
import { ShopsState } from '../store/shops/types';
import { CategoriesState } from '../store/categories/types';

type AdminPanelProps = UserState & ItemsState & ShopsState & CategoriesState
    & typeof ItemActionCreators; // ... state we've requested from the Redux store

class AdminPanel extends React.Component<AdminPanelProps> {
    constructor(props: AdminPanelProps) {
        super(props);
    }

    componentDidMount() {
        // Load all items to state and props
        this.props.requestItems();
    }

    render() {
        // Check if user state exist and user role is admin
        if (this.props.user?.role !== UserRoles.Admin) {
            return <Redirect to="/" />;
        }
        // If items, shops or categories is still loading
        if (this.props.isLoading || this.props.isShopsLoading || this.props.isCategoriesLoading) {
            return <> Loading data... <Spinner size="xl" color="primary" /> </>
        }
        return (
                <>
                <h1>Admin panel</h1>
                <Row className="row-cols-1 row-cols-sm-3 row-cols-lg-4 row-cols-xl-5">
                    <Col>
                        <Card>
                            <CardBody>
                                <CardTitle tag="h5">Items</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">Items manage.</CardSubtitle>

                                <AddItemModal />
                                <UpdateItemModal />
                                <AddPriceModal />
                            </CardBody>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                        <CardBody>
                            <CardTitle tag="h5">Shops</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">Shops manage.</CardSubtitle>

                                <AddShopModal />
                                <UpdateShopModal />

                            </CardBody>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <CardBody>
                                <CardTitle tag="h5">Category</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">Category manage.</CardSubtitle>

                                <AddCategoryModal />
                                <UpdateCategoryModal />

                            </CardBody>
                        </Card>
                    </Col>

                    </Row>
                </>
            );
    }
}

export default connect(
    (state: ApplicationState) => ({ ...state.user, ...state.items, ...state.shops, ...state.categories }),
    ItemActionCreators
)(AdminPanel as any);