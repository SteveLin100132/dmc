/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 排程資料消費者報警服務
 * @CREATE Wednesday, 15th September 2021 8:01:46 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { Client } from 'elasticsearch';
import {
  Alarm,
  AlarmEntity,
  AlarmModel,
  AlarmState,
  AlarmTemplate,
  AlarmTriggerStrategy,
  Consumer,
  CronConsumerAdapter,
  ElasticsearchSearchExecutor,
  StateRecord,
  TimerTriggerStrategy,
} from '../../lib';
import { RawConsumptionQueryBuilder } from './builder';
import { RawConsumption } from './models';
import {
  Level1State,
  Level2State,
  Level3State,
  Level4State,
  NoneState,
} from './state';

/**
 * 排程資料消費者報警服務
 */
export class CronConsumerService extends AlarmTemplate<
  RawConsumption,
  RawConsumption
> {
  /**
   * 白名單
   */
  private whitelist: string[] = [];
  /**
   * 報警觸發器
   */
  protected alarmTrigger: AlarmTriggerStrategy<RawConsumption>;
  /**
   * 報警發送位置
   */
  protected publishedLocation: string;
  /**
   * 報警等級狀態表
   */
  protected stateRecord: StateRecord = {
    L4: new Level4State(),
    L3: new Level3State(),
    L2: new Level2State(),
    L1: new Level1State(),
  };

  /**
   * @param id 報警服務 ID
   */
  constructor(protected id = 'power-meter') {
    super(id);
    this.alarmTrigger = new TimerTriggerStrategy('*/1 * * * * *');
    this.publishedLocation = 'http://localhost:4000';
  }

  /**
   * 初始化
   *
   * @override
   * @method public
   */
  public async init(): Promise<void> {
    this.whitelist = ['DB_14'];
  }

  /**
   * 取得資料消費者
   *
   * @method public
   * @return 回傳資料消費者
   */
  public async consumer(): Promise<Consumer<RawConsumption>> {
    const client = new Client({
      host: ['http://localhost:9200/'],
    });
    const index = 'index_*';
    const type = 'type';
    const builder = new RawConsumptionQueryBuilder();
    const executor = new ElasticsearchSearchExecutor(
      client,
      index,
      type,
      builder,
      'hits',
    );
    return new CronConsumerAdapter('*/5 * * * * *', executor, false);
  }

  /**
   * 解析消費資料
   *
   * @method public
   * @param message 消費資料
   * @return 回傳解析後的消費資料
   */
  public async resolve(message: RawConsumption): Promise<RawConsumption> {
    return message;
  }

  /**
   * 取得資料Key值
   *
   * @method public
   * @param entity 資料實體
   * @return 回傳資料Key值
   */
  public keyBy(entity: RawConsumption): string {
    return entity.site;
  }

  /**
   * 取得預設的報警等級狀態
   *
   * @method public
   * @param entity 資料實體
   * @return 回傳預設的報警等級狀態
   */
  public defaultLevel(entity: RawConsumption): AlarmState {
    return new NoneState();
  }

  /**
   * 打包報警發送數據
   *
   * @method public
   * @param alarm 報警等級狀態
   * @return 回傳報警發送數據
   */
  public payload(alarm: Alarm<RawConsumption>): AlarmModel {
    return new AlarmEntity({
      site: alarm.data.site,
      plant: alarm.data.site,
      eventId: 'FEM001',
      eventType: 0,
      syncId: alarm.key,
      alertType: alarm.level === null ? 1 : 0,
      alertItem: 1,
      IssueType: 0,
      level: alarm.level,
      shortMessage: `${alarm.key} missing`,
      eventTime: new Date().getTime().toString(),
      evtvalue1: alarm.data.site,
      toDMC: 1,
      toNotify: 0,
    });
  }
}
