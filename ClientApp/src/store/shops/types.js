// -----------------
// STATE - This defines the type of data maintained in the Redux store.
export var ShopModelErrors;
(function (ShopModelErrors) {
    ShopModelErrors["Id"] = "Wrong shop id";
    ShopModelErrors["Name"] = "Incorrect name";
    ShopModelErrors["Description"] = "Incorrect description";
})(ShopModelErrors || (ShopModelErrors = {}));
//ENUM FOR TYPES
export var ShopActionTypes;
(function (ShopActionTypes) {
    ShopActionTypes["REQUEST_SHOPS"] = "REQUEST_SHOPS";
    ShopActionTypes["RECEIVE_SHOPS"] = "RECEIVE_SHOPS";
})(ShopActionTypes || (ShopActionTypes = {}));
//# sourceMappingURL=types.js.map