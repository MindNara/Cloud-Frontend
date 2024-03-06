import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StudyPlanForm() {
    const navigate = useNavigate();

    const yearOptions = ['2566', '2565', '2564'];
    const courseOptions = [
        'เทคโนโลยีสารสนเทศ',
        'วิทยาการข้อมูลและการวิเคราะห์เชิงธุรกิจ',
        'เทคโนโลยีสารสนเทศทางธุรกิจ (หลักสูตรนานาชาติ)',
        'เทคโนโลยีปัญญาประดิษฐ์'
    ];

    //validation
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedSemester, setSelectedSemester] = useState('');
    const [selectedCooperative, setSelectedCooperative] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedYearStudy, setSelectedYearStudy] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = {};
        let formIsValid = true;

        if (!selectedYear) {
            errors.selectedYear = 'Please select a year';
            formIsValid = false;
        }

        if (!selectedSemester) {
            errors.selectedSemester = 'Please select a semester';
            formIsValid = false;
        }

        if (!selectedCooperative) {
            errors.selectedCooperative = 'Please select a cooperative option';
            formIsValid = false;
        }

        if (!selectedCourse) {
            errors.selectedCourse = 'Please select a course';
            formIsValid = false;
        }

        if (!selectedYearStudy) {
            errors.selectedYearStudy = 'Please select a year of study';
            formIsValid = false;
        }

        setErrors(errors);

        if (formIsValid) {
            // Call your search function here
            console.log("Search");
            // Redirect to study plan result page
            navigate('/studyPlan/result');
        }
    };

    return (
        <form
            className="w-[65%] max-2xl:w-[75%] mt-10 max-2xl:mt-2 h-auto p-12 max-2xl:p-8 bg-white border border-gray-200 rounded-[30px]"
            onSubmit={handleSubmit}
        >
            <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className={`block uppercase text-[16px] max-2xl:text-[14px] mb-2 ${errors.selectedYear && 'text-red-500 text-[13px] mt-1'}`} htmlFor="year">
                        ปีการศึกษา
                    </label>
                    <select
                        className={`bg-[#F4F4F4] border border-gray-200 rounded-[10px] text-[16px] max-2xl:text-[15px] w-full py-2 px-3 leading-tight focus:outline-none focus:border-gray-500 ${errors.selectedYear && 'border-red-500'}`}
                        name="selectedYear"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                    >
                        <option value="">-- เลือกปีการศึกษา --</option>
                        {yearOptions.map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                    {errors.selectedYear && <div className="text-red-500 text-[13px] mt-1">{errors.selectedYear}</div>}
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className={`block uppercase text-[16px] max-2xl:text-[14px] mb-2 ${errors.selectedSemester && 'text-red-500 text-[13px] mt-1'}`} htmlFor="semester">
                        ภาคการศึกษา
                    </label>
                    <select
                        className={`bg-[#F4F4F4] border border-gray-200 rounded-[10px] text-[16px] max-2xl:text-[15px] w-full py-2 px-3 leading-tight focus:outline-none focus:border-gray-500 ${errors.selectedSemester && 'border-red-500'}`}
                        name="selectedSemester"
                        value={selectedSemester}
                        onChange={(e) => setSelectedSemester(e.target.value)}
                    >
                        <option value="">-- เลือกภาคการศึกษา --</option>
                        <option value="semester1">ภาคเรียนที่ 1</option>
                        <option value="semester2">ภาคเรียนที่ 2</option>
                    </select>
                    {errors.selectedSemester && <div className="text-red-500 text-[13px] mt-1">{errors.selectedSemester}</div>}
                </div>
                <div className="w-full px-3 mt-5 max-2xl:mt-3">
                    <label className={`block uppercase text-[16px] max-2xl:text-[14px] mb-2 `} htmlFor="faculty">
                        คณะ
                    </label>
                    <select
                        className={`bg-[#F4F4F4] border border-gray-200 rounded-[10px] text-[16px] max-2xl:text-[15px] w-full py-2 px-3 leading-tight focus:outline-none focus:border-gray-500 ${errors.selectedFaculty && 'border-red-500'}`}
                        name="selectedFaculty"
                        disabled
                    >
                        <option value="it">คณะเทคโนโลยีสารสนเทศ</option>
                    </select>
                </div>
                <div className="w-full px-3 mt-5 max-2xl:mt-3">
                    <label className={`block uppercase text-[16px] max-2xl:text-[14px] mb-2`} htmlFor="department">
                        ภาควิชา
                    </label>
                    <select
                        className={`bg-[#F4F4F4] border border-gray-200 rounded-[10px] text-[16px] max-2xl:text-[15px] w-full py-2 px-3 leading-tight focus:outline-none focus:border-gray-500 ${errors.selectedDepartment && 'border-red-500'}`}
                        name="selectedDepartment"
                        disabled
                    >
                        <option value="it">คณะเทคโนโลยีสารสนเทศ</option>
                    </select>
                </div>
                <div className="w-full px-3 mt-5 max-2xl:mt-3">
                    <label className={`block uppercase text-[16px] max-2xl:text-[14px] mb-2 ${errors.selectedCooperative && 'text-red-500'}`} htmlFor="cooperative">
                        สหกิจ / ไม่สหกิจ
                    </label>
                    <select
                        className={`bg-[#F4F4F4] border border-gray-200 rounded-[10px] text-[16px] max-2xl:text-[15px] w-full py-2 px-3 leading-tight focus:outline-none focus:border-gray-500 ${errors.selectedCooperative && 'border-red-500'}`}
                        name="selectedCooperative"
                        value={selectedCooperative}
                        onChange={(e) => setSelectedCooperative(e.target.value)}
                    >
                        <option value="">-- เลือกสหกิจ / ไม่สหกิจ --</option>
                        <option value="cooperative">สหกิจ</option>
                        <option value="noCooperative">ไม่สหกิจ</option>
                    </select>
                    {errors.selectedCooperative && <div className="text-red-500 text-[13px] mt-1">{errors.selectedCooperative}</div>}
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-5">
                    <label className={`block uppercase text-[16px] max-2xl:text-[14px] mb-2 ${errors.selectedCourse && 'text-red-500 text-[13px] mt-1'}`} htmlFor="course">
                        หลักสูตร
                    </label>
                    <select
                        className={`bg-[#F4F4F4] border border-gray-200 rounded-[10px] text-[16px] max-2xl:text-[15px] w-full py-2 px-3 leading-tight focus:outline-none focus:border-gray-500 ${errors.selectedCourse && 'border-red-500'}`}
                        name="selectedCourse"
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                    >
                        <option value="">-- เลือกหลักสูตร --</option>
                        {courseOptions.map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                    {errors.selectedCourse && <div className="text-red-500 text-[13px] mt-1">{errors.selectedCourse}</div>}
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-5">
                    <label className={`block uppercase text-[16px] max-2xl:text-[14px] mb-2 ${errors.selectedYearStudy && 'text-red-500 text-[13px] mt-1'}`} htmlFor="yearStudy">
                        ชั้นปี
                    </label>
                    <select
                        className={`bg-[#F4F4F4] border border-gray-200 rounded-[10px] text-[16px] max-2xl:text-[15px] w-full py-2 px-3 leading-tight focus:outline-none focus:border-gray-500 ${errors.selectedYearStudy && 'border-red-500'}`}
                        name="selectedYearStudy"
                        value={selectedYearStudy}
                        onChange={(e) => setSelectedYearStudy(e.target.value)}
                    >
                        <option value="">-- เลือกชั้นปี --</option>
                        <option value="year1">1</option>
                        <option value="year2">2</option>
                        <option value="year3">3</option>
                        <option value="year4">4</option>
                    </select>
                    {errors.selectedYearStudy && <div className="text-red-500 text-[13px] mt-1">{errors.selectedYearStudy}</div>}
                </div>
            </div>
            <div className='px-3 mt-8 max-2xl:mt-5'>
                <button
                    className='py-2 tracking-[1px] rounded-[10px] text-white text-[16px] max-2xl:text-[15px] uppercase w-full bg-gradient-to-br from-[#0D0B5F] from-[12.5%] to-[#029BE0] to-[100%]'
                    type="submit"
                >
                    Search
                </button>
            </div>
        </form>
    );
}

export default StudyPlanForm;
