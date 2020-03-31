import {store} from './index';

export type patientInfo = {
  username: string,
  uid: string,
  name: string,
  idcard: string,
  sex: number | string,
  age: number,
  tel: string,
  address: string | null,
  avatar: string | null,
  type?: string | number,
}

export type doctorInfo = {
  workerId: string,
  name: string,
  idcard: string,
  sex: number | string,
  age: number,
  tel: string,
  address: string | null,
  information: string | null,
  university: string | null,
  position: string | null,
  departmentId: number,
  avatar: string | null,
  type?: string | number,
}

export type adminInfo = {
  uid: string,
  username: string,
  type?: string | number,
}

export const storeUser = async (
  uid: string,
  info: patientInfo | adminInfo | doctorInfo,
) => {
  try {
    await store.client.hmset(uid, {...info});
    await store.client.expire(uid, 259200); // 72小时
  } catch (e) {
    console.log(e);
  }
};

export const getUserStore = (uid: string) => {
  return new Promise((res: any, rej: any) => {
    store.client.hgetall(uid, (err: any, data: any) => {
      if (err) {
        console.log(err);
        rej(err);
      };
      res(data);
    });
  });
};


