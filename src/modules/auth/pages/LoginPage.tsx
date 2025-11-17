import  LoginForm  from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left blue area */}
      <div className="w-1/2 bg-blue-600 text-white flex flex-col items-center justify-center p-10">
        <h1 className="text-3xl font-bold text-center">
          Mehmonhona admin paneliga xush kelimsiz
        </h1>
        <p className="text-center mt-3 text-lg opacity-90">
          Davom etish uchun tizimga kiring
        </p>
      </div>

      {/* Right white area */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
