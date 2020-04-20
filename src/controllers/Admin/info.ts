import {
  findAllByKey,
  update as updateCommonInfo,
} from '../../models/commonInfo';

import fs from 'fs';
import path from 'path';

export const getCommonInfoMethod = async () => {
  try {
    const info = await findAllByKey({});
    return info;
  } catch (e) {
    throw new Error(e);
  }
};

export const getCommonInfo = async (ctx: any, next: any) => {
  try {
    const info = await getCommonInfoMethod();
    ctx.body = {
      code: 0,
      data: info[0],
    };
  } catch (e) {
    ctx.state.nextInfo = {
      type: -1,
      error: e,
    };
    await next();
  }
};

const upFile = async (file:any) => {
  const filename = path.resolve(__dirname, '../../../public') + `/Common/carousel/${file.name}`;
  const base64 = file.thumbUrl.replace(/^data:image\/\w+;base64,/, '');
  const dataBuffer = Buffer.from(base64, 'base64');

  await fs.writeFileSync(filename, dataBuffer);
  return `/Common/carousel/${file.name}`;
};

const updateCarousel = async (body: {
  type: string,
  data: any,
}) => {
  try {
    const data = JSON.parse(body.data);
    const storeMap: string[] = [];
    const storeFile: any[] = [];
    data.forEach((item: any) => {
      if (/^store-*/.test(item.uid)) {
        storeMap.push(item.name); // 已经存储图片了，无需存储
      } else {
        storeFile.push(item);
      }
    });

    if (storeFile.length > 0) {
      await Promise.all(storeFile.map(async (item: any) => {
        const fileUrl = await upFile(item);
        storeMap.push(fileUrl);
      }));
    }

    await updateCommonInfo({
      carousel: storeMap.join(','),
    }, {id: 1});
  } catch (e) {
    throw new Error(e);
  }
};


export const update = async (ctx: any, next: any) => {
  try {
    const body = ctx.request.body;

    switch (body.type) {
      case 'carousel':
        await updateCarousel(body);
        break;
      case 'order':
        await updateCommonInfo({
          order: body.data,
        }, {id: 1});
        break;
      case 'doctor':
        await updateCommonInfo({
          doctor: body.data,
        }, {id: 1});
        break;
      default:
        break;
    }
    ctx.body = {
      code: 0,
    };
    await next();
  } catch (e) {
    ctx.state.nextInfo = {
      type: -1,
      error: e,
    };
    await next();
  }
};
