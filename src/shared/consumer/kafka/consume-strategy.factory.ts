/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 資料消費者解析策略簡單工廠
 * @CREATE Thursday, 9th September 2021 2:37:21 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { ConsumerResolveStrategy } from '../../../core';
import { ConfluentConsumeStrategy } from './confluent-consume.strategy';
import { JsonConsumeStrategy } from './json-consume.strategy';

/**
 * 工廠配置
 */
export type ConsumeFactoryOptions = {
  confluent: boolean;
  hosts?: string;
};

/**
 * 資料消費者解析策略簡單工廠
 */
export class ConsumeStrategyFactory<R = any> {
  /**
   * 產生對應的消費者資料解析策略
   *
   * @method public
   * @param options 配置
   * @return 回傳對應的消費者資料解析策略
   */
  public generate(
    optinos: ConsumeFactoryOptions,
  ): ConsumerResolveStrategy<any, R> {
    if (optinos.confluent) {
      const hosts = optinos.hosts || 'http://localhost:8081';
      return new ConfluentConsumeStrategy<R>(hosts);
    } else {
      return new JsonConsumeStrategy<R>();
    }
  }
}
