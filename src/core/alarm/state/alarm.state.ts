/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 抽象報警狀態模式
 * @CREATE Friday, 10th September 2021 8:03:34 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { Alarm } from '../alarm';
import { Log4js, LoggerAdapter } from './../../../core';
import { AlarmLevel } from './../models';

/**
 * 抽象報警狀態模式
 */
export abstract class AlarmState {
  /**
   * 日誌
   */
  protected logger: LoggerAdapter;
  /**
   * 報警等級
   */
  public abstract level: AlarmLevel;

  /**
   * @param name 狀態名稱
   */
  constructor(protected name = 'STATE') {
    this.logger = new Log4js(name);
  }

  /**
   * 更新報警
   *
   * @method public
   * @param alarm 報警狀態
   */
  public abstract change(alarm: Alarm): void | Promise<void>;
}
