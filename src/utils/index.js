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
