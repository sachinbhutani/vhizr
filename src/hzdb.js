
import Horizon from '@horizon/client'
export const hzdb = Horizon({host: 'localhost:8181', secure: false, authType: 'unauthenticated', lazyWrites: false })
Horizon.clearAuthTokens()
hzdb.onReady(console.log( "Horizon is ready"))
hzdb.status((status) => console.log("Horizon " + status.type), (err) => console.log(err))
export const vhizr = hzdb('vhizr')
