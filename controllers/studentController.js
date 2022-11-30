import { getStudentInformationService } from '../services/studentServices.js';
export const getStudentInformation = async (req, res, next) => {
    const { studentId } = req.params;
    try {
        const student = await getStudentInformationService(studentId);
        if (student)
            res.status(200).json({ sucess: 'true', student });
    }
    catch (error) {
        next(error);
    }
};
