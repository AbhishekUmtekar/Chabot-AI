import React from 'react';
import { Paper, Typography, Box, Avatar } from '@mui/material';
import botLogo from '../assets/chatgpt-logo.jpg'; // Update this path to match your image location
import ImageIcon from '@mui/icons-material/Image';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const Message = ({ message, darkMode }) => {
    const isBot = message.sender === 'bot';

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: isBot ? 'flex-start' : 'flex-end',
                mb: 2,
                alignItems: 'flex-start',
                gap: '8px'
            }}
        >
            {isBot && (
                <Avatar
                    src={botLogo}
                    alt="Bot"
                    sx={{
                        width: 35,
                        height: 35,
                        marginTop: '4px'
                    }}
                />
            )}
            <Paper
                elevation={2}
                sx={{
                    padding: '12px 18px',
                    maxWidth: '70%',
                    backgroundColor: isBot
                        ? (darkMode ? '#2d2d2d' : '#ffffff')
                        : '#1976d2',
                    borderRadius: '18px',
                    borderTopRightRadius: !isBot ? '4px' : '18px',
                    borderTopLeftRadius: isBot ? '4px' : '18px',
                    position: 'relative',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                }}
            >
                {message.fileUrl && (
                    <Box sx={{ mb: 1 }}>
                        {message.fileUrl.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                            <img
                                src={message.fileUrl}
                                alt="Shared file"
                                style={{
                                    maxWidth: '100%',
                                    borderRadius: '8px',
                                    marginBottom: '8px'
                                }}
                            />
                        ) : (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    color: isBot
                                        ? (darkMode ? '#ffffff' : '#000000')
                                        : '#ffffff'
                                }}
                            >
                                <InsertDriveFileIcon />
                                <a
                                    href={message.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        color: 'inherit',
                                        textDecoration: 'underline'
                                    }}
                                >
                                    View Document
                                </a>
                            </Box>
                        )}
                    </Box>
                )}
                <Typography
                    variant="body1"
                    sx={{
                        color: isBot
                            ? (darkMode ? '#ffffff' : '#000000')
                            : '#ffffff',
                        lineHeight: 1.5,
                        fontSize: '0.95rem',
                    }}
                >
                    {message.content}
                </Typography>
            </Paper>
        </Box>
    );
};

export default Message;



// import React from 'react';
// import { Paper, Typography, Box, Avatar } from '@mui/material';
// import botLogo from '../assets/chatgpt-logo.jpg'; // Update this path to match your image location

// const Message = ({ message, darkMode }) => {
//     const isBot = message.sender === 'bot';

//     return (
//         <Box
//             sx={{
//                 display: 'flex',
//                 justifyContent: isBot ? 'flex-start' : 'flex-end',
//                 mb: 2,
//                 alignItems: 'flex-start',
//                 gap: '8px'
//             }}
//         >
//             {isBot && (
//                 <Avatar
//                     src={botLogo}
//                     alt="Bot"
//                     sx={{
//                         width: 35,
//                         height: 35,
//                         marginTop: '4px'
//                     }}
//                 />
//             )}
//             <Paper
//                 elevation={2}
//                 sx={{
//                     padding: '12px 18px',
//                     maxWidth: '70%',
//                     backgroundColor: isBot
//                         ? (darkMode ? '#2d2d2d' : '#ffffff')
//                         : '#1976d2',
//                     borderRadius: '18px',
//                     borderTopRightRadius: !isBot ? '4px' : '18px',
//                     borderTopLeftRadius: isBot ? '4px' : '18px',
//                     position: 'relative',
//                     boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
//                 }}
//             >
//                 <Typography
//                     variant="body1"
//                     sx={{
//                         color: isBot
//                             ? (darkMode ? '#ffffff' : '#000000')
//                             : '#ffffff',
//                         lineHeight: 1.5,
//                         fontSize: '0.95rem',
//                     }}
//                 >
//                     {message.content}
//                 </Typography>
//             </Paper>
//         </Box>
//     );
// };

// export default Message;


// import React from 'react';
// import { Paper, Typography, Box } from '@mui/material';

// const Message = ({ message }) => {
//     const isBot = message.sender === 'bot';

//     return (
//         <Box
//             sx={{
//                 display: 'flex',
//                 justifyContent: isBot ? 'flex-start' : 'flex-end',
//                 mb: 2,
//             }}
//         >
//             <Paper
//                 elevation={2}
//                 sx={{
//                     padding: '12px 18px',
//                     maxWidth: '70%',
//                     backgroundColor: isBot ? '#ffffff' : '#1976d2',
//                     borderRadius: '18px',
//                     borderTopRightRadius: !isBot ? '4px' : '18px',
//                     borderTopLeftRadius: isBot ? '4px' : '18px',
//                     position: 'relative',
//                     boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
//                 }}
//             >
//                 <Typography
//                     variant="body1"
//                     sx={{
//                         color: isBot ? '#000000' : '#ffffff',
//                         lineHeight: 1.5,
//                         fontSize: '0.95rem',
//                     }}
//                 >
//                     {message.content}
//                 </Typography>
//             </Paper>
//         </Box>
//     );
// };

// export default Message;