/**
 * Simple API Test Script
 * Tests the basic functionality of the Lynko backend API
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

async function testAPI() {
  console.log('🧪 Testing Lynko Backend API...\n');

  try {
    // Test 1: Health Check
    console.log('1. Testing Health Check...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health Check:', healthResponse.data.message);

    // Test 2: Chatbot Health Check
    console.log('\n2. Testing Chatbot Health...');
    const chatbotHealthResponse = await axios.get(`${BASE_URL}/api/chatbot/health`);
    console.log('✅ Chatbot Health:', chatbotHealthResponse.data.message);
    console.log('   OpenAI Configured:', chatbotHealthResponse.data.openai_configured);

    // Test 3: Create Conversation
    console.log('\n3. Testing Create Conversation...');
    const conversationData = {
      title: 'Test Chat',
      context: 'Testing the API functionality',
      ai_model: 'gpt-3.5-turbo'
    };
    
    const conversationResponse = await axios.post(`${BASE_URL}/api/conversations`, conversationData);
    console.log('✅ Conversation Created:', conversationResponse.data.message);
    const conversationId = conversationResponse.data.data.conversation.id;

    // Test 4: Send Message to Chatbot
    console.log('\n4. Testing Send Message to Chatbot...');
    const messageData = {
      content: 'Hello, this is a test message!'
    };
    
    const messageResponse = await axios.post(`${BASE_URL}/api/conversations/${conversationId}/messages`, messageData);
    console.log('✅ Message Sent:', messageResponse.data.message);
    if (messageResponse.data.data.ai_message) {
      console.log('🤖 AI Response:', messageResponse.data.data.ai_message.content.substring(0, 100) + '...');
    }

    // Test 5: Get Messages
    console.log('\n5. Testing Get Messages...');
    const messagesResponse = await axios.get(`${BASE_URL}/api/conversations/${conversationId}/messages`);
    console.log('✅ Messages Retrieved:', messagesResponse.data.data.messages.length, 'messages');

    // Test 6: Get Conversations
    console.log('\n6. Testing Get Conversations...');
    const conversationsResponse = await axios.get(`${BASE_URL}/api/conversations`);
    console.log('✅ Conversations Retrieved:', conversationsResponse.data.data.conversations.length, 'conversations');

    console.log('\n🎉 All tests passed successfully!');
    console.log('\n📊 Test Summary:');
    console.log('   ✅ Health Check');
    console.log('   ✅ Chatbot Status');
    console.log('   ✅ Conversation Management');
    console.log('   ✅ Message Handling');
    console.log('   ✅ AI Integration');

  } catch (error) {
    console.error('\n❌ Test failed:', error.response?.data || error.message);
    process.exit(1);
  }
}

// Check if server is running
async function checkServer() {
  try {
    await axios.get(`${BASE_URL}/health`);
    return true;
  } catch (error) {
    return false;
  }
}

// Main execution
async function main() {
  console.log('🔍 Checking if server is running...');
  const serverRunning = await checkServer();
  
  if (!serverRunning) {
    console.log('❌ Server is not running. Please start the server first:');
    console.log('   npm run dev');
    process.exit(1);
  }
  
  await testAPI();
}

main();
