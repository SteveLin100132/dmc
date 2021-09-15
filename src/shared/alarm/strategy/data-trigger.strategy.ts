/**
 * 專案名稱： wistroni40-alarm
 * 部門代號： ML8100
 * 檔案說明： 資料報警觸發策略模式
 * @CREATE Thursday, 27th May 2021 2:31:43 pm
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { AlarmTriggerStrategy, Log4js } from './../../../core';

/**
 * 資料報警觸發策略模式
 */
export class DataTriggerStrategy<D = any> extends AlarmTriggerStrategy<D> {
  /**
   * 日誌
   */
  protected logger = new Log4js('DATA.DRIVEN');

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
