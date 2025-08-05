
import LoadingSpinner from '../dashBoard/LoadingSpinner'
function Loading({size,msg}) {
    return (
        <div className="min-h-screen flex  flex-col gap-2 items-center justify-center text-white">
         <LoadingSpinner size={size}/>
         {msg}
      </div>
    )
}

export default Loading
