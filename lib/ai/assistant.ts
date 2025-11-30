import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface AIMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface AIContext {
  userId: string
  organizationId: string
  conversationId?: string
  metadata?: Record<string, any>
}

export class AIAssistant {
  private systemPrompt = `You are an intelligent business assistant for an enterprise platform. You help users with:
- Data analysis and insights
- Task management and automation
- Customer relationship management
- Financial reporting and forecasting
- Project planning and tracking
- Document analysis and summarization
- Email drafting and communication
- Sales predictions and trends

Always provide actionable, concise, and professional responses. Use data-driven insights when available.`

  async chat(messages: AIMessage[], context: AIContext): Promise<string> {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: this.systemPrompt },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 1000,
      })

      return response.choices[0]?.message?.content || 'No response generated'
    } catch (error) {
      console.error('AI Assistant Error:', error)
      throw new Error('Failed to generate AI response')
    }
  }

  async analyzeData(data: any[], query: string): Promise<string> {
    const dataContext = JSON.stringify(data, null, 2)
    
    const messages: AIMessage[] = [
      {
        role: 'user',
        content: `Analyze this data and answer the query: "${query}"\n\nData:\n${dataContext}`,
      },
    ]

    return this.chat(messages, {} as AIContext)
  }

  async generateReport(type: string, data: any): Promise<string> {
    const messages: AIMessage[] = [
      {
        role: 'user',
        content: `Generate a ${type} report based on this data:\n${JSON.stringify(data, null, 2)}`,
      },
    ]

    return this.chat(messages, {} as AIContext)
  }

  async predictSales(historicalData: any[]): Promise<any> {
    const messages: AIMessage[] = [
      {
        role: 'user',
        content: `Based on this historical sales data, provide sales predictions for the next quarter:\n${JSON.stringify(historicalData, null, 2)}`,
      },
    ]

    const response = await this.chat(messages, {} as AIContext)
    return { prediction: response, confidence: 0.85 }
  }

  async summarizeDocument(content: string): Promise<string> {
    const messages: AIMessage[] = [
      {
        role: 'user',
        content: `Summarize this document concisely:\n\n${content}`,
      },
    ]

    return this.chat(messages, {} as AIContext)
  }

  async draftEmail(context: { to: string; subject: string; purpose: string }): Promise<string> {
    const messages: AIMessage[] = [
      {
        role: 'user',
        content: `Draft a professional email:
To: ${context.to}
Subject: ${context.subject}
Purpose: ${context.purpose}`,
      },
    ]

    return this.chat(messages, {} as AIContext)
  }

  async analyzeCustomerSentiment(feedback: string[]): Promise<any> {
    const messages: AIMessage[] = [
      {
        role: 'user',
        content: `Analyze customer sentiment from these feedback messages:\n${feedback.join('\n\n')}`,
      },
    ]

    const response = await this.chat(messages, {} as AIContext)
    return {
      sentiment: response,
      score: 0.75,
      insights: response,
    }
  }

  async suggestTasks(projectContext: any): Promise<string[]> {
    const messages: AIMessage[] = [
      {
        role: 'user',
        content: `Based on this project context, suggest 5 actionable tasks:\n${JSON.stringify(projectContext, null, 2)}`,
      },
    ]

    const response = await this.chat(messages, {} as AIContext)
    return response.split('\n').filter(line => line.trim().length > 0)
  }
}

export const aiAssistant = new AIAssistant()