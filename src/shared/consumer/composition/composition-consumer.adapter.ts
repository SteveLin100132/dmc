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

import { merge, Observable, Subject } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { ConsumerAdapter, ConsumerResolveStrategy } from './../../../core';

/**
 * 複合資料消費者
 *
 * @template D 合成後的資料格式
 */
export class CompositionConsumerAdapter<D = any> extends ConsumerAdapter<
  null,
  D
> {
  /**
   * 數據暫存
   */
  private _tempStorage = new Map<string, D>();
  /**
   * 訂閱項目
   */
  private _subject = new Subject<D>();
  /**
   * 鍵值合成方法
   *
   * @param data 當前消費的資料
   * @return 回傳資料鍵值
   */
  private _key = (data: any) => JSON.stringify(data);
  /**
   * 資料合成方法
   *
   * @param name  消費者名稱
   * @param cache 先前合成完畢的資料
   * @param data  當前新消費的資料
   * @return 回傳合成後的資料
   */
  private _process?: (name: string, cache: D | undefined, data: any) => D;
  /**
   * 資料消費者轉接器群組
   */
  private _consumers = new Map<
    string,
    [ConsumerAdapter, ConsumerResolveStrategy]
  >();

  constructor() {
    super(null);
  }

  /**
   * 處理合成消費資料
   *
   * @method private
   * @param name 消費者名稱
   * @param data 消費資料
   * @return 回傳合成後的資料
   */
  private merge(name: string, data: any): { k: string; e: D } {
    if (this._process) {
      return {
        k: this._key(data),
        e: this._process(name, this._tempStorage.get(this._key(data)), data),
      };
    } else {
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
  public addConsumer(
    name: string,
    consumer: ConsumerAdapter,
    resolver: ConsumerResolveStrategy,
  ): this {
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
  public keyBy<T = any>(keyFn: (data: T) => string): this {
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
  public process(
    process: (name: string, cache: D | undefined, data: any) => D,
  ): this {
    this._process = process;
    return this;
  }

  /**
   * 消費資料
   *
   * @method public
   * @return 取得要消費的資料
   */
  public consume(): Observable<D> {
    const consume$ = Array.from(this._consumers)
      // 打散消費者名稱、解析器
      .map(c => ({ name: c[0], consumer: c[1][0], resolver: c[1][1] }))
      // 對消費資料進行解析，並與消費者名稱重新合成
      .map(r =>
        r.consumer.consume().pipe(
          // 透過解析策略進行資料解析
          mergeMap(d => r.resolver.resolve(d)),
          // 將解析後的資料與資料消費者名稱進行合成
          map(entity => ({ name: r.name, entity })),
        ),
      );
    merge(...consume$)
      .pipe(
        // 處理合成資料
        map(d => this.merge(d.name, d.entity)),
        // 將資料保存至暫存
        tap(p => this._tempStorage.set(p.k, p.e)),
        // 將資料送至串流
        tap(p => this._subject.next(p.e)),
      )
      .subscribe();
    return this._subject.asObservable();
  }
}
