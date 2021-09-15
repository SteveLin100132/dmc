/**
 * 專案名稱： wistroni40-dmc
 * 部門代號： MLD500
 * 檔案說明： 電表差值查詢語句建構者
 * @CREATE Wednesday, 15th September 2021 9:46:37 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import * as esb from 'elastic-builder';
import { ElasticBuilder } from '../../../lib';

/**
 * 電表差值查詢語句建構者
 */
export class RawConsumptionQueryBuilder implements ElasticBuilder {
  /**
   * 建構查詢語句
   *
   * @method public
   * @return 回傳查詢語句
   */
  public build(): esb.RequestBodySearch {
    return esb
      .requestBodySearch()
      .size(1)
      .query(
        esb
          .boolQuery()
          .must(esb.rangeQuery('evt_dt').gte(1631665800000).lt(1631667600000)),
      )
      .sort(esb.sort('evt_dt', 'desc'));
  }
}
