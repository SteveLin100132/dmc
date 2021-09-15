/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 時間驅動報警服務
 * @CREATE Monday, 13th September 2021 8:11:34 am
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
  MqttConsumerAdapter,
  MqttPayloadStrategy,
  StateRecord,
  TimerTriggerStrategy,
} from './../../lib';
import { MeterReading } from './models';
import {
  Level1State,
  Level2State,
  Level3State,
  Level4State,
  NoneState,
} from './state';

/**
 * 時間驅動報警服務
 */
export class TimerDrivenService extends AlarmTemplate<
  IPublishPacket,
  MeterReading
> {
  /**
   * 白名單
   */
  private whitelist: string[] = [];
  /**
   * 報警觸發器
   */
  protected alarmTrigger: AlarmTriggerStrategy<MeterReading>;
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
  public async resolve(message: IPublishPacket): Promise<MeterReading> {
    return new MqttPayloadStrategy().resolve(message);
  }

  /**
   * 該筆資料是否要排除
   *
   * @override
   * @method public
   * @param entity 資料實體
   * @return 回傳該筆資料是否要排除
   */
  public exclude(entity: MeterReading): boolean {
    return (
      entity.meterId.match('DB') === null ||
      !this.whitelist.includes(entity.meterId)
    );
  }

  /**
   * 取得資料Key值
   *
   * @method public
   * @param entity 資料實體
   * @return 回傳資料Key值
   */
  public keyBy(entity: MeterReading): string {
    return `${entity.site}.${entity.building}.${entity.meterId}`;
  }

  /**
   * 取得預設的報警等級狀態
   *
   * @method public
   * @param entity 資料實體
   * @return 回傳預設的報警等級狀態
   */
  public defaultLevel(entity: MeterReading): AlarmState {
    return new NoneState();
  }

  /**
   * 打包報警發送數據
   *
   * @method public
   * @param alarm 報警等級狀態
   * @return 回傳報警發送數據
   */
  public payload(alarm: Alarm<MeterReading>): AlarmModel {
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
      evtvalue2: alarm.data.building,
      evtvalue3: alarm.data.meterId,
      toDMC: 1,
      toNotify: 0,
    });
  }
}
