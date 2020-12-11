export interface Price {
    id: string;
    item_id: string;
    shop_id: string;
    dateTime?: string;
    price: number;
    availability: boolean;
}

export enum PriceModelErrors {
    Item_id = "Incorrect item id",
    Shop_id = "Incorrect shop id",
    Id = "Wrong item id",
    Price = "Incorrect price",
    Availability = "Wrong value",
    DateTime = "Wrong date"
}