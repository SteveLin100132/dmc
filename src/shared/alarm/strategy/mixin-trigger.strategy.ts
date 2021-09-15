/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 混合式報警觸發策略模式
 * @CREATE Wednesday, 15th September 2021 4:32:03 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import * as schedule from 'node-schedule';
import { AlarmTriggerStrategy, Log4js } from './../../../core';

/**
 * 混合式報警觸發策略模式
 */
export class MixinTriggerStrategy<D = any> extends AlarmTriggerStrategy<D> {
  /**
   * 排程
   */
  private readonly _schedule: schedule.Job;
  /**
   * 日誌
   */
  protected logger = new Log4js('MIXIN.DRIVEN');

  /**
   * @param _cron 排程設定
   */
  constructor(private _cron: string) {
    super();
    this._schedule = schedule.scheduleJob(this._cron, () => {
      this.alarm.forEach(alarm => alarm.updateAlarm());
    });
  }

  /**
   * 觸發報警更新
   *
   * @method public
   */
  public trigger(): void {
    this.subject.subscribe(async data => {
      const [key] = data;
      const alarm = this.alarm.get(key);
      if (alarm) {
        await alarm.updateAlarm();
      }
    });
  }
}
