/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： Confluent Avro 生產資料解析策略
 * @CREATE Thursday, 9th September 2021 2:47:08 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { ProduceRequest as P } from 'kafka-node';
import {
  ConfluentAvroStrategy,
  ConfluentMultiRegistry,
  ConfluentPubResolveStrategy
} from 'wisrtoni40-confluent-schema/lib';
import { ProducerResolveStrategy as Strategy } from './../../../core';

/**
 * Confluent Avro 生產資料解析策略
 */
export class ConfluentProduceStrategy<S = any> implements Strategy<S, P[]> {
  /**
   * @param _host  Confluent Schema Registry 位置
   * @param _topic 要上拋的 Topic
   * @param _key   要上拋的 Key 值
   */
  constructor(
    private _host: string,
    private _topic: string,
    private _key?: string,
  ) {
    this._host = this._host
      .split(',')
      .map(host => host.replace(/\/$/g, ''))
      .join(',');
  }

  /**
   * 解析資料
   *
   * @method public
   * @return 回傳解析後的資料
   */
  public async resolve(source: S): Promise<P[]> {
    const schemaRegistry = new ConfluentMultiRegistry(this._host);
    const avro = new ConfluentAvroStrategy();
    const resolver = new ConfluentPubResolveStrategy(
      schemaRegistry,
      avro,
      this._topic,
    );
    const result = await resolver.resolve(source);
    if (result) {
      return [
        {
          topic: this._topic,
          messages: result,
        },
      ];
    } else {
      throw new Error('Confluent avro deserialize failed');
    }
  }
}
