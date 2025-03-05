import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Paths from '../Utiles/Paths';

function MYComments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComment = async () => {
    try {
      const response = await axios.post(Paths.API_PATHS.COMMENT.MY_COMMENT, {}, {
        headers: {
          'Content-Type': "application/json"
        },
        withCredentials: true
      });

      

      setComments(response.data.data);
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchComment();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">My Comments</h2>
      <div className="space-y-4">
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          comments.length > 0 ? (
            comments.map((com, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all">
                <h3 className="text-xl font-medium text-gray-900 mb-2">{com.message}</h3>
                <h4 className="text-md text-gray-600">{com.name}</h4>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No comments available</p>
          )
        )}
      </div>
    </div>
  );
}

export default MYComments;
