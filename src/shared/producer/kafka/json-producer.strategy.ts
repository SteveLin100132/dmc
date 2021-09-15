/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： JSON 生產資料解析策略
 * @CREATE Thursday, 9th September 2021 2:47:08 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { ProduceRequest as P } from 'kafka-node';
import { ProducerResolveStrategy as Strategy } from './../../../core';

/**
 * JSON 生產資料解析策略
 */
export class JsonProducerStrategy<S = any> implements Strategy<S, P[]> {
  /**
   * @param _topic 要上拋的 Topic
   * @param _key   要上拋的 Key 值
   */
  constructor(private _topic: string, private _key?: string) {}

  /**
   * 解析資料
   *
   * @method public
   * @return 回傳解析後的資料
   */
  public async resolve(source: S): Promise<P[]> {
    return [
      {
        topic: this._topic,
        messages: JSON.stringify(source),
      },
    ];
  }
}
