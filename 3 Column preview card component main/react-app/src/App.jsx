import './App.css'
import sedanIcon from './assets/icon-sedans.svg'
import suvIcon from './assets/icon-suvs.svg'
import luxuryIcon from './assets/icon-luxury.svg'
import VehicleCard from './components/VehicleCard'

function App() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 mt-[100px]">
      
      <div className="w-full max-w-5xl lg:grid lg:grid-cols-3 overflow-hidden rounded-lg">
        
        <VehicleCard 
          title="Sedans" 
          icon={sedanIcon} 
          backgroundClass="bg-sedans"
          linkColorClass="text-sedans"
          description="Choose a sedan for its affordability and excellent fuel economy. Ideal for cruising in the city or on your next road trip." 
        />

        <VehicleCard 
          title="SUVs" 
          icon={suvIcon} 
          backgroundClass="bg-suvs"
          linkColorClass="text-suvs"
          description="Take an SUV for its spacious interior, power, and versatility. Perfect for your next family vacation and off-road adventures."
        />

        <VehicleCard 
          title="Luxury" 
          icon={luxuryIcon} 
          backgroundClass="bg-luxury"
          linkColorClass="text-luxury"
          description="Cruise in the best car brands without the bloated prices. Enjoy the enhanced comfort of a luxury rental and arrive in style."
        />

      </div>

    </main>
  )
}

export default App