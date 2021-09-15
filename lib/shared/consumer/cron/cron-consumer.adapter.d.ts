/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 排程資料消費者
 * @CREATE Tuesday, 14th September 2021 7:02:02 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
import { Observable } from 'rxjs';
import { ConsumerAdapter, CronExecutor } from './../../../core';
/**
 * 排程資料消費者
 */
export declare class CronConsumerAdapter<R = any> extends ConsumerAdapter<CronExecutor, R> {
    private _cron;
    protected executor: CronExecutor;
    protected batch: boolean;
    /**
     * 排程
     */
    private _schedule?;
    /**
     * 要訂閱的項目
     */
    private _subject;
    /**
     * @param _cron    排程
     * @param executor 排程執行器
     * @param batch    是否已批量(Array)方式送出數據
     */
    constructor(_cron: string, executor: CronExecutor, batch?: boolean);
    /**
     * 執行排程執行器
     *
     * @method private
     */
    private trigger;
    /**
     * 消費資料
     *
     * @method public
     * @return 取得要消費的資料
     */
    consume(): Observable<R>;
}
