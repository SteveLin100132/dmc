"use strict";
/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 報警範本
 * @CREATE Sunday, 12th September 2021 8:55:59 pm
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
exports.AlarmTemplate = void 0;
const fs = require("fs");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const config_1 = require("../models/config");
const core_1 = require("./../../../core");
const alarm_1 = require("./../alarm");
/**
 * 報警範本
 *
 * @template S 消費的原始資料
 * @template T 消費後轉換格式的報警資料
 * @template P 打包成報警所需的資料格式
 */
class AlarmTemplate {
    /**
     * @param id      報警服務 ID
     * @param options 報警流程配置
     */
    constructor(id, options = new config_1.AlarmConfigEntity()) {
        this.id = id;
        this.options = options;
        /**
         * 報警上拋資料訂閱主題
         */
        this.payloadSubject = new rxjs_1.Subject();
        /**
         * 日誌
         */
        this.logger = new core_1.Log4js('ALARM');
        this.storage = new core_1.LocalStorageAdapter(`./storage/${id}`);
        this.options = new config_1.AlarmConfigEntity(this.options);
    }
    /**
     * 復原報警狀態
     *
     * @method private
     */
    recover() {
        return __awaiter(this, void 0, void 0, function* () {
            const files = fs.readdirSync(`./storage/${this.id}`);
            yield Promise.all(files.map((file) => __awaiter(this, void 0, void 0, function* () {
                const raw = yield this.storage.get(file);
                if (raw) {
                    const { level, timestamp, entity } = raw;
                    const key = this.keyBy(entity);
                    const state = this.getAlarmStateByLevel(level, entity);
                    const alarm = new alarm_1.Alarm(entity, state, this, key);
                    alarm.timestamp = timestamp;
                    this.alarmTrigger.init(key, alarm);
                    this.logger.debug(`recover ${key} to alarm level ${level}`);
                }
                return file;
            })));
        });
    }
    /**
     * 透過等級取得對應等級的報警狀態
     *
     * @method private
     * @param level 報警等級
     * @param entity 資料實體
     * @return 回傳對應等級的報警狀態
     */
    getAlarmStateByLevel(level, entity) {
        if (level === null) {
            return this.defaultLevel(entity);
        }
        else if (level === 'L4') {
            return this.level4(entity);
        }
        else if (level === 'L3') {
            return this.level3(entity);
        }
        else if (level === 'L2') {
            return this.level2(entity);
        }
        else if (level === 'L1') {
            return this.level1(entity);
        }
        else {
            throw new Error(`unknown level: ${level}`);
        }
    }
    /**
     * 初始化
     *
     * @method public
     */
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('alarm initialize');
        });
    }
    /**
     * 該筆資料是否要排除
     *
     * @method public
     * @param entity 資料實體
     * @return 回傳該筆資料是否要排除
     */
    exclude(entity) {
        return false;
    }
    /**
     * 保存報警資料
     *
     * @method public
     * @param entity 資料實體
     */
    storeAlarmEntity(entity) {
        // 保存報警資料
        const key = this.keyBy(entity);
        const alarm = new alarm_1.Alarm(entity, this.defaultLevel(entity), this, key);
        this.alarmTrigger.set(key, entity, alarm);
    }
    /**
     * 取得資料生產者
     *
     * @method public
     * @return 回傳資料生產者
     */
    producer() {
        return __awaiter(this, void 0, void 0, function* () {
            return new core_1.HttpProducerAdapter(this.publishedLocation);
        });
    }
    /**
     * 執行報警判定
     *
     * @method public
     * @return 回傳報警發送結果
     */
    execute() {
        this.consume();
        return this.payloadSubject.asObservable();
    }
    /**
     * 訂閱報警資料
     *
     * @method public
     */
    consume() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.init();
            yield this.recover();
            this.alarmTrigger.trigger();
            const consumer = yield this.consumer();
            const consume$ = consumer.consume().pipe(
            // 解析消費後的資料
            (0, operators_1.mergeMap)(message => this.resolve(message)), 
            // 該筆資料是否要排除
            (0, operators_1.filter)(d => !this.exclude(d)), 
            // 將資料寫入報警資料觸發器
            (0, operators_1.tap)(d => this.storeAlarmEntity(d)));
            consume$.subscribe();
        });
    }
    /**
     * 發送報警
     *
     * @method public
     * @param alarm 報警等級狀態
     */
    publish(alarm) {
        return __awaiter(this, void 0, void 0, function* () {
            // 發送報警
            const producer = yield this.producer();
            const retry = new core_1.RetryProducerAdapter(producer, this.options.retry);
            const payload = this.payload(alarm);
            retry.publish(payload, error => {
                if (error) {
                    this.logger.error(error);
                }
                else {
                    this.logger.trace(JSON.stringify(payload));
                }
                this.payloadSubject.next({ error, result: payload });
            });
            // 將報警資料寫入實體檔案保存
            const level = alarm.level;
            const timestamp = alarm.timestamp;
            const key = alarm.key;
            const entity = alarm.data;
            if (level !== null) {
                this.logger.debug(`level ${level} insert storage`, key);
                yield this.storage.set(key, { level, timestamp, entity });
            }
            else {
                this.logger.debug(`level ${level} delete storage`, key);
                yield this.storage.delete(key);
            }
        });
    }
}
exports.AlarmTemplate = AlarmTemplate;
