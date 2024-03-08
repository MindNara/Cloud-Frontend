// PopUpComment.jsx
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import axios from 'axios';
import { baseURL } from "../../../baseURL";

const PopUpComment = ({ commentId, handleClose, togglePopup, handlePost }) => {

  const [comment, setComment] = useState('');

  useEffect(() => {
    axios.get(`${baseURL}commentById/${commentId}`)
      .then((res) => {
        const comment = res.data.data;
        setComment(comment.message.S);
      })
      .catch((err) => console.log(err.message))
  }, [])

  const handleUpdateComment = async () => {

    try {
      const response = await axios.put(`${baseURL}comment/${commentId}`, {
        message: comment,
      });

      if (response.data.success) {
        // window.location.reload();
        setComment('');
      }
    } catch (error) {
      console.error('Error during signup:', error.response.data);
    }

  }


  return (
    <>
      {comment && (
        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 overflow-y-auto"
          style={{ zIndex: 1001, borderRadius: "30px" }}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-[20px] text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white rounded-[30px]">
                <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-200 rounded-t">
                  <h5 className="text-[27px] font-semibold bg-gradient-to-br from-[#0D0B5F] from-[12.5%] to-[#029BE0] to-[100%] inline-block text-transparent bg-clip-text text-center w-full">
                    Edit Comment
                  </h5>

                  <button
                    type="button"
                    onClick={togglePopup}
                    className="text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-300 hover:text-white"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <>
                  <div className="p-4 md:p-5 space-y-4">
                    <input
                      type="text"
                      placeholder="New Comment"
                      className="border-none outline-none p-2  w-full focus:ring-0 text-xl font-semibold"
                      onChange={(e) => setComment(e.target.value)}
                      value={comment}
                    />
                  </div>

                  <div className="flex items-center p-4 md:p-5 rounded-b mt-[-20px]">
                    <button
                      onClick={handleUpdateComment}
                      type="button"
                      className="text-white bg-gradient-to-br from-[#0D0B5F] to-[#029BE0] hover:from-[#029BE0] hover:to-[#0D0B5F] font-medium rounded-lg text-[15px] px-10 py-2 text-center w-full"
                    >
                      Update
                    </button>
                  </div>
                </>

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopUpComment;
