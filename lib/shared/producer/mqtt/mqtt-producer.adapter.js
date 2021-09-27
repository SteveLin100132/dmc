"use strict";
/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： MQTT 資料生產者轉接器
 * @CREATE Monday, 27th September 2021 8:17:42 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MqttProducerAdapter = void 0;
const core_1 = require("./../../../core");
/**
 * MQTT 資料生產者轉接器
 */
class MqttProducerAdapter extends core_1.ProducerAdapter {
    /**
     * @param producer 資料生產者
     * @param topic    要上拋的主題
     */
    constructor(producer, topic, publishedOpts) {
        super(producer);
        this.producer = producer;
        this.topic = topic;
        this.publishedOpts = publishedOpts;
    }
    /**
     * 上拋資料
     *
     * @method public
     * @param message 資料
     * @param cb      上拋回呼
     */
    publish(message, cb) {
        const topic = this.topic;
        const options = this.publishedOpts;
        if (options) {
            this.producer.publish(topic, message, options, (error, packet) => {
                if (cb) {
                    cb(error, packet);
                }
            });
        }
        else {
            this.producer.publish(topic, message, (error, packet) => {
                if (cb) {
                    cb(error, packet);
                }
            });
        }
    }
}
exports.MqttProducerAdapter = MqttProducerAdapter;
