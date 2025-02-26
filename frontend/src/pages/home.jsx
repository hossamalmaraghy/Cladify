import BestSeller from "../components/bestSeller"
import Hero from "../components/hero"
import LatestCollection from "../components/latestCollection"
import NewsLetterBox from "../components/newsLetterBox"
import OurPolicy from "../components/ourPolicy"


const Home = () => {
  return (
    <div className="">
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsLetterBox />
    </div>
  )
}

export default Home