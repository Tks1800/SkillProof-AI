import { useState, useEffect } from "react";

function SkillTest({ selectedSkill }) {
  console.log(
    "SELECTED SKILL RECEIVED:",
    selectedSkill
  );

  const questionBank = {
    Python: [
      {
        question: "What is the output of len([1,2,3])?",
        options: ["2", "3", "4"],
        answer: "3",
      },
      {
        question:
          "Which keyword defines a function in Python?",
        options: ["func", "define", "def"],
        answer: "def",
      },
    ],

    SQL: [
      {
        question:
          "Which SQL command retrieves data?",
        options: ["INSERT", "UPDATE", "SELECT"],
        answer: "SELECT",
      },
      {
        question:
          "Which clause filters records?",
        options: ["WHERE", "GROUP BY", "ORDER BY"],
        answer: "WHERE",
      },
    ],

    FastAPI: [
      {
        question:
          "Which decorator creates GET endpoints?",
        options: [
          "@app.post",
          "@app.get",
          "@app.put",
        ],
        answer: "@app.get",
      },
      {
        question: "FastAPI is built on?",
        options: [
          "Flask",
          "Starlette",
          "Django",
        ],
        answer: "Starlette",
      },
    ],
  };

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [badge, setBadge] = useState("");

  useEffect(() => {
    if (
      selectedSkill &&
      questionBank[selectedSkill]
    ) {
      setQuestions(
        questionBank[selectedSkill]
      );
      setAnswers({});
      setScore(null);
      setBadge("");
    }
  }, [selectedSkill]);

  const handleSubmit = () => {
    let correct = 0;

    questions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        correct++;
      }
    });

    const finalScore =
      (correct / questions.length) * 100;

    setScore(finalScore);

    if (finalScore >= 70) {
      const badgeName =
        `${selectedSkill} Verified`;

      setBadge(`🏆 ${badgeName}`);

      fetch(
        "https://skillproof-ai-production.up.railway.app/save-badge?email=test@gmail.com&badge_name=" +
          encodeURIComponent(badgeName),
        {
          method: "POST",
        }
      );
    } else {
      setBadge("No Badge Earned");
    }
  };

  if (!selectedSkill) {
    return (
      <div style={{ padding: "30px" }}>
        <h2>
          Select a recommended test from
          Resume Upload
        </h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "30px" }}>
      <h2>{selectedSkill} Skill Test</h2>

      {questions.map((q, index) => (
        <div key={index}>
          <p>
            <b>
              {index + 1}. {q.question}
            </b>
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