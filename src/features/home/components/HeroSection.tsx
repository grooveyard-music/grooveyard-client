import { Reveal } from "../../../util/Reveal";

export function HeroSection() {
  return (

    <section className="flex items-center justify-center text-center p-10 h-[60rem]">
        <Reveal>
    <div className=" flex flex-col items-center justify-center py-24">
  
      <h1 className="font-extrabold text-6xl md:text-8xl tracking-tight text-center mb-4">    
        <span className="block">Join Grooveyard</span>
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500 text-5xl ">
          The ultimate music collaborator
        </span>
      </h1>
   
      <p className="text-xl text-gray-400 max-w-lg text-center mb-6">
        Keep all your music platforms in once place, share music and create tracklists
      </p>
      <button className="bg-pink-500 hover:bg-pink-600  font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1">
        Join now
      </button>
    </div>
    </Reveal>
    </section>
  );
}
