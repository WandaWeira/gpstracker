import React, { useState } from 'react';
import AuthContext from './AuthContext';

//Navigation
import RootStack from './navigators/RootStack'

export default function App() {

  const [_id, setId] = useState(null);
  return (
    <AuthContext.Provider value={{ _id, setId }}>
      <RootStack />
    </AuthContext.Provider>
  );
}
