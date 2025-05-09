import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Avatar,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const samplePrompts = [
  "Summarize this content for me",
  "Draft an email to a client",
  "Generate ideas for marketing campaign",
  "Create a product description",
  "Help me write a response to a complaint"
];

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "Hello! I'm your AI assistant. How can I help you today?", 
      isBot: true, 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: `This is a simulated response to: "${input}"`,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
  };

  const clearChat = () => {
    setMessages([
      { 
        id: 1, 
        text: "Hello! I'm your AI assistant. How can I help you today?", 
        isBot: true, 
        timestamp: new Date() 
      }
    ]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">
          AI Assistant
        </Typography>
        <Button 
          variant="outlined" 
          color="error" 
          startIcon={<DeleteOutlineIcon />}
          onClick={clearChat}
          size="small"
        >
          Clear Chat
        </Button>
      </Box>

      <Paper 
        elevation={0} 
        sx={{ 
          p: 2, 
          flexGrow: 1, 
          maxHeight: 'calc(100vh - 300px)', 
          overflowY: 'auto',
          backgroundColor: 'background.default',
          borderRadius: 2,
          mb: 2
        }}
      >
        {messages.map((message) => (
          <Box 
            key={message.id} 
            sx={{ 
              display: 'flex', 
              justifyContent: message.isBot ? 'flex-start' : 'flex-end',
              mb: 2 
            }}
          >
            <Card 
              sx={{ 
                maxWidth: '80%', 
                borderRadius: 2,
                bgcolor: message.isBot ? 'background.paper' : 'primary.main',
              }}
            >
              <CardContent sx={{ 
                p: 2, 
                '&:last-child': { 
                  pb: 2 
                },
                display: 'flex',
                gap: 1
              }}>
                {message.isBot && (
                  <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32 }}>
                    <SmartToyIcon sx={{ width: 20, height: 20 }} />
                  </Avatar>
                )}
                <Box>
                  <Typography 
                    variant="body1" 
                    color={message.isBot ? 'text.primary' : 'common.white'}
                    sx={{ wordBreak: 'break-word' }}
                  >
                    {message.text}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    color={message.isBot ? 'text.secondary' : 'rgba(255, 255, 255, 0.7)'}
                    sx={{ display: 'block', mt: 0.5 }}
                  >
                    {formatTime(message.timestamp)}
                  </Typography>
                </Box>
                {!message.isBot && (
                  <Avatar sx={{ bgcolor: '#002233', width: 32, height: 32 }}>
                    <PersonIcon sx={{ width: 20, height: 20 }} />
                  </Avatar>
                )}
              </CardContent>
            </Card>
          </Box>
        ))}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
            <Card sx={{ maxWidth: '80%', borderRadius: 2 }}>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="body1">Thinking...</Typography>
              </CardContent>
            </Card>
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Paper>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Suggested prompts:
        </Typography>
        <Grid container spacing={1}>
          {samplePrompts.map((prompt, index) => (
            <Grid item key={index}>
              <Chip 
                label={prompt} 
                onClick={() => handlePromptClick(prompt)} 
                clickable 
                color="primary" 
                variant="outlined"
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          multiline
          maxRows={4}
          sx={{ 
            '.MuiOutlinedInput-root': {
              borderRadius: '24px',
              paddingRight: '14px'
            }
          }}
          InputProps={{
            endAdornment: (
              <IconButton 
                color="primary" 
                onClick={handleSend} 
                disabled={!input.trim() || loading}
                edge="end"
              >
                <SendIcon />
              </IconButton>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default AIChat;
