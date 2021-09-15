# wistroni40-dmc

# Install

```
npm i wistroni40-dmc --save
```

# Table of Contents

- [Quickstart](#quickstart)
- [Feature](#feature)
- [Example](#example)
- [Alarm API](#alarm-api)
- [Consumer API](#consumer-api)

# Feature

- Logger
  - 建立抽象日誌轉接器，提供客製日誌功能
  - 建立 Log4js 日誌轉接器
- Storage
  - 建立備援儲存功能，提供資料保存
  - 建立 Local Storage 的備援儲存功能
- CRON
  - 建立抽象排程執行器，提供客製設定排程工作
  - 建立 ElasticSearch 查詢排程執行器
- Consumer
  - 建立 Consumer 抽象類別，提供客製 Consumer 轉接器
  - 建立 Kafka Consumer 轉接器
  - 建立 MQTT Consumer 轉接器
  - 建立 CRON Consumer 轉接器
  - 建立 Consumer 資料解析策略
    - 建立 Kafka Confluent Avro 資料解析策略
    - 建立 Kafka JSON 資料解析策略
    - 建立 MQTT JSON 資料解析策略
    - 建立 ElasticSearch Hits 資料解析策略
    - 建立 ElasticSearch 聚合資料解析策略
- Producer
  - 建立 Producer 抽象類別，提供客製 Producer 轉接器
  - 建立 Kafka Producer 轉接器
  - 建立 HTTP Post 轉接器
- Alarm
  - 建立抽象報警流程範本，只需繼承並實作(或覆寫)對應屬性及方法，即可發送報警
  - 建立抽象報警狀態物件，只需繼承並實作對應方法，即可讓報警自動升級或解除
  - 報警流程範本內建時間驅動(`Timer-Driven`)、資料驅動(`Data-Driven`)及混合驅動
    (`Mixin-Driven`)，三種驅動報警的類型
  - 報警流程範本內建失敗重新拋送機制，當上拋失敗，可設定重新拋送次數及間格時間，
    進行重拋
  - 報警流程範本內建備援機制，當服務終止，會保存之前報警的升級紀錄，避免重新啟動
    後，誤拋報警資料

# Example

- [時間驅動範例](https://github.com/SteveLin100132/wistroni40-dmc/blob/master/examples/timer-driven)
- [資料驅動範例](https://github.com/SteveLin100132/wistroni40-dmc/blob/master/examples/data-driven)
- [混合驅動範例](https://github.com/SteveLin100132/wistroni40-dmc/blob/master/examples/mixin-driven)
- [排程資料報警範例](https://github.com/SteveLin100132/wistroni40-dmc/blob/master/examples/cron-consumer)

# Alarm API

Alarm 物件提供報警狀態紀錄物件以及報警流程範本

## Alarm State (Abstract Class)

Alarm State 提供報警升級條件的功能，各等級的報警僅需要實作其升級或解除的邏輯，繼
承 AlarmState，實作以下內容

- Properties
  - level
- Methods
  - change

```typescript
import { Alarm, AlarmLevel, AlarmState } from 'wistroni40-dmc';
import { Enviroment } from '../models';
import { Level4State } from './level4.state';

/**
 * 未達報警狀態
 */
export class NoneState extends AlarmState {
  /**
   * 報警等級
   */
  public level: AlarmLevel = null;

  constructor() {
    super('NONE.STATE');
  }

  /**
   * 更新報警
   *
   * @method public
   * @param alarm 報警狀態
   */
  public change(alarm: Alarm<Enviroment>): void | Promise<void> {
    if (/** 達報警升級條件 **/)) {
      alarm.updateLevel(new Level4State());
    }
  }
}
```

## Alarm Template (Abstract Class)

Alarm Template 提供報警流程的實作，僅需將特定 Properties 與 Methods 實作完成，即
可讓報警自動升級、自動保存與自動發送

### Constructor

| 參數    |    型別     | 說明                                         |
| ------- | :---------: | :------------------------------------------- |
| id      |   string    | 報警服務 ID，同時也作為備援資料保存的 Key 值 |
| options | AlarmConfig | 報警流程配置                                 |

```typescript
import { AlarmTemplate } from 'wistroni40-dmc';

class AlarmService extends AlarmTemplate {
  /**
   * @param id      報警服務 ID
   * @param options 報警流程配置
   */
  constructor(
    protected id: string,
    protected options: AlarmConfig = new AlarmConfigEntity(),
  ) {
    super(id, options);
  }
}
```

### Properties

#### alarmTrigger

報警觸發器，提供報警資料觸發機制

| 型別                            | 實作 |
| ------------------------------- | :--: |
| AlarmTriggerStrategy&#60;D&#62; |  ✔️  |

##### Timer Driven 時間驅動

作為 By Time 升級報警的驅動方式

```typescript
import { AlarmTemplate, TimerTriggerStrategy } from 'wistroni40-dmc';

class AlarmService extends AlarmTemplate {
  /**
   * 報警觸發器
   *
   * @description 建構值提供 CRON
   */
  protected alarmTrigger: AlarmTriggerStrategy = new TimerTriggerStrategy(
    '*/1 * * * * *',
  );
}
```

##### Data Driven 資料驅動

作為 By Status 或 By Pcs 升級報警的驅動方式

```typescript
import { AlarmTemplate, DataTriggerStrategy } from 'wistroni40-dmc';

class AlarmService extends AlarmTemplate {
  /**
   * 報警觸發器
   */
  protected alarmTrigger: AlarmTriggerStrategy = new DataTriggerStrategy();
}
```

##### Mixin Driven 混合驅動

結合時間驅動(`Timer-Driven `)與資料驅動(`Data-Driven`)的報警驅動方式

```typescript
import { AlarmTemplate, MixinTriggerStrategy } from 'wistroni40-dmc';

class AlarmService extends AlarmTemplate {
  /**
   * 報警觸發器
   */
  protected alarmTrigger: AlarmTriggerStrategy = new MixinTriggerStrategy(
    '*/1 * * * * *',
  );
}
```

#### stateRecord

報警等級狀態表，提供服務重新啟動時，可將過去的報警狀態復原

| 型別        | 實作 |
| ----------- | :--: |
| StateRecord |  ✔️  |

```typescript
import { AlarmTemplate } from 'wistroni40-dmc';

class AlarmService extends AlarmTemplate {
  /**
   * 報警等級狀態表
   *
   * @description 須提供 L4 ~ L1 各報警狀態的紀錄物件
   */
  protected stateRecord: StateRecord = {
    L4: new Level4State(),
    L3: new Level3State(),
    L2: new Level2State(),
    L1: new Level1State(),
  };
}
```

#### publishedLocation

報警發送位置

| 型別   | 實作 |
| ------ | :--: |
| string |  ✔️  |

```typescript
import { AlarmTemplate } from 'wistroni40-dmc';

class AlarmService extends AlarmTemplate {
  /**
   * 報警發送位置
   */
  protected publishedLocation: string;

  /**
   * @param id 報警服務 ID
   */
  constructor(protected id = 'power-meter') {
    super(id);
    this.publishedLocation = 'http://localhost:4000';
  }
}
```

### Methods

#### init()

**覆寫:** ✔️

初始化，提供報警開始時初始狀態的功能

```typescript
import { AlarmTemplate } from 'wistroni40-dmc';

class AlarmService extends AlarmTemplate {
  /**
   * 初始化
   *
   * @override
   * @method public
   */
  public async init(): Promise<void> {
    // TODO
  }
}
```

#### consumer()

**實作:** ✔️

取得資料消費者

| 參數   |                 型別                 | 說明           |
| ------ | :----------------------------------: | :------------- |
| Return | Promise&#60;Consumer&#60;D&#62;&#62; | 回傳資料消費者 |

```typescript
import { AlarmTemplate } from 'wistroni40-dmc';

class AlarmService extends AlarmTemplate {
  /**
   * 取得資料消費者
   *
   * @method public
   * @return 回傳資料消費者
   */
  public async consumer(): Promise<Consumer<S>> {
    const client = mqtt.connect('mqtt://localhost:1883');
    const topic = 'wks/cim/t1/femii/alarm/dev/enviroment/#';
    return new MqttConsumerAdapter(client, topic);
  }
}
```

#### resolve()

**實作:** ✔️

解析消費資料，目前內建以下解析策略

- MqttPayloadStrategy: MQTT 訂閱資料解析
- ConfluentConsumeStrategy: Kafka Confluent Avro 資料解析
- JsonConsumeStrategy: Kafka JSON 資料解析

| 參數    |        型別        | 說明                 |
| ------- | :----------------: | :------------------- |
| message |    &#60;S&#62;     | 消費資料             |
| Return  | Promise&#60;T&#62; | 回傳解析後的消費資料 |

```typescript
import { AlarmTemplate } from 'wistroni40-dmc';

class AlarmService extends AlarmTemplate {
  /**
   * 解析消費資料
   *
   * @method public
   * @param message 消費資料
   * @return 回傳解析後的消費資料
   */
  public async resolve(message: S): Promise<T> {
    return new MqttPayloadStrategy().resolve(message);
  }
}
```

#### exclude()

**覆寫:** ✔️

該筆資料是否要排除

| 參數   |    型別     | 說明                                            |
| ------ | :---------: | :---------------------------------------------- |
| entity | &#60;T&#62; | 資料實體                                        |
| Return |   boolean   | 回傳該筆資料是否要排除，true: 排除、false: 保留 |

```typescript
import { AlarmTemplate } from 'wistroni40-dmc';

class AlarmService extends AlarmTemplate {
  /**
   * 該筆資料是否要排除
   *
   * @override
   * @method public
   * @param entity 資料實體
   * @return 回傳該筆資料是否要排除
   */
  public exclude(entity: T): boolean {
    return /** 可根據資料或其他因素決定是否要保留該筆資料 */;
  }
}
```

#### keyBy()

**實作:** ✔️

取得資料 Key 值，該值可以做報警所需的 Sync ID

| 參數   |    型別     | 說明            |
| ------ | :---------: | :-------------- |
| entity | &#60;T&#62; | 資料實體        |
| Return |   string    | 回傳資料 Key 值 |

```typescript
import { AlarmTemplate } from 'wistroni40-dmc';

class AlarmService extends AlarmTemplate {
  /**
   * 取得資料Key值
   *
   * @method public
   * @param entity 資料實體
   * @return 回傳資料Key值
   */
  public keyBy(entity: T): string {
    return `${entity.Plant}.${entity.Building}.${entity.NAME}`;
  }
}
```

#### defaultLevel()

**實作:** ✔️

取得預設的報警等級狀態

| 參數   |    型別     | 說明                   |
| ------ | :---------: | :--------------------- |
| entity | &#60;T&#62; | 資料實體               |
| Return | AlarmState  | 回傳預設的報警等級狀態 |

```typescript
import { AlarmTemplate } from 'wistroni40-dmc';

class AlarmService extends AlarmTemplate {
  /**
   * 取得預設的報警等級狀態
   *
   * @method public
   * @param entity 資料實體
   * @return 回傳預設的報警等級狀態
   */
  public defaultLevel(entity: T): AlarmState {
    return new NoneState();
  }
}
```

#### payload()

**實作:** ✔️

打包報警發送數據

| 參數   |           型別           | 說明             |
| ------ | :----------------------: | :--------------- |
| alarm  |     Alarm&#60;T&#62;     | 報警等級狀態     |
| Return | &#60;P = AlarmModel&#62; | 回傳報警發送數據 |

```typescript
import { AlarmTemplate } from 'wistroni40-dmc';

class AlarmService extends AlarmTemplate {
  /**
   * 打包報警發送數據
   *
   * @method public
   * @param alarm 報警等級狀態
   * @return 回傳報警發送數據
   */
  public payload(alarm: Alarm<T>): AlarmModel {
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
```

#### producer()

**覆寫:** ✔️

取得資料生產者

| 參數   |                       型別                        | 說明           |
| ------ | :-----------------------------------------------: | :------------- |
| Return | Promise&#60;Producer&#60;P = AlarmModel&#62;&#62; | 回傳資料生產者 |

```typescript
import { AlarmTemplate } from 'wistroni40-dmc';

class AlarmService extends AlarmTemplate {
  /**
   * 取得資料生產者
   *
   * @override
   * @method public
   * @return 回傳資料生產者
   */
  public async producer(): Promise<Producer<P>> {
    return new HttpProducerAdapter(/** URL */);
  }
}
```

#### execute()

執行報警判定

| 參數   |                           型別                           | 說明             |
| ------ | :------------------------------------------------------: | :--------------- |
| Return | Observable&#60;AlarmPayload&#60;P = AlarmModel&#62;&#62; | 回傳報警發送結果 |

```typescript
import { AlarmTemplate } from 'wistroni40-dmc';

class AlarmService extends AlarmTemplate {
  ...
}

const alarmService = new AlarmService('alarm');
alarmService.execute().subscribe(res => console.log(res));
```

# Consumer API

Consumer 物件作為介接報警獲取所需的資料來源，目前提供以下轉接器，若所需要的
Consumer 不包含在以下，可實作 `ConsumerAdapter`

- Kafka: 支持 `kafka-node` 套件的轉接器，該套件使用方式可參閱
  https://www.npmjs.com/package/kafka-node
- MQTT: 支持 `mqtt` 套件的轉接器，該套件使用方式可參閱
  https://www.npmjs.com/package/mqtt
- CRON: 支持使用排程定期呼叫資料，可作為 Batch 或轉換為 Streaming 的方式使用，目
  前提供以下幾種 datasource 進行串接
  - ElasticSearch: 支持 `elasticsearch` 套件的執行器，該套件使用方式可參閱
    https://www.npmjs.com/package/elasticsearch

## Kafka Adapter

支持 Kafka 資料介接，並提供 Confluent Avro 與 JSON 的資料解析方式

**KafkaConsumerAdapter**

| 參數     |     型別      | 說明             |
| -------- | :-----------: | :--------------- |
| consumer | ConsumerGroup | Kafka 資料消費者 |

kafka 轉接器範例，使用 JSON 解析策略

```typescript
import { ConsumerGroup } from 'kafka-node';
import { mergeMap } from 'rxjs/operators';
import { KafkaConsumerAdapter, JsonConsumeStrategy } from 'wistroni40-dmc';

// 初始化 Kafka Consumer
const options = { kafkaHost: 'localhost:1883' };
const topic = 'your.kafka.topic';
const consumer = new ConsumerGroup(options, topic);

// Kafka 轉接器
const consumerAdapter = new KafkaConsumerAdapter(consumer);

// Kafka JSON 解析策略
const strategy = new JsonConsumeStrategy();

// 訂閱資料
consumerAdapter
  .consume()
  .pipe(mergeMap(res => strategy.resolve(res)))
  .subscribe(res => console.log(res));
```

kafka 轉接器範例，使用 Confluent Avro 解析策略

```typescript
import { ConsumerGroup } from 'kafka-node';
import { mergeMap } from 'rxjs/operators';
import { KafkaConsumerAdapter, ConfluentConsumeStrategy } from 'wistroni40-dmc';

// 初始化 Kafka Consumer
const options = { kafkaHost: 'localhost:1883' };
const topic = 'your.kafka.topic';
const consumer = new ConsumerGroup(options, topic);

// Kafka 轉接器
const consumerAdapter = new KafkaConsumerAdapter(consumer);

// Kafka JSON 解析策略，須提供 Schema Registry 位置
const strategy = new ConfluentConsumeStrategy('http://localhost:8080');

// 訂閱資料
consumerAdapter
  .consume()
  .pipe(mergeMap(res => strategy.resolve(res)))
  .subscribe(res => console.log(res));
```

## MQTT Adapter

支持 MQTT 資料介接，並提供 JSON 的資料解析方式

**MqttConsumerAdapter**

| 參數     |    型別    | 說明              |
| -------- | :--------: | :---------------- |
| consumer | MqttClient | MQTT 資料消費者   |
| topic    |   string   | MQTT 要訂閱的主題 |

```typescript
import * as mqtt from 'mqtt';
import { mergeMap } from 'rxjs/operators';
import { MqttConsumerAdapter, MqttPayloadStrategy } from 'wistroni40-dmc';

// 初始化 MQTT Client
const topic = 'your/mqtt/topic/#';
const client = mqtt.connect('mqtt://localhost:1883');

// MQTT 轉接器
const consumerAdapter = new MqttConsumerAdapter(client, topic);

// Kafka JSON 解析策略
const strategy = new MqttPayloadStrategy();

// 訂閱資料
consumerAdapter
  .consume()
  .pipe(mergeMap(res => strategy.resolve(res)))
  .subscribe(res => console.log(res));
```

## CRON Adapter

支持排程定期呼叫資料，使用 ElasticSearch 作為資料調用執行器

**CronConsumerAdapter**

| 參數     |      型別      | 說明                          |
| -------- | :------------: | :---------------------------- |
| \_cron   |     string     | 排程, ex: `*/5 * * * * *`     |
| executor |  CronExecutor  | 排程執行器                    |
| batch    | boolean = true | 是否已批量(Array)方式送出數據 |

```typescript
import { Client } from 'elasticsearch';
import { ElasticsearchSearchExecutor } from 'wistroni40-dmc';

// 初始化 ElasticSearch Client
const client = new Client({ host: ['http://localhost:9200/'] });
const index = 'your_es_index';
const type = 'your_es_type';
// 使用 ElasticBuilder 建立 ElasticSearch 查詢語句
const builder = new QueryBuilder();
const executor = new ElasticsearchSearchExecutor(
  client,
  index,
  type,
  builder,
  'hits',
);

// CRON 轉接器
const cron = '*/5 * * * * *';
const consumerAdapter = new CronConsumerAdapter(cron, executor, false);

// 訂閱資料
consumerAdapter.consume().subscribe(res => console.log(res));
```

## Custom Adapter

若無匹配的轉接器，可透過以下方式自行客製，以 MQTT 為例

```typescript
import { MqttClient } from 'mqtt';
import { IPublishPacket } from 'mqtt-packet';
import { Observable } from 'rxjs';
import { ConsumerAdapter } from 'wistroni40-dmc';

export class MqttConsumerAdapter extends ConsumerAdapter<
  MqttClient,
  IPublishPacket
> {
  /**
   * @param consumer 資料消費者
   * @param topic    要訂閱的主題
   */
  constructor(protected consumer: MqttClient, protected topic: string) {
    super(consumer);
  }

  /**
   * 消費資料
   *
   * @method public
   * @return 取得要消費的資料
   */
  public consume(): Observable<IPublishPacket> {
    return new Observable(sub => {
      this.consumer.on('connect', () => this.consumer.subscribe(this.topic));
      this.consumer.on('message', (topic, payload, packet) => sub.next(packet));
    });
  }
}
```
