import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const token_hash = requestUrl.searchParams.get('token_hash');
  const type = requestUrl.searchParams.get('type');
  const next = requestUrl.searchParams.get('next') ?? '/dados-pessoais';

  if (token_hash && type) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type: type as 'signup' | 'email' | 'recovery' | 'invite',
    });

    if (!error) {
      // Redirecionar para a próxima página
      return NextResponse.redirect(new URL(next, request.url));
    }

    console.error('Error verifying OTP:', error);
  }

  // Se houver erro, redirecionar para o login com mensagem de erro
  return NextResponse.redirect(new URL('/login?error=Erro ao confirmar email', request.url));
}
