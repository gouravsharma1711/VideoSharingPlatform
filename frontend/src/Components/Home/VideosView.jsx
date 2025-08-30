import React from 'react';
import Card from '../CoreComponents/Cards/Card.jsx';
function VideosView({ videoData = [] }) {
  return (
    <div className="container mx-auto px-2 pb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {
          videoData.map((item, index) => {
            if (videoData.length === index + 1) {
              return (
                <div key={item._id}>
                  <Card item={item} />
                </div>
              );
            } else {
              return <Card key={item._id} item={item} />;
            }
          })
        }
      </div>
    </div>
  );
}

export default VideosView;