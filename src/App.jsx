import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import PreferencesForm from './components/PreferencesForm';
import UserDetail from './components/UserDetail';
import UserList from './components/UserList';
import './App.css';

const API_URL = 'https://randomuser.me/api/?results=8';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop().split(';').shift());
  }
  return '';
}

function setCookie(name, value) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=31536000`;
}

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [preferences, setPreferences] = useState({
    name: '',
    theme: 'light',
    view: 'cards',
  });

  useEffect(() => {
    const savedPreferences = localStorage.getItem('userExplorerPreferences');
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        setPreferences((current) => ({ ...current, ...parsed }));
      } catch {
        localStorage.removeItem('userExplorerPreferences');
      }
    }

    const savedName = getCookie('userExplorerName');
    const savedTheme = getCookie('userExplorerTheme');
    const savedView = getCookie('userExplorerView');

    setPreferences((current) => ({
      ...current,
      name: savedName || current.name,
      theme: savedTheme || current.theme,
      view: savedView || current.view,
    }));
  }, []);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('No se pudieron cargar los usuarios');
        }
        const data = await response.json();
        const fetchedUsers = data.results || [];
        setUsers(fetchedUsers);
        setSelectedUser(fetchedUsers[0] || null);
      } catch (err) {
        setError(err.message || 'Ocurrió un problema al consultar la API');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  useEffect(() => {
    localStorage.setItem('userExplorerPreferences', JSON.stringify(preferences));
    setCookie('userExplorerName', preferences.name);
    setCookie('userExplorerTheme', preferences.theme);
    setCookie('userExplorerView', preferences.view);
  }, [preferences]);

  const filteredUsers = useMemo(() => {
    const query = searchTerm.toLowerCase();
    return users.filter((user) => {
      const fullName = `${user.name?.first || ''} ${user.name?.last || ''}`.toLowerCase();
      const email = user.email?.toLowerCase() || '';
      return fullName.includes(query) || email.includes(query);
    });
  }, [searchTerm, users]);

  const handlePreferenceChange = (event) => {
    const { name, value } = event.target;
    setPreferences((current) => ({ ...current, [name]: value }));
  };

  return (
    <div className={`app ${preferences.theme}`}>
      <Header
        title="Explorador de usuarios"
        subtitle="Consulta datos, guarda tus preferencias y descubre perfiles reales desde una API."
      />

      <main className="dashboard">
        <PreferencesForm
          preferences={preferences}
          onChange={handlePreferenceChange}
          onSearchChange={setSearchTerm}
          searchValue={searchTerm}
        />

        <section className="content-grid">
          <UserList
            users={filteredUsers}
            selectedUserId={selectedUser?.login?.uuid}
            onSelect={setSelectedUser}
            loading={loading}
            error={error}
            viewMode={preferences.view}
          />

          <UserDetail user={selectedUser} />
        </section>
      </main>
    </div>
  );
}
