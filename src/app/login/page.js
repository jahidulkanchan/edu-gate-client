import LoginForm from './LoginForm';

export const metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <LoginForm />
    </main>
  );
}
