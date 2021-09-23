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

import * as fs from 'fs';
import { Observable, Subject } from 'rxjs';
import { filter, mergeMap, tap } from 'rxjs/operators';
import { AlarmConfig, AlarmConfigEntity } from '../models/config';
import {
  AlarmTriggerStrategy,
  Consumer,
  HttpProducerAdapter,
  LocalStorageAdapter,
  Log4js,
  Producer,
  RetryProducerAdapter,
  StorageAdapter,
} from './../../../core';
import { Alarm } from './../alarm';
import {
  AlarmLevel,
  AlarmModel,
  AlarmPayload,
  AlarmStorage,
} from './../models';
import { AlarmProducer } from './../producer';
import { AlarmState } from './../state';

/**
 * 報警範本
 *
 * @template S 消費的原始資料
 * @template T 消費後轉換格式的報警資料
 * @template P 打包成報警所需的資料格式
 */
export abstract class AlarmTemplate<S = any, T = any, P = AlarmModel>
  implements AlarmProducer
{
  /**
   * 儲存功能
   */
  private storage: StorageAdapter;
  /**
   * 報警上拋資料訂閱主題
   */
  private payloadSubject = new Subject<AlarmPayload<P>>();
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
  protected logger = new Log4js('ALARM');

  /**
   * @param id      報警服務 ID
   * @param options 報警流程配置
   */
  constructor(
    protected id: string,
    protected options: AlarmConfig = new AlarmConfigEntity(),
  ) {
    this.storage = new LocalStorageAdapter(`./storage/${id}`);
    this.options = new AlarmConfigEntity(this.options);
  }

  /**
   * 復原報警狀態
   *
   * @method private
   */
  private async recover(): Promise<void> {
    const files = fs.readdirSync(`./storage/${this.id}`);
    await Promise.all(
      files.map(async file => {
        const raw = await this.storage.get<AlarmStorage<T>>(file);
        if (raw) {
          const { level, timestamp, entity } = raw;
          const key = this.keyBy(entity);
          const state = this.getAlarmStateByLevel(level, entity);
          const alarm = new Alarm(entity, state, this, key);
          alarm.timestamp = timestamp;
          this.alarmTrigger.init(key, alarm);
          this.logger.debug(`recover ${key} to alarm level ${level}`);
        }
        return file;
      }),
    );
  }

  /**
   * 透過等級取得對應等級的報警狀態
   *
   * @method private
   * @param level 報警等級
   * @param entity 資料實體
   * @return 回傳對應等級的報警狀態
   */
  private getAlarmStateByLevel(level: AlarmLevel, entity: T): AlarmState {
    if (level === null) {
      return this.defaultLevel(entity);
    } else if (level === 'L4') {
      return this.level4(entity);
    } else if (level === 'L3') {
      return this.level3(entity);
    } else if (level === 'L2') {
      return this.level2(entity);
    } else if (level === 'L1') {
      return this.level1(entity);
    } else {
      throw new Error(`unknown level: ${level}`);
    }
  }

  /**
   * 保存報警資料
   *
   * @method public
   * @param entity 資料實體
   */
  public storeAlarmEntity(entity: T): void {
    // 保存報警資料
    const key = this.keyBy(entity);
    const alarm = new Alarm(entity, this.defaultLevel(entity), this, key);
    this.alarmTrigger.set(key, entity, alarm);
  }

  /**
   * 該報警資料是否存在
   *
   * @method public
   * @param entity 資料實體
   * @return 回傳該報警資料是否存在
   */
  public isAlarmEntityExist(entity: T): boolean {
    const key = this.keyBy(entity);
    return this.alarmTrigger.get(key) !== undefined;
  }

  /**
   * 刪除特定報警資料
   *
   * @method public
   * @param entity 資料實體
   */
  public deleteAlarmEntity(entity: T): void {
    const key = this.keyBy(entity);
    const alarm = this.alarmTrigger.get(key);
    if (alarm && alarm.level !== null) {
      alarm.updateLevel(this.defaultLevel(entity));
      this.alarmTrigger.delete(key);
    }
  }

  /**
   * 初始化
   *
   * @method public
   */
  public async init(): Promise<void> {
    this.logger.info('alarm initialize');
  }

  /**
   * 取得資料消費者
   *
   * @method public
   * @return 回傳資料消費者
   */
  public abstract consumer(): Promise<Consumer<S>>;

  /**
   * 解析消費資料
   *
   * @method public
   * @param message 消費資料
   * @return 回傳解析後的消費資料
   */
  public abstract resolve(message: S): Promise<T>;

  /**
   * 該筆資料是否要排除
   *
   * @method public
   * @param entity 資料實體
   * @return 回傳該筆資料是否要排除
   */
  public exclude(entity: T): boolean {
    return false;
  }

  /**
   * 取得資料Key值
   *
   * @method public
   * @param entity 資料實體
   * @return 回傳資料Key值
   */
  public abstract keyBy(entity: T): string;

  /**
   * 取得預設的報警等級狀態
   *
   * @method public
   * @param entity 資料實體
   * @return 回傳預設的報警等級狀態
   */
  public abstract defaultLevel(entity: T): AlarmState;

  /**
   * 取得等級 4 報警等級狀態
   *
   * @method public
   * @param entity 資料實體
   * @return 回傳等級 4 報警等級狀態
   */
  public abstract level4(entity: T): AlarmState;

  /**
   * 取得等級 3 報警等級狀態
   *
   * @method public
   * @param entity 資料實體
   * @return 回傳等級 3 報警等級狀態
   */
  public abstract level3(entity: T): AlarmState;

  /**
   * 取得等級 2 報警等級狀態
   *
   * @method public
   * @param entity 資料實體
   * @return 回傳等級 2 報警等級狀態
   */
  public abstract level2(entity: T): AlarmState;

  /**
   * 取得等級 1 報警等級狀態
   *
   * @method public
   * @param entity 資料實體
   * @return 回傳等級 1 報警等級狀態
   */
  public abstract level1(entity: T): AlarmState;

  /**
   * 打包報警發送數據
   *
   * @method public
   * @param alarm 報警等級狀態
   * @return 回傳報警發送數據
   */
  public abstract payload(alarm: Alarm<T>): P;

  /**
   * 取得資料生產者
   *
   * @method public
   * @return 回傳資料生產者
   */
  public async producer(): Promise<Producer<P>> {
    return new HttpProducerAdapter(this.publishedLocation);
  }

  /**
   * 執行報警判定
   *
   * @method public
   * @return 回傳報警發送結果
   */
  public execute(): Observable<AlarmPayload<P>> {
    this.consume();
    return this.payloadSubject.asObservable();
  }

  /**
   * 訂閱報警資料
   *
   * @method public
   */
  public async consume(): Promise<void> {
    await this.init();
    await this.recover();
    this.alarmTrigger.trigger();
    const consumer = await this.consumer();
    const consume$ = consumer.consume().pipe(
      // 解析消費後的資料
      mergeMap(message => this.resolve(message)),
      // 該筆資料是否要排除
      filter(d => !this.exclude(d)),
      // 將資料寫入報警資料觸發器
      tap(d => this.storeAlarmEntity(d)),
    );
    consume$.subscribe();
  }

  /**
   * 發送報警
   *
   * @method public
   * @param alarm 報警等級狀態
   */
  public async publish(alarm: Alarm<T>): Promise<void> {
    // 發送報警
    const producer = await this.producer();
    const retry = new RetryProducerAdapter(producer, this.options.retry);
    const payload = this.payload(alarm);
    retry.publish(payload, error => {
      if (error) {
        this.logger.error(error);
      } else {
        this.logger.trace(JSON.stringify(payload));
      }
      this.payloadSubject.next({ error, result: payload });
    });

    // 將報警資料寫入實體檔案保存
    const level = alarm.level;
    const timestamp = alarm.timestamp;
    const key = alarm.key;
    const entity = alarm.data;
    if (level !== null) {
      this.logger.debug(`level ${level} insert storage`, key);
      await this.storage.set(key, { level, timestamp, entity });
    } else {
      this.logger.debug(`level ${level} delete storage`, key);
      await this.storage.delete(key);
    }
  }
}
