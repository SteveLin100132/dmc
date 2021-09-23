/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 抽象觸發報警策略模式
 * @CREATE Sunday, 12th September 2021 2:20:49 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
import { Subject } from 'rxjs';
import { Alarm } from '../alarm';
import { Log4js } from './../../../core';
/**
 * 觸發訂閱內容
 */
export declare type TriggerSubject<D = any> = [key: string, entity: D];
/**
 * 抽象觸發報警策略模式
 */
export declare abstract class AlarmTriggerStrategy<D = any> {
    protected alarm: Map<string, Alarm<D>>;
    /**
     * 報警資料訂閱項目
     */
    protected subject: Subject<TriggerSubject<D>>;
    /**
     * 日誌
     */
    protected logger: Log4js;
    /**
     * @param alarm 報警狀態管理者
     */
    constructor(alarm?: Map<string, Alarm<D>>);
    /**
     * 觸發報警更新
     *
     * @method public
     */
    abstract trigger(): void;
    /**
     * 初始化報警狀態管理者
     *
     * @method public
     * @param key          報警 Key 值
     * @param defaultLevel 預設報警狀態管理者
     */
    init(key: string, defaultLevel: Alarm<D>): void;
    /**
     * 設定報警狀態管理者
     *
     * @method public
     * @param key          報警 Key 值
     * @param entity       報警資料
     * @param defaultLevel 預設報警狀態管理者
     */
    set(key: string, entity: D, defaultLevel: Alarm<D>): void;
    /**
     * 取得報警狀態管理者
     *
     * @method public
     * @param key 報警Key值
     * @return 回傳報警狀態管理者
     */
    get(key: string): Alarm<D> | undefined;
    /**
     * 取得所有報警狀態管理者
     *
     * @method public
     * @return 回傳所有報警狀態管理者
     */
    getAll(): Map<string, Alarm<D>>;
    /**
     * 刪除特定鍵值得報警狀態管理者
     *
     * @method public
     * @param key 報警狀態管理者鍵值
     */
    delete(key: string): void;
}
