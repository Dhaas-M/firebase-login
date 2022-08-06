import { Container } from 'react-bootstrap';
import Signup from './Signup'
import Login from './Login'
import Dashboard from './Dashboard';
import ForgotPassword from './ForgotPassword';
import { AuthProvider } from '../contexts/AuthProvider';
import{BrowserRouter as Router, Routes,Route} from 'react-router-dom';
//import PrivateRoute from './PrivateRoute';
//import { useAuth } from '../contexts/AuthProvider'

function App() {
  return (
    <Container className='d-flex align-items-center justify-content-center' style={{minHeight: "100vh"}}>
        <div className="w-100" style={{maxWidth: '400px'}}>
        <Router>
          <AuthProvider>
              <Routes>
                <Route path ="/" element={ <Dashboard /> } />
                <Route path="/signup" element={ <Signup /> }/>
                <Route path="/login" element={ <Login /> }/>
                <Route path="/forgot-password" element={ <ForgotPassword /> }/>
              </Routes>
          </AuthProvider>
        </Router>
        </div>
    </Container>
    
  
  )
}

export default App;
