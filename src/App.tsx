import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotesProvider } from './contexts/NotesContext';
import { AuthProvider } from './contexts/AuthContext';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { CreateNotePage } from './pages/CreateNotePage';
import { ProfilePage } from './pages/ProfilePage';
import { LoginPage } from './pages/LoginPage';
import { PrivateRoute } from './components/auth/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <NotesProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
                <Route path="/" element={<HomePage />} />
                <Route path="/create" element={<CreateNotePage />} />
                <Route path="/edit/:id" element={<CreateNotePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </NotesProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;