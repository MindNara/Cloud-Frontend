// DropdownComment.js
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import PopUpComment from "./PopUpComment";
import axios from 'axios';
import { baseURL } from "../../../baseURL";

const DropdownComment = ({ commentId, postId }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // console.log(postId);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handlePost = () => {
    closePopup();
  };

  function deleteComment(id) {
    // console.log(postId);
    console.log("Delete Comment: " + id);
    axios.delete(`${baseURL}comment/${id}`, { data: { postId: postId } })
      .then(res => {
        window.location.reload();
      })
      .catch((err) => console.log(err.message))
  }

  return (
    <div className="relative">
      <button
        id="dropdownMenuIconHorizontalButton"
        data-dropdown-toggle="dropdownDotsHorizontal"
        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 rounded-lg focus:outline-none relative"
        type="button"
        onClick={toggleDropdown}
      >
        <svg
          className="w-3 h-3 text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 3"
        >
          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
        </svg>
      </button>

      {isDropdownOpen && (
        <div
          id="dropdownDotsHorizontal"
          className="absolute z-10 bg-white border border-gray-200 rounded-lg shadow-md w-[110px] h-[90px] right-0"
        >
          <ul
            className="py-2 text-sm text-gray-700"
            aria-labelledby="dropdownMenuIconHorizontalButton"
          >
            <li className="hover:bg-gray-200">
              <div className="flex items-center ml-4">
                <Icon
                  icon="fluent:edit-24-regular"
                  color="#727272"
                  width="15"
                  height="15"
                />
                <a
                  href="#"
                  className="block px-2 py-2 dark:text-gray-500 font-normal"
                  onClick={togglePopup}
                >
                  Edit
                </a>
              </div>
            </li>
            <li className="hover:bg-gray-200">
              <div className="flex items-center ml-4">
                <Icon
                  icon="mingcute:delete-3-line"
                  color="#727272"
                  width="15"
                  height="15"
                />
                <a
                  href="#"
                  className="block px-2 py-2 dark:text-gray-500 font-normal"
                  onClick={() => deleteComment(commentId)}
                >
                  Delete
                </a>
              </div>
            </li>
          </ul>
        </div>
      )}

      {isPopupOpen && <PopUpComment commentId={commentId} handleClose={closePopup} togglePopup={togglePopup} handlePost={handlePost} />}
    </div>
  );
};

export default DropdownComment;
