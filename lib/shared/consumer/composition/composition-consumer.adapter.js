"use strict";
/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 複合資料消費者
 * @CREATE Thursday, 16th September 2021 8:12:37 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompositionConsumerAdapter = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const core_1 = require("./../../../core");
/**
 * 複合資料消費者
 *
 * @template D 合成後的資料格式
 */
class CompositionConsumerAdapter extends core_1.ConsumerAdapter {
    constructor() {
        super(null);
        /**
         * 數據暫存
         */
        this._tempStorage = new Map();
        /**
         * 訂閱項目
         */
        this._subject = new rxjs_1.Subject();
        /**
         * 鍵值合成方法
         *
         * @param data 當前消費的資料
         * @return 回傳資料鍵值
         */
        this._key = (data) => JSON.stringify(data);
        /**
         * 資料消費者轉接器群組
         */
        this._consumers = new Map();
    }
    /**
     * 處理合成消費資料
     *
     * @method private
     * @param name 消費者名稱
     * @param data 消費資料
     * @return 回傳合成後的資料
     */
    merge(name, data) {
        if (this._process) {
            return {
                k: this._key(data),
                e: this._process(name, this._tempStorage.get(this._key(data)), data),
            };
        }
        else {
            throw new Error('Please process callback');
        }
    }
    /**
     * 添加資料消費者轉接器
     *
     * @method public
     * @param name     資料消費者名稱
     * @param consumer 資料消費者轉接器
     * @param resolver 消費資料解析策略
     * @return 回傳物件本身
     */
    addConsumer(name, consumer, resolver) {
        this._consumers.set(name, [consumer, resolver]);
        return this;
    }
    /**
     * 設定鍵值合成方法
     *
     * @method public
     * @param keyFn 鍵值合成方法
     * @return 回傳物件本身
     */
    keyBy(keyFn) {
        this._key = keyFn;
        return this;
    }
    /**
     * 實作資料合成方法
     *
     * @method public
     * @param process 資料合成方法
     * @return 回傳物件本身
     */
    process(process) {
        this._process = process;
        return this;
    }
    /**
     * 消費資料
     *
     * @method public
     * @return 取得要消費的資料
     */
    consume() {
        const consume$ = Array.from(this._consumers)
            // 打散消費者名稱、解析器
            .map(c => ({ name: c[0], consumer: c[1][0], resolver: c[1][1] }))
            // 對消費資料進行解析，並與消費者名稱重新合成
            .map(r => r.consumer.consume().pipe(
        // 透過解析策略進行資料解析
        (0, operators_1.mergeMap)(d => r.resolver.resolve(d)), 
        // 將解析後的資料與資料消費者名稱進行合成
        (0, operators_1.map)(entity => ({ name: r.name, entity }))));
        (0, rxjs_1.merge)(...consume$)
            .pipe(
        // 處理合成資料
        (0, operators_1.map)(d => this.merge(d.name, d.entity)), 
        // 將資料保存至暫存
        (0, operators_1.tap)(p => this._tempStorage.set(p.k, p.e)), 
        // 將資料送至串流
        (0, operators_1.tap)(p => this._subject.next(p.e)))
            .subscribe();
        return this._subject.asObservable();
    }
}
exports.CompositionConsumerAdapter = CompositionConsumerAdapter;
