/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 複合式資料消費者報警服務
 * @CREATE Thursday, 16th September 2021 10:35:54 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import * as mqtt from 'mqtt';
import {
  Alarm,
  AlarmEntity,
  AlarmModel,
  AlarmState,
  AlarmTemplate,
  AlarmTriggerStrategy,
  CompositionConsumerAdapter,
  Consumer,
  MixinTriggerStrategy,
  MqttConsumerAdapter,
  MqttPayloadStrategy,
  StateRecord,
} from './../../lib';
import { Composition, CompositionEntity, Enviroment } from './models';
import {
  Level1State,
  Level2State,
  Level3State,
  Level4State,
  NoneState,
} from './state';

/**
 * 複合式資料消費者報警服務
 */
export class CompositionConsumerService extends AlarmTemplate<
  Composition,
  Composition
> {
  /**
   * 報警觸發器
   */
  protected alarmTrigger: AlarmTriggerStrategy<Composition>;
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
  constructor(protected id = 'composition') {
    super(id);
    this.alarmTrigger = new MixinTriggerStrategy('*/1 * * * * *');
    this.publishedLocation = 'http://localhost:4000';
  }

  /**
   * 取得資料消費者
   *
   * @method public
   * @return 回傳資料消費者
   */
  public async consumer(): Promise<Consumer<Composition>> {
    // 溫度資料來源
    const wdClient = mqtt.connect('mqtt://localhost:1883');
    const wdTopic = 'your/mqtt/topic1/#';
    const wdConsumer = new MqttConsumerAdapter(wdClient, wdTopic);
    const wdResolver = new MqttPayloadStrategy();

    // 濕度資料來源
    const sdClient = mqtt.connect('mqtt://localhost:1883');
    const sdTopic = 'your/mqtt/topic2/#';
    const sdConsumer = new MqttConsumerAdapter(sdClient, sdTopic);
    const sdResolver = new MqttPayloadStrategy();

    return new CompositionConsumerAdapter()
      .addConsumer('wd', wdConsumer, wdResolver)
      .addConsumer('sd', sdConsumer, sdResolver)
      .keyBy<Enviroment>(d => `${d.Plant}.${d.Building}.${d.Location}`)
      .process((n, c, d) => new CompositionEntity(c).update(n, d));
  }

  /**
   * 解析消費資料
   *
   * @method public
   * @param message 消費資料
   * @return 回傳解析後的消費資料
   */
  public async resolve(message: Composition): Promise<Composition> {
    return message;
  }

  /**
   * 取得資料Key值
   *
   * @method public
   * @param entity 資料實體
   * @return 回傳資料Key值
   */
  public keyBy(entity: Composition): string {
    return `${entity.Plant}.${entity.Building}.${entity.Location}`;
  }

  /**
   * 取得預設的報警等級狀態
   *
   * @method public
   * @param entity 資料實體
   * @return 回傳預設的報警等級狀態
   */
  public defaultLevel(entity: Composition): AlarmState {
    return new NoneState();
  }

  /**
   * 打包報警發送數據
   *
   * @method public
   * @param alarm 報警等級狀態
   * @return 回傳報警發送數據
   */
  public payload(alarm: Alarm<Composition>): AlarmModel {
    return new AlarmEntity({
      site: alarm.data.Plant,
      plant: alarm.data.Plant,
      eventId: 'FEM001',
      eventType: 0,
      syncId: alarm.key,
      alertType: alarm.level === null ? 1 : 0,
      alertItem: 1,
      IssueType: 1,
      level: alarm.level,
      shortMessage: `${alarm.key} over standard`,
      eventTime: new Date().getTime().toString(),
      evtvalue1: alarm.data.Plant,
      evtvalue2: alarm.data.Building,
      evtvalue3: alarm.data.NAME,
      toDMC: 1,
      toNotify: 0,
    });
  }
}
