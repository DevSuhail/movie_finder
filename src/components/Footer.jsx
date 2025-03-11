import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-indigo-950 text-white py-2 mt-10">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Movie Finder. All rights reserved.
        </p>
        <p className="text-sm">
          Made with ❤️ by <a href="https://github.com/DevSuhail" target="_blank" className="text-purple-400 hover:text-purple-300">DevSuhail</a>
        </p>
        <p className="text-sm">
          Powered by <a href="https://www.themoviedb.org" target="_blank" className="text-purple-400 hover:text-purple-300">TMDB</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;