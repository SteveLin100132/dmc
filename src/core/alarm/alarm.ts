/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 抽象報警狀態
 * @CREATE Friday, 10th September 2021 8:08:52 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { AlarmLevel } from './models';
import { AlarmProducer } from './producer';
import { AlarmState } from './state';

/**
 * 抽象報警狀態
 */
export class Alarm<D = any> {
  /**
   * 報警時間戳
   */
  private _timestamp = new Date().getTime();

  /**
   * @param _data     報警資料
   * @param _current  報警當前狀態
   * @param _template 報警範本
   * @param _key      報警鍵值
   */
  constructor(
    private _data: D,
    private _current: AlarmState,
    private _template: AlarmProducer,
    private _key = '',
  ) {}

  /**
   * 取得報警時間戳
   *
   * @method public
   * @return 回傳報警時間戳
   */
  public get timestamp(): number {
    return this._timestamp;
  }

  /**
   * 設定報警時間戳
   *
   * @method public
   * @param time 報警時間戳
   */
  public set timestamp(time: number) {
    this._timestamp = time;
  }

  /**
   * 取得當前報警等級
   *
   * @method public
   * @return 回傳當前報警等級
   */
  public get level(): AlarmLevel {
    return this._current.level;
  }

  /**
   * 取得報警鍵值
   *
   * @method public
   * @return 回傳報警鍵值
   */
  public get key(): string {
    return this._key;
  }

  /**
   * 更新報警鍵值
   *
   * @method public
   * @param key 報警鍵值
   * @return 回傳物件本身
   */
  public updatekey(key: string): this {
    this._key = key;
    return this;
  }

  /**
   * 取得報警資料
   *
   * @method public
   * @return 回傳報警資料
   */
  public get data(): D {
    return this._data;
  }

  /**
   * 設定報警資料
   *
   * @method public
   * @param data 報警資料
   */
  public set data(data: D) {
    this._data = data;
  }

  /**
   * 更新報警資料
   *
   * @method public
   * @param data 報警資料
   * @return 回傳物件本身
   */
  public updateData(data: D): this {
    this._data = data;
    return this;
  }

  /**
   * 更新報警
   *
   * @method public
   * @return 回傳物件本身
   */
  public updateAlarm(): this | Promise<this> {
    this._current.change(this);
    return this;
  }

  /**
   * 更新報警狀態
   *
   * @method public
   * @param state 報警狀態
   * @return 回傳物件本身
   */
  public updateLevel(state: AlarmState): this {
    this._current = state;
    this._timestamp = new Date().getTime();
    this._template.publish(this);
    return this;
  }
}
