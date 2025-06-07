const User = require("../../models/user.model");
const Job = require("../../models/job.model");


const StudentDataYearBranchWise = async (req, res) => {
  try {
    // first year 
    const firstYearCSE = await User.find({ role: "student", "studentProfile.department": "CSE", "studentProfile.year": 1 });
    const firstYearIT = await User.find({ role: "student", "studentProfile.department": "IT", "studentProfile.year": 1 });
    const firstYearECE = await User.find({ role: "student", "studentProfile.department": "ECE", "studentProfile.year": 1 });
    const firstYearEEE = await User.find({ role: "student", "studentProfile.department": "EEE", "studentProfile.year": 1 });
    const firstYearMechanical = await User.find({ role: "student", "studentProfile.department": "Mechanical", "studentProfile.year": 1 });

    // second year 
    const secondYearCSE = await User.find({ role: "student", "studentProfile.department": "CSE", "studentProfile.year": 2 });
    const secondYearIT = await User.find({ role: "student", "studentProfile.department": "IT", "studentProfile.year": 2 });
    const secondYearECE = await User.find({ role: "student", "studentProfile.department": "ECE", "studentProfile.year": 2 });
    const secondYearEEE = await User.find({ role: "student", "studentProfile.department": "EEE", "studentProfile.year": 2 });
    const secondYearMechanical = await User.find({ role: "student", "studentProfile.department": "Mechanical", "studentProfile.year": 2 });

    // third year 
    const thirdYearCSE = await User.find({ role: "student", "studentProfile.department": "CSE", "studentProfile.year": 3 });
    const thirdYearIT = await User.find({ role: "student", "studentProfile.department": "IT", "studentProfile.year": 3 });
    const thirdYearECE = await User.find({ role: "student", "studentProfile.department": "ECE", "studentProfile.year": 3 });
    const thirdYearEEE = await User.find({ role: "student", "studentProfile.department": "EEE", "studentProfile.year": 3 });
    const thirdYearMechanical = await User.find({ role: "student", "studentProfile.department": "Mechanical", "studentProfile.year": 3 });

    // fourth year 
    const fourthYearCSE = await User.find({ role: "student", "studentProfile.department": "CSE", "studentProfile.year": 4 });
    const fourthYearIT = await User.find({ role: "student", "studentProfile.department": "IT", "studentProfile.year": 4 });
    const fourthYearECE = await User.find({ role: "student", "studentProfile.department": "ECE", "studentProfile.year": 4 });
    const fourthYearEEE = await User.find({ role: "student", "studentProfile.department": "EEE", "studentProfile.year": 4 });
    const fourthYearMechanical = await User.find({ role: "student", "studentProfile.department": "Mechanical", "studentProfile.year": 4 });

    return res.json({ firstYearCSE, firstYearIT, firstYearECE, firstYearEEE, firstYearMechanical, secondYearCSE, secondYearIT, secondYearECE, secondYearEEE, secondYearMechanical, thirdYearCSE, thirdYearIT, thirdYearECE, thirdYearEEE, thirdYearMechanical, fourthYearCSE, fourthYearIT, fourthYearECE, fourthYearEEE, fourthYearMechanical });
  } catch (error) {
    console.log("student-data-for-admin.controller.js => ", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
}

const NotifyStudentStatus = async (req, res) => {
  try {
    const filteredStudents = await User.find({
      role: 'student',
      'studentProfile.appliedJobs.status': { $in: ['interview', 'hired'] }
    })
      .select('_id first_name last_name studentProfile.year studentProfile.department studentProfile.appliedJobs')
      .lean();

    const studentsWithJobDetails = [];

    for (const student of filteredStudents) {
      // Filter applied jobs with status 'interview' or 'hired'
      const appliedJobs = student.studentProfile.appliedJobs.filter(job => ['interview', 'hired'].includes(job.status));

      // Fetch job details for each jobId in the applied jobs
      const jobDetails = await Job.find({
        _id: { $in: appliedJobs.map(job => job.jobId) } // Match the job IDs
      })
        .populate('company', 'companyName')
        .select('company jobTitle _id') // Select company name and job title
        .lean();

      // Map through filtered applied jobs and add the job details (company and title)
      const jobsWithDetails = appliedJobs.map(job => {
        const jobDetail = jobDetails.find(jd => String(jd._id) === String(job.jobId)); // Match jobId
        return {
          status: job.status,
          companyName: jobDetail?.company?.companyName || 'Unknown Company',
          jobId: jobDetail?._id || 'Unknown JobId',
          jobTitle: jobDetail?.jobTitle || 'Unknown Job Title'
        };
      });

      // Push the student info along with only the filtered job details into the final array
      studentsWithJobDetails.push({
        _id: student._id,
        name: `${student.first_name} ${student.last_name}`,
        year: student.studentProfile.year,
        department: student.studentProfile.department,
        jobs: jobsWithDetails // Only the filtered jobs with status 'interview' or 'hired'
      });
    }

    return res.status(200).json({ studentsWithJobDetails });
  } catch (error) {
    console.log("student-data-for-admin.controller.js => ", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
}


module.exports = {
  StudentDataYearBranchWise,
  NotifyStudentStatus
};