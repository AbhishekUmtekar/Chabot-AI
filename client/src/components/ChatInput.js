import React, { useState, useRef } from 'react';
import { TextField, IconButton, Box, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';

const ChatInput = ({ onSend, darkMode }) => {
    const [message, setMessage] = useState('');
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (message.trim() || file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('message', message);
            await onSend(formData);
            setMessage('');
            setFile(null);
        }
    };

    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    return (
        <Paper
            component="form"
            onSubmit={handleSubmit}
            sx={{
                p: 2,
                display: 'flex',
                gap: 1,
                backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
                borderTop: `1px solid ${darkMode ? '#333' : '#e0e0e0'}`,
            }}
            elevation={0}
        >
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                style={{ display: 'none' }}
                accept="image/*,.pdf,.doc,.docx"
            />
            <IconButton
                onClick={() => fileInputRef.current.click()}
                sx={{
                    color: darkMode ? '#ffffff' : '#666666',
                }}
            >
                <AttachFileIcon />
            </IconButton>

            <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '24px',
                        backgroundColor: darkMode ? '#2d2d2d' : '#f5f7fb',
                    }
                }}
            />

            {file && (
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: darkMode ? '#ffffff' : '#666666'
                }}>
                    {file.type.startsWith('image/') ? <ImageIcon /> : <AttachFileIcon />}
                    <span>{file.name}</span>
                </Box>
            )}

            <IconButton
                type="submit"
                disabled={!message.trim() && !file}
                sx={{
                    backgroundColor: (message.trim() || file) ? '#1976d2' : (darkMode ? '#444' : '#e0e0e0'),
                    color: '#ffffff',
                    '&:hover': {
                        backgroundColor: (message.trim() || file) ? '#1565c0' : (darkMode ? '#444' : '#e0e0e0'),
                    },
                }}
            >
                <SendIcon fontSize="small" />
            </IconButton>
        </Paper>
    );
};

export default ChatInput;

// import React, { useState } from 'react';
// import { TextField, IconButton, Box, Paper } from '@mui/material';
// import SendIcon from '@mui/icons-material/Send';

// const ChatInput = ({ onSend, darkMode }) => {
//     const [message, setMessage] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (message.trim()) {
//             onSend(message);
//             setMessage('');
//         }
//     };

//     return (
//         <Paper
//             component="form"
//             onSubmit={handleSubmit}
//             sx={{
//                 p: 2,
//                 display: 'flex',
//                 gap: 1,
//                 backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
//                 borderTop: `1px solid ${darkMode ? '#333' : '#e0e0e0'}`,
//             }}
//             elevation={0}
//         >
//             <TextField
//                 fullWidth
//                 variant="outlined"
//                 size="small"
//                 placeholder="Type a message..."
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 sx={{
//                     '& .MuiOutlinedInput-root': {
//                         borderRadius: '24px',
//                         backgroundColor: darkMode ? '#2d2d2d' : '#f5f7fb',
//                         '& fieldset': {
//                             borderColor: darkMode ? '#444' : '#e0e0e0',
//                         },
//                     },
//                     '& .MuiOutlinedInput-input': {
//                         color: darkMode ? '#ffffff' : '#000000',
//                     },
//                 }}
//             />
//             <IconButton
//                 type="submit"
//                 color="primary"
//                 disabled={!message.trim()}
//                 sx={{
//                     backgroundColor: message.trim() ? '#1976d2' : (darkMode ? '#444' : '#e0e0e0'),
//                     color: '#ffffff',
//                     '&:hover': {
//                         backgroundColor: message.trim() ? '#1565c0' : (darkMode ? '#444' : '#e0e0e0'),
//                     },
//                     width: '40px',
//                     height: '40px',
//                 }}
//             >
//                 <SendIcon fontSize="small" />
//             </IconButton>
//         </Paper>
//     );
// };

// export default ChatInput;
