/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 報警範本
 * @CREATE Sunday, 12th September 2021 8:55:59 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
import { Observable } from 'rxjs';
import { AlarmConfig } from '../models/config';
import { AlarmTriggerStrategy, Consumer, Log4js, Producer } from './../../../core';
import { Alarm } from './../alarm';
import { AlarmModel, AlarmPayload } from './../models';
import { AlarmProducer } from './../producer';
import { AlarmState } from './../state';
/**
 * 報警範本
 *
 * @template S 消費的原始資料
 * @template T 消費後轉換格式的報警資料
 * @template P 打包成報警所需的資料格式
 */
export declare abstract class AlarmTemplate<S = any, T = any, P = AlarmModel> implements AlarmProducer {
    protected id: string;
    protected options: AlarmConfig;
    /**
     * 儲存功能
     */
    private storage;
    /**
     * 報警上拋資料訂閱主題
     */
    private payloadSubject;
    /**
     * 報警觸發器
     */
    protected abstract alarmTrigger: AlarmTriggerStrategy<T>;
    /**
     * 報警發送位置
     */
    protected abstract publishedLocation: string;
    /**
     * 日誌
     */
    protected logger: Log4js;
    /**
     * @param id      報警服務 ID
     * @param options 報警流程配置
     */
    constructor(id: string, options?: AlarmConfig);
    /**
     * 復原報警狀態
     *
     * @method private
     */
    private recover;
    /**
     * 透過等級取得對應等級的報警狀態
     *
     * @method private
     * @param level 報警等級
     * @param entity 資料實體
     * @return 回傳對應等級的報警狀態
     */
    private getAlarmStateByLevel;
    /**
     * 初始化
     *
     * @method public
     */
    init(): Promise<void>;
    /**
     * 取得資料消費者
     *
     * @method public
     * @return 回傳資料消費者
     */
    abstract consumer(): Promise<Consumer<S>>;
    /**
     * 解析消費資料
     *
     * @method public
     * @param message 消費資料
     * @return 回傳解析後的消費資料
     */
    abstract resolve(message: S): Promise<T>;
    /**
     * 該筆資料是否要排除
     *
     * @method public
     * @param entity 資料實體
     * @return 回傳該筆資料是否要排除
     */
    exclude(entity: T): boolean;
    /**
     * 取得資料Key值
     *
     * @method public
     * @param entity 資料實體
     * @return 回傳資料Key值
     */
    abstract keyBy(entity: T): string;
    /**
     * 取得預設的報警等級狀態
     *
     * @method public
     * @param entity 資料實體
     * @return 回傳預設的報警等級狀態
     */
    abstract defaultLevel(entity: T): AlarmState;
    /**
     * 取得等級 4 報警等級狀態
     *
     * @method public
     * @param entity 資料實體
     * @return 回傳等級 4 報警等級狀態
     */
    abstract level4(entity: T): AlarmState;
    /**
     * 取得等級 3 報警等級狀態
     *
     * @method public
     * @param entity 資料實體
     * @return 回傳等級 3 報警等級狀態
     */
    abstract level3(entity: T): AlarmState;
    /**
     * 取得等級 2 報警等級狀態
     *
     * @method public
     * @param entity 資料實體
     * @return 回傳等級 2 報警等級狀態
     */
    abstract level2(entity: T): AlarmState;
    /**
     * 取得等級 1 報警等級狀態
     *
     * @method public
     * @param entity 資料實體
     * @return 回傳等級 1 報警等級狀態
     */
    abstract level1(entity: T): AlarmState;
    /**
     * 保存報警資料
     *
     * @method public
     * @param entity 資料實體
     */
    storeAlarmEntity(entity: T): void;
    /**
     * 打包報警發送數據
     *
     * @method public
     * @param alarm 報警等級狀態
     * @return 回傳報警發送數據
     */
    abstract payload(alarm: Alarm<T>): P;
    /**
     * 取得資料生產者
     *
     * @method public
     * @return 回傳資料生產者
     */
    producer(): Promise<Producer<P>>;
    /**
     * 執行報警判定
     *
     * @method public
     * @return 回傳報警發送結果
     */
    execute(): Observable<AlarmPayload<P>>;
    /**
     * 訂閱報警資料
     *
     * @method public
     */
    consume(): Promise<void>;
    /**
     * 發送報警
     *
     * @method public
     * @param alarm 報警等級狀態
     */
    publish(alarm: Alarm<T>): Promise<void>;
}
