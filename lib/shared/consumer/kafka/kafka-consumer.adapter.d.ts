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
import { ConsumerGroup, Message } from 'kafka-node';
import { Observable } from 'rxjs';
import { ConsumerAdapter } from '../../../core';
/**
 * Kafka 資料消費者轉接器
 */
export declare class KafkaConsumerAdapter extends ConsumerAdapter<ConsumerGroup, Message> {
    protected consumer: ConsumerGroup;
    /**
     * @param consumer 資料消費者
     */
    constructor(consumer: ConsumerGroup);
    /**
     * 消費資料
     *
     * @method public
     * @return 取得要消費的資料
     */
    consume(): Observable<Message>;
}
