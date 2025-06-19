import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from './firebase';

export default function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});

  useEffect(() => {
    const fetchRestaurants = async () => {
      const querySnapshot = await getDocs(collection(db, 'shops'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRestaurants(data);
    };
    fetchRestaurants();
  }, []);

  const handleCheckboxChange = (restaurantId, itemName) => {
    setSelectedItems(prev => {
      const items = prev[restaurantId] || [];
      const updated = items.includes(itemName)
        ? items.filter(i => i !== itemName)
        : [...items, itemName];
      return { ...prev, [restaurantId]: updated };
    });
  };

  const handleOrder = (restaurantName, restaurantId) => {
    const items = selectedItems[restaurantId] || [];
    if (items.length === 0) {
      alert('Please select at least one item to order.');
    } else {
      alert(`Order confirmed from ${restaurantName}:\n\nItems:\n- ${items.join('\n')}`);
    }
  };

  return (
    <section className="restaurant-section">
      <h2>Restaurants</h2>
      <div className="restaurant-list">
        {restaurants.length > 0 ? (
          restaurants.map((r) => (
            <div className="restaurant" key={r.id}>
              <h3>{r.name}</h3>
              <ul>
                {Array.isArray(r.menu) && r.menu.length > 0 ? (
                  r.menu.map((item, idx) => (
                    <li key={idx}>
                      <label>
                        <input
                          type="checkbox"
                          checked={
                            selectedItems[r.id]?.includes(item.name) || false
                          }
                          onChange={() => handleCheckboxChange(r.id, item.name)}
                        />
                        {item.name} - ₹{item.price}
                      </label>
                    </li>
                  ))
                ) : (
                  <li>No menu items available</li>
                )}
              </ul>
              <button onClick={() => handleOrder(r.name, r.id)}>Place Order</button>
            </div>
          ))
        ) : (
          <p>No restaurants available.</p>
        )}
      </div>
    </section>
  );
}
