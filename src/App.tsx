import { useState } from 'react';
import { AddIdentity } from './components/AddIdentity';
import { IdentityList } from './components/IdentityList';
import IdentityDetail from './components/IdentityDetail';
import NavBar from './components/NavBar';
import { EditIdentity } from './components/EditIdentity';
import { Info } from './components/Info';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleDataChanged = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <main className='pt-20'>
      <NavBar />
      <AddIdentity onIdentityAdded={handleDataChanged} />
      <EditIdentity onIdentityEdited={handleDataChanged} />
      <Info
        refreshTrigger={refreshKey}
        onIdentityGenerated={handleDataChanged}
      />
      <div className='overflow-clip w-full h-full m-0 p-0 flex flex-row justify-center'>
        <IdentityList
          refreshTrigger={refreshKey}
          onIdentityGenerated={handleDataChanged}
        />
        <IdentityDetail
          refreshTrigger={refreshKey}
          onIdentityDeleted={handleDataChanged}
        />
      </div>
    </main>
  );
}

export default App;
