import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  getDetectedSkills,
  getSkillQuestions,
  submitSkillTest,
} from "../services/api";
import { toast } from "react-toastify";

export default function CandidateSkillTest() {
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [current, setCurrent] = useState(0);
  const [result, setResult] = useState(null);

  useEffect(() => {
    loadSkills();
  }, []);

  async function loadSkills() {
    try {
      const res = await getDetectedSkills();
      setSkills(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Unable to load skills.");
    }
  }

  async function startTest(skill) {
    try {
      const res = await getSkillQuestions(skill);

      setSelectedSkill(skill);
      setQuestions(res.data);
      setAnswers(new Array(res.data.length).fill(null));
      setCurrent(0);
      setResult(null);
    } catch (err) {
      toast.error("Questions not found.");
    }
  }

  function chooseAnswer(index) {
    const arr = [...answers];
    arr[current] = index;
    setAnswers(arr);
  }

  async function finishTest() {
    try {
      const res = await submitSkillTest({
        skill: selectedSkill,
        answers,
      });

      setResult(res.data);

      toast.success("Test completed.");
    } catch (err) {
      toast.error("Unable to submit test.");
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-bold">
            Skill Verification
          </h1>

          <p className="text-gray-400 mt-2">
            Verify your resume skills.
          </p>
        </div>

        {!selectedSkill && (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {skills.length === 0 ? (

              <div className="bg-[#111827] p-8 rounded-xl">
                No skills detected.
              </div>

            ) : (

              skills.map((skill) => (

                <div
                  key={skill}
                  className="bg-[#111827] rounded-xl p-6 border border-gray-800"
                >
                  <h2 className="text-2xl font-bold capitalize">
                    {skill}
                  </h2>

                  <button
                    onClick={() => startTest(skill)}
                    className="mt-5 bg-cyan-600 hover:bg-cyan-500 px-5 py-3 rounded-xl"
                  >
                    Start Test
                  </button>

                </div>

              ))

            )}

          </div>

        )}

        {selectedSkill && !result && questions.length > 0 && (

          <div className="bg-[#111827] rounded-xl p-8">

            <h2 className="text-2xl font-bold mb-6">
              Question {current + 1} / {questions.length}
            </h2>

            <p className="text-xl mb-8">
              {questions[current].question}
            </p>

            <div className="space-y-4">

              {questions[current].options.map((option, index) => (

                <button
                  key={index}
                  onClick={() => chooseAnswer(index)}
                  className={`block w-full text-left px-5 py-4 rounded-xl border ${
                    answers[current] === index
                      ? "bg-cyan-600 border-cyan-600"
                      : "bg-slate-800 border-gray-700"
                  }`}
                >
                  {option}
                </button>

              ))}

            </div>

            <div className="flex justify-between mt-10">

              <button
                disabled={current === 0}
                onClick={() => setCurrent(current - 1)}
                className="bg-gray-700 px-6 py-3 rounded-xl"
              >
                Previous
              </button>

              {current === questions.length - 1 ? (

                <button
                  onClick={finishTest}
                  className="bg-green-600 px-6 py-3 rounded-xl"
                >
                  Submit Test
                </button>

              ) : (

                <button
                  onClick={() => setCurrent(current + 1)}
                  className="bg-cyan-600 px-6 py-3 rounded-xl"
                >
                  Next
                </button>

              )}

            </div>

          </div>

        )}

        {result && (

          <div className="bg-[#111827] rounded-xl p-10 text-center">

            <h2 className="text-4xl font-bold">
              Test Completed
            </h2>

            <p className="text-3xl mt-6">
              Score: {result.score}%
            </p>

            {result.passed ? (

              <>
                <h3 className="text-green-400 text-2xl mt-5">
                  🎉 Congratulations
                </h3>

                <p className="mt-3">
                  {result.badge}
                </p>
              </>

            ) : (

              <h3 className="text-red-500 text-2xl mt-5">
                Better Luck Next Time
              </h3>

            )}

            <button
              onClick={() => {
                setSelectedSkill(null);
                loadSkills();
              }}
              className="mt-8 bg-cyan-600 px-8 py-3 rounded-xl"
            >
              Back to Skills
            </button>

          </div>

        )}

      </div>
    </DashboardLayout>
  );
}