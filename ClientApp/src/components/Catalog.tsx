import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store/index';

//import * as ItemsStore from '../store/Items'
import { Item, ItemsState } from '../store/items/types';
import { CategoriesState } from '../store/categories/types';
import { ShopsState } from '../store/shops/types';
import * as ItemActionCreators from '../store/items/actions';
import * as Counter from '../store/Counter'
import * as FilterStore from '../store/Filter'
import { ItemComponent } from './Item';
import LoadCounter from './Counter';
import Filter from './Filter';
import { Button, Container, Spinner } from 'reactstrap';

// At runtime, Redux will merge together...
type ItemProps =
    ItemsState & CategoriesState & ShopsState & Counter.CounterState // ... state we've requested from the Redux store
    & typeof ItemActionCreators & typeof Counter.actionCreators
    & typeof FilterStore.actionCreators

class Catalog extends React.PureComponent<ItemProps> {
    _isMounted: boolean;

    constructor(props: any) {
        super(props);
        this._isMounted = false;
    }

    // This method is called when the component is first added to the document
    public componentDidMount() {
        this._isMounted = true;
        this.props.resetCounter();
        this.props.resetFilter();
        this.props.requestItems();
    }

    // This method is called when the route parameters change
    public componentDidUpdate() {
        //this.ensureDataFetched();
    }

    public render() {
        // If shops or categories is still loading
        if (this.props.isShopsLoading || this.props.isCategoriesLoading) {
            return (
                <>
                    <div className="d-flex justify-content-center">
                        <Spinner size="xl" color="primary" />
                    </div>
                </>
            );
        }
        return (
            <div className="row">
                <div className="col-sm-4">
                    <h2>Item filters</h2>
                    <Filter />
                </div>

                <div className="col-sm-8">
                    <h2 id="tabelLabel">Catalog</h2>
                    {
                        !this._isMounted || this.props.isLoading
                            ? <Spinner size="xl" color="primary" />
                            : this.renderItems()
                    }
                    <LoadCounter />
                </div>

            </div>
        );
    }

    private renderItems() {
        if (this.props.items.length === 0) {
            return <h5>No items found...</h5>;
        }
        // Get first N items from items state
        let itemsToRender: Item[] = this.props.items.slice(0, this.props.count);
        return (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-5">
                {itemsToRender.map((item: Item) =>
                    <ItemComponent item={item} key={item.id} />
                )}
            </div>
        );
    }
}



export default connect(
    (state: ApplicationState) => (
        { ...state.items, ...state.shops, ...state.categories, ...state.counter }
    ), // Selects which state properties are merged into the component's props
    { ...ItemActionCreators, ...Counter.actionCreators, ...FilterStore.actionCreators } // Selects which action creators are merged into the component's props
)(Catalog as any);