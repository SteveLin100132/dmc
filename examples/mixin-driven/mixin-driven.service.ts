/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 混合式驅動報警服務
 * @CREATE Wednesday, 15th September 2021 4:38:45 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import * as mqtt from 'mqtt';
import { IPublishPacket } from 'mqtt-packet';
import {
  Alarm,
  AlarmEntity,
  AlarmModel,
  AlarmState,
  AlarmTemplate,
  AlarmTriggerStrategy,
  Consumer,
  MixinTriggerStrategy,
  MqttConsumerAdapter,
  MqttPayloadStrategy,
  StateRecord,
} from './../../lib';
import { Enviroment } from './models';
import {
  Level1State,
  Level2State,
  Level3State,
  Level4State,
  NoneState,
} from './state';

/**
 * 混合式驅動報警服務
 */
export class MixinDrivenService extends AlarmTemplate<
  IPublishPacket,
  Enviroment
> {
  /**
   * 報警觸發器
   */
  protected alarmTrigger: AlarmTriggerStrategy<Enviroment>;
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
  constructor(protected id = 'enviroment') {
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
  public async consumer(): Promise<Consumer<IPublishPacket>> {
    const client = mqtt.connect('mqtt://localhost:1883');
    const topic = 'your/mqtt/topic/#';
    return new MqttConsumerAdapter(client, topic);
  }

  /**
   * 解析消費資料
   *
   * @method public
   * @param message 消費資料
   * @return 回傳解析後的消費資料
   */
  public async resolve(message: IPublishPacket): Promise<Enviroment> {
    return new MqttPayloadStrategy().resolve(message);
  }

  /**
   * 取得資料Key值
   *
   * @method public
   * @param entity 資料實體
   * @return 回傳資料Key值
   */
  public keyBy(entity: Enviroment): string {
    return `${entity.Plant}.${entity.Building}.${entity.NAME}`;
  }

  /**
   * 取得預設的報警等級狀態
   *
   * @method public
   * @param entity 資料實體
   * @return 回傳預設的報警等級狀態
   */
  public defaultLevel(entity: Enviroment): AlarmState {
    return new NoneState();
  }

  /**
   * 取得等級 4 報警等級狀態
   *
   * @method public
   * @param entity 資料實體
   * @return 回傳等級 4 報警等級狀態
   */
  public level4(entity: Enviroment): AlarmState {
    return new Level4State();
  }

  /**
   * 取得等級 3 報警等級狀態
   *
   * @method public
   * @param entity 資料實體
   * @return 回傳等級 3 報警等級狀態
   */
  public level3(entity: Enviroment): AlarmState {
    return new Level3State();
  }

  /**
   * 取得等級 2 報警等級狀態
   *
   * @method public
   * @param entity 資料實體
   * @return 回傳等級 2 報警等級狀態
   */
  public level2(entity: Enviroment): AlarmState {
    return new Level2State();
  }

  /**
   * 取得等級 1 報警等級狀態
   *
   * @method public
   * @param entity 資料實體
   * @return 回傳等級 1 報警等級狀態
   */
  public level1(entity: Enviroment): AlarmState {
    return new Level1State();
  }

  /**
   * 打包報警發送數據
   *
   * @method public
   * @param alarm 報警等級狀態
   * @return 回傳報警發送數據
   */
  public payload(alarm: Alarm<Enviroment>): AlarmModel {
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
