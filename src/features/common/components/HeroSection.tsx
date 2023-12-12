import Logo from "../../../assets/img/gy-logo.png";


export function HeroSection() {
  
  return (
<section className="block bg-contain bg-center bg-no-repeat" >
  <div className="px-5 md:px-10">
    <div className="mx-auto w-full max-w-7xl">

        <div style={{ height: `calc(100vh - 64px)` }} className="relative flex-col flex items-center justify-center">
          <div className="min-w-full">
            <div className="mx-auto w-full max-w-3xl">
              <div className="py-12 md:py-16 lg:py-20">
                <div className="flex-col flex items-center gap-y-10">
                  <div className="flex-col flex items-center gap-y-5">
                  <img src={Logo} alt="" className=" max-w-full"/>
                  </div>
                  <div className="justify-center flex flex-row items-center gap-4 flex-wrap">
                    <a href="#" className="inline-block cursor-pointer items-center bg-black px-6 py-3 text-center font-semibold text-white">Join now</a>
                    <a href="#" className="flex-row flex max-w-full items-center justify-center border border-solid border-black px-6 py-3 font-bold text-black">
                      <img src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a944888e6cf97_PlayCircle%20(1).svg" alt="" className="mr-2 inline-block max-h-4 max-w-full w-5"/>
                      <p className="max-[479px]:text-sm">Read more</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

</section>
  )
}
