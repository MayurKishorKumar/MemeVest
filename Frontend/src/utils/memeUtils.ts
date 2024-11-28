export interface MemeCoin {
    id: string;
    name: string;
    symbol: string;
    price: number;
    change24h: number;
    marketCap: number;
    volume: number;
    moonPotential: number;
    description: string;
  }
  
  export const mockMemeCoins: MemeCoin[] = [
    {
      id: "doge",
      name: "Dogecoin",
      symbol: "DOGE",
      price: 0.08,
      change24h: 5.2,
      marketCap: 11000000000,
      volume: 500000000,
      moonPotential: 87,
      description: "Much wow, very currency. Elon's favorite pet project.",
    },
    {
      id: "shib",
      name: "Shiba Inu",
      symbol: "SHIB",
      price: 0.000009,
      change24h: -2.1,
      marketCap: 5000000000,
      volume: 200000000,
      moonPotential: 92,
      description: "The Doge-killer that couldn't. Still barking though!",
    },
    {
      id: "pepe",
      name: "Pepe",
      symbol: "PEPE",
      price: 0.000001,
      change24h: 15.7,
      marketCap: 400000000,
      volume: 100000000,
      moonPotential: 99,
      description: "From meme to dream. Feels good man!",
    },
    {
      id: "grimace",
      name: "Grimace Coin",
      symbol: "GRIMACE",
      price: 0.00005,
      change24h: -10.5,
      marketCap: 50000000,
      volume: 10000000,
      moonPotential: 75,
      description: "Purple, round, and down. McDonalds' secret sauce for losses.",
    },
  ];
  
  export const formatNumber = (num: number): string => {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
    return num.toFixed(2);
  };
  
  export const getRandomJoke = (): string => {
    const jokes = [
      "Why did the crypto investor go to the gym? To work on their HODLing strength!",
      "What do you call a sad cryptocurrency? A crypt-oh-no!",
      "Why don't cryptocurrencies ever get stressed? They're always in de-centralized state!",
      "How do crypto traders stay fit? They do a lot of bit-coin crunches!",
      "What's a meme coin's favorite dance? The moon walk!",
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  };  