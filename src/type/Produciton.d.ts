export interface Styles {
    poster: string,
    text: string,
    [name: string]: any
}

export interface Artists extends Styles {
    [name: string]: any
}

export type Engines = '通用' | '动漫' | '3D建模风格' | '艺术感强化引擎' | '剪纸艺术引擎' | '真实感照片引擎'

export interface PaintingOptions {
    artists: Artists[],
    styles: Styles[],
    // engines: Engines[]
}

export enum OrderState {
    //0.待创建 、1.待处理、2.处理中、 3.处理成功、4.处理失败
    0 = "待创建",
    1 = "待处理",
    2 = "处理中",
    3 = "处理成功",
    4 = "处理失败"
}

export interface OrderResponse {
    created_at: string
    order_id: number
    painting_api_uuid: string
    painting_params: string
    painting_times: number
    price: string
    smart_contract_id: string
    state: 0 | 1 | 2 | 3 | 4
    updated_at: string
    user_id: string
}