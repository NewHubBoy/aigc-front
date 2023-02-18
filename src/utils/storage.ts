import Cookie from 'js-cookie'


export const localAuth = ()=>{
    return Cookie.get('auth')
}