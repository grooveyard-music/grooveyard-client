
import Spotify  from "../../../assets/img/Spotify-Logo.wine.svg"
import Youtube  from "../../../assets/img/YouTube-Logo.wine.svg"
import Soundcloud  from "../../../assets/img/SoundCloud-Logo.wine.svg"



export function IntegrationSection() {
  return (
    <section className="container mx-auto px-4 py-8 ">

       <div className="text-sm uppercase text-gray-500 mb-2 text-center">Integrate with</div>

        <div className="flex flex-wrap justify-between items-center">
       
            <div className="w-1/4 mb-4"><img src={Spotify} alt="Shopify" className="mx-auto" /></div>
            <div className="w-1/4 mb-4"><img src={Youtube} alt="Shopify" className="mx-auto" /></div>
            <div className="w-1/4 mb-4"><img src={Soundcloud} alt="WhatsApp" className="mx-auto" /></div>
        </div>
        
    </section>
  )
}
