import React from "react";

const people = [
  
  {
    name: "Apoorva",
    age: 22,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
  },
  {
    name: "Prachi",
    age: 23,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },
  {
    name: "Shruti",
    age: 21,
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
  },
  
  {
    name: "Kabir",
    age: 22,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c",
  },
  {
    name: "Eshna",
    age: 24,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
  },
  {
    name: "Prachi",
    age: 23,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },
  {
    name: "Shruti",
    age: 21,
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
  },
  
  {
    name: "Kabir",
    age: 22,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c",
  },
  
];

export default function Landing() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white">
      {/* Background image grid */}
      <div className="absolute inset-0 z-0 grid grid-cols-4 gap-4 p-10 blur-sm">
        {people.map((person, index) => (
          <div
            key={index}
            className="relative rounded-2xl overflow-hidden shadow-lg"
            style={{ opacity: 1 }} // 👈 makes each image semi-transparent
          >
            <img
              src={`${person.image}?w=300&h=400&fit=crop`}
              alt={person.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 bg-black/40 w-full text-white text-xs p-1 text-center">
              {person.name}, {person.age}
            </div>
          </div>
        ))}
      </div>

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        {/* <h1 className="text-5xl font-bold mb-8 drop-shadow-lg">
          Start something epic.
        </h1> */}
        {/* <div className="flex gap-4">
          <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition">
            App Store
          </button>
          <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition">
            Google Play
          </button>
        </div> */}
      </div>
    </div>
  );
}