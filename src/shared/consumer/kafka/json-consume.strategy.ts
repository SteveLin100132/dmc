/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： JSON 消費資料解析策略
 * @CREATE Thursday, 9th September 2021 2:37:22 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { Message as M } from 'kafka-node';
import { ConsumerResolveStrategy as Strategy } from '../../../core';

/**
 * JSON 消費資料解析策略
 */
export class JsonConsumeStrategy<R = any> implements Strategy<M, R> {
  /**
   * 解析資料
   *
   * @method public
   * @param source 原始資料
   * @return 回傳解析後的資料
   */
  public async resolve(source: M): Promise<R> {
    return JSON.parse(source.value.toString());
  }
}
