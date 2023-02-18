import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import './locales/i18n'
import { useTranslation } from "react-i18next";
import { useWeb3Modal } from '@web3modal/react';
import { useAccount } from 'wagmi';
import { useCookies } from './provider/CookiesProvider';

function App() {
  console.log('env',process.env)
  console.log('env',import.meta.env)
  console.log('env',import.meta.env.VITE_APP_API)
  const [count, setCount] = useState(0)
  const { t, i18n } = useTranslation()
  const { open, isOpen } = useWeb3Modal()
  const { address } = useAccount()
  const {cookie, setCookies} = useCookies(['name'])
  useEffect(() => {
    i18n.changeLanguage('zh')
  }, [])
  return (
    <div className="App">
      <button onClick={() => {
        setCookies('name', 'tom')
      }}>set cookies</button>
      <p>cookies:{cookie.name}</p>
      {t('home.hello')}
      {address}
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => { open() }}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
