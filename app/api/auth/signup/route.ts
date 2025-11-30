import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase/client'
import { AuthService } from '@/lib/auth/jwt'

export async function POST(request: NextRequest) {
  try {
    const { email, password, fullName, organizationName } = await request.json()

    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: 'Email, password, and full name are required' },
        { status: 400 }
      )
    }

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      )
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      )
    }

    // Create organization if provided
    let organizationId = null
    if (organizationName) {
      const slug = organizationName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      
      const { data: orgData, error: orgError } = await supabaseAdmin
        .from('organizations')
        .insert({
          name: organizationName,
          slug,
          plan: 'free',
        })
        .select()
        .single()

      if (!orgError && orgData) {
        organizationId = orgData.id
      }
    }

    // Create user profile
    const { error: profileError } = await supabaseAdmin
      .from('users')
      .insert({
        id: authData.user.id,
        email,
        full_name: fullName,
        role: organizationId ? 'admin' : 'user',
        organization_id: organizationId,
      })

    if (profileError) {
      console.error('Profile creation error:', profileError)
    }

    // Generate JWT token
    const token = AuthService.generateToken({
      userId: authData.user.id,
      email,
      role: organizationId ? 'admin' : 'user',
      organizationId: organizationId || undefined,
    })

    // Log audit
    await supabaseAdmin.from('audit_logs').insert({
      user_id: authData.user.id,
      organization_id: organizationId,
      action: 'signup',
      resource_type: 'auth',
      ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
      user_agent: request.headers.get('user-agent'),
    })

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: authData.user.id,
        email,
        fullName,
        role: organizationId ? 'admin' : 'user',
        organizationId,
      },
    })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}