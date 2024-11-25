import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold">Welcome to Our Platform</h1>
      <p className="mt-4 text-lg text-gray-600">Get started by logging in or registering.</p>
      <Link href='/subjects'>Login</Link>
    </main>
  );
}
