const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Message = require('../models/Message');


// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Expanded list of allowed MIME types
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        // Images
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'image/svg+xml',
        // Documents
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        // Text files
        'text/plain',
        'text/csv',
        // Others
        'application/zip',
        'application/x-zip-compressed',
        'application/octet-stream'
    ];

    console.log('Uploaded file type:', file.mimetype); // Debug log

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
        req.fileValidationError = `File type ${file.mimetype} is not supported. Supported types: ${allowedTypes.join(', ')}`;
    }
};


const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // Increased to 10MB
    }
}).single('file');


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

router.post('/chat', (req, res) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred during upload
            return res.status(400).json({
                error: `Upload error: ${err.message}`
            });
        } else if (err) {
            // An unknown error occurred
            return res.status(500).json({
                error: `Unknown error: ${err.message}`
            });
        } else if (req.fileValidationError) {
            // File type validation error
            return res.status(400).json({
                error: req.fileValidationError
            });
        }

        // Process the upload and chat
        const processChat = async () => {
            try {
                const userMessage = req.body.message;
                const file = req.file;

                let fileUrl;
                if (file) {
                    fileUrl = `http://localhost:5000/uploads/${file.filename}`;
                }

                const chat = model.startChat();
                const result = await chat.sendMessage(userMessage || 'Process this uploaded file');
                const text = result.response.text();

                const userMsg = await Message.create({
                    content: userMessage || 'Sent a file',
                    sender: 'user',
                    fileUrl: fileUrl
                });

                const botMsg = await Message.create({
                    content: text,
                    sender: 'bot'
                });

                res.json({
                    reply: text,
                    fileUrl: fileUrl
                });
            } catch (error) {
                console.error("Error:", error);
                res.status(500).json({
                    error: "Failed to process request",
                    details: error.message
                });
            }
        };

        processChat();
    });
});

// Get chat history route
router.get('/history', async (req, res) => {
    try {
        const messages = await Message.find().sort({ timestamp: 1 });
        res.json(messages);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to fetch history" });
    }
});

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const { GoogleGenerativeAI } = require('@google/generative-ai');
// const Message = require('../models/Message');


// // Configure multer for file uploads
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/') // Files will be stored in 'uploads' directory
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname) // Unique filename
//     }
// });

// const fileFilter = (req, file, cb) => {
//     // Accept images and documents
//     const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

//     if (allowedTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(new Error('Invalid file type'), false);
//     }
// };

// const upload = multer({
//     storage: storage,
//     fileFilter: fileFilter,
//     limits: {
//         fileSize: 5 * 1024 * 1024 // 5MB size limit
//     }
// });


// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// router.post('/chat', async (req, res) => {
//     const { userMessage } = req.body;

//     if (!userMessage?.trim()) {
//         return res.status(400).json({ error: "Message cannot be empty" });
//     }

//     try {
//         const chat = model.startChat();
//         const result = await chat.sendMessage(userMessage);
//         const text = result.response.text();

//         const userMsg = await Message.create({
//             content: userMessage,
//             sender: 'user'
//         });

//         const botMsg = await Message.create({
//             content: text,
//             sender: 'bot'
//         });

//         res.json({ reply: text });
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ error: "Failed to generate response" });
//     }
// });

// router.get('/history', async (req, res) => {
//     try {
//         const messages = await Message.find().sort({ timestamp: 1 });
//         res.json(messages);
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ error: "Failed to fetch history" });
//     }
// });

// module.exports = router;