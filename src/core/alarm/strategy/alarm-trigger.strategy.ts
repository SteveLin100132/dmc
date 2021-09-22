/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 抽象觸發報警策略模式
 * @CREATE Sunday, 12th September 2021 2:20:49 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { Subject } from 'rxjs';
import { Alarm } from '../alarm';
import { Log4js } from './../../../core';

/**
 * 觸發訂閱內容
 */
export type TriggerSubject<D = any> = [key: string, entity: D];

/**
 * 抽象觸發報警策略模式
 */
export abstract class AlarmTriggerStrategy<D = any> {
  /**
   * 報警資料訂閱項目
   */
  protected subject = new Subject<TriggerSubject<D>>();
  /**
   * 日誌
   */
  protected logger = new Log4js('TRIGGER.DRIVEN');

  /**
   * @param alarm 報警狀態管理者
   */
  constructor(protected alarm = new Map<string, Alarm<D>>()) {}

  /**
   * 觸發報警更新
   *
   * @method public
   */
  public abstract trigger(): void;

  /**
   * 初始化報警狀態管理者
   *
   * @method public
   * @param key          報警 Key 值
   * @param defaultLevel 預設報警狀態管理者
   */
  public init(key: string, defaultLevel: Alarm<D>): void {
    this.alarm.set(key, defaultLevel);
  }

  /**
   * 設定報警狀態管理者
   *
   * @method public
   * @param key          報警 Key 值
   * @param entity       報警資料
   * @param defaultLevel 預設報警狀態管理者
   */
  public set(key: string, entity: D, defaultLevel: Alarm<D>): void {
    const alarm = this.get(key);
    if (alarm) {
      alarm.updateData(entity);
      this.alarm.set(key, alarm);
    } else {
      this.alarm.set(key, defaultLevel);
    }
    this.subject.next([key, entity]);
  }

  /**
   * 取得報警狀態管理者
   *
   * @method public
   * @param key 報警Key值
   * @return 回傳報警狀態管理者
   */
  public get(key: string): Alarm<D> | undefined {
    return this.alarm.get(key);
  }

  /**
   * 取得所有報警狀態管理者
   *
   * @method public
   * @return 回傳所有報警狀態管理者
   */
  public getAll(): Map<string, Alarm<D>> {
    return this.alarm;
  }
}
