import Link from "next/link";
import { AlertCircle } from "lucide-react";

interface Props {
  searchParams: Promise<{ error?: string }>;
}

export default async function AuthErrorPage({ searchParams }: Props) {
  const { error } = await searchParams;
  
  const errorMessages: Record<string, string> = {
    Configuration: "There is a problem with the server configuration.",
    AccessDenied: "You do not have permission to sign in.",
    Verification: "The verification link may have expired or already been used.",
    OAuthSignin: "There was an error trying to sign you in with this provider.",
    OAuthCallback: "There was an error processing the OAuth callback.",
    OAuthCreateAccount: "Could not create a new account using this OAuth provider.",
    EmailCreateAccount: "Could not create a new account with this email.",
    Callback: "There was an error during the authentication callback.",
    Default: "An authentication error occurred. Please try again.",
  };

  const errorCode = error ?? "Default";
  const message = errorMessages[errorCode] ?? errorMessages.Default;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-100 shadow-card p-8 text-center">
        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="h-8 w-8 text-red-500" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 mb-2">Authentication Error</h1>
        <p className="text-slate-500 mb-6">{message}</p>
        <div className="flex flex-col gap-3">
          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center rounded-lg text-sm font-semibold px-4 h-10 bg-[#2563EB] text-white hover:bg-[#1d4ed8] transition-all"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg text-sm font-semibold px-4 h-10 hover:bg-slate-100 text-slate-700 transition-all"
          >
            Go to Homepage
          </Link>
        </div>
        <p className="text-xs text-slate-400 mt-4">
          Error code: <code className="bg-slate-100 px-1 rounded">{errorCode}</code>
        </p>
      </div>
    </div>
  );
}
