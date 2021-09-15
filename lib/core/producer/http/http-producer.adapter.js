"use strict";
/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： HTTP 資料生產者轉接器
 * @CREATE Thursday, 9th September 2021 3:30:10 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpProducerAdapter = void 0;
const axios_1 = require("axios");
const producer_adapter_1 = require("./../producer.adapter");
/**
 * HTTP 資料生產者轉接器
 */
class HttpProducerAdapter extends producer_adapter_1.ProducerAdapter {
    /**
     * @param producer 資料生產者
     */
    constructor(_url, producer = axios_1.default) {
        super(producer);
        this._url = _url;
        this.producer = producer;
    }
    /**
     * 上拋資料
     *
     * @method public
     * @param data 資料
     * @param cb   上拋回呼
     */
    publish(data, cb) {
        this.producer
            .post(this._url, data)
            .then(res => (cb ? cb(null, res) : null))
            .catch(err => (cb ? cb(err, null) : null));
    }
}
exports.HttpProducerAdapter = HttpProducerAdapter;
