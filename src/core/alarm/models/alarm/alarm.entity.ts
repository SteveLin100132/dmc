/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 報警資料實體
 * @CREATE Monday, 13th September 2021 12:06:16 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { AlarmLevel } from 'src/core';
import { AlarmModel } from './alarm.model';

/**
 * 報警資料實體
 */
export class AlarmEntity implements AlarmModel {
  /**
   * 報警對應 Site
   */
  public site = '';
  /**
   * 報警對應廠別
   */
  public plant = '';
  /**
   * 報警事件 ID (由 NotifyU 提供)
   */
  public eventId = '';
  /**
   * 報警事件類型，0: 表示該事件須被追蹤、1: 表示僅通知
   */
  public eventType: 0 | 1 = 0;
  /**
   * 該報警 ID (報警升級依據)
   */
  public syncId = '';
  /**
   * 報警通報類型，0: 表示事件持續中、1: 表示事件結束
   */
  public alertType: 0 | 1 = 1;
  /**
   * 報警類型，1: By Time、2: By Status、3: By Pcs
   */
  public alertItem: 1 | 2 | 3 = 1;
  /**
   * 異常通知類型，由各系統自行定義，默認為 0
   */
  public IssueType = 0;
  /**
   * 報警 UUID，非回覆情況下給空字串
   */
  public uId = '';
  /**
   * 報警狀態，非回覆情況下給 0 (0: open、1: review、2: close、3: ongoing、4: pending)
   */
  public status = 0;
  /**
   * 報警等級 (L4, L3, L3, L1)
   */
  public level: AlarmLevel = null;
  /**
   * 報警標題
   */
  public shortMessage = '';
  /**
   * 報警時間戳
   */
  public eventTime = '';
  /**
   * 報警額外欄外說明
   */
  public evtvalue1?: string;
  /**
   * 報警額外欄外說明
   */
  public evtvalue2?: string;
  /**
   * 報警額外欄外說明
   */
  public evtvalue3?: string;
  /**
   * 報警額外欄外說明
   */
  public evtvalue4?: string;
  /**
   * 報警額外欄外說明
   */
  public evtvalue5?: string;
  /**
   * 報警額外欄外說明
   */
  public evtvalue6?: string;
  /**
   * 報警額外欄外說明
   */
  public evtvalue7?: string;
  /**
   * 報警額外欄外說明
   */
  public evtvalue8?: string;
  /**
   * 負責人，留空
   */
  public pic = '';
  /**
   * 負責人主管，留空
   */
  public mPic = '';
  /**
   * 負責人主管電話，留空
   */
  public mPicPhone = '';
  /**
   * 發送人員工號，留空
   */
  public userId = '';
  /**
   * 回覆行為模式，非回覆情況下給空字串
   */
  public actionId = '';
  /**
   * 回覆內容，非回覆情況下給空字串
   */
  public comment = '';
  /**
   * 延期處理逾期時間，非回覆情況下給空字串
   */
  public extendDate = '';
  /**
   * 報警回覆的人員工號，非回覆情況下給空字串
   */
  public replyUserId = '';
  /**
   * 報警回覆的人員名稱，非回覆情況下給空字串
   */
  public replyUserName = '';
  /**
   * 報警回覆的日期，非回覆情況下給空字串
   */
  public replyDate = '';
  /**
   * 提供 DMC 報警
   */
  public toDMC = 1;
  /**
   * 提供 NotifyU 報警
   */
  public toNotify = 1;
  /**
   * 報警對應線別
   */
  public line?: string;
  /**
   * 報警對應設備名稱
   */
  public machineName?: string;

  /**
   * @param alarm 報警資料
   */
  constructor(alarm?: AlarmModel) {
    Object.assign(this, alarm);
  }
}
