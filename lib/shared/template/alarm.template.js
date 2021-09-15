"use strict";
/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 報警範本
 * @CREATE Friday, 10th September 2021 11:29:13 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlarmTemplate = void 0;
const operators_1 = require("rxjs/operators");
const core_1 = require("./../../core");
/**
 * 報警範本
 */
class AlarmTemplate extends core_1.CoreTemplate {
    /**
     * @param consumer 資料消費者
     * @param producer 資料生產者
     * @param name     範本名稱
     */
    constructor(consumer, producer, name = 'CORE') {
        super(consumer, producer, name);
        this.consumer = consumer;
        this.producer = producer;
        this.name = name;
    }
    /**
     * 執行計算
     *
     * @method public
     */
    execute() {
        this.consumer
            .consume()
            .pipe((0, operators_1.tap)(message => this.logger.debug(message)))
            .subscribe();
    }
}
exports.AlarmTemplate = AlarmTemplate;
