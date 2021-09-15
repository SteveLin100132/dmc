"use strict";
/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 抽象儲存功能轉接器
 * @CREATE Monday, 13th September 2021 5:15:47 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageAdapter = void 0;
/**
 * 抽象儲存功能轉接器
 *
 * @template S 儲存功能物件型別
 */
class StorageAdapter {
    /**
     * @param storage 儲存功能
     */
    constructor(storage) {
        this.storage = storage;
    }
}
exports.StorageAdapter = StorageAdapter;
