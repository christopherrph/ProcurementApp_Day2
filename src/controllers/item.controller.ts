import { Request, Response, NextFunction } from "express";
import ItemService from "../services/item.service";

async function createItem(req: Request, res: Response, next: NextFunction) {
    try {
        const { name, category, stock } = req.body;
        const newItem = await ItemService.createItem({ name, category, stock });
        res.status(201).json({
            message: "Item created successfully",
            data: newItem
        });
    } catch (err: any) {
        next(err);
    }
}

async function getAllItem(req: Request, res: Response, next: NextFunction) {
    try{

        const { filter } = req.query;
        const items = await ItemService.getAllItem(filter as string);
        res.status(200).json({
            message: "Get all items",
            data: items
        });
    }
    catch (err: any) {
        next(err);
    }
}

async function getItemById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const item = await ItemService.getItemById(id);
        res.status(200).json({
            message: "Get item by id",
            data: item
        });
    }
    catch (err: any) {
        res.status(404).json({
            message: "Item not found"
        });
        next(err);
    }
}

async function updateItem(req: Request, res: Response, next: NextFunction) {
    try{
        const { id } = req.params;
        const { name, category, stock } = req.body;
        const updatedItem = await ItemService.updateItem(id, { name, category, stock });
        if (!updatedItem) {
            res.status(404).json({
                message: "Item not found"
            });
        }
        res.status(200).json({
            message: "Item updated successfully",
            data: updatedItem
        });
    }
    catch (err: any) {
        next(err);
    }
}

async function deleteItem(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const deletedItem = await ItemService.deleteItem(id);
        if (!deletedItem) {
            res.status(404).json({
                message: "Item not found"
            });
        }
        res.status(200).json({
            message: "Item deleted successfully",
            data: deletedItem
        });
    }
    catch (err: any) {
        next(err);
    }
}


const controller = { createItem, getAllItem, getItemById, updateItem, deleteItem };
export default controller;