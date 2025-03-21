import { Request, Response, NextFunction } from "express";
import PurchaseRequestService from "../services/purchaserequest.service";
import itemService from "../services/item.service";

async function createPurchaseRequest(req: Request, res: Response, next: NextFunction) {
    try {
        const { quantity, status, item } = req.body;

        const checkitem = await itemService.getItemById(item.id);

        if (!checkitem) {
            res.status(404).json({
                message: "Item not found"
            });
            throw new Error("Item not found");
        }

        if(checkitem.stock < quantity) {
            res.status(400).json({
                message: "Stock is not enough"
            });
            throw new Error("Stock is not enough");
        }

        const newPurchaseRequest = await PurchaseRequestService.createPurchaseRequest({ quantity, status, item });
        const updatedItem = await itemService.updateItem(item.id, { name: checkitem.name, category: checkitem.category, stock: checkitem.stock - quantity });
        
        let message = "Purchase request created successfully and item updated";
        if(!updatedItem) {
            message = "Purchase request created successfully but item not updated";
        }
        if(updatedItem && updatedItem.stock < 10) {
            message = "Purchase request created successfully and item updated, stock is less than 10";
        }

        res.status(201).json({
            message,
            data: newPurchaseRequest,
            updatedItem
        });
    } catch (err: any) {
        next(err);
    }
}

async function getAllPurchaseRequest(req: Request, res: Response, next: NextFunction) {
    try {
        const purchaseRequests = await PurchaseRequestService.getAllPurchaseRequest();
        res.status(200).json({
            message: "Get all purchase requests",
            data: purchaseRequests
        });
    } catch (err: any) {
        res.status(500).json({
            message: err.message
        });
        next(err);
    }
}

async function getPurchaseRequestById(req: Request, res: Response, next: NextFunction) {
    try{
        const { id } = req.params;
        const purchaseRequest = await PurchaseRequestService.getPurchaseRequestById(id);

        if (!purchaseRequest) {
            res.status(404).json({
                message: "Purchase request not found"
            });
            throw new Error("Purchase request not found");
        }

        res.status(200).json({
            message: "Get purchase request by id",
            data: purchaseRequest
        });
    }
    catch (err: any) {
        res.status(500).json({
            message: err.message
        });
        next(err);
    }
}

async function editPurchaseRequestById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const purchaseRequest = await PurchaseRequestService.getPurchaseRequestById(id);

        if (!purchaseRequest) {
            res.status(404).json({
                message: "Purchase request not found"
            });
            throw new Error("Purchase request not found");
        }

        const updatedPurchaseRequest = await PurchaseRequestService.editPurchaseRequestById(id, status);
        res.status(200).json({
            message: "Purchase request updated successfully",
            data: updatedPurchaseRequest
        });
    } catch (err: any) {
        res.status(500).json({
            message: err.message
        });
        next(err);
    }   
}

const controller = { createPurchaseRequest, getAllPurchaseRequest, getPurchaseRequestById, editPurchaseRequestById };
export default controller;