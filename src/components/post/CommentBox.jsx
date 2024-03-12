import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { format, parseISO } from 'date-fns';
import DropdownComment from './DropdownComment';
import axios from 'axios';
import { baseURL } from "../../../baseURL";
import { Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import PopUpComment from "./PopUpComment";

const CommentBox = ({ postId }) => {

  const user = JSON.parse(localStorage.getItem('user'));
  const [comment, setComment] = useState('');
  const [dataComment, setDataComment] = useState([]);

  useEffect(() => {
    axios.get(`${baseURL}comment/${postId}`)
      .then((res) => {
        setDataComment(res.data.data);
      })
      .catch((err) => console.log(err.message));
  }, [dataComment])

  const postComment = async () => {

    try {
      const response = await axios.post(`${baseURL}comment`, {
        message: comment,
        userId: user.userId,
        postId: postId
      });

      if (response.data.success) {
        setComment('');
      }
    } catch (error) {
      console.error('Error during signup:', error.response.data);
    }

  }

  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [commentId, setCommentId] = useState('');

  const toggleModalDelete = (commentId) => {
    setCommentId(commentId);
    setIsModalDeleteOpen(!isModalDeleteOpen);
  };

  const deleteComment = async () => {
    console.log("Delete Comment: " + commentId);
    try {
      await axios.delete(`${baseURL}comment/${commentId}`, { data: { postId: postId } });
      setIsModalDeleteOpen(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [commentIdEdit, setCommentIdEdit] = useState('');

  const toggleModalEdit = (commentId) => {
    setCommentIdEdit(commentId);
    setIsModalEditOpen(!isModalEditOpen);
  };

  return (
    <>
      <div className="mt-5 relative">
        {dataComment && (
          dataComment.map((comment, index) => (
            <>
              <div key={index} className="flex items-start mb-4">
                <div className="w-10 h-10 flex-shrink-0 rounded-full bg-[#151C38] flex items-center justify-center text-white font-bold"></div>
                <div className="ml-3 p-2 bg-[#E3F3FF] relative" style={{ width: '100%', maxWidth: 'calc(100% - 40px)', borderRadius: '10px' }}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      {user.role === 'admin' && user.userId === comment.user_id.S ? (
                        <p>Admin</p>
                      ) : (
                        <p>User@{comment.user_id.S}</p>
                      )}
                      <p className="text-[#A4A4A4] text-[10px] font-[350] ml-2 mt-[2px]">{format(parseISO(comment.time_stamp.S), 'dd/MM/yyyy')}, {format(parseISO(comment.time_stamp.S), 'HH:mm')} น.</p>
                    </div>
                    <div className="relative">
                      {user.role === "admin" | user.userId === comment.user_id.S ? (
                        <>
                          <Menu placement="bottom-end">
                            <MenuHandler>
                              <div className="flex items-center cursor-pointer">
                                <Icon icon="prime:ellipsis-h" color="#151c38" width="16" height="16" />
                              </div>
                            </MenuHandler>
                            <MenuList className="bg-[#ffffff] border border-gray-200 shadow-md rounded-xl text-sm">
                              <MenuItem className="hover:bg-gray-200 cursor-pointer rounded-xl" onClick={() => { toggleModalEdit(comment.id.S) }}>
                                <div className="flex item-center py-3">
                                  <Icon
                                    icon="fluent:edit-24-regular"
                                    color="#727272"
                                    width="15"
                                    height="15"
                                  />
                                  <span className="pl-3 text-gray-700">Edit</span>
                                </div>
                              </MenuItem>
                              <MenuItem className="hover:bg-gray-200 cursor-pointer rounded-xl" onClick={() => { toggleModalDelete(comment.id.S) }} >
                                <div className="flex item-center py-3">
                                  <Icon
                                    icon="mingcute:delete-3-line"
                                    color="#727272"
                                    width="15"
                                    height="15"
                                  />
                                  <span className="pl-3 text-gray-700">Delete</span>
                                </div>
                              </MenuItem>
                            </MenuList>
                          </Menu>

                          {isModalDeleteOpen && (
                            <div
                              id="modal-delete"
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
                                  <div className="absolute inset-0 bg-gray-500 opacity-25"></div>
                                </div>

                                <span
                                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                                  aria-hidden="true"
                                >
                                  &#8203;
                                </span>
                                <div className="inline-block align-bottom bg-white rounded-[20px] text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                  <div className="bg-white rounded-[30px]">

                                    {/* header */}
                                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                                      <h5 className="text-[27px] font-semibold bg-gradient-to-br from-[#0D0B5F] from-[12.5%] to-[#029BE0] to-[100%] text-transparent bg-clip-text text-center w-full">
                                        Delete Post
                                      </h5>
                                      {/* close */}
                                      <button type="button" class="absolute top-5 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setIsModalDeleteOpen(false)}>
                                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                      </button>
                                    </div>
                                    {/* body */}
                                    <div className="flex flex-col p-4 md:p-5 justify-center items-center text-2xl font-normal">
                                      <p>Are you sure you want to</p>
                                      <p>delete your comment?</p>
                                    </div>
                                    {/* footer */}
                                    <div className="flex flex-row gap-4 mb-2 mt-6">
                                      <div className="flex items-center pl-6 rounded-b mt-[-20px] mb-2 w-full">
                                        <button
                                          onClick={() => setIsModalDeleteOpen(false)}
                                          type="button"
                                          className="text-gray-500 bg-white hover:from-[#029BE0] hover:to-[#0D0B5F] font-medium rounded-lg text-lg px-10 py-2 text-center w-full border-2 border-[#D9D9D9]"
                                        >
                                          Cancle
                                        </button>
                                      </div>
                                      <div className="flex items-center pr-6 rounded-b mt-[-20px] mb-2 w-full">
                                        <button
                                          onClick={deleteComment}
                                          type="button"
                                          className="text-white bg-gradient-to-br from-[#0D0B5F] to-[#029BE0] hover:from-[#029BE0] hover:to-[#0D0B5F] font-medium rounded-lg text-lg px-10 py-2 text-center w-full"
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {isModalEditOpen && (
                            <>
                              <PopUpComment commentId={comment.id.S} setIsModalEditOpen={setIsModalEditOpen} isModalEditOpen={isModalEditOpen} />
                            </>
                          )}


                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <p className="text-black text-sm font-light">{comment.message.S}</p>
                </div>
              </div >
            </>
          ))
        )}
      </div >

      <div name="post" className="relative mx-2">
        <input
          className="w-full h-[40px] rounded-[10px] border-0 py-5 pl-7 pr-20 text-[16px] text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1.5 focus:ring-inset focus:ring-[#0D0B5F] text-sm font-light "
          placeholder="Your Message ..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></input>
        <button className="py-[6px] px-[12px] flex-shrink-0 bg-gradient-to-br from-[#0D0B5F] to-[#029BE0] hover:from-[#029BE0] hover:to-[#0D0B5F] rounded-[10px] absolute top-1/2 right-[-6px] transform -translate-x-1/2 -translate-y-1/2 text-[16px]">
          <Icon icon="wpf:sent" color="#fff" className="py-0.1" onClick={postComment} />
        </button>
      </div>
    </>
  );
};

export default CommentBox;
