"use strict";
/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 資料生產者轉接器
 * @CREATE Thursday, 9th September 2021 2:31:54 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProducerAdapter = void 0;
/**
 * 資料生產者轉接器
 */
class ProducerAdapter {
    /**
     * @param producer 資料生產者
     */
    constructor(producer) {
        this.producer = producer;
    }
}
exports.ProducerAdapter = ProducerAdapter;
