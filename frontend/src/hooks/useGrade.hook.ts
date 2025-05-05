import { useEffect, useState } from "react";

import { IGradeService } from "@/services/GradeService/GradeService.service";
import { Grade } from "@/interfaces/Grade";

export function useGrade(gradeService: IGradeService, gradeId: string) {
  const [grade, setGrade] = useState<Grade | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function getGradeData() {
    try {
      setIsLoading(true);
      setGrade((await gradeService.getGrade(gradeId)).data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching grade data:", error);
      setError("Error fetching grade data");
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getGradeData();
  }, []);

  return {
    grade,
    error,
    isLoading,
  };
}
