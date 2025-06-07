import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios';
import StudentTable from './StudentTableTemplate';
import { BASE_URL } from '../../config/config';
import AccordionPlaceholder from '../AccordionPlaceholder';

function StudentYearAndBranchView() {
  document.title = 'SPIS | All Students';

  const [loading, setLoading] = useState(true);

  const [firstYearCSE, setFirstYearCSE] = useState([]);
  const [firstYearIT, setFirstYearIT] = useState([]);
  const [firstYearMechanical, setFirstYearMechanical] = useState([]);
  const [firstYearEEE, setFirstYearEEE] = useState([]);
  const [firstYearECE, setFirstYearECE] = useState([]);
  const [secondYearCSE, setSecondYearC] = useState([]);
  const [secondYearIT, setSecondYearIT] = useState([]);
  const [secondYearMechanical, setSecondYearMechanical] = useState([]);
  const [secondYearECE, setSecondYearECE] = useState([]);
  const [secondYearEEE, setSecondYearEEE] = useState([]);
  const [thirdYearCSE, setThirdYearCSE] = useState([]);
  const [thirdYearIT, setThirdYearIT] = useState([]);
  const [thirdYearMechanical, setThirdYearMechanical] = useState([]);
  const [thirdYearECE, setThirdYearECE] = useState([]);
  const [thirdYearEEE, setThirdYearEEE] = useState([]);
  const [fourthYearCSE, setFourthYearCSE] = useState([]);
  const [fourthYearIT, setFourthYearIT] = useState([]);
  const [fourthYearMechanical, setFourthYearMechanical] = useState([]);
  const [fourthYearECE, setFourthYearECE] = useState([]);
  const [fourthYearEEE, setFourthYearEEE] = useState([]);

  const fetchStudentsData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/student/all-students-data-year-and-branch`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      setFirstYearCSE(response.data.firstYearCSE);
      setFirstYearIT(response.data.firstYearIT);
      setFirstYearMechanical(response.data.firstYearMechanical);
      setFirstYearECE(response.data.firstYearECE);
      setFirstYearEEE(response.data.firstYearEEE);

      setSecondYearCSE(response.data.secondYearCSE);
      setSecondYearIT(response.data.secondYearIT);
      setSecondYearMechanical(response.data.secondYearMechanical);
      setSecondYearECE(response.data.secondYearECE);
      setSecondYearEEE(response.data.secondYearEEE);

      setThirdYearCSE(response.data.thirdYearCSE);
      setThirdYearIT(response.data.thirdYearIT);
      setThirdYearMechanical(response.data.thirdYearMechanical);
      setThirdYearECE(response.data.thirdYearECE);
      setThirdYearEEE(response.data.thirdYearEEE);

      setFourthYearCSE(response.data.fourthYearCSE);
      setFourthYearIT(response.data.fourthYearIT);
      setFourthYearMechanical(response.data.fourthYearMechanical);
      setFourthYearECE(response.data.fourthYearECE);
      setFourthYearEEE(response.data.fourthYearEEE);

      // setLoading(false);
    } catch (error) {
      console.log("Error fetching jobs ", error);
      // if (error?.response?.data?.msg) {
      // setToastMessage(error.response.data.msg);
      // setShowToast(true);
      // }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStudentsData();
  }, []);

  return (
    <>
      {
        loading ? (
          // <div className="flex justify-center h-72 items-center">
          //   <i className="fa-solid fa-spinner fa-spin text-3xl" />
          // </div>
          <AccordionPlaceholder />
        ) : (
          <>
            <div className="my-4 p-6">
              <div className="">
                {/* parent accordion for year of student  */}
                <Accordion defaultActiveKey={['1']} flush className='flex flex-col gap-4'>
                  <Accordion.Item eventKey="1" className='backdrop-blur-md bg-white/30 border border-white/20 rounded-lg shadow shadow-red-400'>
                    {/* 4th year  */}
                    <Accordion.Header>Fourth Year</Accordion.Header>
                    <Accordion.Body>
                      <Accordion flush defaultActiveKey={['CSE']} className='flex flex-col gap-2'>
                        <StudentTable branchName={"CSE"} studentData={fourthYearCSE} />
                        <StudentTable branchName={"IT"} studentData={fourthYearIT} />
                        <StudentTable branchName={"ECE"} studentData={fourthYearECE} />
                        <StudentTable branchName={"EEE"} studentData={fourthYearEEE} />
                        <StudentTable branchName={"Mechanical"} studentData={fourthYearMechanical} />
                      </Accordion>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="2" className='backdrop-blur-md bg-white/30 border border-white/20 rounded-lg shadow shadow-red-400'>
                    {/* 3rd year  */}
                    <Accordion.Header>Third Year</Accordion.Header>
                    <Accordion.Body>
                      <Accordion flush defaultActiveKey={['CSE']} className='flex flex-col gap-2'>
                        <StudentTable branchName={"CSE"} studentData={thirdYearCSE} />
                        <StudentTable branchName={"IT"} studentData={thirdYearIT} />
                        <StudentTable branchName={"ECE"} studentData={thirdYearECE} />
                        <StudentTable branchName={"EEE"} studentData={thirdYearEEE} />
                        <StudentTable branchName={"Mechanical"} studentData={thirdYearMechanical} />
                      </Accordion>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="3" className='backdrop-blur-md bg-white/30 border border-white/20 rounded-lg shadow shadow-red-400'>
                    {/* 2nd year  */}
                    <Accordion.Header>Second Year</Accordion.Header>
                    <Accordion.Body>
                      <Accordion flush defaultActiveKey={['CSE']} className='flex flex-col gap-2'>
                        <StudentTable branchName={"CSE"} studentData={secondYearCSE} />
                        <StudentTable branchName={"IT"} studentData={secondYearIT} />
                        <StudentTable branchName={"ECE"} studentData={secondYearECE} />
                        <StudentTable branchName={"EEE"} studentData={secondYearEEE} />
                        <StudentTable branchName={"Mechanical"} studentData={secondYearMechanical} />
                      </Accordion>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="4" className='backdrop-blur-md bg-white/30 border border-white/20 rounded-lg shadow shadow-red-400'>
                    {/* 1st year  */}
                    <Accordion.Header>First Year</Accordion.Header>
                    <Accordion.Body>
                      <Accordion flush defaultActiveKey={['CSE']} className='flex flex-col gap-2'>
                        <StudentTable branchName={"CSE"} studentData={firstYearCSE} />
                        <StudentTable branchName={"IT"} studentData={firstYearIT} />
                        <StudentTable branchName={"ECE"} studentData={firstYearECE} />
                        <StudentTable branchName={"EEE"} studentData={firstYearEEE} />
                        <StudentTable branchName={"Mechanical"} studentData={firstYearMechanical} />
                      </Accordion>
                    </Accordion.Body>
                  </Accordion.Item>


                </Accordion>
              </div>


            </div >
          </>
        )
      }
    </>
  )
}

export default StudentYearAndBranchView
