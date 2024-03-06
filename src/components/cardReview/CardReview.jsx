import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Menu, MenuHandler, MenuItem, MenuList, rating } from "@material-tailwind/react";
import axios from 'axios';
import {
    Grade1,
    Grade2,
    Grade3,
    Grade4,
    Grade5,
    Grade6,
    Grade7
} from '../../assets/picGrade/index';

function CardReview({ id }) {
    const user = JSON.parse(localStorage.getItem('user'));

    const [reviews, setReviews] = useState([]);
    const [textReview, setTextReview] = useState('');
    const [rating, setRating] = useState('');
    const [grade, setGrade] = useState('');
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [reviewToDeleteId, setReviewToDeleteId] = useState('');
    const [reviewToEditId, setReviewToEditId] = useState('');


    useEffect(() => {
        console.log(id)
        const fetchDataReview = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/review/${id}`);
                setReviews(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchDataReview();
    }, []);

    // แสดงผลดาวตรง rating
    function DisplayRating(rate) {
        const arrayRate = [];
        console.log(rate.rate)
        for (let i = 0; i < rate.rate; i++) {
            arrayRate.push(
                <img
                    className="w-[24px] h-[24px]"
                    src="https://img.icons8.com/fluency/48/star--v1.png"
                />
            );
        }
        console.log(arrayRate)
        return <div className="flex flex-row ml-2">{arrayRate}</div>
    }

    // Modal edit open
    const toggleModalEdit = (review_id) => {
        console.log("eiei" + review_id);
        setReviewToEditId(review_id);
        const reviewToEdit = reviews.find(review => review.review_id.S === review_id);
        if (reviewToEdit) {
            // นำค่ามาแสดงผลตอน edit
            setTextReview(reviewToEdit.detail.S)
            setRating(reviewToEdit.rating.S.toString())
            setGrade(reviewToEdit.grade.S)
            setIsModalEditOpen(!isModalEditOpen);
        } else {
            console.log("Review not found");
        }
    };

    // Modal delete open
    const toggleModalDelete = (review_id) => {
        setReviewToDeleteId(review_id);
        setIsModalDeleteOpen(!isModalDeleteOpen);
    };

    const deleteReview = () => {
        console.log("Delete Review: " + reviewToDeleteId);
        axios.delete(`http://localhost:3000/review/${reviewToDeleteId}`)
            .then(res => {
                window.location.reload();
            })
            .catch((err) => console.log(err.message))

        setIsModalDeleteOpen(false);
    };

    const editReview = async () => {
        const data = {
            detail: textReview,
            grade: grade,
            rating: rating,
        };

        try {
            const response = await axios.put(`http://localhost:3000/review/${reviewToEditId}`, data, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.data.success) {
                setIsModalEditOpen(false)
                window.location.reload();
            }
        } catch (error) {
            console.error('Error during edit review:', error);
        }
    };

    const addlike = async (reviewId) => {
        const data = {
            userId: user.userId // ตั้งชื่อให้ตรงกับใน review.js ที่ส่งค่าไปอะตรง req.body.userId
        };
        // console.log("eiei " + data.userId);

        try {
            const response = await axios.put(`http://localhost:3000/review/like/${reviewId}`, data, {
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

    const addDislike = async (reviewId) => {
        const data = {
            userId: user.userId // ตั้งชื่อให้ตรงกับใน review.js ที่ส่งค่าไปอะตรง req.body.userId
        };
        // console.log("eiei " + data.userId);

        try {
            const response = await axios.put(`http://localhost:3000/review/dislike/${reviewId}`, data, {
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

    return (
        <div className="mt-4">
            {reviews && reviews.map((review, index) => (
                <div className="max-w p-6 bg-white border border-gray-200 rounded-xl mt-4">
                    <div className="mt-2 flex flex-row">
                        <div className="w-[50px] h-[50px] flex-shrink-0 rounded-full bg-[#151C38]"></div>
                        {review.user_id.S == user.userId &&
                        <Menu placement="bottom-end">
                            <MenuHandler>
                                <div className="absolute right-20 cursor-pointer">
                                    <Icon icon="prime:ellipsis-h" color="#151c38" width="19" height="19" />
                                </div>
                            </MenuHandler>
                            <MenuList className="bg-[#ffffff] border border-gray-200 shadow-md rounded-xl text-sm">
                                <MenuItem className="hover:bg-gray-200 cursor-pointer rounded-xl" onClick={() => toggleModalEdit(review.review_id.S)} >
                                    <div className="flex item-center py-3">
                                        <Icon
                                            icon="fluent:edit-24-regular"
                                            color="#727272"
                                            width="15"
                                            height="15"
                                        />
                                        <span className="pl-3 text-gray-700">Edit Review</span>
                                    </div>
                                </MenuItem>
                                <MenuItem className="hover:bg-gray-200 cursor-pointer rounded-xl" onClick={() => toggleModalDelete(review.review_id.S)}>
                                    <div className="hover:bg-gray-200 cursor-pointer">
                                        <div className="flex item-center py-3">
                                            <Icon
                                                icon="mingcute:delete-3-line"
                                                color="#727272"
                                                width="15"
                                                height="15"
                                            />
                                            <p className="pl-3 text-gray-700">Delete Review</p>
                                        </div></div>
                                </MenuItem>
                            </MenuList>
                        </Menu>}

                        {/* Modal edit Review */}
                        {isModalEditOpen && (
                            <div
                                id="modal-edit"
                                tabIndex="-1"
                                aria-hidden="true"
                                className="fixed inset-0 overflow-y-auto"
                                style={{ zIndex: 1001, borderRadius: "30px" }}
                            // onClick={() => setIsModalOpen(false)}
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
                                                    Edit Review
                                                </h5>
                                                {/* close */}
                                                <button type="button" class="absolute top-5 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setIsModalEditOpen(false)}>
                                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                    </svg>
                                                </button>
                                            </div>
                                            {/* body */}
                                            <div className="p-4 md:p-5 space-y-4">
                                                <textarea
                                                    rows="4"
                                                    cols="50"
                                                    placeholder="Text to something ..."
                                                    className="border-none outline-none p-2 mb-4 w-full resize-none focus:ring-0 text-base font-normal"
                                                    value={textReview}
                                                    onChange={(e) => setTextReview(e.target.value)}
                                                />
                                            </div>
                                            <div className="flex flex-row">
                                                <div className="w-full px-3 mb-6">
                                                    <label className="text-[16px] max-2xl:text-[16px] font-medium mb-2 text-gray-500" htmlFor="year">
                                                        Rating
                                                    </label>
                                                    <select
                                                        className='bg-[#F4F4F4] border border-gray-200 rounded-[10px] text-gray-500 mt-2 text-[16px] max-2xl:text-[15px] w-full py-2 px-3 leading-tight focus:outline-none focus:border-gray-500'
                                                        name="selectedPoint" defaultValue={rating} onChange={(e) => setRating(e.target.value)}>
                                                        <option value="1">1 point</option>
                                                        <option value="2">2 point</option>
                                                        <option value="3">3 point</option>
                                                        <option value="4">4 point</option>
                                                        <option value="5">5 point</option>

                                                    </select>
                                                </div>
                                                <div className="w-full px-3 mb-6">
                                                    <label className="text-[16px] max-2xl:text-[16px] font-medium mb-2 text-gray-500" htmlFor="year">
                                                        Grade
                                                    </label>
                                                    <select
                                                        className='bg-[#F4F4F4] border border-gray-200 text-gray-500 rounded-[10px] mt-2 text-[16px] max-2xl:text-[15px] w-full py-2 px-3 leading-tight focus:outline-none focus:border-gray-500'
                                                        name="selectedGrade" defaultValue={grade} onChange={(e) => setGrade(e.target.value)}>
                                                        <option value="A">A</option>
                                                        <option value="B+">B+</option>
                                                        <option value="B">B</option>
                                                        <option value="C+">C+</option>
                                                        <option value="C">C</option>
                                                        <option value="D+">D+</option>
                                                        <option value="D">D</option>
                                                    </select>
                                                </div>
                                            </div>
                                            {/* footer */}
                                            <div className="flex items-center p-4 md:p-5 rounded-b mt-[-20px] mb-2">
                                                <button
                                                    onClick={editReview}
                                                    type="button"
                                                    className="text-white bg-gradient-to-br from-[#0D0B5F] to-[#029BE0] hover:from-[#029BE0] hover:to-[#0D0B5F] font-medium rounded-lg text-lg px-10 py-2 text-center w-full"
                                                >
                                                    Post
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* modal delete */}
                        {isModalDeleteOpen && (
                            <div
                                id="modal-delete"
                                tabIndex="-1"
                                aria-hidden="true"
                                className="fixed inset-0 overflow-y-auto"
                                style={{ zIndex: 1001, borderRadius: "30px" }}
                            // onClick={() => setIsModalOpen(false)}
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
                                                    Delete Review
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
                                                <p>delete your review?</p>
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
                                                        onClick={deleteReview}
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

                        <div className="ml-4">
                            <p className="text-[#151C38] text-l font-[400]">Anonymous</p>
                            <p className="text-[#A4A4A4] text-l font-[350]">
                                {review.time_stamp.S}
                                {/* {review.date}, {review.time} */}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-row mt-2">
                        <p className="font-medium text-[#A4A4A4]">Rating</p>
                        <DisplayRating rate={review.rating.S} />
                        <p className="font-medium text-[#A4A4A4] ml-2">Grade</p>
                        {review.grade.S === "A" ? (
                            <img className="ml-2 w-[24px] h-[24px]" src={Grade1}></img>
                        ) : review.grade.S === "B+" ? (
                            <img className="ml-2 w-[24px] h-[24px]" src={Grade2}></img>
                        ) : review.grade.S === "B" ? (
                            <img className="ml-2 w-[24px] h-[24px]" src={Grade3}></img>
                        ) : review.grade.S === "C+" ? (
                            <img className="ml-2 w-[24px] h-[24px]" src={Grade4}></img>
                        ) : review.grade.S === "C" ? (
                            <img className="ml-2 w-[24px] h-[24px]" src={Grade5}></img>
                        ) : review.grade.S === "D+" ? (
                            <img className="ml-2 w-[24px] h-[24px]" src={Grade6}></img>
                        ) : (
                            <img className="ml-2 w-[24px] h-[24px]" src={Grade7}></img>
                        )}

                    </div>
                    <div className="mt-2">
                        <p className="text-[#151C38] font-normal">{review.detail.S}</p>
                    </div>
                    <div className="flex flex-row mt-2">
                        <button name="like" className="rotate-0" onClick={() => { addlike(review.review_id.S) }}>
                            <Icon
                                icon="streamline:like-1-solid"
                                color="#9A1B29"
                                width="22"
                                height="22"
                            />
                        </button>
                        <p className="ml-2 text-[#151C38]">{review.like.SS.length - 1}</p>
                        <button name="dislike" className="rotate-180 mt-1 ml-2" onClick={() => { addDislike(review.review_id.S) }}>
                            <Icon
                                icon="streamline:like-1"
                                color="#9A1B29"
                                width="22"
                                height="22"
                            />
                        </button>
                        <p className="ml-2 text-[#151C38]">{review.dislike.SS.length - 1}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CardReview;