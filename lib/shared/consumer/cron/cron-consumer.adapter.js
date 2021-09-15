"use strict";
/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 排程資料消費者
 * @CREATE Tuesday, 14th September 2021 7:02:02 pm
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
exports.CronConsumerAdapter = void 0;
const schedule = require("node-schedule");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const core_1 = require("./../../../core");
/**
 * 排程資料消費者
 */
class CronConsumerAdapter extends core_1.ConsumerAdapter {
    /**
     * @param _cron    排程
     * @param executor 排程執行器
     * @param batch    是否已批量(Array)方式送出數據
     */
    constructor(_cron, executor, batch = true) {
        super(executor);
        this._cron = _cron;
        this.executor = executor;
        this.batch = batch;
        /**
         * 要訂閱的項目
         */
        this._subject = new rxjs_1.Subject();
        this._schedule = schedule.scheduleJob(this._cron, this.trigger.bind(this));
    }
    /**
     * 執行排程執行器
     *
     * @method private
     */
    trigger() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.executor.exec();
            if (this.batch) {
                this._subject.next(result);
            }
            else {
                (0, rxjs_1.of)(result)
                    .pipe((0, operators_1.concatAll)())
                    .subscribe((res) => this._subject.next(res));
            }
        });
    }
    /**
     * 消費資料
     *
     * @method public
     * @return 取得要消費的資料
     */
    consume() {
        return this._subject.asObservable();
    }
}
exports.CronConsumerAdapter = CronConsumerAdapter;
