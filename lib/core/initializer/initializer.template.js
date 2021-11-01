"use strict";
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
exports.Initializer = void 0;
const schedule = require("node-schedule");
/**
 * 抽象初始化程序範本模式
 */
class Initializer {
    /**
     * @param alarm 報警服務
     * @param cron  排程時間設置
     */
    constructor(alarm, cron) {
        this.alarm = alarm;
        // 有提供排程才進行定期更新
        if (cron) {
            this._schedule = schedule.scheduleJob(cron, this.update.bind(this));
        }
    }
    /**
     * 更新要監控的資料
     *
     * @method public
     */
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            // 取得要監控的資料，作為要監控的依據
            const entities = yield this.findMonitoredData();
            // 將新的監控的資料加入報警資料中
            entities.forEach(entity => {
                if (!this.alarm.isAlarmEntityExist(entity)) {
                    this.alarm.storeAlarmEntity(entity);
                }
            });
            // 將移除的監控的資料從報警資料中移除
            this.alarm.getAllAlarmEntities().forEach((alarm, key) => {
                const exist = entities.find(e => this.alarm.keyBy(e) === key) !== undefined;
                if (!exist) {
                    this.alarm.deleteAlarmEntity(alarm.data);
                }
            });
        });
    }
    /**
     * 初始化要監控的資料
     *
     * @method public
     */
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            // 取得為要監控的資料
            const entities = yield this.findMonitoredData();
            // 將要要監控的資料保存至報警資料當中
            entities.forEach(entity => this.alarm.storeAlarmEntity(entity));
        });
    }
}
exports.Initializer = Initializer;
