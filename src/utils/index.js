import Web3 from 'web3'
import BigNumber from 'bignumber.js'

export const defaultEthereumConfig = {
  testing: false,
  autoGasMultiplier: 1.5,
  defaultConfirmations: 1,
  defaultGas: '6000000',
  defaultGasPrice: '1000000000000',
  ethereumNodeTimeout: 10000
}

export function web3ProviderFrom(endpoint, config) {
  const ethConfig = Object.assign(defaultEthereumConfig, config || {})

  const providerClass = endpoint.includes('wss')
    ? Web3.providers.WebsocketProvider
    : Web3.providers.HttpProvider

  return new providerClass(endpoint, {
    timeout: ethConfig.ethereumNodeTimeout
  })
}

export const getTonumber = (balance, decimals = 18) => {
  balance = new BigNumber(balance.toString())
  const displayBalance = balance.dividedBy(new BigNumber(10).pow(decimals))
  return balance.dividedBy(new BigNumber(10).pow(decimals)).toFixed(displayBalance.dp(), 1)
}

export const getNumberToFixed = balance => {
  balance = new BigNumber(balance)
  return balance.toFixed(balance.dp(), 1)
}

export const $isFiniteNumber = val => {
  return !Number.isFinite(parseFloat(val)) ? 0 : val
}
export const $isPositiveNumber = val => {
  return new BigNumber(val).gt(0) ? val : 0
}

export const formatValue = (value, decimals = 3) => {
  const getDep = (val, decimals) => {
    let dp = new BigNumber(val).dp()
    return dp > decimals ? decimals : dp
  }
  const dp = getDep(value, decimals)
  return parseFloat(value) ? new BigNumber(value).toFormat(dp) : value
}
