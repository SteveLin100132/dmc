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

import { HighLevelProducer, ProduceRequest } from 'kafka-node';
import { ProducerAdapter, PublishCallback } from './../../../core';

/**
 * Kafka 資料生產者轉接器
 */
export class KafkaProducerAdapter extends ProducerAdapter<
  HighLevelProducer,
  ProduceRequest
> {
  /**
   * @param producer 資料生產者
   */
  constructor(protected producer: HighLevelProducer) {
    super(producer);
  }

  /**
   * 上拋資料
   *
   * @method public
   * @param data 資料
   * @param cb   上拋回呼
   */
  public publish(data: ProduceRequest[], cb?: PublishCallback): void {
    this.producer.send(data, (err, res) => {
      if (cb) {
        cb(err, res);
      }
    });
  }
}
