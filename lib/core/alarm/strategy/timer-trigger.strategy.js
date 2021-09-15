"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimerTriggerStrategy = void 0;
const schedule = require("node-schedule");
const logger_1 = require("./../../logger");
const alarm_trigger_strategy_1 = require("./alarm-trigger.strategy");
/**
 * 時間報警觸發策略模式
 */
class TimerTriggerStrategy extends alarm_trigger_strategy_1.AlarmTriggerStrategy {
    /**
     * @param _cron 排程設定
     */
    constructor(_cron) {
        super();
        this._cron = _cron;
        /**
         * 日誌
         */
        this.logger = new logger_1.Log4js('TIMER.DRIVEN');
        this._schedule = schedule.scheduleJob(this._cron, this.trigger.bind(this));
    }
    /**
     * 觸發報警更新
     *
     * @method public
     */
    trigger() {
        this.alarm.forEach(alarm => alarm.updateAlarm());
    }
}
exports.TimerTriggerStrategy = TimerTriggerStrategy;
