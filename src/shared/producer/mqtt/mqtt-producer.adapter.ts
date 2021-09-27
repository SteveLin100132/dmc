/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： MQTT 資料生產者轉接器
 * @CREATE Monday, 27th September 2021 8:17:42 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { Client } from 'mqtt';
import { ProducerAdapter, PublishCallback } from './../../../core';

/**
 * MQTT 資料生產者轉接器
 */
export class MqttProducerAdapter extends ProducerAdapter<Client, string> {
  /**
   * @param producer 資料生產者
   * @param topic    要上拋的主題
   */
  constructor(protected producer: Client, protected topic: string) {
    super(producer);
  }

  /**
   * 上拋資料
   *
   * @method public
   * @param message 資料
   * @param cb      上拋回呼
   */
  public publish(message: string, cb?: PublishCallback): void {
    this.producer.publish(this.topic, message, (error, packet) => {
      if (cb) {
        cb(error, packet);
      }
    });
  }
}
