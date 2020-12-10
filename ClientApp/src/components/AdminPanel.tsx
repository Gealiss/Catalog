import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Col, Row } from 'reactstrap';
import { AddItemModal } from './modals/AddItemModal';

import { ApplicationState } from '../store/index';
import { UserState, UserRoles } from '../store/user/types';

type AdminPanelProps = UserState; // ... state we've requested from the Redux store

class AdminPanel extends React.Component<AdminPanelProps> {
    constructor(props: AdminPanelProps) {
        super(props);
    }

    render() {
        // Check if user state exist and user role is admin
        if (this.props.user?.role !== UserRoles.Admin) {
            return <Redirect to="/" />;
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
                                </CardBody>
                            </Card>
                        </Col>

                        <Col>
                            <Card>
                                <CardBody>
                                    <CardTitle tag="h5">Shops</CardTitle>
                                    <CardSubtitle tag="h6" className="mb-2 text-muted">Shops manage.</CardSubtitle>
                                    <Button color="primary">Add</Button>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col>
                            <Card>
                                <CardBody>
                                    <CardTitle tag="h5">Category</CardTitle>
                                    <CardSubtitle tag="h6" className="mb-2 text-muted">Category manage.</CardSubtitle>
                                    <Button color="primary">Add</Button>
                                </CardBody>
                            </Card>
                        </Col>

                    </Row>
                </>
            );
    }
}

export default connect(
    (state: ApplicationState) => state.user
)(AdminPanel);