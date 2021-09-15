/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 抽象報警狀態模式
 * @CREATE Friday, 10th September 2021 8:03:34 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
import { Alarm } from './alarm';
/**
 * 抽象報警狀態模式
 */
export declare abstract class AlarmState {
    /**
     * 報警等級
     */
    abstract level: string;
    /**
     * 更新報警
     *
     * @method public
     * @param alarm 報警狀態
     */
    abstract change(alarm: Alarm): void;
}
