import {patientCase} from './patientType';

export type docterInfo = {
    workerId: string
    password: string
    name: string
    sex: string
    age: number
    idCard: string
    tel: string
    address: string
    information: string // 自我描述
    position: string // 职位
    university: string // 毕业大学
    department: number // 科室
    status: number | null
}

// 排班计划
type docterWork = {
    data: string // 日期
    shifts: number // 0:早班 1:下午班 2:急诊
    docters: docterInfo[],
}

type order = {
    id: string, // id
    wokrId: string, // 排班计划
    patientCase: patientCase
}

// 科室信息
type department = {
    departmentId: number
    departmentName: string
    information: string
    docterList: docterInfo[]
    docterWork: docterWork[]
}

export enum docterPosition {
    'director',
    'viceDirectors',
    'attending',
    'residency'
};
