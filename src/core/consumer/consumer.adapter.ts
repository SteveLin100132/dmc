/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 抽象資料消費者轉接器
 * @CREATE Thursday, 9th September 2021 2:29:11 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { Observable } from 'rxjs';
import { Consumer } from './consumer';

/**
 * 抽象資料消費者轉接器
 */
export abstract class ConsumerAdapter<C = any, D = any> implements Consumer<D> {
  /**
   * @param consumer 資料消費者
   */
  constructor(protected consumer: C) {}

  /**
   * 消費資料
   *
   * @method public
   * @return 取得要消費的資料
   */
  public abstract consume(): Observable<D>;
}
