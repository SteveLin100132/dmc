"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alarm = void 0;
/**
 * 抽象報警狀態
 */
class Alarm {
    /**
     * @param _data     報警資料
     * @param _current  報警當前狀態
     * @param _template 報警範本
     * @param _key      報警鍵值
     */
    constructor(_data, _current, _template, _key = '') {
        this._data = _data;
        this._current = _current;
        this._template = _template;
        this._key = _key;
        /**
         * 報警時間戳
         */
        this._timestamp = new Date().getTime();
    }
    /**
     * 取得報警時間戳
     *
     * @method public
     * @return 回傳報警時間戳
     */
    get timestamp() {
        return this._timestamp;
    }
    /**
     * 設定報警時間戳
     *
     * @method public
     * @param time 報警時間戳
     */
    set timestamp(time) {
        this._timestamp = time;
    }
    /**
     * 取得當前報警等級
     *
     * @method public
     * @return 回傳當前報警等級
     */
    get level() {
        return this._current.level;
    }
    /**
     * 取得報警鍵值
     *
     * @method public
     * @return 回傳報警鍵值
     */
    get key() {
        return this._key;
    }
    /**
     * 更新報警鍵值
     *
     * @method public
     * @param key 報警鍵值
     * @return 回傳物件本身
     */
    updatekey(key) {
        this._key = key;
        return this;
    }
    /**
     * 取得報警資料
     *
     * @method public
     * @return 回傳報警資料
     */
    get data() {
        return this._data;
    }
    /**
     * 設定報警資料
     *
     * @method public
     * @param data 報警資料
     */
    set data(data) {
        this._data = data;
    }
    /**
     * 更新報警資料
     *
     * @method public
     * @param data 報警資料
     * @return 回傳物件本身
     */
    updateData(data) {
        this._data = data;
        return this;
    }
    /**
     * 更新報警
     *
     * @method public
     * @return 回傳物件本身
     */
    updateAlarm() {
        this._current.change(this);
        return this;
    }
    /**
     * 更新報警狀態
     *
     * @method public
     * @param state 報警狀態
     * @return 回傳物件本身
     */
    updateLevel(state) {
        this._current = state;
        this._timestamp = new Date().getTime();
        this._template.publish(this);
        return this;
    }
}
exports.Alarm = Alarm;
