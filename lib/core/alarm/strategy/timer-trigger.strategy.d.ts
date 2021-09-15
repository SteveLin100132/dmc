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
import { Log4js } from './../../logger';
import { AlarmTriggerStrategy } from './alarm-trigger.strategy';
/**
 * 時間報警觸發策略模式
 */
export declare class TimerTriggerStrategy<D = any> extends AlarmTriggerStrategy<D> {
    private _cron;
    /**
     * 排程
     */
    private readonly _schedule;
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
