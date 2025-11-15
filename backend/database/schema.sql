-- Lynko SaaS MVP Database Schema
-- PostgreSQL Database Schema for Chatbot Application

-- Create database (run this separately if needed)
-- CREATE DATABASE lynko_db;

-- Enable UUID extension for better ID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Conversations table
CREATE TABLE conversations (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    context TEXT,
    ai_model VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Messages table
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    conversation_id INTEGER REFERENCES conversations(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_conversations_created_at ON conversations(created_at DESC);
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to automatically update updated_at
CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add constraints for data validation
ALTER TABLE conversations ADD CONSTRAINT chk_ai_model CHECK (
    ai_model IN ('gpt-3.5-turbo', 'gpt-4', 'claude-instant-1', 'claude-2', 'gemini-pro')
);

-- Add constraints for title length
ALTER TABLE conversations ADD CONSTRAINT chk_title_length CHECK (LENGTH(title) >= 1 AND LENGTH(title) <= 255);

-- Add constraints for message content length
ALTER TABLE messages ADD CONSTRAINT chk_content_length CHECK (LENGTH(content) >= 1 AND LENGTH(content) <= 10000);