import { useState } from "react";
import { FaHeart, FaRegComment, FaShareAlt, FaStar } from "react-icons/fa";

const RoomActions = () => {
  const [liked, setLiked] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handlePostReview = () => {
    console.log({ rating, review });
    setShowCommentModal(false);
    setRating(0);
    setReview("");
    alert("Review posted!");
  };

  return (
    <>
      {/* Left Icons + Line */}
      <div className="relative w-[50px] shrink-0">
        {/* Vertical Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-0 h-[1000px] border-l border-gray-300"></div>

        {/* Icons column */}
        <div className="absolute right-12 transform -translate-x-1/2 top-100 -translate-y-1/2 flex flex-col items-center space-y-16 z-10">
          {/* Heart */}
          <button
            onClick={() => setLiked(!liked)}
            className="text-5xl cursor-pointer focus:outline-none"
          >
            <FaHeart className={liked ? "text-red-500" : "text-gray-400"} />
          </button>

          {/* Comment */}
          <button
            onClick={() => setShowCommentModal(true)}
            className="text-5xl text-gray-400 cursor-pointer focus:outline-none"
          >
            <FaRegComment />
          </button>

          {/* Share */}
          <button
  onClick={() => {
    try {
      navigator.clipboard.writeText(window.location.href);
      alert("Room URL copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
      alert("Unable to copy URL.");
    }
  }}
  className="text-5xl text-gray-400 cursor-pointer focus:outline-none"
>
  <FaShareAlt />
</button>

        </div>
      </div>

      {/* Comment / Rating Modal */}
      {showCommentModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg p-6 w-96 relative">
            <h2 className="text-lg font-semibold mb-4">Leave a Review</h2>
            <div className="flex space-x-1 mb-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <FaStar
                  key={i}
                  className={`cursor-pointer text-2xl ${
                    i <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => setRating(i)}
                />
              ))}
            </div>
            <textarea
              className="w-full border rounded p-2 mb-4 text-sm"
              rows={4}
              placeholder="Write your review..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                onClick={() => setShowCommentModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-[#DC9E38] text-black hover:bg-[#c78e2d]"
                onClick={handlePostReview}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RoomActions;
