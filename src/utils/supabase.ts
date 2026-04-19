/**
 * Supabase client configuration and service functions.
 *
 * Initialises the Supabase browser client using public environment variables.
 * All database helpers live here so pages only import thin wrappers.
 *
 * Environment variables required (see .env.example):
 *   PUBLIC_SUPABASE_URL      – your Supabase project URL
 *   PUBLIC_SUPABASE_ANON_KEY – the public anon key (never use the service-role key client-side)
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY ?? '';

/**
 * Shared Supabase browser client.
 * Safe to use in client-side scripts – uses the public anon key only.
 */
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

/* ------------------------------------------------------------------ */
/*  Type definitions                                                  */
/* ------------------------------------------------------------------ */

/** Shape of account sign-up metadata. */
export interface AccountRecord {
  fornavn: string;
  etternavn: string;
  epost: string;
  samtykke_vilkar: boolean;
  nyhetsbrev: boolean;
}

/** Shape of a row in the `referrals` table. */
export interface ReferralRecord {
  avsender_navn: string;
  avsender_epost: string;
  mottaker_navn: string;
  mottaker_epost: string;
  melding?: string;
}

/* ------------------------------------------------------------------ */
/*  Service helpers                                                   */
/* ------------------------------------------------------------------ */

/**
 * Create a new authenticated user account.
 *
 * Uses Supabase Auth sign-up with email/password and stores
 * additional profile metadata in `user_metadata`.
 *
 * @returns Success flag, or an error message.
 */
export async function createAccount(
  data: AccountRecord,
  password: string,
): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    console.warn('Supabase is not configured – skipping auth sign-up.');
    return { success: true };
  }

  const { error } = await supabase.auth.signUp({
    email: data.epost,
    password,
    options: {
      data: {
        fornavn: data.fornavn,
        etternavn: data.etternavn,
        samtykke_vilkar: data.samtykke_vilkar,
        nyhetsbrev: data.nyhetsbrev,
      },
    },
  });

  if (error) {
    console.error('Supabase sign-up error:', error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Insert a referral into the `referrals` table.
 *
 * @returns The inserted row on success, or an error message.
 */
export async function createReferral(
  data: ReferralRecord,
): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    console.warn('Supabase is not configured – skipping insert.');
    return { success: true };
  }

  const { error } = await supabase.from('referrals').insert([data]);

  if (error) {
    console.error('Supabase insert error (referrals):', error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}
