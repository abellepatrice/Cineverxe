export const lightTheme = {
  background: '#ffffff',
  surface: '#f8f9fa',
  text: '#212529',
  textSecondary: '#6c757d',
  primary: '#5b13ec',
  border: '#dee2e6',
  card: '#ffffff',
  accent: '#5b13ec',
  tabBar: '#ffffff',
  tabBarBorder: '#dee2e6',
  statusBar: 'dark-content',
};

export const darkTheme = {
  background: '#161022',
  surface: '#2a1b3d',
  text: '#ffffff',
  textSecondary: '#aaa',
  primary: '#5b13ec',
  border: '#2a1b3d',
  card: '#2a1b3d',
  accent: '#5b13ec',
  tabBar: 'rgba(22, 16, 34, 0.9)',
  tabBarBorder: 'rgba(255,255,255,0.1)',
  statusBar: 'light-content',
};

export const theme = darkTheme; // Default to dark theme

export const styles = {
  text: { color: theme.text },
  background: { backgroundColor: theme.background }
};
