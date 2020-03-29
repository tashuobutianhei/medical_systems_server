import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt} from 'graphql';
import {getHosptalInfo} from '../controllers/Admin/department';
import {getExaminationMethod} from '../controllers/examination';


const examiationType = new GraphQLObjectType({
  name: 'exainationType',
  description: '化验项目',
  fields() {
    return {
      examinationId: {type: GraphQLInt},
      examinationName: {type: GraphQLString},
      examinationDesc: {type: GraphQLString},
    };
  },
});

const doctorType = new GraphQLObjectType({
  name: 'doctorType',
  description: '医生信息',
  fields() {
    return {
      workerId: {type: GraphQLString},
      name: {type: GraphQLString},
      sex: {type: GraphQLInt},
      age: {type: GraphQLInt},
      idcard: {type: GraphQLString},
      tel: {type: GraphQLString},
      address: {type: GraphQLString},
      information: {type: GraphQLString},
      position: {type: GraphQLString},
      university: {type: GraphQLString},
      departmentId: {type: GraphQLInt},
      status: {type: GraphQLString},
      avatar: {type: GraphQLString},
    };
  },
});

const departmentType = new GraphQLObjectType({
  name: 'departmentType',
  description: '化验项目',
  fields() {
    return {
      departmentId: {type: GraphQLInt},
      departmentName: {type: GraphQLString},
      information: {type: GraphQLString},
      doctorList: {type: new GraphQLList(doctorType)},
    };
  },
});


// 定义单个文章对象
const Info = new GraphQLObjectType({
  name: 'info',
  description: '医院数据', // 这里写详细点有助于自动生成文档，减少前后端沟通成本
  fields() {
    return {
      departmentInfoList: {type: new GraphQLList(departmentType)},
      examiation: {type: new GraphQLList(examiationType)},
    };
  },
});

// 定义文章列表对象
const hosipatalInfo = {
  name: 'query articles list',
  type: Info,
  args: { // 定义参数
    departmentId: {
      name: 'departmentId',
      type: GraphQLInt,
    },
  },
  async resolve(root: any, params: any, options: any) {
    const result = await getHosptalInfo(params.departmentId);
    const examiation = await getExaminationMethod();
    return {
      departmentInfoList: result,
      examiation: examiation,
    };
  },
};

export default hosipatalInfo;

