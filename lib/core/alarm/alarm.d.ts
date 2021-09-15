/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 抽象報警狀態
 * @CREATE Friday, 10th September 2021 8:08:52 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
import { AlarmLevel } from './models';
import { AlarmProducer } from './producer';
import { AlarmState } from './state';
/**
 * 抽象報警狀態
 */
export declare class Alarm<D = any> {
    private _data;
    private _current;
    private _template;
    private _key;
    /**
     * 報警時間戳
     */
    private _timestamp;
    /**
     * @param _data     報警資料
     * @param _current  報警當前狀態
     * @param _template 報警範本
     * @param _key      報警鍵值
     */
    constructor(_data: D, _current: AlarmState, _template: AlarmProducer, _key?: string);
    /**
     * 取得報警時間戳
     *
     * @method public
     * @return 回傳報警時間戳
     */
    get timestamp(): number;
    /**
     * 設定報警時間戳
     *
     * @method public
     * @param time 報警時間戳
     */
    set timestamp(time: number);
    /**
     * 取得當前報警等級
     *
     * @method public
     * @return 回傳當前報警等級
     */
    get level(): AlarmLevel;
    /**
     * 取得報警鍵值
     *
     * @method public
     * @return 回傳報警鍵值
     */
    get key(): string;
    /**
     * 更新報警鍵值
     *
     * @method public
     * @param key 報警鍵值
     * @return 回傳物件本身
     */
    updatekey(key: string): this;
    /**
     * 取得報警資料
     *
     * @method public
     * @return 回傳報警資料
     */
    get data(): D;
    /**
     * 設定報警資料
     *
     * @method public
     * @param data 報警資料
     */
    set data(data: D);
    /**
     * 更新報警資料
     *
     * @method public
     * @param data 報警資料
     * @return 回傳物件本身
     */
    updateData(data: D): this;
    /**
     * 更新報警
     *
     * @method public
     * @return 回傳物件本身
     */
    updateAlarm(): this | Promise<this>;
    /**
     * 更新報警狀態
     *
     * @method public
     * @param state 報警狀態
     * @return 回傳物件本身
     */
    updateLevel(state: AlarmState): this;
}
