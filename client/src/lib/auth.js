import { supabase } from './supabase'

// Sign up a new user
export async function signUp(email, password, name) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: name
      }
    }
  })
  
  if (error) {
    console.error('Sign up error:', error)
    return { error }
  }
  
  return { data, error: null }
}

// Sign in an existing user
export async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) {
      console.error('Sign in error:', error)
      return { error }
    }
    
    return { data, error: null }
  }

// Sign out the current user
export async function signOut() {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      console.error('Sign out error:', error)
      return { error }
    }
    
    return { error: null }
  }
  
  // Get the current logged-in user
  export function getCurrentUser() {
    return supabase.auth.getUser()
  }