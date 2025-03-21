import InterfaceItem from "../interfaces/item.interface";
import { purwadhikaDB } from "../data-source";
import { Item } from "../entities/item.entity";

async function createItem({ name, category, stock}: InterfaceItem) {
    try{
        const newItem = new Item();

        await purwadhikaDB.transaction(async (t) =>{
            newItem.name = name;
            newItem.category = category;
            newItem.stock = stock;
            newItem.lastUpdated = new Date();

            await t.save(newItem);
        })

        return newItem;

    } catch (err: any) {
        throw err;
    }
}

async function getAllItem(filter: string) {
    try {
        const itemRepository = purwadhikaDB.getRepository(Item);
        const items = await itemRepository.find({
            where: [
                { name: filter ? filter : undefined },
                { category: filter ? filter : undefined }
            ]
        });
        return items;
    } catch (err: any) {
        throw err;
    }
}

async function getItemById(id: string){
    try {
        const itemRepository = purwadhikaDB.getRepository(Item);
        const item = await itemRepository.findOne({
            where: {
                id
            }
        });
        return item;
    } catch (err: any) {
        throw err;
    }
}

async function updateItem(id: string, {name, category, stock}: InterfaceItem){
    try {
        const itemRepository = purwadhikaDB.getRepository(Item);
        const item = await itemRepository.findOne({
            where: {
                id
            }
        });

        if (!item) {
            return null;
        }

        await purwadhikaDB.transaction(async (t) => {
            item.name = name;
            item.category = category;
            item.stock = stock;
            item.lastUpdated = new Date();

            await t.save(item);
        });

        return item;
    }
    catch (err: any) {
        throw err;
    }
}

async function deleteItem(id: string){
    try {
        const itemRepository = purwadhikaDB.getRepository(Item);
        const item = await itemRepository.findOne({
            where: {
                id
            }
        });

        if (!item) {
            return null;
        }

        await purwadhikaDB.transaction(async (t) => {
            await t.remove(item);
        });

        return item;
    }
    catch (err: any) {
        throw err;
    }
}

export default {createItem, getAllItem, getItemById, updateItem, deleteItem};