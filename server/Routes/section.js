const express = require('express')
const router = express.Router()
const {createSection,updateSection,deleteSection}=require('../Controllers/Section');
const {createSubSection,updateSubSection,deleteSubSection}=require('../Controllers/subSection');
const { auth, isInstructor, isStudent, isAdmin } = require("../Middlewares/auth")




//section routes
router.post('/createSection',auth,isInstructor,createSection)
router.put('/updateSection',auth,isInstructor,updateSection);
router.delete('/deleteSection/:sectionId/:courseId',auth,isInstructor,deleteSection)


//subsection routes

router.post('/createsubSection',auth,isInstructor,createSubSection)
router.put('/updatesubSection',auth,isInstructor,updateSubSection);
router.delete('/deletesubSection',auth,isInstructor,deleteSubSection)




module.exports = router