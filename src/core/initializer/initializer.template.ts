/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 抽象初始化程序範本模式
 * @CREATE Thursday, 7th October 2021 5:12:51 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import * as schedule from 'node-schedule';
import { AlarmTemplate } from './../alarm';

/**
 * 抽象初始化程序範本模式
 */
export abstract class Initializer<D = any> {
  /**
   * 排程
   */
  private _schedule?: schedule.Job;

  /**
   * @param alarm 報警服務
   * @param cron  排程時間設置
   */
  constructor(protected alarm: AlarmTemplate, cron?: string) {
    // 有提供排程才進行定期更新
    if (cron) {
      this._schedule = schedule.scheduleJob(cron, this.update.bind(this));
    }
  }

  /**
   * 取得需要監控的資料
   *
   * @method public
   * @return 回傳需要監控的資料
   */
  public abstract findMonitoredData(): Promise<D[]>;

  /**
   * 更新要監控的資料
   *
   * @method public
   */
  public async update(): Promise<void> {
    // 取得要監控的資料，作為要監控的依據
    const entities = await this.findMonitoredData();

    // 將新的監控的資料加入報警資料中
    entities.forEach(entity => {
      if (!this.alarm.isAlarmEntityExist(entity)) {
        this.alarm.storeAlarmEntity(entity);
      }
    });

    // 將移除的監控的資料從報警資料中移除
    this.alarm.getAllAlarmEntities().forEach((alarm, key) => {
      const exist =
        entities.find(e => this.alarm.keyBy(e) === key) !== undefined;
      if (!exist) {
        this.alarm.deleteAlarmEntity(alarm.data);
      }
    });
  }

  /**
   * 初始化要監控的資料
   *
   * @method public
   */
  public async init(): Promise<void> {
    // 取得為要監控的資料
    const entities = await this.findMonitoredData();

    // 將要要監控的資料保存至報警資料當中
    entities.forEach(entity => this.alarm.storeAlarmEntity(entity));
  }
}
