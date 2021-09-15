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
import { RetryOption } from 'wistroni40-retry';
import { AlarmConfig } from './alarm-config.model';
/**
 * 報警範本設定檔資料實體
 */
export declare class AlarmConfigEntity<C = any> implements AlarmConfig<C> {
    /**
     * 重新拋送機制配置
     */
    retry?: RetryOption;
    /**
     * 客製設定
     */
    custom?: C;
    /**
     * @param config 報警範本設定檔資料
     */
    constructor(config?: Partial<AlarmConfig>);
}
