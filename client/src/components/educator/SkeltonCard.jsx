const SkeletonCard = () => {
    return (
      <div className="w-full h-full p-4 space-y-4 border border-gray-300  shadow-md animate-pulse">
        {/* Title Skeleton */}
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        {/* Image Skeleton */}
        <div className="h-32 bg-gray-300 rounded"></div>
        {/* Text Skeleton */}
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>
    );
  };
  
  export default SkeletonCard;
  