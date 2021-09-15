"use strict";
/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 報警範本設定檔資料實體
 * @CREATE Tuesday, 14th September 2021 1:43:55 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlarmConfigEntity = void 0;
const wistroni40_retry_1 = require("wistroni40-retry");
/**
 * 報警範本設定檔資料實體
 */
class AlarmConfigEntity {
    /**
     * @param config 報警範本設定檔資料
     */
    constructor(config) {
        /**
         * 重新拋送機制配置
         */
        this.retry = new wistroni40_retry_1.RetryOptionEntity();
        this.retry = new wistroni40_retry_1.RetryOptionEntity(config === null || config === void 0 ? void 0 : config.retry);
        this.custom = config === null || config === void 0 ? void 0 : config.custom;
    }
}
exports.AlarmConfigEntity = AlarmConfigEntity;
