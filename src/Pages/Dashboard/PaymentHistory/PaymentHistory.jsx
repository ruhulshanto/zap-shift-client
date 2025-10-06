
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaCreditCard, FaDownload, FaReceipt, } from 'react-icons/fa';

const formateDate = (iso) => {
    return new Date(iso).toLocaleDateString();
}

const PaymentHistory = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [], isPending } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`)
            return res.data
        }
    })

    if (isPending) {
        return <progress className="progress w-56 mx-auto mt-12"></progress>
    }

    const totalSpent = payments.reduce((sum, payment) => sum + payment.amount, 0);
    const formattedTotalSpent = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(totalSpent);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">


                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Total Payments */}
                    <div className="transform hover:-translate-y-1 transition-all duration-300 bg-white rounded-2xl shadow-md hover:shadow-xl p-6 border border-gray-100">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">Total Payments</p>
                                <p className="text-4xl font-extrabold text-gray-800 mt-1">{payments.length}</p>
                            </div>
                            <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white shadow-lg">
                                <FaReceipt className="text-3xl" />
                            </div>
                        </div>
                    </div>

                    {/* Total Spent */}
                    <div className="transform hover:-translate-y-1 transition-all duration-300 bg-white rounded-2xl shadow-md hover:shadow-xl p-6 border border-gray-100">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">Total Spent</p>
                                <p className="text-4xl font-extrabold text-gray-800 mt-1">
                                    {formattedTotalSpent}
                                </p>
                            </div>
                            <div className="w-16 h-16 bg-gradient-to-tr from-green-500 to-green-700 rounded-xl flex items-center justify-center text-white shadow-lg">
                                <FaCreditCard className="text-3xl" />
                            </div>
                        </div>
                    </div>
                </div>



                {/* Payments Table */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        #
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Transaction
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Method
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {
                                    payments.map((payment, index) => (
                                        <tr key={payment.transactionId} className="hover:bg-gray-50 transition-colors duration-150">
                                            <td className="px-6 py-4 text-gray-600">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-semibold text-gray-900">{payment.parcelId}</p>
                                                    <p className="text-sm text-gray-500 mt-1">{payment.transactionId}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-bold text-green-600 text-lg">
                                                    {payment.amount}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 capitalize">
                                                    {Array.isArray(payment.paymentMethod)
                                                        ? payment.paymentMethod.join(', ')
                                                        : payment.paymentMethod}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {formateDate(payment.paid_at_string)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-150">
                                                    <FaDownload className="text-gray-400" />
                                                    Receipt
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>


                </div>


            </div>
        </div>
    );
};

export default PaymentHistory;
