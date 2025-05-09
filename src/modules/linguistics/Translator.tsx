import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  IconButton,
  Divider,
  Tooltip,
  Chip,
  Card,
  CardContent,
  Tabs,
  Tab
} from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import HistoryIcon from '@mui/icons-material/History';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import FlagIcon from '@mui/icons-material/Flag';

// Type definitions
type Translation = {
  id: number;
  sourceText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  timestamp: Date;
  isFavorite: boolean;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`translator-tabpanel-${index}`}
      aria-labelledby={`translator-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

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
  { code: 'hi', name: 'Hindi' }
];

const Translator: React.FC = () => {
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [history, setHistory] = useState<Translation[]>([]);
  const [favorites, setFavorites] = useState<Translation[]>([]);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSwapLanguages = () => {
    const temp = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(temp);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const handleTranslate = () => {
    if (!sourceText.trim()) return;
    
    setIsTranslating(true);
    
    // In a real implementation, this would call an API
    // For example:
    // const translateText = async () => {
    //   try {
    //     const { data, error } = await supabaseClient.rpc('translate_text', {
    //       text: sourceText,
    //       source_lang: sourceLanguage,
    //       target_lang: targetLanguage
    //     });
    //     
    //     if (error) throw error;
    //     setTranslatedText(data);
    //     
    //     // Add to history
    //     const newTranslation = {
    //       id: Date.now(),
    //       sourceText,
    //       translatedText: data,
    //       sourceLanguage,
    //       targetLanguage,
    //       timestamp: new Date(),
    //       isFavorite: false
    //     };
    //     
    //     setHistory([newTranslation, ...history]);
    //   } catch (err) {
    //     console.error('Translation failed', err);
    //   } finally {
    //     setIsTranslating(false);
    //   }
    // };
    // 
    // translateText();
    
    // For now, simulate translation with a timeout
    setTimeout(() => {
      // Simple mock translation (just reverse the text for demo purposes)
      const mockTranslatedText = `[${getLanguageByCode(targetLanguage)?.name} Translation] ${sourceText}`;
      setTranslatedText(mockTranslatedText);
      
      // Add to history
      const newTranslation: Translation = {
        id: Date.now(),
        sourceText,
        translatedText: mockTranslatedText,
        sourceLanguage,
        targetLanguage,
        timestamp: new Date(),
        isFavorite: false
      };
      
      setHistory([newTranslation, ...history]);
      setIsTranslating(false);
    }, 1000);
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log('Text copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  const handleSpeakText = (text: string, language: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    window.speechSynthesis.speak(utterance);
  };

  const handleToggleFavorite = (translation: Translation) => {
    // Toggle favorite status in history
    const updatedHistory = history.map(item => 
      item.id === translation.id ? { ...item, isFavorite: !item.isFavorite } : item
    );
    setHistory(updatedHistory);
    
    // Update favorites list
    if (translation.isFavorite) {
      // Remove from favorites
      setFavorites(favorites.filter(item => item.id !== translation.id));
    } else {
      // Add to favorites
      setFavorites([{ ...translation, isFavorite: true }, ...favorites]);
    }
  };

  const getLanguageByCode = (code: string) => {
    return languages.find(lang => lang.code === code);
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Language Translator
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Translate text between multiple languages for international communication.
        </Typography>
      </Box>

      <Paper sx={{ p: 3, mb: 4 }} elevation={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Box sx={{ mb: 2 }}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="source-language-label">Source Language</InputLabel>
                <Select
                  labelId="source-language-label"
                  value={sourceLanguage}
                  onChange={(e) => setSourceLanguage(e.target.value)}
                  label="Source Language"
                >
                  {languages.map((language) => (
                    <MenuItem key={language.code} value={language.code}>
                      {language.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <TextField
              fullWidth
              multiline
              rows={5}
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              variant="outlined"
              placeholder="Enter text to translate..."
              InputProps={{
                endAdornment: (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {sourceText && (
                      <>
                        <Tooltip title="Text-to-speech">
                          <IconButton
                            onClick={() => handleSpeakText(sourceText, sourceLanguage)}
                            size="small"
                          >
                            <VolumeUpIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Copy to clipboard">
                          <IconButton
                            onClick={() => handleCopyText(sourceText)}
                            size="small"
                          >
                            <ContentCopyIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  </Box>
                ),
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={2} sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            flexDirection: 'column'
          }}>
            <IconButton
              onClick={handleSwapLanguages}
              size="large"
              sx={{ 
                backgroundColor: 'background.paper',
                boxShadow: 1,
                '&:hover': { backgroundColor: 'background.default' }
              }}
            >
              <SwapHorizIcon />
            </IconButton>
            <Button
              variant="contained"
              onClick={handleTranslate}
              disabled={!sourceText.trim() || isTranslating}
              sx={{ mt: 2, minWidth: 120 }}
            >
              {isTranslating ? <CircularProgress size={24} /> : 'Translate'}
            </Button>
          </Grid>
          
          <Grid item xs={12} md={5}>
            <Box sx={{ mb: 2 }}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="target-language-label">Target Language</InputLabel>
                <Select
                  labelId="target-language-label"
                  value={targetLanguage}
                  onChange={(e) => setTargetLanguage(e.target.value)}
                  label="Target Language"
                >
                  {languages.map((language) => (
                    <MenuItem key={language.code} value={language.code}>
                      {language.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <TextField
              fullWidth
              multiline
              rows={5}
              value={translatedText}
              variant="outlined"
              placeholder="Translation will appear here..."
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {translatedText && (
                      <>
                        <Tooltip title="Text-to-speech">
                          <IconButton
                            onClick={() => handleSpeakText(translatedText, targetLanguage)}
                            size="small"
                          >
                            <VolumeUpIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Copy to clipboard">
                          <IconButton
                            onClick={() => handleCopyText(translatedText)}
                            size="small"
                          >
                            <ContentCopyIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  </Box>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Paper>
      
      {/* Tabs for History and Favorites */}
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="History" icon={<HistoryIcon />} iconPosition="start" />
            <Tab label="Favorites" icon={<StarIcon />} iconPosition="start" />
          </Tabs>
        </Box>
        
        {/* History Tab */}
        <TabPanel value={tabValue} index={0}>
          {history.length > 0 ? (
            <Grid container spacing={2}>
              {history.map((item) => (
                <Grid item xs={12} key={item.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Chip 
                            label={getLanguageByCode(item.sourceLanguage)?.name} 
                            color="primary" 
                            size="small" 
                            variant="outlined"
                          />
                          <Typography sx={{ mx: 1 }}>→</Typography>
                          <Chip 
                            label={getLanguageByCode(item.targetLanguage)?.name} 
                            color="secondary" 
                            size="small" 
                            variant="outlined"
                          />
                        </Box>
                        <Box>
                          <Tooltip title={item.isFavorite ? "Remove from favorites" : "Add to favorites"}>
                            <IconButton 
                              size="small" 
                              onClick={() => handleToggleFavorite(item)}
                              color={item.isFavorite ? "warning" : "default"}
                            >
                              {item.isFavorite ? <StarIcon /> : <StarOutlineIcon />}
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                      
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        {item.sourceText}
                      </Typography>
                      
                      <Divider sx={{ my: 1 }} />
                      
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        {item.translatedText}
                      </Typography>
                      
                      <Typography variant="caption" color="text.secondary">
                        {item.timestamp.toLocaleString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                Your translation history will appear here.
              </Typography>
            </Paper>
          )}
        </TabPanel>
        
        {/* Favorites Tab */}
        <TabPanel value={tabValue} index={1}>
          {favorites.length > 0 ? (
            <Grid container spacing={2}>
              {favorites.map((item) => (
                <Grid item xs={12} key={item.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Chip 
                            label={getLanguageByCode(item.sourceLanguage)?.name} 
                            color="primary" 
                            size="small" 
                            variant="outlined"
                          />
                          <Typography sx={{ mx: 1 }}>→</Typography>
                          <Chip 
                            label={getLanguageByCode(item.targetLanguage)?.name} 
                            color="secondary" 
                            size="small" 
                            variant="outlined"
                          />
                        </Box>
                        <Box>
                          <Tooltip title="Remove from favorites">
                            <IconButton 
                              size="small" 
                              onClick={() => handleToggleFavorite(item)}
                              color="warning"
                            >
                              <StarIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                      
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        {item.sourceText}
                      </Typography>
                      
                      <Divider sx={{ my: 1 }} />
                      
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        {item.translatedText}
                      </Typography>
                      
                      <Typography variant="caption" color="text.secondary">
                        {item.timestamp.toLocaleString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                Your favorite translations will appear here.
              </Typography>
            </Paper>
          )}
        </TabPanel>
      </Box>
    </Box>
  );
};

export default Translator;
