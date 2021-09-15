/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： MQTT 消費資料解析策略
 * @CREATE Friday, 10th September 2021 12:58:55 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { IPublishPacket } from 'mqtt-packet';
import { ConsumerResolveStrategy as Strategy } from '../../../core';

/**
 * MQTT 消費資料解析策略
 */
export class MqttPayloadStrategy<R = any>
  implements Strategy<IPublishPacket, R>
{
  /**
   * 解析資料
   *
   * @method public
   * @param source 原始資料
   * @return 回傳解析後的資料
   */
  public async resolve(source: IPublishPacket): Promise<R> {
    return JSON.parse(source.payload.toString());
  }
}
