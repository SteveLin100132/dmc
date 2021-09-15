/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 排程資料消費者
 * @CREATE Tuesday, 14th September 2021 7:02:02 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import * as schedule from 'node-schedule';
import { Observable, of, Subject } from 'rxjs';
import { concatAll } from 'rxjs/operators';
import { ConsumerAdapter, CronExecutor } from './../../../core';

/**
 * 排程資料消費者
 */
export class CronConsumerAdapter<R = any> extends ConsumerAdapter<
  CronExecutor,
  R
> {
  /**
   * 排程
   */
  private _schedule?: schedule.Job;
  /**
   * 要訂閱的項目
   */
  private _subject = new Subject<R>();

  /**
   * @param _cron    排程
   * @param executor 排程執行器
   * @param batch    是否已批量(Array)方式送出數據
   */
  constructor(
    private _cron: string,
    protected executor: CronExecutor,
    protected batch = true,
  ) {
    super(executor);
    this._schedule = schedule.scheduleJob(this._cron, this.trigger.bind(this));
  }

  /**
   * 執行排程執行器
   *
   * @method private
   */
  private async trigger(): Promise<void> {
    const result = await this.executor.exec();
    if (this.batch) {
      this._subject.next(result);
    } else {
      of(result)
        .pipe(concatAll())
        .subscribe((res: any) => this._subject.next(res));
    }
  }

  /**
   * 消費資料
   *
   * @method public
   * @return 取得要消費的資料
   */
  public consume(): Observable<R> {
    return this._subject.asObservable();
  }
}
