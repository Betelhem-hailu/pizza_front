import { Header, Sidebar } from "../components";


const AdminLayout = ({ user, children }) => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flexGrow: 1 }}>
        <Header user={user} />
        <div style={{ 
          padding: '20px', 
          boxShadow: "0px 0px 15px 0px #0000000D"}}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
