import { Item } from "../entities/item.entity";

export default interface InterfaceItem {
    id?: string;
    quantity: number;
    status: string;
    item: Item;
}