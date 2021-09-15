"use strict";
/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： Kafka 資料生產者轉接器
 * @CREATE Thursday, 9th September 2021 2:47:08 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaProducerAdapter = void 0;
const core_1 = require("./../../../core");
/**
 * Kafka 資料生產者轉接器
 */
class KafkaProducerAdapter extends core_1.ProducerAdapter {
    /**
     * @param producer 資料生產者
     */
    constructor(producer) {
        super(producer);
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
        this.producer.send(data, (err, res) => {
            if (cb) {
                cb(err, res);
            }
        });
    }
}
exports.KafkaProducerAdapter = KafkaProducerAdapter;
