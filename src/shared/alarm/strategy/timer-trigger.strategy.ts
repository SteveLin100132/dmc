/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 時間報警觸發策略模式
 * @CREATE Sunday, 12th September 2021 9:04:54 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import * as schedule from 'node-schedule';
import { AlarmTriggerStrategy, Log4js } from './../../../core';

/**
 * 時間報警觸發策略模式
 */
export class TimerTriggerStrategy<D = any> extends AlarmTriggerStrategy<D> {
  /**
   * 排程
   */
  private _schedule?: schedule.Job;
  /**
   * 日誌
   */
  protected logger = new Log4js('TIMER.DRIVEN');

  /**
   * @param _cron 排程設定
   */
  constructor(private _cron: string) {
    super();
  }

  /**
   * 觸發報警更新
   *
   * @method public
   */
  public trigger(): void {
    this._schedule = schedule.scheduleJob(this._cron, () => {
      this.alarm.forEach(alarm => alarm.updateAlarm());
    });
  }
}
