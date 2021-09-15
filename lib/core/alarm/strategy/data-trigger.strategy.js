"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataTriggerStrategy = void 0;
const logger_1 = require("./../../logger");
const alarm_trigger_strategy_1 = require("./alarm-trigger.strategy");
/**
 * 資料報警觸發策略模式
 */
class DataTriggerStrategy extends alarm_trigger_strategy_1.AlarmTriggerStrategy {
    constructor() {
        super(...arguments);
        /**
         * 日誌
         */
        this.logger = new logger_1.Log4js('DATA.DRIVEN');
    }
    /**
     * 觸發報警更新
     *
     * @method public
     */
    trigger() {
        this.subject.subscribe((data) => __awaiter(this, void 0, void 0, function* () {
            const [key] = data;
            const alarm = this.alarm.get(key);
            if (alarm) {
                yield alarm.updateAlarm();
            }
        }));
    }
}
exports.DataTriggerStrategy = DataTriggerStrategy;
