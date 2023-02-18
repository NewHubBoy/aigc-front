import './App.css'
import './styles/common.css'
import './locales/i18n'
import Layout from './layout';
import routes from './router'
import RouterGurad from './router/RouterGurad';

function App() {
  return (
    <Layout>
      <main>
        {RouterGurad(routes)}
      </main>
    </Layout>
  )
}

export default App
