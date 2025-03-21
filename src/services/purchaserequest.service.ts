import { purwadhikaDB } from "../data-source";

import { PurchaseRequest } from "../entities/purchaserequest.entity";

import InterfacePurchaseRequest from "../interfaces/purchaserequest.interface";

async function createPurchaseRequest({ quantity, status, item }: InterfacePurchaseRequest) {
    try {
        const newPurchaseRequest = new PurchaseRequest();

        await purwadhikaDB.transaction(async (t) => {

            newPurchaseRequest.quantity = quantity;
            newPurchaseRequest.status = status;
            newPurchaseRequest.requestDate = new Date();
            newPurchaseRequest.item = item;

            await t.save(newPurchaseRequest);
        });

        return newPurchaseRequest;
    } catch (err: any) {
        throw err;
    }
}

async function getAllPurchaseRequest() {
    try {
        const purchaseRequestRepository = purwadhikaDB.getRepository(PurchaseRequest);
        const purchaseRequests = await purchaseRequestRepository.find({ relations: ["item"] });
        return purchaseRequests;
    } catch (err: any) {
        throw err;
    }
}

async function getPurchaseRequestById(id: string) {
    try {
        const purchaseRequestRepository = purwadhikaDB.getRepository(PurchaseRequest);
        const purchaseRequest = await purchaseRequestRepository.findOne({
            where: {id},
            relations: ["item"]
        });
        return purchaseRequest;
    } catch (err: any) {
        throw err;
    }
}

async function editPurchaseRequestById(id: string, status: string) {
    try {
        const purchaseRequestRepository = purwadhikaDB.getRepository(PurchaseRequest);
        const purchaseRequest = await purchaseRequestRepository.findOne({
            where: {
                id
            }
        });

        if (!purchaseRequest) {
            return null;
        }

        await purwadhikaDB.transaction(async (t) => {
            purchaseRequest.status = status;
            await t.save(purchaseRequest);
        });
        
        return purchaseRequest;

    }
    catch (err: any) {
        throw err;
    }
}

export default { createPurchaseRequest, getAllPurchaseRequest, getPurchaseRequestById, editPurchaseRequestById };