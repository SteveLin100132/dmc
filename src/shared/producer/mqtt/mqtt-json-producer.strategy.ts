/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： MQTT JSON 序列化生產資料解析策略
 * @CREATE Monday, 27th September 2021 8:25:13 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { ProducerResolveStrategy as Strategy } from './../../../core';

/**
 * MQTT JSON 序列化生產資料解析策略
 */
export class MqttJsonProducerStrategy<S = any> implements Strategy<S, string> {
  /**
   * 解析資料
   *
   * @method public
   * @return 回傳解析後的資料
   */
  public async resolve(source: S): Promise<string> {
    return JSON.stringify(source);
  }
}
