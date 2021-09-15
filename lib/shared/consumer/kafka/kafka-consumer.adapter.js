"use strict";
/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： Kafka 資料消費者轉接器
 * @CREATE Thursday, 9th September 2021 2:37:22 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaConsumerAdapter = void 0;
const rxjs_1 = require("rxjs");
const core_1 = require("../../../core");
/**
 * Kafka 資料消費者轉接器
 */
class KafkaConsumerAdapter extends core_1.ConsumerAdapter {
    /**
     * @param consumer 資料消費者
     */
    constructor(consumer) {
        super(consumer);
        this.consumer = consumer;
    }
    /**
     * 消費資料
     *
     * @method public
     * @return 取得要消費的資料
     */
    consume() {
        return new rxjs_1.Observable(sub => {
            this.consumer.on('message', message => sub.next(message));
        });
    }
}
exports.KafkaConsumerAdapter = KafkaConsumerAdapter;
