import './App.css'
import './styles/common.css'
import './locales/i18n'
import Layout from './layout';
import routes from './router'
import RouterGurad from './router/RouterGurad';
import { Suspense } from 'react';

function App() {
  return (
    <Layout>
      <main>
        <Suspense>
          {RouterGurad(routes)}
        </Suspense>
      </main>
    </Layout>
  )
}

export default App
