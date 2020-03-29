import {store} from './index';

import {getHosptalInfo} from '../controllers/Admin/department';
import {getExaminationMethod} from '../controllers/examination';

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

  storeInfo({
    departmentInfoList: result,
    examiation: examiation,
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

