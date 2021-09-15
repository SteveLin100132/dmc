/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： Confluent Avro 消費資料解析策略
 * @CREATE Thursday, 9th September 2021 2:37:21 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { Message as M } from 'kafka-node';
import {
  ConfluentAvroStrategy,
  ConfluentMultiRegistry,
  ConfluentSubResolveStrategy,
} from 'wisrtoni40-confluent-schema/lib';
import { ConsumerResolveStrategy as Strategy } from '../../../core';

/**
 * Confluent Avro 消費資料解析策略
 */
export class ConfluentConsumeStrategy<R = any> implements Strategy<M, R> {
  /**
   * @param _host Confluent Schema Registry 位置
   */
  constructor(private _host: string) {}

  /**
   * 解析資料
   *
   * @method public
   * @param source 原始資料
   * @return 回傳解析後的資料
   */
  public async resolve(source: M): Promise<R> {
    const registry = new ConfluentMultiRegistry(this._host);
    const avro = new ConfluentAvroStrategy();
    const resolver = new ConfluentSubResolveStrategy(registry, avro);
    const result = await resolver.resolve<R>(source.value);
    if (result) {
      return result;
    } else {
      throw new Error('Confluent avro deserialize failed');
    }
  }
}
