const jokes = [
    "Why did the crypto investor go to the gym? To work on their HODLing strength!",
    "What do you call a sad cryptocurrency? A crypt-oh-no!",
    "Why don't cryptocurrencies ever get stressed? They're always in de-centralized state!",
    "How do crypto traders stay fit? They do a lot of bit-coin crunches!",
    "What's a meme coin's favorite dance? The moon walk!",
  ];
  
  export const getRandomJoke = () => {
    return jokes[Math.floor(Math.random() * jokes.length)];
  };