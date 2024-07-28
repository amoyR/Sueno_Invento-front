import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';

const List: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await api.get('/items');
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div>
      <h2>Welcome, {user?.name}</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default List;