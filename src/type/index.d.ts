
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
    engines: Engines[]
}

export interface ResponseData {
    code: string,
    msg: string,
    data: any
}