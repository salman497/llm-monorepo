import React, { useState } from 'react';
import { 
  Button, 
  Container, 
  Typography, 
  TextField, 
  Box, 
  Paper,
  AppBar,
  Toolbar,
  Grid 
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';

// This would be imported from the utils library
// import { isPalindrome, reverseString, capitalize } from '@monorepo/utils';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleProcessText = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    
    try {
      // In a real app, this would call the Azure Function
      const response = await fetch('http://localhost:7071/api/processText', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setOutputText(result.processedText);
    } catch (error) {
      console.error('Error calling the function:', error);
      setOutputText('Error processing text. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              Text Utilities Demo
            </Typography>
          </Toolbar>
        </AppBar>
        
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Text Processing App
            </Typography>
            
            <Typography variant="body1" paragraph>
              Enter some text below and click "Process" to send it to the Azure Function.
              The function will use the utils library to process your text.
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Enter Text"
                  multiline
                  rows={4}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center">
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleProcessText}
                    disabled={isLoading || !inputText.trim()}
                  >
                    {isLoading ? 'Processing...' : 'Process Text'}
                  </Button>
                </Box>
              </Grid>
              
              {outputText && (
                <Grid item xs={12}>
                  <Paper elevation={2} sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
                    <Typography variant="h6" gutterBottom>
                      Result:
                    </Typography>
                    <Typography variant="body1">
                      {outputText}
                    </Typography>
                  </Paper>
                </Grid>
              )}
            </Grid>
          </Paper>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App; 