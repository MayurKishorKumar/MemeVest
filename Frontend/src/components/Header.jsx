import { motion } from 'framer-motion';

export const Header = () => {
  return (
    <header className="text-center mb-12">
      <motion.h1 
        className="text-6xl font-bold mb-4"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        MemeVest
      </motion.h1>
      <motion.p 
        className="text-2xl"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Where Memes Become Dreams
      </motion.p>
    </header>
  );
};