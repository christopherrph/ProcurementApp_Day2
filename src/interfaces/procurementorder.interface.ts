import { PurchaseRequest } from "../entities/purchaserequest.entity";

export default interface interfaceProcurementOrder {
    id?: string;
    supplier: string;
    purchaseRequest: PurchaseRequest;
    status: string;
}