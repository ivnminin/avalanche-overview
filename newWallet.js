import {MnemonicWallet} from '@avalabs/avalanche-wallet-sdk'

let myWallet = MnemonicWallet.fromMnemonic(process.env.MNEMONIC)

let addressX = myWallet.getAddressX()
let addressP = myWallet.getAddressP()
let addressC = myWallet.getAddressC()

console.log('Mnemonic:', process.env.MNEMONIC)
console.log('addressX', addressX)
console.log('addressP', addressP)
console.log('addressC', addressC)


