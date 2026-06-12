import { useState } from "react";

function SkillTest() {
  const questions = [
    {
      question: "What is the output of len([1,2,3])?",
      options: ["2", "3", "4"],
      answer: "3",
    },
    {
      question: "Which keyword defines a function in Python?",
      options: ["func", "define", "def"],
      answer: "def",
    },
  ];

  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [badge, setBadge] = useState("");

  const handleSubmit = () => {
    let correct = 0;

    questions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        correct++;
      }
    });

    const finalScore = (correct / questions.length) * 100;

    setScore(finalScore);

    if (finalScore >= 70) {
      setBadge("🏆 Python Certified");
    } else {
      setBadge("No Badge Earned");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Python Skill Test</h2>

      {questions.map((q, index) => (
        <div key={index}>
          <p>
            <b>{index + 1}. {q.question}</b>
          </p>

          {q.options.map((option) => (
            <div key={option}>
              <label>
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  onChange={() =>
                    setAnswers({
                      ...answers,
                      [index]: option,
                    })
                  }
                />
                {option}
              </label>
            </div>
          ))}

          <br />
        </div>
      ))}

      <button onClick={handleSubmit}>
        Submit Test
      </button>

      {score !== null && (
        <h3>Your Score: {score}%</h3>
      )}

      {badge && (
        <h3>Badge: {badge}</h3>
      )}
    </div>
  );
}

export default SkillTest;