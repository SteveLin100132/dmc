/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 資料生產者解析策略簡單工廠
 * @CREATE Thursday, 9th September 2021 2:47:08 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { ProducerResolveStrategy } from './../../../core';
import { ConfluentProduceStrategy } from './confluent-produce.strategy';
import { JsonProducerStrategy } from './json-producer.strategy';

/**
 * 工廠配置
 */
export type ProduceFactoryOptions = {
  confluent: boolean;
  hosts?: string;
  topic: string;
  key?: string;
};

/**
 * 資料生產者解析策略簡單工廠
 */
export class ProduceStrategyFactory {
  /**
   * 產生對應的消費者資料解析策略
   *
   * @method public
   * @param options 配置
   * @return 回傳對應的生產者資料解析策略
   */
  public generate(optinos: ProduceFactoryOptions): ProducerResolveStrategy {
    const topic = optinos.topic;
    const key = optinos.key;
    if (optinos.confluent) {
      const hosts = optinos.hosts || 'http://localhost:8081';
      return new ConfluentProduceStrategy(hosts, topic, key);
    } else {
      return new JsonProducerStrategy(topic, key);
    }
  }
}
