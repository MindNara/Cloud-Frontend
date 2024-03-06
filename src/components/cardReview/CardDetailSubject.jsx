import React, { useState, useEffect } from "react";
import axios from 'axios';

const CardDetailSubject = ({ id }) => {
    
    const [detailSubject, setDetailSubject] = useState();
    useEffect(() => {
        console.log(id)
        const fetchDataSubjectDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/course/${id}`);
                setDetailSubject(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchDataSubjectDetail();
    }, []);

    return (
        <div>
            {detailSubject && (
                <div className="max-w p-6 bg-white border border-gray-200 rounded-xl">
                <div className="flex flex-row">
                    <h5 className="mb-2 text-xl font-bold text-[#151C38]">{detailSubject.subject_id.S}</h5>
                    <div>
                        <h5 className="mb-2 text-xl font-bold text-[#151C38] ml-10">{detailSubject.subject_name_en.S} ({detailSubject.subject_name_th.S})</h5>
                        <p className="ml-10 text-sm font-medium text-[#151C38]">{detailSubject.detail.S}</p>
                    </div>
                </div>
                <p className="mt-4 text-sm font-light text-[#151C38]">หน่วยกิต(ทฤษฎี - ปฎิบัติ - ค้นคว้า) {detailSubject.credit.S}</p>
            </div>
            )}
        </div>
    );
};

export default CardDetailSubject;
