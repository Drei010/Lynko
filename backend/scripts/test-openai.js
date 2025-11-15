#!/usr/bin/env node

/**
 * OpenAI API Connection Test Script
 * Tests connectivity and basic functionality of the OpenAI API integration
 * 
 * Usage:
 *   npm run test:openai
 *   node scripts/test-openai.js
 */

require('dotenv').config();
const openaiService = require('../utils/openai');
const logger = require('../utils/logger');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function printSuccess(message) {
  console.log(`${colors.green}✅ ${message}${colors.reset}`);
}

function printError(message) {
  console.log(`${colors.red}❌ ${message}${colors.reset}`);
}

function printWarning(message) {
  console.log(`${colors.yellow}⚠️  ${message}${colors.reset}`);
}

function printInfo(message) {
  console.log(`${colors.blue}ℹ️  ${message}${colors.reset}`);
}

function printHeader(message) {
  console.log(`\n${colors.cyan}═══════════════════════════════════════${colors.reset}`);
  console.log(`${colors.cyan}${message}${colors.reset}`);
  console.log(`${colors.cyan}═══════════════════════════════════════${colors.reset}\n`);
}

async function runTests() {
  printHeader('OpenAI API Connection Test Suite');

  let passedTests = 0;
  let failedTests = 0;

  // Test 1: Check Environment Configuration
  console.log('Test 1: Checking environment configuration...');
  try {
    const status = openaiService.getStatus();
    
    if (status.configured) {
      printSuccess('OpenAI API key is configured');
      printInfo(`API Key starts with: ${status.apiKeyPrefix}`);
      printInfo(`API Key length: ${status.apiKeyLength} characters`);
      console.log('');
      passedTests++;
    } else {
      printError('OpenAI API key is NOT configured');
      printWarning('Please set OPENAI_API_KEY in your .env file');
      console.log('');
      failedTests++;
    }
  } catch (error) {
    printError(`Configuration check failed: ${error.message}`);
    console.log('');
    failedTests++;
  }

  // Test 2: Test API Connection
  console.log('Test 2: Testing API connection...');
  try {
    const result = await openaiService.testConnection();
    
    if (result.success) {
      printSuccess('Connected to OpenAI API successfully');
      printInfo(`Model: ${result.model}`);
      console.log('');
      passedTests++;
    } else {
      printError(`API connection failed: ${result.message}`);
      console.log('');
      failedTests++;
    }
  } catch (error) {
    printError(`Connection test error: ${error.message}`);
    console.log('');
    failedTests++;
  }

  // Test 3: Test Simple Message
  console.log('Test 3: Testing simple message generation...');
  try {
    const response = await openaiService.callChatGPT('Hello, how are you?', {
      model: 'gpt-3.5-turbo',
      systemPrompt: 'You are a helpful assistant.',
      maxTokens: 50,
      temperature: 0.7,
    });

    if (response && response.length > 0) {
      printSuccess('Message generated successfully');
      printInfo(`Response: "${response.substring(0, 100)}${response.length > 100 ? '...' : ''}"`);
      console.log('');
      passedTests++;
    } else {
      printError('No response received from API');
      console.log('');
      failedTests++;
    }
  } catch (error) {
    printWarning(`Message generation failed: ${error.message}`);
    printInfo('(This may happen if your API key is invalid or rate limited)');
    console.log('');
    failedTests++;
  }

  // Test 4: Test with Configuration
  console.log('Test 4: Testing AI response with configuration...');
  try {
    const response = await openaiService.generateAIResponse('I want to learn more', {
      model: 'gpt-3.5-turbo',
      product: 'Lynko SaaS',
      goal: 'book a demo',
      goalLink: 'https://example.com/demo',
    });

    if (response && response.content && response.content.length > 0) {
      printSuccess('AI response generated with configuration');
      printInfo(`Response: "${response.content.substring(0, 100)}${response.content.length > 100 ? '...' : ''}"`);
      printInfo(`Used API: ${response.usedAPI}`);
      printInfo(`Model: ${response.model}`);
      console.log('');
      passedTests++;
    } else {
      printError('Failed to generate response with configuration');
      console.log('');
      failedTests++;
    }
  } catch (error) {
    printWarning(`AI response generation failed: ${error.message}`);
    console.log('');
    failedTests++;
  }

  // Summary
  printHeader('Test Summary');
  
  const total = passedTests + failedTests;
  const passPercentage = total > 0 ? Math.round((passedTests / total) * 100) : 0;

  console.log(`Total Tests: ${total}`);
  printSuccess(`Passed: ${passedTests}`);
  if (failedTests > 0) {
    printError(`Failed: ${failedTests}`);
  } else {
    console.log(`Failed: ${failedTests}`);
  }
  console.log(`Success Rate: ${passPercentage}%\n`);

  if (failedTests === 0 && passedTests >= 3) {
    printSuccess('All critical tests passed! OpenAI API is ready to use.');
    console.log('\n✨ Your Lynko backend is now configured to use ChatGPT API!\n');
  } else if (failedTests > 0) {
    printWarning('Some tests failed. Please check your configuration.');
    console.log('\n📋 Configuration Checklist:');
    console.log('   1. Create a .env file in the backend directory');
    console.log('   2. Copy variables from env.example');
    console.log('   3. Get your OpenAI API key from: https://platform.openai.com/account/api-keys');
    console.log('   4. Set OPENAI_API_KEY in your .env file');
    console.log('   5. Ensure your account has API access and credits\n');
  }

  process.exit(failedTests === 0 && passedTests >= 3 ? 0 : 1);
}

// Run tests
runTests().catch((error) => {
  printError(`Fatal error: ${error.message}`);
  console.error(error);
  process.exit(1);
});
