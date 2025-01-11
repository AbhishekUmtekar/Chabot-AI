import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  createTheme,
  ThemeProvider,
  IconButton
} from '@mui/material';
import Chat from './components/Chat1';

// Custom Sun/Moon Icon Component
const ThemeIcon = ({ darkMode }) => {
  return (
    <div style={{
      width: '24px',
      height: '24px',
      position: 'relative',
      transform: darkMode ? 'rotate(0deg)' : 'rotate(-45deg)',
      transition: 'transform 0.3s ease-in-out'
    }}>
      {darkMode ? (
        // Sun Icon for dark mode
        <>
          <div style={{
            position: 'absolute',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: '#FFB800',
            boxShadow: '0 0 20px rgba(255, 184, 0, 0.5)'
          }} />
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '2px',
                height: '6px',
                backgroundColor: '#FFB800',
                left: '11px',
                top: '50%',
                marginTop: '-3px',
                transform: `rotate(${i * 45}deg) translateY(-9px)`,
                transformOrigin: '50% 50%',
                animation: 'sunRaysFade 2s ease-in-out infinite alternate'
              }}
            />
          ))}
        </>
      ) : (
        // Half Moon Icon for light mode
        <div style={{
          position: 'absolute',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: '#555',
          boxShadow: 'inset 3px -3px 0 #333',
          transform: 'scale(0.85)',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            width: '50%',
            height: '100%',
            right: '-20%',
            backgroundColor: '#555',
            borderRadius: '50%',
            transform: 'scale(1.2)'
          }} />
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
        light: '#42a5f5',
        dark: '#1565c0',
      },
      background: {
        default: darkMode ? '#121212' : '#f5f7fb',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
    },
    typography: {
      fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <Typography variant="h4" gutterBottom>
              AI Chatbot
            </Typography>
            <IconButton
              onClick={toggleDarkMode}
              sx={{
                width: 40,
                height: 40,
                transition: 'background-color 0.3s',
                '&:hover': {
                  backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                }
              }}
            >
              <ThemeIcon darkMode={darkMode} />
            </IconButton>
          </div>
          <Chat darkMode={darkMode} />
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

// Add this CSS to your index.css or App.css file
const styles = `
  @keyframes sunRaysFade {
    0% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
`;

// Add styles to document
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default App;


// import logo from './logo.svg';
// import './App.css';
// import React, { useState } from 'react';
// import {
//   Container,
//   Paper,
//   Typography,
//   createTheme,
//   ThemeProvider,
//   IconButton
// } from '@mui/material';
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';
// import Chat from './components/Chat1';

// const App = () => {
//   const [darkMode, setDarkMode] = useState(false);

//   const theme = createTheme({
//     palette: {
//       mode: darkMode ? 'dark' : 'light',
//       primary: {
//         main: '#1976d2',
//         light: '#42a5f5',
//         dark: '#1565c0',
//       },
//       background: {
//         default: darkMode ? '#121212' : '#f5f7fb',
//         paper: darkMode ? '#1e1e1e' : '#ffffff',
//       },
//     },
//     typography: {
//       fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
//     },
//     components: {
//       MuiPaper: {
//         styleOverrides: {
//           root: {
//             borderRadius: 12,
//           },
//         },
//       },
//     },
//   });

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Container maxWidth="md" sx={{ mt: 4 }}>
//         <Paper elevation={3} sx={{ p: 3 }}>
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: '20px'
//           }}>
//             <Typography variant="h4" gutterBottom>
//               AI Chatbot
//             </Typography>
//             <IconButton onClick={toggleDarkMode} color="inherit">
//               {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
//             </IconButton>
//           </div>
//           <Chat darkMode={darkMode} />
//         </Paper>
//       </Container>
//     </ThemeProvider>
//   );
// };

// export default App;

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#1976d2',
//       light: '#42a5f5',
//       dark: '#1565c0',
//     },
//     background: {
//       default: '#f5f7fb',
//     },
//   },
//   typography: {
//     fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
//   },
//   components: {
//     MuiPaper: {
//       styleOverrides: {
//         root: {
//           borderRadius: 12,
//         },
//       },
//     },
//   },
// });

// const App = () => {
//   return (
//     <ThemeProvider theme={theme}>
//       <Container maxWidth="md" sx={{ mt: 4 }}>
//         <Paper elevation={3} sx={{ p: 3 }}>
//           <Typography variant="h4" align="center" gutterBottom>
//             AI Chatbot
//           </Typography>
//           <Chat />
//         </Paper>
//       </Container>
//     </ThemeProvider>
//   );
// };

// export default App;