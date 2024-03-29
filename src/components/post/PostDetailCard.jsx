import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import "./PostDetailCard.css";
import { Carousel } from "@material-tailwind/react";
import { Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import CommentBox from "./CommentBox";
import CommentInput from "./CommentInput";
import { format, parseISO } from 'date-fns';
import axios from 'axios';
import { baseURL } from "../../../baseURL";
import PopUpEdit from "./PopUpEdit";


const PostDetailCard = () => {

  const user = JSON.parse(localStorage.getItem('user'));

  const [likedPosts, setLikedPosts] = useState([]);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [imgForFullScreen, setImgForFullScreen] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showComments, setShowComments] = useState([]);
  const [postDetail, setPostDetail] = useState(null);
  const [checkPostId, setCheckPostId] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}post`)
      .then((res) => {
        const sortedPostDetail = res.data.data.sort((a, b) => {
          const timestampA = new Date(a.timestamp.S).getTime();
          const timestampB = new Date(b.timestamp.S).getTime();
          return timestampB - timestampA;
        });
        setPostDetail(sortedPostDetail);
        // console.log(res.data.data)

        const filteredData = res.data.data.filter(item => item.like?.SS.includes(user.userId));
        if (filteredData.length > 0) {
          const likedPostsData = filteredData.map((item) => {
            return { post_id: item.id.S };
          });
          setLikedPosts(likedPostsData);
        }
      })
      .catch((err) => console.log(err.message))
  }, [postDetail])
  // console.log(likedPosts);

  const addlike = async (postId) => {
    const data = {
      userId: user.userId
    };

    try {
      const response = await axios.put(`${baseURL}post/like/${postId}`, data, {
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (response.data.success) {
        console.log("Post ID: " + postId);
        setCheckPostId(postId);
        // setCheckLike(!checkLike);
      }
    } catch (error) {
      console.error('Error during ilke review:', error);
    }
  };

  const handleImageClick = (item, index) => {
    setImgForFullScreen(item);
    setCurrentImageIndex(index);
    setShowFullScreen(true);
  };

  const handleNextImage = () => {
    // setCurrentImageIndex((prevIndex) => (prevIndex + 1) % DetailCard.length);
  };

  const handlePrevImage = () => {
    // setCurrentImageIndex(
    //   (prevIndex) => (prevIndex - 1 + DetailCard.length) % DetailCard.length
    // );
  };

  const handleCloseFullScreen = () => {
    setShowFullScreen(false);
  };

  const handleToggleComments = (index, postId) => {
    setShowComments((prev) => {
      const newShowComments = [...prev];
      newShowComments[index] = !newShowComments[index];
      return newShowComments;
    });
  };

  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [postId, setPostId] = useState('');

  const toggleModalDelete = (postId) => {
    setPostId(postId);
    setIsModalDeleteOpen(!isModalDeleteOpen);
  };

  const deletePost = async () => {
    console.log("Delete Post: " + postId);
    try {
      await axios.delete(`${baseURL}post/${postId}`);
      setIsModalDeleteOpen(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [postIdEdit, setPostIdEdit] = useState('');

  const toggleModalEdit = (postId) => {
    setPostIdEdit(postId);
    setIsModalEditOpen(!isModalEditOpen);
  };

  return (
    <div className="">
      {postDetail &&
        postDetail.map((post, index) => (
          <div key={index} className="mb-4">
            <div className="flex-shrink-0 border-[1px] border-solid border-gray-300 rounded-[30px] p-6 bg-white">
              <div className="text-[#151C38] text-2xl font-[500] leading-normal flex justify-between">
                <span>{post.title.S}</span>

                {user.role === 'admin' && (
                  <>
                    <Menu placement="bottom-end">
                      <MenuHandler>
                        <div className="flex items-center cursor-pointer">
                          <Icon icon="prime:ellipsis-h" color="#151c38" width="22" height="22" />
                        </div>
                      </MenuHandler>
                      <MenuList className="bg-[#ffffff] border border-gray-200 shadow-md rounded-xl text-sm">
                        <MenuItem className="hover:bg-gray-200 cursor-pointer rounded-xl" onClick={() => { toggleModalEdit(post.id.S) }}>
                          <div className="flex item-center py-3">
                            <Icon
                              icon="fluent:edit-24-regular"
                              color="#727272"
                              width="15"
                              height="15"
                            />
                            <span className="pl-3 text-gray-700">Edit Post</span>
                          </div>
                        </MenuItem>
                        <MenuItem className="hover:bg-gray-200 cursor-pointer rounded-xl" onClick={() => { toggleModalDelete(post.id.S) }} >
                          <div className="flex item-center py-3">
                            <Icon
                              icon="mingcute:delete-3-line"
                              color="#727272"
                              width="15"
                              height="15"
                            />
                            <span className="pl-3 text-gray-700">Delete Post</span>
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
                                <p>delete your post?</p>
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
                                    onClick={deletePost}
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
                  </>
                )}
              </div>

              <div className="mt-5 flex items-start">
                <div className="w-[50px] h-[50px] flex-shrink-0 rounded-full bg-[#151C38]"></div>
                <div className="ml-4">
                  <p className="text-[#151C38] text-l font-[400]">
                    Admin
                  </p>
                  <p className="text-[#A4A4A4] text-l font-[350]">
                    {format(parseISO(post.timestamp.S), 'dd/MM/yyyy')}, {format(parseISO(post.timestamp.S), 'HH:mm')} น.
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <p className="text-black text-l font-light">{post.detail.S}</p>

                {post.images.L.length === 1 ? (

                  post.images.L.map((imageUrl, imageIndex) => (
                    <img
                      key={imageIndex}
                      src={imageUrl.M.url.S}
                      className="object-cover w-full rounded-lg cursor-pointer mt-4"
                      alt={`post-${imageIndex}`}
                      onClick={() => handleImageClick(imageUrl.M.url.S, index)}
                    />
                  ))

                ) : (
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {post.images.L.map((item, i) => (
                      <div key={i}>
                        <img
                          src={item.M.url.S}
                          className="object-cover w-full h-44 rounded-lg cursor-pointer"
                          alt={`post-${index}-${i}`}
                          onClick={() => handleImageClick(item.M.url.S, index)}
                        />
                      </div>
                    ))}
                    {/* {post.images.L.length > 4 && (
                      <div
                        className="object-cover w-full h-44 rounded-lg cursor-pointer"
                        onClick={() => handleImageClick(post.image[4], index)}
                      >
                        <p className="text-white text-lg font-bold">
                          +{post.image.length - 4}
                        </p>
                      </div>
                    )} */}
                  </div>
                )}

                {showFullScreen && (
                  <div
                    className="fullscreen-overlay active"
                    onClick={handleCloseFullScreen}
                  >
                    <div className="fullscreen-image">
                      <Icon
                        icon="fluent:chevron-left-24-filled"
                        color="white"
                        width="32"
                        height="32"
                        className="absolute top-1/2 left-4 cursor-pointer"
                        onClick={handlePrevImage}
                      />
                      <img
                        className="centered-image"
                        src={imgForFullScreen}
                        alt="Full Screen"
                      />
                      <Icon
                        icon="fluent:chevron-right-24-filled"
                        color="white"
                        width="32"
                        height="32"
                        className="absolute top-1/2 right-4 cursor-pointer"
                        onClick={handleNextImage}
                      />
                    </div>
                  </div>
                )}

                <div className="mt-3 flex items-start hover:cursor-pointer">
                  {likedPosts.length > 0 && likedPosts.some(item => item.post_id === post.id.S) ? (
                    <Icon
                      icon="bxs:heart"
                      color="#d91818"
                      width="22"
                      height="22"
                      onClick={() => addlike(post.id.S)}
                    />
                  ) : (
                    <Icon
                      icon="bx:heart"
                      color="#151c38"
                      width="22"
                      height="22"
                      onClick={() => addlike(post.id.S)}
                    />
                  )}
                  <div className="ml-1 mt-[1px]">
                    <p className="text-[#151C38] text-sm mr-3">{post.like.SS.length - 1}</p>
                  </div>
                  <div className="mt-[1px] hover:cursor-pointer">
                    <Icon
                      icon={showComments[index] ? "iconamoon:comment-fill" : "iconamoon:comment"}
                      color="#151c38"
                      width="20"
                      height="20"
                      onClick={() => handleToggleComments(index, post.id.S)}
                    />
                  </div>
                  <div className="ml-1 mt-[1px]">
                    <p className="text-[#151C38] text-sm">{post.comment.N}</p>
                  </div>
                </div>
                {showComments[index] && (
                  <div key={index}>
                    <CommentBox postId={post.id.S} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

      {isModalEditOpen && (
        <PopUpEdit postId={postIdEdit} setIsModalEditOpen={setIsModalEditOpen} isModalEditOpen={isModalEditOpen} />
      )}
    </div>
  );
};

export default PostDetailCard;