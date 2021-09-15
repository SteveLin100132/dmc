"use strict";
/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 本地儲存功能轉接器
 * @CREATE Monday, 13th September 2021 5:22:07 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorageAdapter = void 0;
const node_localstorage_1 = require("node-localstorage");
const storage_adapter_1 = require("./storage.adapter");
/**
 * 本地儲存功能轉接器
 */
class LocalStorageAdapter extends storage_adapter_1.StorageAdapter {
    /**
     * @param path    儲存路徑
     * @param storage 儲存功能
     */
    constructor(path = './storage', storage = new node_localstorage_1.LocalStorage(path)) {
        super(storage);
        this.path = path;
        this.storage = storage;
    }
    /**
     * 保存特定鍵值資料
     *
     * @method public
     * @param key   鍵值
     * @param value 要保存的資料
     */
    set(key, value) {
        this.storage.setItem(key, JSON.stringify(value));
    }
    /**
     * 取得特定鍵值的資料
     *
     * @method public
     * @param key 鍵值
     * @return 回傳特定鍵值的資料
     */
    get(key) {
        return JSON.parse(this.storage.getItem(key) || '');
    }
    /**
     * 刪除特定鍵值的資料
     *
     * @method public
     * @param key 鍵值
     */
    delete(key) {
        this.storage.removeItem(key);
    }
}
exports.LocalStorageAdapter = LocalStorageAdapter;
