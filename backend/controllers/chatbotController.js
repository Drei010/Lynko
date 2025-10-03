/**
 * Chatbot Controller
 * Handles chatbot message processing without authentication
 */

// AI Response Generator
const generateAIResponse = (userMessage, config = {}) => {
  const { product = 'our product', goal = 'book a demo', goalLink = '', fallback = 'visit our website', fallbackLink = '' } = config;
  const lowerMessage = userMessage.toLowerCase();
  
  // Greeting responses
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return `Hello! Nice to meet you. I'm here to help you learn about ${product} and assist with ${goal}. What would you like to know?`;
  }
  
  // Demo/Meeting booking
  if (lowerMessage.includes('demo') || lowerMessage.includes('meeting') || lowerMessage.includes('book')) {
    if (goalLink) {
      return `Great! I'd be happy to help you ${goal}. You can schedule a time that works for you at ${goalLink}. Would you like me to explain what to expect in the demo?`;
    }
    return `I can help you ${goal}. What time works best for you this week?`;
  }
  
  // Product information
  if (lowerMessage.includes('product') || lowerMessage.includes('tell me about') || lowerMessage.includes('what is')) {
    return `${product} is a powerful platform designed to help Sales Development Representatives automate personalized LinkedIn conversations at scale. Our AI handles entire conversation flows, qualifying prospects and booking meetings autonomously while maintaining a human-like touch. Would you like to see how it works?`;
  }
  
  // How it works
  if (lowerMessage.includes('how') || lowerMessage.includes('work')) {
    return `Here's how ${product} works: I autonomously handle entire personalized LinkedIn conversations by understanding prospect responses, qualifying their interest level, and either booking meetings with interested prospects or directing them to relevant resources. I maintain natural, human-like conversations throughout. Interested in ${goal}?`;
  }
  
  // Pricing
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
    return `For detailed pricing information, I recommend scheduling a quick call with our team to discuss a plan that fits your specific needs. Would you like to ${goal} to learn more about pricing options?`;
  }
  
  // Features
  if (lowerMessage.includes('feature') || lowerMessage.includes('can you') || lowerMessage.includes('do you')) {
    return `${product} offers several key features: automated LinkedIn conversations, intelligent prospect qualification, meeting scheduling, personalized responses at scale, and detailed analytics. Each conversation is tailored to your specific goals. Would you like to ${goal} to see these features in action?`;
  }
  
  // Interest/Yes responses
  if (lowerMessage.includes('yes') || lowerMessage.includes('interested') || lowerMessage.includes('sure')) {
    if (goalLink) {
      return `Excellent! I'm glad you're interested. You can ${goal} using this link: ${goalLink}. I'll make sure you get the most value from our conversation.`;
    }
    return `That's great to hear! I can help you ${goal}. What specific areas are you most interested in exploring?`;
  }
  
  // Not interested/No responses
  if (lowerMessage.includes('not interested') || lowerMessage.includes('no thanks') || lowerMessage.includes('maybe later')) {
    if (fallbackLink) {
      return `No problem at all! If you'd like to learn more at your own pace, feel free to ${fallback} at ${fallbackLink}. I'm here if you have any questions in the future!`;
    }
    return `I understand. If you'd like, you can ${fallback} to learn more when you're ready. Have a great day!`;
  }
  
  // Goodbye
  if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye') || lowerMessage.includes('thanks')) {
    return `Thank you for chatting with me! If you have any more questions about ${product}, feel free to reach out anytime. Have a wonderful day!`;
  }
  
  // Default contextual response
  const responses = [
    `That's interesting! Based on what you're saying about "${userMessage}", I think ${product} could be a great fit for your needs. Would you like to ${goal} to explore this further?`,
    `I understand your interest in "${userMessage}". ${product} is designed to help with exactly these kinds of challenges. Would you like to learn more through ${goal}?`,
    `Thanks for sharing that about "${userMessage}". Let me help you explore how ${product} can address this. Would ${goal} work for you to discuss this in detail?`
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

// Chat endpoint - no authentication required
const chat = async (req, res) => {
  try {
    const { message, config } = req.body;
    
    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Message is required',
      });
    }

    // Generate AI response
    const aiResponse = generateAIResponse(message, config);

    // Simulate processing delay for realistic experience
    await new Promise(resolve => setTimeout(resolve, 300));

    res.json({
      success: true,
      message: 'Response generated successfully',
      data: {
        userMessage: message,
        aiResponse: aiResponse,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate response',
      error: error.message,
    });
  }
};

// Health check for chatbot
const healthCheck = (req, res) => {
  res.json({
    success: true,
    message: 'Chatbot service is running',
    timestamp: new Date().toISOString(),
  });
};

module.exports = {
  chat,
  healthCheck,
};
