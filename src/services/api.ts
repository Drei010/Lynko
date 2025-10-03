/**
 * API Service
 * Handles all communication with the Lynko backend API
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any[];
}

interface Conversation {
  id: number;
  title: string;
  context: string;
  ai_model: string;
  message_count?: number;
  last_message_at?: string;
  created_at: string;
  updated_at: string;
}

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

interface ConversationMessages {
  user_message: Message;
  ai_message: Message;
}

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...headers,
          ...options.headers as Record<string, string>,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  

  // Conversation methods
  async createConversation(title: string, context: string, aiModel: string): Promise<{ conversation: Conversation }> {
    const response = await this.request<{ conversation: Conversation }>('/conversations', {
      method: 'POST',
      body: JSON.stringify({ title, context, ai_model: aiModel }),
    });

    return response.data!;
  }

  async getConversations(page = 1, limit = 10): Promise<{
    conversations: Conversation[];
    pagination: {
      current_page: number;
      total_pages: number;
      total_count: number;
      limit: number;
    };
  }> {
    const response = await this.request<{
      conversations: Conversation[];
      pagination: any;
    }>(`/conversations?page=${page}&limit=${limit}`);

    return response.data!;
  }

  async getConversation(id: number): Promise<{ conversation: Conversation }> {
    const response = await this.request<{ conversation: Conversation }>(`/conversations/${id}`);
    return response.data!;
  }

  async updateConversation(id: number, title: string, context: string, aiModel: string): Promise<{ conversation: Conversation }> {
    const response = await this.request<{ conversation: Conversation }>(`/conversations/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, context, ai_model: aiModel }),
    });

    return response.data!;
  }

  async deleteConversation(id: number): Promise<void> {
    await this.request(`/conversations/${id}`, {
      method: 'DELETE',
    });
  }

  // Message methods
  async sendMessage(conversationId: number, content: string): Promise<ConversationMessages> {
    const response = await this.request<ConversationMessages>(`/conversations/${conversationId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });

    return response.data!;
  }

  async getMessages(conversationId: number, page = 1, limit = 50): Promise<{
    messages: Message[];
    pagination: {
      current_page: number;
      total_pages: number;
      total_count: number;
      limit: number;
    };
  }> {
    const response = await this.request<{
      messages: Message[];
      pagination: any;
    }>(`/conversations/${conversationId}/messages?page=${page}&limit=${limit}`);

    return response.data!;
  }

  async deleteMessage(messageId: number): Promise<void> {
    await this.request(`/messages/${messageId}`, {
      method: 'DELETE',
    });
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL.replace('/api', '')}/health`);
      const data = await response.json();
      return data.success === true;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}

// Create singleton instance
export const apiService = new ApiService();
export default apiService;
