/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 報警資料模型
 * @CREATE Monday, 13th September 2021 10:46:43 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { AlarmLevel } from './alarm-level.type';

/**
 * 報警資料模型
 */
export interface AlarmModel {
  /**
   * 報警對應 Site
   */
  site: string;
  /**
   * 報警對應廠別
   */
  plant: string;
  /**
   * 報警事件 ID (由 NotifyU 提供)
   */
  eventId: string;
  /**
   * 報警事件類型，0: 表示該事件須被追蹤、1: 表示僅通知
   */
  eventType: 0 | 1;
  /**
   * 該報警 ID (報警升級依據)
   */
  syncId: string;
  /**
   * 報警通報類型，0: 表示事件持續中、1: 表示事件結束
   */
  alertType: 0 | 1;
  /**
   * 報警類型，1: By Time、2: By Status、3: By Pcs
   */
  alertItem: 1 | 2 | 3;
  /**
   * 異常通知類型，由各系統自行定義，默認為 0
   */
  IssueType: number;
  /**
   * 報警 UUID，非回覆情況下給空字串
   */
  uId?: string;
  /**
   * 報警狀態，非回覆情況下給 0 (0: open、1: review、2: close、3: ongoing、4: pending)
   */
  status?: number;
  /**
   * 報警等級 (L4, L3, L3, L1)
   */
  level: AlarmLevel;
  /**
   * 報警標題
   */
  shortMessage: string;
  /**
   * 報警時間戳
   */
  eventTime: string;
  /**
   * 報警額外欄外說明
   */
  evtvalue1?: string;
  /**
   * 報警額外欄外說明
   */
  evtvalue2?: string;
  /**
   * 報警額外欄外說明
   */
  evtvalue3?: string;
  /**
   * 報警額外欄外說明
   */
  evtvalue4?: string;
  /**
   * 報警額外欄外說明
   */
  evtvalue5?: string;
  /**
   * 報警額外欄外說明
   */
  evtvalue6?: string;
  /**
   * 報警額外欄外說明
   */
  evtvalue7?: string;
  /**
   * 報警額外欄外說明
   */
  evtvalue8?: string;
  /**
   * 負責人，留空
   */
  pic?: string;
  /**
   * 負責人主管，留空
   */
  mPic?: string;
  /**
   * 負責人主管電話，留空
   */
  mPicPhone?: string;
  /**
   * 發送人員工號，留空
   */
  userId?: string;
  /**
   * 回覆行為模式，非回覆情況下給空字串
   */
  actionId?: string;
  /**
   * 回覆內容，非回覆情況下給空字串
   */
  comment?: string;
  /**
   * 延期處理逾期時間，非回覆情況下給空字串
   */
  extendDate?: string;
  /**
   * 報警回覆的人員工號，非回覆情況下給空字串
   */
  replyUserId?: string;
  /**
   * 報警回覆的人員名稱，非回覆情況下給空字串
   */
  replyUserName?: string;
  /**
   * 報警回覆的日期，非回覆情況下給空字串
   */
  replyDate?: string;
  /**
   * 提供 DMC 報警
   */
  toDMC: number;
  /**
   * 提供 NotifyU 報警
   */
  toNotify: number;
  /**
   * 報警對應線別
   */
  line?: string;
  /**
   * 報警對應設備名稱
   */
  machineName?: string;
}
