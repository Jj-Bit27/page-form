import React, { useEffect, useState } from "react";
import { ExamDisplay } from "../components/ExamDisplay"; // Asegúrate de que la ruta sea correcta
import { getExamnRequest } from "../api/examns";
import { getQuestionsRequest } from "../api/questions";
import { getOptionsRequest } from "../api/options";
import { useParams } from "react-router-dom";

function Home() {
  const params = useParams();

  const [exam, setExam] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchExam = async () => {
      if (params.id) {
        const { data: dataExam } = await getExamnRequest(params.id);
        setExam(dataExam);
        const { data: dataQuestion } = await getQuestionsRequest(dataExam.id);
        console.log(dataQuestion.result);
        setQuestions(dataQuestion.result);
        const { data: dataOptions } = await getOptionsRequest(dataQuestion.id);
        console.log(dataOptions.result);
        setOptions(dataOptions.result);
      }
    };
    fetchExam();
  }, []);

  return (
    <main className="p-8">
      <ExamDisplay
        titulo={exam.titulo}
        descripcion={exam.descripcion}
        preguntas={questions}
        opciones={options}
      />
    </main>
  );
}

export default Home;
