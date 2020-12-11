// -----------------
// STATE - This defines the type of data maintained in the Redux store.
export var ItemModelErrors;
(function (ItemModelErrors) {
    ItemModelErrors["Category_name"] = "Incorrect category name";
    ItemModelErrors["Name"] = "Incorrect name";
    ItemModelErrors["Id"] = "Wrong item id";
})(ItemModelErrors || (ItemModelErrors = {}));
//ENUM FOR TYPES
export var ItemActionTypes;
(function (ItemActionTypes) {
    ItemActionTypes["REQUEST_ITEMS"] = "REQUEST_ITEMS";
    ItemActionTypes["RECEIVE_ITEMS"] = "RECEIVE_ITEMS";
    ItemActionTypes["CREATE_ITEM"] = "CREATE_ITEM";
})(ItemActionTypes || (ItemActionTypes = {}));
//# sourceMappingURL=types.js.map