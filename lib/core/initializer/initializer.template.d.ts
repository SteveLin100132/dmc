/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 抽象初始化程序範本模式
 * @CREATE Thursday, 7th October 2021 5:12:51 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
import { AlarmTemplate } from './../alarm';
/**
 * 抽象初始化程序範本模式
 */
export declare abstract class Initializer<D = any> {
    protected alarm: AlarmTemplate;
    /**
     * 排程
     */
    private _schedule?;
    /**
     * @param alarm 報警服務
     * @param cron  排程時間設置
     */
    constructor(alarm: AlarmTemplate, cron?: string);
    /**
     * 取得需要監控的資料
     *
     * @method public
     * @return 回傳需要監控的資料
     */
    abstract findMonitoredData(): Promise<D[]>;
    /**
     * 更新要監控的資料
     *
     * @method public
     */
    update(): Promise<void>;
    /**
     * 初始化要監控的資料
     *
     * @method public
     */
    init(): Promise<void>;
}
