import AdminNav from "@/app/components/Nav/AdminNav";

export default function AdminDashboard({ children}) {
  return (
    <div className="flex ">
    <AdminNav />
        {children} 
    </div>
  )
}