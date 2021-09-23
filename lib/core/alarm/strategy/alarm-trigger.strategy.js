"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlarmTriggerStrategy = void 0;
const rxjs_1 = require("rxjs");
const core_1 = require("./../../../core");
/**
 * 抽象觸發報警策略模式
 */
class AlarmTriggerStrategy {
    /**
     * @param alarm 報警狀態管理者
     */
    constructor(alarm = new Map()) {
        this.alarm = alarm;
        /**
         * 報警資料訂閱項目
         */
        this.subject = new rxjs_1.Subject();
        /**
         * 日誌
         */
        this.logger = new core_1.Log4js('TRIGGER.DRIVEN');
    }
    /**
     * 初始化報警狀態管理者
     *
     * @method public
     * @param key          報警 Key 值
     * @param defaultLevel 預設報警狀態管理者
     */
    init(key, defaultLevel) {
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
    set(key, entity, defaultLevel) {
        const alarm = this.get(key);
        if (alarm) {
            alarm.updateData(entity);
            this.alarm.set(key, alarm);
        }
        else {
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
    get(key) {
        return this.alarm.get(key);
    }
    /**
     * 取得所有報警狀態管理者
     *
     * @method public
     * @return 回傳所有報警狀態管理者
     */
    getAll() {
        return this.alarm;
    }
    /**
     * 刪除特定鍵值得報警狀態管理者
     *
     * @method public
     * @param key 報警狀態管理者鍵值
     */
    delete(key) {
        this.alarm.delete(key);
    }
}
exports.AlarmTriggerStrategy = AlarmTriggerStrategy;
