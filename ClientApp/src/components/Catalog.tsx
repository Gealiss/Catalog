import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../store/index';

//import * as ItemsStore from '../store/Items'
import { Item, ItemsState } from '../store/items/types';
import * as ItemActionCreators from '../store/items/actions';
import { ItemComponent } from './Item';

// At runtime, Redux will merge together...
type ItemProps =
    ItemsState // ... state we've requested from the Redux store
    & typeof ItemActionCreators // ... plus action creators we've requested
    & RouteComponentProps<{ startItemIndex?: string }>; // ... plus incoming routing parameters

class Catalog extends React.PureComponent<ItemProps> {
    // This method is called when the component is first added to the document
    public componentDidMount() {
        //this.ensureDataFetched();
        this.props.requestItems();
    }

    // This method is called when the route parameters change
    public componentDidUpdate() {
        //this.ensureDataFetched();
    }

    public render() {
        return (
            <div className="row">
                <div className="col-sm-4">
                    col-sm-4
                </div>

                <div className="col-sm-8">
                    <h1 id="tabelLabel">Catalog</h1>
                    {this.renderItems()}
                    {this.renderPagination()}
                </div>

            </div>
        );
    }

    private ensureDataFetched() {
        this.props.requestItems();
    }

    private renderItems() {
        return (
            <div className="row row-cols-1 row-cols-sm-3 row-cols-lg-4 row-cols-xl-5">
                {this.props.items.map((item: Item) =>
                    <ItemComponent item={item} key={item.id} />
                )}
            </div>
        );
    }

    private renderPagination() {
        const prevStartItemIndex = (this.props.startItemIndex || 0) - 5;
        const nextStartItemIndex = (this.props.startItemIndex || 0) + 5;

        return (
            <div className="d-flex justify-content-between">
                <Link className='btn btn-outline-secondary btn-sm' to={`/fetch-data/${prevStartItemIndex}`}>Previous</Link>
                {this.props.isLoading && <span>Loading...</span>}
                <Link className='btn btn-outline-secondary btn-sm' to={`/fetch-data/${nextStartItemIndex}`}>Next</Link>
            </div>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.items, // Selects which state properties are merged into the component's props
    ItemActionCreators // Selects which action creators are merged into the component's props
)(Catalog as any);