

export function MeetGrooveyardSection() {

    
  return (
       <section className="container mx-auto px-4 my-36">
      <div className="flex flex-col lg:flex-row items-center justify-between py-12">
        {/* Left Column */}
        <div className="lg:w-1/2">
          <div className="text-sm uppercase text-gray-500 mb-2">Join Grooveyard</div>
          <h1 className="font-bold text-5xl text-gray-800 mb-6">
            The ultimate music collaborator
          </h1>
          <p className="text-gray-700 mb-4">
            Typeset combines AI and design principles to generate visual content that looks amazing – in seconds. Focus on your story to tell, and leave the design to Typeset.
          </p>
          <ul className="list-none space-y-2 mb-6">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span> Create topics 
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span> Save time wasted on moving, resizing, and reformatting your images, GIFs, videos, and charts
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span> Instantly layer a global theme so all your fonts, backgrounds, and charts have a consistent look
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span> Select from different formats and layouts for your ideas
            </li>
          </ul>
          <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-8 rounded-full">
            Join now
          </button>
        </div>

        {/* Right Column */}
        <div className="lg:w-1/2 mt-8 lg:mt-0">
          <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
            <div className="bg-white p-6 rounded-lg shadow-lg">
            <img src="https://via.placeholder.com/800x450" alt="Feature Image" className="w-full h-auto rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between py-12 mt-20">
        {/* Left Column */}
        <div className="lg:w-1/2">
        <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
            <div className="bg-white p-6 rounded-lg shadow-lg">
            <img src="https://via.placeholder.com/800x450" alt="Feature Image" className="w-full h-auto rounded-lg shadow-lg" />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:w-1/2 lg:mt-0">
        <div className="text-sm uppercase text-gray-500 mb-2">Tracklists</div>
          <h1 className="font-bold text-5xl text-gray-800 mb-6">
          Create tracklists
          </h1>
          <p className="text-gray-700 mb-4">
            Typeset combines AI and design principles to generate visual content that looks amazing – in seconds. Focus on your story to tell, and leave the design to Typeset.
          </p>
          <ul className="list-none space-y-2 mb-6">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span> Create topics 
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span> Save time wasted on moving, resizing, and reformatting your images, GIFs, videos, and charts
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span> Instantly layer a global theme so all your fonts, backgrounds, and charts have a consistent look
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span> Select from different formats and layouts for your ideas
            </li>
          </ul>
          <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-8 rounded-full">
            Join now
          </button>
        </div>

   
      </div>
    </section>

  )
}
