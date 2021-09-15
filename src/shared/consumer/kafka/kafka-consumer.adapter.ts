/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： Kafka 資料消費者轉接器
 * @CREATE Thursday, 9th September 2021 2:37:22 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { ConsumerGroup, Message } from 'kafka-node';
import { Observable } from 'rxjs';
import { ConsumerAdapter } from '../../../core';

/**
 * Kafka 資料消費者轉接器
 */
export class KafkaConsumerAdapter extends ConsumerAdapter<
  ConsumerGroup,
  Message
> {
  /**
   * @param consumer 資料消費者
   */
  constructor(protected consumer: ConsumerGroup) {
    super(consumer);
  }

  /**
   * 消費資料
   *
   * @method public
   * @return 取得要消費的資料
   */
  public consume(): Observable<Message> {
    return new Observable(sub => {
      this.consumer.on('message', message => sub.next(message));
    });
  }
}
