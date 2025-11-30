import { NextRequest, NextResponse } from 'next/server'
import { aiAssistant, AIMessage } from '@/lib/ai/assistant'
import { AuthService } from '@/lib/auth/jwt'
import { supabase } from '@/lib/supabase/client'

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    const payload = AuthService.verifyToken(token)

    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    const { messages, conversationId } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      )
    }

    // Get AI response
    const response = await aiAssistant.chat(messages as AIMessage[], {
      userId: payload.userId,
      organizationId: payload.organizationId || '',
      conversationId,
    })

    // Save conversation
    if (conversationId) {
      await supabase
        .from('ai_conversations')
        .update({
          messages: [...messages, { role: 'assistant', content: response }],
          updated_at: new Date().toISOString(),
        })
        .eq('id', conversationId)
    } else {
      await supabase.from('ai_conversations').insert({
        user_id: payload.userId,
        title: messages[0]?.content?.substring(0, 50) || 'New Conversation',
        messages: [...messages, { role: 'assistant', content: response }],
      })
    }

    return NextResponse.json({
      success: true,
      response,
    })
  } catch (error) {
    console.error('AI Chat error:', error)
    return NextResponse.json(
      { error: 'Failed to process AI request' },
      { status: 500 }
    )
  }
}