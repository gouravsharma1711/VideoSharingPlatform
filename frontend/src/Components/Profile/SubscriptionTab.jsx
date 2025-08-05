
import subscriptionsService from '../../backendUtility/subscriptions.utility'
import Subscriptions from './Subscriptions'
import Loading from '../Loading/Loading'
import { useState,useEffect } from 'react'
function SubscriptionTab({user}) {
    const [subscriptionData, setSubscriptionData] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const userId = user?._id;


    const fetchingUserSubscriptions = async () => {
        try {
            setLoading(true);
            
            const response = await subscriptionsService.getSubscribedChannels(userId);
            console.log("Response :  ",response);
            
            if (response?.statusCode===200 && response.data?.length>0 ) {
                setSubscriptionData(response.data);
            } else {
                setSubscriptionData([])
            }
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchingUserSubscriptions();
        }
    }, [userId]);

    if (loading) {
        return <Loading size={50} msg="Fetching Data ..." />;
    }

    return (
        <div className="mb-[10rem]">
            <Subscriptions subscriptionData={subscriptionData} setSubscriptionData={setSubscriptionData}/>
        </div>
    )
}

export default SubscriptionTab
