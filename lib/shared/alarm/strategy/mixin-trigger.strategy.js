"use strict";
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
exports.MixinTriggerStrategy = void 0;
const schedule = require("node-schedule");
const core_1 = require("./../../../core");
/**
 * 混合式報警觸發策略模式
 */
class MixinTriggerStrategy extends core_1.AlarmTriggerStrategy {
    /**
     * @param _cron 排程設定
     */
    constructor(_cron) {
        super();
        this._cron = _cron;
        /**
         * 日誌
         */
        this.logger = new core_1.Log4js('MIXIN.DRIVEN');
    }
    /**
     * 觸發報警更新
     *
     * @method public
     */
    trigger() {
        // 透過時間驅動
        this._schedule = schedule.scheduleJob(this._cron, () => {
            this.alarm.forEach(alarm => alarm.updateAlarm());
        });
        // 透過資料驅動
        this.subject.subscribe((data) => __awaiter(this, void 0, void 0, function* () {
            const [key] = data;
            const alarm = this.alarm.get(key);
            if (alarm) {
                yield alarm.updateAlarm();
            }
        }));
    }
}
exports.MixinTriggerStrategy = MixinTriggerStrategy;
