import { Moment } from 'moment'

export interface OpDTO {
    amount: number
    balance: number
    card: string
    currency: string
    datetimeStr: string
    operationType: string
    place: string
}

export interface Op extends OpDTO {
    before: number
    datetime: Moment
    timestamp: number
}

export interface Place { name: string, _id: string }
export interface Category { name: string, _id: string }
