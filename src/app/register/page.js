
import Link from 'next/link';
import RegisterForm from './RegisterForm';

export const metadata = {
  title: 'Register | College Booking',
  description: 'Create a new account to book college services.',
};

export default function RegisterPage() {
  return ( 
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        <RegisterForm />
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
