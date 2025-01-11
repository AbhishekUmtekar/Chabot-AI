import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Paper, Box } from '@mui/material';
import Message from './Message';
import ChatInput from './ChatInput';

const Chat = ({ darkMode }) => {
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/chat/history');
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const sendMessage = async (formData) => {
        try {
            const response = await axios.post('http://localhost:5000/api/chat/chat', formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            const botReply = response.data.reply;
            const fileUrl = response.data.fileUrl;

            setMessages(prev => [...prev,
            {
                content: formData.get('message') || 'Sent a file',
                sender: 'user',
                fileUrl: fileUrl
            },
            { content: botReply, sender: 'bot' }
            ]);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <Paper
            elevation={3}
            sx={{
                height: '600px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: darkMode ? '#1e1e1e' : '#f5f7fb',
            }}
        >
            <Box
                sx={{
                    flexGrow: 1,
                    overflow: 'auto',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                }}
            >
                {messages.map((msg, index) => (
                    <Message key={index} message={msg} darkMode={darkMode} />
                ))}
                <div ref={messagesEndRef} />
            </Box>
            <ChatInput onSend={sendMessage} darkMode={darkMode} />
        </Paper>
    );
};

export default Chat;

// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { Paper, Box } from '@mui/material';
// import Message from './Message';
// import ChatInput from './ChatInput';

// const Chat = ({ darkMode }) => {
//     const [messages, setMessages] = useState([]);
//     const messagesEndRef = useRef(null);

//     const scrollToBottom = () => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     };

//     useEffect(() => {
//         scrollToBottom();
//     }, [messages]);

//     useEffect(() => {
//         fetchMessages();
//     }, []);

//     const fetchMessages = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/api/chat/history');
//             setMessages(response.data);
//         } catch (error) {
//             console.error('Error fetching messages:', error);
//         }
//     };

//     const sendMessage = async (message) => {
//         try {
//             const response = await axios.post('http://localhost:5000/api/chat/chat', {
//                 userMessage: message
//             });

//             const botReply = response.data.reply;
//             setMessages(prev => [...prev,
//             { content: message, sender: 'user' },
//             { content: botReply, sender: 'bot' }
//             ]);
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     return (
//         <Paper
//             elevation={3}
//             sx={{
//                 height: '600px',
//                 position: 'relative',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 borderRadius: '12px',
//                 overflow: 'hidden',
//                 backgroundColor: darkMode ? '#1e1e1e' : '#f5f7fb',
//             }}
//         >
//             <Box
//                 sx={{
//                     flexGrow: 1,
//                     overflow: 'auto',
//                     padding: '20px',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     gap: '8px',
//                 }}
//             >
//                 {messages.map((msg, index) => (
//                     <Message key={index} message={msg} darkMode={darkMode} />
//                 ))}
//                 <div ref={messagesEndRef} />
//             </Box>
//             <ChatInput onSend={sendMessage} darkMode={darkMode} />
//         </Paper>
//     );
// };

// export default Chat;


// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { Paper } from '@mui/material';
// import Message from './Message';
// import ChatInput from './ChatInput';

// const Chat = () => {
//     const [messages, setMessages] = useState([]);
//     const messagesEndRef = useRef(null);

//     const scrollToBottom = () => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     };

//     useEffect(() => {
//         fetchMessages();
//     }, []);

//     const fetchMessages = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/api/chat/history');
//             setMessages(response.data);
//         } catch (error) {
//             console.error('Error fetching messages:', error);
//         }
//     };

//     const sendMessage = async (message) => {
//         try {
//             const response = await axios.post('http://localhost:5000/api/chat/chat', {
//                 userMessage: message
//             });

//             const botReply = response.data.reply;
//             setMessages(prev => [...prev,
//             { content: message, sender: 'user' },
//             { content: botReply, sender: 'bot' }
//             ]);
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     return (
//         <Paper
//             elevation={3}
//             sx={{
//                 height: '600px',
//                 position: 'relative',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 borderRadius: '12px',
//                 overflow: 'hidden',
//                 backgroundColor: '#f5f7fb',
//             }}
//         >
//             <Box
//                 sx={{
//                     flexGrow: 1,
//                     overflow: 'auto',
//                     padding: '20px',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     gap: '8px',
//                 }}
//             >
//                 {messages.map((msg, index) => (
//                     <Message key={index} message={msg} />
//                 ))}
//                 <div ref={messagesEndRef} />
//             </Box>
//             <ChatInput onSend={sendMessage} />
//         </Paper>
//     );
// };

// export default Chat;

//             <div style={{
//                 flexGrow: 1,
//                 overflow: 'auto',
//                 padding: '20px',
//                 display: 'flex',
//                 flexDirection: 'column'
//             }}>
//                 {messages.map((msg, index) => (
//                     <Message key={index} message={msg} />
//                 ))}
//             </div>
//             <ChatInput onSend={sendMessage} />
//         </Paper>
//     );
// };

// export default Chat;