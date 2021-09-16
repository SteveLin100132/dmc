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
import { Observable } from 'rxjs';
import { ConsumerAdapter, ConsumerResolveStrategy } from './../../../core';
/**
 * 複合資料消費者
 *
 * @template D 合成後的資料格式
 */
export declare class CompositionConsumerAdapter<D = any> extends ConsumerAdapter<null, D> {
    /**
     * 數據暫存
     */
    private _tempStorage;
    /**
     * 訂閱項目
     */
    private _subject;
    /**
     * 鍵值合成方法
     *
     * @param data 當前消費的資料
     * @return 回傳資料鍵值
     */
    private _key;
    /**
     * 資料合成方法
     *
     * @param name  消費者名稱
     * @param cache 先前合成完畢的資料
     * @param data  當前新消費的資料
     * @return 回傳合成後的資料
     */
    private _process?;
    /**
     * 資料消費者轉接器群組
     */
    private _consumers;
    constructor();
    /**
     * 處理合成消費資料
     *
     * @method private
     * @param name 消費者名稱
     * @param data 消費資料
     * @return 回傳合成後的資料
     */
    private merge;
    /**
     * 添加資料消費者轉接器
     *
     * @method public
     * @param name     資料消費者名稱
     * @param consumer 資料消費者轉接器
     * @param resolver 消費資料解析策略
     * @return 回傳物件本身
     */
    addConsumer(name: string, consumer: ConsumerAdapter, resolver: ConsumerResolveStrategy): this;
    /**
     * 設定鍵值合成方法
     *
     * @method public
     * @param keyFn 鍵值合成方法
     * @return 回傳物件本身
     */
    keyBy<T = any>(keyFn: (data: T) => string): this;
    /**
     * 實作資料合成方法
     *
     * @method public
     * @param process 資料合成方法
     * @return 回傳物件本身
     */
    process(process: (name: string, cache: D | undefined, data: any) => D): this;
    /**
     * 消費資料
     *
     * @method public
     * @return 取得要消費的資料
     */
    consume(): Observable<D>;
}
