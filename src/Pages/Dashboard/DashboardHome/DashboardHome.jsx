import React from 'react';
import useUserRole from '../../../hooks/useUserRole';
import Loading from '../../../components/Loading';
import UserDashboardHome from './UserDashboardHome';
import RiderDashboardHome from './RiderDashboardHome';
import AdminDashboardHome from './AdminDashboardHome';
import Forbidden from '../../Forbidden/Forbidden';

const DashboardHome = () => {

    const {role, roleLoading} = useUserRole();

    if(roleLoading){
        return <Loading></Loading>
    }
    if(role === 'user'){
        return <UserDashboardHome></UserDashboardHome>
    }
    else if(role === 'rider'){
        return <RiderDashboardHome></RiderDashboardHome>
    }
    else if(role === 'admin'){
        return <AdminDashboardHome></AdminDashboardHome>
    }
    else{
        return <Forbidden></Forbidden>
    }
};

export default DashboardHome;