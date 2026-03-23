/**
 * Supabase client configuration and service functions.
 *
 * Initialises the Supabase browser client using public environment variables.
 * All database helpers live here so pages only import thin wrappers.
 *
 * Environment variables required (see .env.example):
 *   PUBLIC_SUPABASE_URL      – your Supabase project URL
 *   PUBLIC_SUPABASE_ANON_KEY – the public anon/service-role key
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

/** Shape of a row in the `accounts` table. */
export interface AccountRecord {
  fornavn: string;
  etternavn: string;
  epost: string;
  telefon: string;
  fodselsdato: string;
  kjonn: string;
  adresse: string;
  postnummer: string;
  sted: string;
  samtykke: boolean;
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
 * Insert a new account registration into the `accounts` table.
 *
 * @returns The inserted row on success, or an error message.
 */
export async function createAccount(
  data: AccountRecord,
): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    console.warn('Supabase is not configured – skipping insert.');
    return { success: true };
  }

  const { error } = await supabase.from('accounts').insert([data]);

  if (error) {
    console.error('Supabase insert error (accounts):', error.message);
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
