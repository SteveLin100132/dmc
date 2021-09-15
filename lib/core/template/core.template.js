"use strict";
/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 抽象核心範本
 * @CREATE Thursday, 9th September 2021 5:53:12 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreTemplate = void 0;
const core_1 = require("../../core");
/**
 * 抽象核心範本
 */
class CoreTemplate {
    /**
     * @param consumer 資料消費者
     * @param producer 資料生產者
     * @param name     範本名稱
     */
    constructor(consumer, producer, name = 'CORE') {
        this.consumer = consumer;
        this.producer = producer;
        this.name = name;
        /**
         * 日誌
         */
        this.logger = new core_1.Log4js(`[${this.name}]`);
    }
}
exports.CoreTemplate = CoreTemplate;
