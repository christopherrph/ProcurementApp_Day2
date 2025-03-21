"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const item_entity_1 = require("../entities/item.entity");
function createItem(_a) {
    return __awaiter(this, arguments, void 0, function* ({ name, category, stock }) {
        try {
            const newItem = new item_entity_1.Item();
            yield data_source_1.purwadhikaDB.transaction((t) => __awaiter(this, void 0, void 0, function* () {
                newItem.name = name;
                newItem.category = category;
                newItem.stock = stock;
                newItem.lastUpdated = new Date();
                yield t.save(newItem);
            }));
            return newItem;
        }
        catch (err) {
            throw err;
        }
    });
}
function getAllItem(filter) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const itemRepository = data_source_1.purwadhikaDB.getRepository(item_entity_1.Item);
            const items = yield itemRepository.find({
                where: [
                    { name: filter ? filter : undefined },
                    { category: filter ? filter : undefined }
                ]
            });
            return items;
        }
        catch (err) {
            throw err;
        }
    });
}
function getItemById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const itemRepository = data_source_1.purwadhikaDB.getRepository(item_entity_1.Item);
            const item = yield itemRepository.findOne({
                where: {
                    id
                }
            });
            return item;
        }
        catch (err) {
            throw err;
        }
    });
}
function updateItem(id_1, _a) {
    return __awaiter(this, arguments, void 0, function* (id, { name, category, stock }) {
        try {
            const itemRepository = data_source_1.purwadhikaDB.getRepository(item_entity_1.Item);
            const item = yield itemRepository.findOne({
                where: {
                    id
                }
            });
            if (!item) {
                return null;
            }
            yield data_source_1.purwadhikaDB.transaction((t) => __awaiter(this, void 0, void 0, function* () {
                item.name = name;
                item.category = category;
                item.stock = stock;
                item.lastUpdated = new Date();
                yield t.save(item);
            }));
            return item;
        }
        catch (err) {
            throw err;
        }
    });
}
function deleteItem(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const itemRepository = data_source_1.purwadhikaDB.getRepository(item_entity_1.Item);
            const item = yield itemRepository.findOne({
                where: {
                    id
                }
            });
            if (!item) {
                return null;
            }
            yield data_source_1.purwadhikaDB.transaction((t) => __awaiter(this, void 0, void 0, function* () {
                yield t.remove(item);
            }));
            return item;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.default = { createItem, getAllItem, getItemById, updateItem, deleteItem };
