import React, { useState, useEffect } from "react";
import { Progress } from "@heroui/progress";
import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";

import { Grade } from "@/interfaces/Grade";
interface GradeItemProps {
  grade: Grade;
}

const GradeItem: React.FC<GradeItemProps> = ({ grade }) => {
  const [currentProgress, setCurrentProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setCurrentProgress(
        (grade.approved / (grade.totalCourses ?? Infinity)) * 100,
      );
    }, 100);
  }, []);
  function navigateToGradeHandler() {
    navigate(`/grade/${grade.id}`);
  }

  return (
    <li className="flex flex-col dark:bg-gray-900 bg-gray-100 rounded-2xl p-4 shadow-md w-full">
      <div className="text-lg font-semibold flex flex-col mb-2 text-gray-900 dark:text-white">
        {grade.name}
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {grade.description}
        </span>
      </div>
      <div className="flex flex-row items-end gap-2 mb-2">
        <Progress showValueLabel className="w-full" value={currentProgress} />
        <Button onPress={navigateToGradeHandler}>Go to Grade</Button>
      </div>
    </li>
  );
};

export default GradeItem;
