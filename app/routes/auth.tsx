import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export const meta = () => [
  {
    title: "ResumAI",
  },
  {
    name: "description",
    content: "Login to your account",
  },
];

const auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split("next=")[1];
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      // Redirect to home page by default, or to the specified next URL if provided
      const redirectPath = next || "/";
      navigate(redirectPath);
    }
  }, [auth.isAuthenticated, next, navigate]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-300/10 to-purple-300/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Main card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 transform transition-all duration-500 hover:scale-105">
          {/* Logo/Brand section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              ResumAI
            </h1>
            <p className="text-gray-600 text-lg font-medium">Welcome back</p>
            <p className="text-gray-500 text-sm mt-1">
              Sign in to continue to your dashboard
            </p>
          </div>

          {/* Auth button section */}
          <div className="space-y-4">
            {isLoading ? (
              <div className="relative">
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed">
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing you in...</span>
                  </div>
                </button>
              </div>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                      <div className="flex items-center justify-center space-x-2 text-green-700">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="font-medium">
                          Successfully signed in!
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={auth.signOut}
                      className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={auth.signIn}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 group"
                  >
                    <div className="flex items-center justify-center space-x-3">
                      <svg
                        className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span>Sign In</span>
                    </div>
                  </button>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Secure authentication powered by Puter
            </p>
          </div>
        </div>

        {/* Additional info card */}
        <div className="mt-6 bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <div className="flex items-center justify-center space-x-2 text-gray-600 text-sm">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Your data is encrypted and secure</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default auth;
