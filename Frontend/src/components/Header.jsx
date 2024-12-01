import { Rocket } from 'lucide-react';

export const Header = () => {
  return (
    <header className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Rocket size={40} className="text-yellow-300" />
        <h1 className="text-6xl font-bold">MemeVest</h1>
      </div>
      <p className="text-2xl text-gray-200">Where Memes Become Dreams</p>
    </header>
  );
};