import "@xyflow/react/dist/style.css";
import { Tabs, Tab } from "@heroui/tabs";

import DefaultLayout from "@/layouts/default";
import { Grade } from "@/interfaces/Grade";
import MapFlowView from "@/components/GradesViews/MapFlowView";
import DiagramView from "@/components/GradesViews/DiagramView/DiagramView";
const gradeMock: Grade = {
  id: "1",
  name: "Ingenieria en Informatica",
  description:
    "El ingeniero en informatica es un profesional capacitado para el desarrollo de software y sistemas informaticos",
  startDate: new Date("2023-01-01"),
  years: 4.5,
  courses: [
    {
      id: "1",
      name: "Analisis 1",
      description: "Analisis de funciones, derivadas e integrales",
      correlatives: [],
      year: 1,
      period: 1,
    },
    {
      id: "2",
      name: "Algebra 1",
      description: "Algebra de matrices y sistemas de ecuaciones",
      correlatives: [],
      year: 1,
      period: 1,
    },
    {
      id: "3",
      name: "Analisis 2",
      description: "Algebra de matrices y sistemas de ecuaciones",
      correlatives: [
        {
          id: "1",
          name: "Analisis 1",
          description: "Analisis de funciones, derivadas e integrales",
          correlatives: [],
          year: 1,
          period: 1,
        },
        {
          id: "2",
          name: "Algebra 1",
          description: "Algebra de matrices y sistemas de ecuaciones",
          correlatives: [],
          year: 1,
          period: 1,
        },
      ],
      year: 2,
      period: 1,
    },
    {
      id: "4",
      name: "Analisis 3",
      description: "Analisis de funciones, derivadas e integrales",
      correlatives: [
        {
          id: "3",
          name: "Analisis 2",
          description: "Algebra de matrices y sistemas de ecuaciones",
          correlatives: [
            {
              id: "1",
              name: "Analisis 1",
              description: "Analisis de funciones, derivadas e integrales",
              correlatives: [],
              year: 1,
              period: 1,
            },
            {
              id: "2",
              name: "Algebra 1",
              description: "Algebra de matrices y sistemas de ecuaciones",
              correlatives: [],
              year: 1,
              period: 1,
            },
          ],
          year: 2,
          period: 1,
        },
      ],
      year: 3,
      period: 1,
    },
  ],
};

const GradePage = () => {
  const grade = gradeMock;

  return (
    <DefaultLayout>
      <header className="mb-4">
        <h1 className="text-3xl font-semibold"> {grade.name} </h1>
        <p className="dark:text-gray-400 text-gray-600 text-sm max-w-[400px]">
          {grade.description}
        </p>
      </header>
      <Tabs classNames={{ base: "w-full justify-end", panel: "w-full h-full" }}>
        <Tab key={"Map"} title={"Map"}>
          <MapFlowView grade={grade} />
        </Tab>
        <Tab key={"Diagram"} className="w-full h-full" title={"Diagram"}>
          <DiagramView grade={grade} />
        </Tab>
      </Tabs>
    </DefaultLayout>
  );
};

export default GradePage;
