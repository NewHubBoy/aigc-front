// 缩写币种地址,中间省略
export function abbrAddress(str: string) {
    if (str && str.includes('0x')) {
        return str.substr(0, 6) + '....' + str.substr(-4)
    } else {
        return str
    }
}