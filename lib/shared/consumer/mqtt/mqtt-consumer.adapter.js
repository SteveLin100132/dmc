"use strict";
/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： MQTT 資料消費者轉接器
 * @CREATE Friday, 10th September 2021 10:32:45 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MqttConsumerAdapter = void 0;
const rxjs_1 = require("rxjs");
const core_1 = require("./../../../core");
/**
 * MQTT 資料消費者轉接器
 */
class MqttConsumerAdapter extends core_1.ConsumerAdapter {
    /**
     * @param consumer 資料消費者
     * @param topic    要訂閱的主題
     */
    constructor(consumer, topic) {
        super(consumer);
        this.consumer = consumer;
        this.topic = topic;
    }
    /**
     * 消費資料
     *
     * @method public
     * @return 取得要消費的資料
     */
    consume() {
        return new rxjs_1.Observable(sub => {
            this.consumer.on('connect', () => this.consumer.subscribe(this.topic));
            this.consumer.on('message', (topic, payload, packet) => sub.next(packet));
        });
    }
}
exports.MqttConsumerAdapter = MqttConsumerAdapter;
