import AdminUserTable from './components/AdminUserTable';
// ... your existing imports

function App() {
  // ... your existing products code stays exactly as-is

  return (
    <>
      <h1>chai aur api</h1>

    
      {/* --- new admin section --- */}
      <hr />
      <AdminUserTable />
    </>
  );
}

export default App;