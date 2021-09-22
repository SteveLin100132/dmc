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
import { AlarmTriggerStrategy, Log4js } from './../../../core';
/**
 * 混合式報警觸發策略模式
 */
export declare class MixinTriggerStrategy<D = any> extends AlarmTriggerStrategy<D> {
    private _cron;
    /**
     * 排程
     */
    private _schedule?;
    /**
     * 日誌
     */
    protected logger: Log4js;
    /**
     * @param _cron 排程設定
     */
    constructor(_cron: string);
    /**
     * 觸發報警更新
     *
     * @method public
     */
    trigger(): void;
}
