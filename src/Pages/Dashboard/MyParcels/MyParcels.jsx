import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import MyParcelData from './MyParcelData';

const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // ______________TanStack Query to fetch parcels______________
    const { isLoading, data: parcels = [], refetch } = useQuery({
        queryKey: [],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`)
            return res.data;
        }
    })
    console.log(parcels);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center mt-16">
                <progress className="progress w-56 mx-auto mt-12"></progress>
            </div>
        );
    }



    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">My Parcels ({parcels.length})</h2>
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="table table-zebra w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th>#</th>
                            <th>Sender</th>
                            <th>Type</th>
                            <th>Created</th>
                            <th>Cost</th>
                            <th>Delivery</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel, idx) => (
                            <MyParcelData
                                key={parcel._id}
                                parcel={parcel}
                                idx={idx}
                                refetch={refetch}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyParcels;