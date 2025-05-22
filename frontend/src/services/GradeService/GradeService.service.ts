import { Axios } from "axios";

import { Grade, GradeCreate } from "@/interfaces/Grade";
import { IResult } from "@/utils/rest.util";

export interface IGradeService {
  createGrade: (grade: GradeCreate) => Promise<IResult<Grade | unknown>>;
  getGrades: () => Promise<IResult<Grade[] | unknown>>;
  getGrade: (id: string) => Promise<IResult<Grade | unknown>>;
  updateGrade: (newGradeData: Grade) => Promise<IResult<Grade | unknown>>;
}
export default function useGradeService(restAgent: Axios): IGradeService {
  const createGrade = async (
    grade: GradeCreate,
  ): Promise<IResult<Grade | unknown>> => {
    try {
      const { data } = await restAgent.post<Grade>("/grades", grade);

      return {
        data,
        error: false,
      };
    } catch (error) {
      return {
        error: true,
        data: error,
      };
    }
  };
  const getGrades = async (): Promise<IResult<Grade[] | unknown>> => {
    try {
      const { data } = await restAgent.get<Grade[]>("/grades");

      return {
        data,
        error: false,
      };
    } catch (error) {
      return {
        error: true,
        data: error,
      };
    }
  };
  const getGrade = async (id: string) => {
    try {
      const { data } = await restAgent.get<Grade>(`/grades/${id}`);

      return {
        data,
        error: false,
      };
    } catch (error) {
      return {
        error: true,
        data: error,
      };
    }
  };
  const updateGrade = async (newGradeData: Grade) => {
    try {
      const { data } = await restAgent.put<Grade>(
        `/grades/${newGradeData.id}`,
        newGradeData,
      );

      return {
        data,
        error: false,
      };
    } catch (error) {
      return {
        error: true,
        data: error,
      };
    }
  };

  return {
    createGrade,
    getGrades,
    getGrade,
    updateGrade,
  };
}
