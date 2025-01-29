import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layouts/layout";
import HomePage from "./pages/HomePage";
import { useAuth0 } from "@auth0/auth0-react";
import Dashboard from "./components/Dashboard";


const AppRoutes = ()=> {
    const { isAuthenticated, isLoading } = useAuth0();console.log('AppRoutes component rendered');
    if (isLoading) return <div>Loading...</div>;
    return (
        <Routes>
            <Route 
                path="/" 
                element={<Layout>{isAuthenticated ? <Dashboard /> : <HomePage />}</Layout>} 
            />
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    )
}

export default AppRoutes;