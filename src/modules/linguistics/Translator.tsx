import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  MenuItem, 
  Select, 
  FormControl,
  InputLabel,
  Card,
  CardContent,
  IconButton
} from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'ar', name: 'Arabic' },
];

const Translator: React.FC = () => {
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const handleTranslate = () => {
    // In a real application, this would call a translation API
    // For now, we'll set mock translated text based on the selected languages
    setTranslatedText(`[${sourceLanguage} to ${targetLanguage} translation of: "${sourceText}"]`);
  };

  const handleSwapLanguages = () => {
    const tempLang = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(tempLang);
    
    // Also swap the text if we have a translation
    if (translatedText) {
      setSourceText(translatedText);
      setTranslatedText(sourceText);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(translatedText);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <Box>
      <Typography variant="h5" mb={4}>
        Language Translator
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Box sx={{ mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="source-language-label">Source Language</InputLabel>
              <Select
                labelId="source-language-label"
                id="source-language"
                value={sourceLanguage}
                label="Source Language"
                onChange={(e) => setSourceLanguage(e.target.value)}
              >
                {languages.map((lang) => (
                  <MenuItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <TextField
            fullWidth
            multiline
            rows={8}
            variant="outlined"
            label="Enter text to translate"
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IconButton 
            onClick={handleSwapLanguages}
            sx={{ 
              bgcolor: 'primary.main', 
              color: 'white',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
              width: 56,
              height: 56
            }}
          >
            <SwapHorizIcon fontSize="large" />
          </IconButton>
        </Grid>

        <Grid item xs={12} md={5}>
          <Box sx={{ mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="target-language-label">Target Language</InputLabel>
              <Select
                labelId="target-language-label"
                id="target-language"
                value={targetLanguage}
                label="Target Language"
                onChange={(e) => setTargetLanguage(e.target.value)}
              >
                {languages.map((lang) => (
                  <MenuItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Card variant="outlined">
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Translation
                </Typography>
                {translatedText && (
                  <IconButton 
                    size="small" 
                    onClick={handleCopyToClipboard}
                    color={copySuccess ? "success" : "inherit"}
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
              <Typography variant="body1" sx={{ minHeight: '11rem' }}>
                {translatedText}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={handleTranslate}
            disabled={!sourceText}
          >
            Translate
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Translator;
