import {insert as inserWork, findOneByKey} from '../../models/docterWork';
import moment from 'moment';


const getScheduleDateList = () => {
  const ScheduleDateList = [];
  const step = 86400000;
  for (let i = 0; i < 6; i++) {
    const itemDate = new Date(Date.now() + i * step);
    ScheduleDateList.push(moment(itemDate).format('YYYY-MM-DD'));
  }
  return ScheduleDateList;
};

const transFormwokrId = (date: string, departmentId: string, shifts: number) => {
  const id = departmentId.length > 1 ? departmentId : '0' + departmentId;
  return date.split('-').join('') + id + shifts;
};

export const createWorkList = async (ctx: any, next: any) => {
  if (!ctx.query) {
    return ctx.body = {
      code: -2,
      message: '参数有错误',
    };
  }
  const departmentId = ctx.query.departmentId;

  getScheduleDateList().forEach(async (date) => {
    const DocterWork = await findOneByKey('data', `${date}T00:00:00.000Z`, ['wokrId']);
    console.log(DocterWork);
    if (DocterWork) {

    } else {
      [0, 1, 2].forEach(async (item) => {
        const result = inserWork({
          wokrId: transFormwokrId(date, departmentId, item),
          departmentId: departmentId - 0,
          data: date,
          shifts: item,
        });
        if (!result) {
          return ctx.body = {
            code: -1,
            message: '服务错误',
          };
        }
      });
    };
  });

  ctx.body = {
    code: 1,
    message: 'success',
  };
};