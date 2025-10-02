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

    // Test 2: Register User
    console.log('\n2. Testing User Registration...');
    const registerData = {
      email: 'test@example.com',
      password: 'TestPass123!'
    };
    
    let authToken;
    try {
      const registerResponse = await axios.post(`${BASE_URL}/api/auth/register`, registerData);
      console.log('✅ User Registered:', registerResponse.data.message);
      authToken = registerResponse.data.data.token;
    } catch (error) {
      if (error.response?.status === 409) {
        console.log('ℹ️  User already exists, testing login...');
        // Test 3: Login User
        const loginResponse = await axios.post(`${BASE_URL}/api/auth/login`, registerData);
        console.log('✅ User Logged In:', loginResponse.data.message);
        authToken = loginResponse.data.data.token;
      } else {
        throw error;
      }
    }

    // Test 4: Get Profile
    console.log('\n3. Testing Get Profile...');
    const profileResponse = await axios.get(`${BASE_URL}/api/auth/profile`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Profile Retrieved:', profileResponse.data.data.user.email);

    // Test 5: Create Conversation
    console.log('\n4. Testing Create Conversation...');
    const conversationData = {
      title: 'Test Chat',
      context: 'Testing the API functionality',
      ai_model: 'gpt-3.5-turbo'
    };
    
    const conversationResponse = await axios.post(`${BASE_URL}/api/conversations`, conversationData, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Conversation Created:', conversationResponse.data.message);
    const conversationId = conversationResponse.data.data.conversation.id;

    // Test 6: Send Message
    console.log('\n5. Testing Send Message...');
    const messageData = {
      content: 'Hello, this is a test message!'
    };
    
    const messageResponse = await axios.post(`${BASE_URL}/api/conversations/${conversationId}/messages`, messageData, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Message Sent:', messageResponse.data.message);
    console.log('🤖 AI Response:', messageResponse.data.data.ai_message.content.substring(0, 100) + '...');

    // Test 7: Get Messages
    console.log('\n6. Testing Get Messages...');
    const messagesResponse = await axios.get(`${BASE_URL}/api/conversations/${conversationId}/messages`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Messages Retrieved:', messagesResponse.data.data.messages.length, 'messages');

    // Test 8: Get Conversations
    console.log('\n7. Testing Get Conversations...');
    const conversationsResponse = await axios.get(`${BASE_URL}/api/conversations`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Conversations Retrieved:', conversationsResponse.data.data.conversations.length, 'conversations');

    console.log('\n🎉 All tests passed successfully!');
    console.log('\n📊 Test Summary:');
    console.log('   ✅ Health Check');
    console.log('   ✅ User Authentication');
    console.log('   ✅ Profile Management');
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
