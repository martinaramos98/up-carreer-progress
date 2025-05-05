import { Route, Routes } from "react-router-dom";
import axios from "axios";

import GradePage from "./pages/grade/GradePage";
import useGradeService from "./services/GradeService/GradeService.service";
import { useCourseService } from "./services/CoursesService/CourseService.service";

import NewGradePage from "@/pages/grade/NewGradePage";
import IndexPage from "@/pages/index";

function App() {
  const restAgent = axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_BACKEND_URL,
  });

  const gradeService = useGradeService(restAgent);
  const courseService = useCourseService(restAgent);

  return (
    <Routes>
      <Route element={<IndexPage gradeService={gradeService} />} path="/" />
      <Route
        element={
          <NewGradePage
            courseService={courseService}
            gradeService={gradeService}
          />
        }
        path="/grade/new"
      />
      <Route
        element={<GradePage gradeService={gradeService} />}
        path="/grade/:gradeId"
      />
    </Routes>
  );
}

export default App;
