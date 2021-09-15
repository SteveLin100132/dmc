"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlarmEntity = void 0;
/**
 * 報警資料實體
 */
class AlarmEntity {
    /**
     * @param alarm 報警資料
     */
    constructor(alarm) {
        /**
         * 報警對應 Site
         */
        this.site = '';
        /**
         * 報警對應廠別
         */
        this.plant = '';
        /**
         * 報警事件 ID (由 NotifyU 提供)
         */
        this.eventId = '';
        /**
         * 報警事件類型，0: 表示該事件須被追蹤、1: 表示僅通知
         */
        this.eventType = 0;
        /**
         * 該報警 ID (報警升級依據)
         */
        this.syncId = '';
        /**
         * 報警通報類型，0: 表示事件持續中、1: 表示事件結束
         */
        this.alertType = 1;
        /**
         * 報警類型，1: By Time、2: By Status、3: By Pcs
         */
        this.alertItem = 1;
        /**
         * 異常通知類型，由各系統自行定義，默認為 0
         */
        this.IssueType = 0;
        /**
         * 報警 UUID，非回覆情況下給空字串
         */
        this.uId = '';
        /**
         * 報警狀態，非回覆情況下給 0 (0: open、1: review、2: close、3: ongoing、4: pending)
         */
        this.status = 0;
        /**
         * 報警等級 (L4, L3, L3, L1)
         */
        this.level = null;
        /**
         * 報警標題
         */
        this.shortMessage = '';
        /**
         * 報警時間戳
         */
        this.eventTime = '';
        /**
         * 負責人，留空
         */
        this.pic = '';
        /**
         * 負責人主管，留空
         */
        this.mPic = '';
        /**
         * 負責人主管電話，留空
         */
        this.mPicPhone = '';
        /**
         * 發送人員工號，留空
         */
        this.userId = '';
        /**
         * 回覆行為模式，非回覆情況下給空字串
         */
        this.actionId = '';
        /**
         * 回覆內容，非回覆情況下給空字串
         */
        this.comment = '';
        /**
         * 延期處理逾期時間，非回覆情況下給空字串
         */
        this.extendDate = '';
        /**
         * 報警回覆的人員工號，非回覆情況下給空字串
         */
        this.replyUserId = '';
        /**
         * 報警回覆的人員名稱，非回覆情況下給空字串
         */
        this.replyUserName = '';
        /**
         * 報警回覆的日期，非回覆情況下給空字串
         */
        this.replyDate = '';
        /**
         * 提供 DMC 報警
         */
        this.toDMC = 1;
        /**
         * 提供 NotifyU 報警
         */
        this.toNotify = 1;
        Object.assign(this, alarm);
    }
}
exports.AlarmEntity = AlarmEntity;
