import React, { useState, useEffect } from 'react'
import CardSubject from '../components/cardReview/CardSubject'
// import { SubjectDetail } from '../dummyData/SubjectDetail';
// import { format, parseISO } from 'date-fns';
import axios from 'axios';

function Review() {
  const [textSearch, setTextSearch] = useState('');
  const [typeSearch, setTypeSearch] = useState('ทั้งหมด');
  const [subjects, setSubjects] = useState([]);
  const [subjectItem, setSubjectItem] =useState([]);

  useEffect(() => {
    const fetchDataSubject = async () => {
      try {
        const response = await axios.get('http://localhost:3000/course');
        setSubjects(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchDataSubject();
  }, []);

  const filterSubject = () => {
    console.log(typeSearch);
    console.log(textSearch);
    const filteredList = subjects.filter(item =>
      (item.subject_id.S.toLowerCase().includes(textSearch.toLowerCase()) ||
        item.subject_name_th.S.toLowerCase().includes(textSearch.toLowerCase()) ||
        item.subject_name_en.S.toLowerCase().includes(textSearch.toLowerCase())) &&
        (item.type.S == typeSearch ||  typeSearch == "ทั้งหมด")
    );
    console.log(filteredList);
    setSubjectItem(filteredList);
    console.log("eiei " + subjectItem.length);
  }

  const clearTextSearch = () => {
    filterSubject();
    setTextSearch('');
  }

  return (
    <>
      <div className='w-full h-auto flex'>
        <div className='w-full pr-5'>
          <div className='flex flex-row gap-3'>
            <h1 className='text-[26px] font-medium text-[#151C38]'>รายวิชาเรียน</h1>
            <select className="text-white bg-[#151C38] rounded-lg text-lg px-2" name='selectType' defaultValue={typeSearch} onChange={(e) => setTypeSearch(e.target.value)} onClick={filterSubject}>
              <option value="วิชาบังคับ">วิชาบังคับ</option>
              <option value="เสรีทั่วไป">วิชาเสรีทั่วไป</option>
              <option value="เสรีคณะ">วิชาเสรีคณะ</option>
              <option value="ทั้งหมด">ทั้งหมด</option>
            </select>
          </div>
          <div className='inputSearch flex flex-row mt-4 gap-3 drop-shadow-sm	'>
            <img width="35" height="35" src='https://img.icons8.com/fluency-systems-filled/48/c0c0c0/search.png' className='icon mt-1 ml-2'></img>
            <input type='text' name='email' placeholder='Type to search ...' className='w-full h-[45px] font-light' value={textSearch} onChange={(e) => setTextSearch(e.target.value)} onKeyDown={(e) => { 
              if (e.key === 'Enter') { 
                filterSubject();
            }}}></input>
            <button className='bg-[#FFFFFF] w-[60px] rounded-xl border-[1px] border-[#D9D9D9] drop-shadow-sm' onClick={clearTextSearch}>
              <img width="20" height="20" src='https://img.icons8.com/material-rounded/24/737373/delete-sign.png' className='icon top-3 ml-4'></img>
            </button>
          </div>
          {textSearch != '' || typeSearch != 'ทั้งหมด' ? (<CardSubject item={subjectItem} />) : (<CardSubject item={subjects} />)}
        </div>
      </div>
    </>
  )
}

export default Review