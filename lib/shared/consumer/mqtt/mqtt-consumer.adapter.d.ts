/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： MQTT 資料消費者轉接器
 * @CREATE Friday, 10th September 2021 10:32:45 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
import { MqttClient } from 'mqtt';
import { IPublishPacket } from 'mqtt-packet';
import { Observable } from 'rxjs';
import { ConsumerAdapter } from './../../../core';
/**
 * MQTT 資料消費者轉接器
 */
export declare class MqttConsumerAdapter extends ConsumerAdapter<MqttClient, IPublishPacket> {
    protected consumer: MqttClient;
    protected topic: string;
    /**
     * @param consumer 資料消費者
     * @param topic    要訂閱的主題
     */
    constructor(consumer: MqttClient, topic: string);
    /**
     * 消費資料
     *
     * @method public
     * @return 取得要消費的資料
     */
    consume(): Observable<IPublishPacket>;
}
