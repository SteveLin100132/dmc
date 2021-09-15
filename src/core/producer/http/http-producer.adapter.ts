/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： HTTP 資料生產者轉接器
 * @CREATE Thursday, 9th September 2021 3:30:10 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import axios, { AxiosInstance } from 'axios';
import { PublishCallback } from './../producer';
import { ProducerAdapter } from './../producer.adapter';

/**
 * HTTP 資料生產者轉接器
 */
export class HttpProducerAdapter<D = any> extends ProducerAdapter<
  AxiosInstance,
  D
> {
  /**
   * @param producer 資料生產者
   */
  constructor(private _url: string, protected producer: AxiosInstance = axios) {
    super(producer);
  }

  /**
   * 上拋資料
   *
   * @method public
   * @param data 資料
   * @param cb   上拋回呼
   */
  public publish(data: D, cb?: PublishCallback): void {
    this.producer
      .post(this._url, data)
      .then(res => (cb ? cb(null, res) : null))
      .catch(err => (cb ? cb(err, null) : null));
  }
}
