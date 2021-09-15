"use strict";
/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 重新拋送資料生產者轉接器
 * @CREATE Monday, 13th September 2021 1:32:59 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetryProducerAdapter = void 0;
const wistroni40_retry_1 = require("wistroni40-retry");
/**
 * 重新拋送資料生產者轉接器
 */
class RetryProducerAdapter extends wistroni40_retry_1.ProducerAdapter {
    /**
     * @param producer 資料生產者
     * @param options  重拋配置
     */
    constructor(producer, options) {
        super(producer, options);
        this.producer = producer;
        this.options = options;
    }
    /**
     * 發送數據
     *
     * @method public
     * @param payload  要拋送的數據
     * @param callback 拋送後的回乎函數
     */
    send(payload, callback) {
        this.producer.publish(payload, (err, res) => callback(err, res));
    }
}
exports.RetryProducerAdapter = RetryProducerAdapter;
