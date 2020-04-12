import {store} from './index';

import {getHosptalInfo} from '../controllers/Admin/department';
import {getExaminationMethod} from '../controllers/examination';
import {getCommonInfoMethod} from '../controllers/Admin/info';
import {findOfArticleMehtod} from '../controllers/Admin/article';


export const storeInfo = async (info:any) => {
  try {
    await store.client.set('commonInfo', JSON.stringify(info));
    await store.client.expire('commonInfo', 2592000); // 720小时
  } catch (e) {
    console.log(e);
  }
};

export const getInfoStore = () => {
  return new Promise((res: any, rej: any) => {
    store.client.get('commonInfo', (err: any, data: any) => {
      if (err) {
        console.log(err);
        rej(err);
      };
      res(JSON.parse(data));
    });
  });
};

export const resetInfoStore = async () => {
  const result = await getHosptalInfo();
  const examiation = await getExaminationMethod();
  const commonInfo = await getCommonInfoMethod();
  const articleInfo = await findOfArticleMehtod();

  storeInfo({
    departmentInfoList: result,
    examiation: examiation,
    commonInfo: commonInfo[0],
    articleInfo,
  });

  return new Promise((res: any, rej: any) => {
    store.client.get('commonInfo', (err: any, data: any) => {
      if (err) {
        console.log(err);
        rej(err);
      };
      res(JSON.parse(data));
    });
  });
};

