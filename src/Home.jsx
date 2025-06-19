import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import RestaurantList from './restaurant';

import { db } from './firebase';

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
 console.log(restaurants);
  useEffect(() => {
    const fetchRestaurants = async () => {
      const querySnapshot = await getDocs(collection(db, 'shops'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRestaurants(data);
    };
    fetchRestaurants();
  }, []);

  return (
    <main className="home-container">
      <h1>We Take Out. We Dine Out. We Deliver.</h1>

      <div className="search-bar">
        <select className="dropdown">
          <option value="">Takeout</option>
          <option value="A-Block">A-Block</option>
          <option value="B-Block">B-Block</option>
          <option value="C-Block">C-Block</option>
                    <option value="B-Block">D-Block</option>
          <option value="C-Block">E-Block</option>
          <option value="PhD Block">PhD Block</option>
          <option value="Faculty Block">Faculty Block</option>
        </select>

      </div>

      <div className="cards">
        <div className="card">
          <h2>Preorder your food!</h2>
        </div>

        <div className="card">
          <h2>Deliver at your doorstep</h2>
        </div>
      </div>

<RestaurantList />


      <section className="how-it-works">
        <h2>How it works</h2>
        <div className="steps">
          <div className="step">
            <h3>1. Choose Location</h3>
            <p>Select where you want your food delivered.</p>
          </div>
          <div className="step">
            <h3>2. Browse Menus</h3>
            <p>Explore dishes from your favorite local spots.</p>
          </div>
          <div className="step">
            <h3>3. Place Order</h3>
            <p>Click, confirm and relax while we deliver!</p>
          </div>
        </div>
      </section>
    </main>
  );
}
