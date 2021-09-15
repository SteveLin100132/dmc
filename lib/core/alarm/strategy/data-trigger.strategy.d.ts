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
import { Log4js } from './../../logger';
import { AlarmTriggerStrategy } from './alarm-trigger.strategy';
/**
 * 資料報警觸發策略模式
 */
export declare class DataTriggerStrategy<D = any> extends AlarmTriggerStrategy<D> {
    /**
     * 日誌
     */
    protected logger: Log4js;
    /**
     * 觸發報警更新
     *
     * @method public
     */
    trigger(): void;
}
