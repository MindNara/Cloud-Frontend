import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import "./PostDetailCard.css";
import { Carousel } from "@material-tailwind/react";
import DropdownDots from "./DropdownDots";
import CommentBox from "./CommentBox";
import CommentInput from "./CommentInput";
import { format, parseISO } from 'date-fns';
import axios from 'axios';

const PostDetailCard = () => {

  const user = JSON.parse(localStorage.getItem('user'));

  const [likedPosts, setLikedPosts] = useState([]);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [imgForFullScreen, setImgForFullScreen] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showComments, setShowComments] = useState([]);
  const [postDetail, setPostDetail] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/post")
      .then((res) => {
        setPostDetail(res.data.data);
        const filteredData = res.data.data.filter(item => item.like?.SS.includes(user.userId));
        if (filteredData.length > 0) {
          const likedPostsData = filteredData.map((item) => {
            return { post_id: item.id.S };
          });
          setLikedPosts(likedPostsData);
        }
      })
      .catch((err) => console.log(err.message))
  }, [])
  // console.log(likedPosts);

  const addlike = async (postId) => {
    const data = {
      userId: user.userId
    };

    try {
      const response = await axios.put(`http://localhost:3000/post/like/${postId}`, data, {
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (response.data.success) {
        window.location.reload();
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
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % DetailCard.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + DetailCard.length) % DetailCard.length
    );
  };

  const handleCloseFullScreen = () => {
    setShowFullScreen(false);
  };

  const [dataComment, setDataComment] = useState([]);

  const handleToggleComments = (index, postId) => {
    setShowComments((prev) => {
      const newShowComments = [...prev];
      newShowComments[index] = !newShowComments[index];
      return newShowComments;
    });

    axios.get(`http://localhost:3000/comment/${postId}`)
      .then((res) => {
        setDataComment(res.data.data);
        // console.log(res.data.data)
      })
      .catch((err) => console.log(err.message))
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
                  <DropdownDots postId={post.id.S} />
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
                  {likedPosts && likedPosts.length > 0 && index < likedPosts.length ? (
                    likedPosts[index].post_id === post.id.S && (
                      <Icon
                        icon="bxs:heart"
                        color="#d91818"
                        width="22"
                        height="22"
                        onClick={() => addlike(post.id.S)}
                      />
                    )) : (
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
                    <CommentBox postId={post.id.S} dataComment={dataComment} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostDetailCard;