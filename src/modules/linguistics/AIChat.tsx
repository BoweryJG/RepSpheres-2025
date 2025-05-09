import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Avatar,
  CircularProgress,
  Divider,
  Chip,
  Grid,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

// Message interface
type Message = {
  id: number;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
};

// Define AI models
const aiModels = [
  { id: 'gpt-4o', name: 'GPT-4o', description: 'Advanced language model with multimodal capabilities' },
  { id: 'gpt-4', name: 'GPT-4', description: 'High-performance language model for complex tasks' },
  { id: 'gpt-3.5', name: 'GPT-3.5 Turbo', description: 'Fast and efficient language model for most tasks' }
];

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm your AI assistant. How can I help you today?",
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedModel, setSelectedModel] = useState(aiModels[0]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 1,
        content: "Hello! I'm your AI assistant. How can I help you today?",
        role: 'assistant',
        timestamp: new Date()
      }
    ]);
    handleMenuClose();
  };

  const handleCopyConversation = () => {
    const conversationText = messages
      .map((msg) => `${msg.role === 'user' ? 'You' : 'AI'}: ${msg.content}`)
      .join('\n\n');
    
    navigator.clipboard.writeText(conversationText)
      .then(() => {
        console.log('Conversation copied to clipboard');
      })
      .catch((err) => {
        console.error('Failed to copy conversation: ', err);
      });
    
    handleMenuClose();
  };

  const handleDownloadConversation = () => {
    const conversationText = messages
      .map((msg) => `${msg.role === 'user' ? 'You' : 'AI'}: ${msg.content}`)
      .join('\n\n');
    
    const blob = new Blob([conversationText], { type: 'text/plain' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = `ai-conversation-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
    
    handleMenuClose();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    const newUserMessage: Message = {
      id: messages.length + 1,
      content: inputMessage,
      role: 'user',
      timestamp: new Date()
    };
    
    setMessages([...messages, newUserMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Simulate AI response with a delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        content: getAIResponse(inputMessage),
        role: 'assistant',
        timestamp: new Date()
      };
      
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  // Placeholder function to generate AI responses
  const getAIResponse = (userMessage: string): string => {
    const userMessageLower = userMessage.toLowerCase();
    
    if (userMessageLower.includes('hello') || userMessageLower.includes('hi')) {
      return "Hello! It's nice to chat with you. How can I assist you today?";
    } else if (userMessageLower.includes('help')) {
      return "I'm here to help! You can ask me questions, request information, or have me assist with various tasks like drafting emails, summarizing text, or brainstorming ideas.";
    } else if (userMessageLower.includes('thank')) {
      return "You're welcome! If you have any more questions or need further assistance, feel free to ask.";
    } else if (userMessageLower.includes('weather')) {
      return "I don't have real-time access to weather information. To get the current weather, you could check a weather app or website, or integrate a weather API into this application.";
    } else if (userMessageLower.includes('name')) {
      return "I'm an AI assistant integrated into your workspace platform. You can think of me as your helpful digital colleague.";
    } else {
      return "Thank you for your message. In a fully implemented version, this would connect to an actual AI model API like OpenAI's GPT models to provide more relevant and dynamic responses. Is there something specific you'd like to know more about?";
    }
  };

  const handleModelChange = (modelId: string) => {
    const model = aiModels.find(model => model.id === modelId);
    if (model) {
      setSelectedModel(model);
    }
    handleMenuClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box sx={{ height: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">AI Chat Assistant</Typography>
        <Box>
          <Chip
            label={selectedModel.name}
            color="primary"
            variant="outlined"
            onClick={(e) => handleMenuClick(e as unknown as React.MouseEvent<HTMLButtonElement>)}
            sx={{ cursor: 'pointer' }}
          />
          <IconButton onClick={(e) => handleMenuClick(e as unknown as React.MouseEvent<HTMLButtonElement>)}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem disabled sx={{ opacity: 1 }}>
              <Typography variant="subtitle2">Select Model</Typography>
            </MenuItem>
            {aiModels.map(model => (
              <MenuItem 
                key={model.id}
                onClick={() => handleModelChange(model.id)}
                selected={model.id === selectedModel.id}
              >
                {model.name}
              </MenuItem>
            ))}
            <Divider />
            <MenuItem onClick={handleCopyConversation}>
              <ContentCopyIcon fontSize="small" sx={{ mr: 1 }} />
              Copy conversation
            </MenuItem>
            <MenuItem onClick={handleDownloadConversation}>
              <FileDownloadIcon fontSize="small" sx={{ mr: 1 }} />
              Download conversation
            </MenuItem>
            <MenuItem onClick={handleClearChat} sx={{ color: 'error.main' }}>
              <DeleteOutlineIcon fontSize="small" sx={{ mr: 1 }} />
              Clear chat
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      
      <Paper 
        elevation={2} 
        sx={{ 
          flex: 1,
          mb: 2,
          p: 2,
          overflow: 'auto',
          backgroundColor: 'background.paper'
        }}
      >
        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              display: 'flex',
              flexDirection: message.role === 'user' ? 'row-reverse' : 'row',
              mb: 2,
            }}
          >
            <Avatar
              sx={{
                bgcolor: message.role === 'user' ? 'primary.main' : 'secondary.main',
                width: 36,
                height: 36,
                mr: message.role === 'user' ? 0 : 1,
                ml: message.role === 'user' ? 1 : 0,
              }}
            >
              {message.role === 'user' ? 'U' : 'AI'}
            </Avatar>
            <Paper
              elevation={0}
              sx={{
                p: 1.5,
                maxWidth: '75%',
                backgroundColor: message.role === 'user' ? 'primary.light' : 'grey.100',
                color: message.role === 'user' ? 'primary.contrastText' : 'text.primary',
                borderRadius: 2,
              }}
            >
              <Typography variant="body1">{message.content}</Typography>
              <Typography variant="caption" display="block" sx={{ mt: 0.5, opacity: 0.7 }}>
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Typography>
            </Paper>
          </Box>
        ))}
        
        {isTyping && (
          <Box sx={{ display: 'flex', mb: 2 }}>
            <Avatar
              sx={{
                bgcolor: 'secondary.main',
                width: 36,
                height: 36,
                mr: 1,
              }}
            >
              AI
            </Avatar>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                maxWidth: '75%',
                backgroundColor: 'grey.100',
                borderRadius: 2,
              }}
            >
              <CircularProgress size={20} thickness={4} />
            </Paper>
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Paper>
      
      <Paper
        component="form"
        sx={{ p: 1, display: 'flex', alignItems: 'center' }}
        elevation={3}
      >
        <IconButton color="primary" aria-label="attach file" component="label">
          <input hidden accept="image/*,.pdf,.txt,.doc,.docx" type="file" />
          <AttachFileIcon />
        </IconButton>
        <TextField
          fullWidth
          multiline
          maxRows={3}
          placeholder="Type your message..."
          variant="standard"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          InputProps={{
            disableUnderline: true,
            sx: { p: 1 },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          onClick={handleSendMessage}
          disabled={!inputMessage.trim()}
          sx={{ ml: 1, borderRadius: 28, px: 2 }}
        >
          Send
        </Button>
      </Paper>
    </Box>
  );
};

export default AIChat;
