import { BrowserRouter as Router } from 'react-router-dom'
import { Layout } from './layout/layout'
import css from "./App.module.css"
import { AuthProvider } from './contexts/authcontext'


function App() {
  return (
    <AuthProvider>
      <Router>
          <div className={css.div}>
              <div>
                <Layout />
              </div>
          </div>
      </Router>
      </AuthProvider>

  )
}

export default App
