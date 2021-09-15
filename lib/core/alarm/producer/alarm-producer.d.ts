/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 報警資料生產者
 * @CREATE Monday, 13th September 2021 4:52:20 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
import { Alarm } from './../alarm';
/**
 * 報警資料生產者
 */
export interface AlarmProducer {
    /**
     * 發送報警
     *
     * @method public
     * @param alarm 報警等級狀態
     */
    publish(alarm: Alarm): void;
}
