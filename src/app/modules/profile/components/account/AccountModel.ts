export interface IAccount {
  username: string
  email: string
  language: string
  timeZone: string
  communications: {
    email: boolean
    sms: boolean
    phone: boolean
  }
  requireInfo: boolean
}

export const defaultAccount: IAccount = {
  username: 'altynbek_bakirov',
  email: 'altynbek.bakirov@gmail.com',
  language: 'ru',
  timeZone: 'Bishkek',
  communications: {
    email: false,
    sms: true,
    phone: false,
  },
  requireInfo: false,
}
