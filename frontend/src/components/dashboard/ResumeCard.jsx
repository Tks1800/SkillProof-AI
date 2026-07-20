import { useEffect, useState } from "react";
import API from "../../services/api";

export default function ResumeCard() {

  const [resume, setResume] = useState(null);

  useEffect(() => {
    loadResume();
  }, []);

  async function loadResume() {

    try {

      const res = await API.get("/resume/my-resume");

      setResume(res.data);

    } catch (err) {

      console.log(err);

    }

  }

  if (!resume) {

    return (
      <div className="bg-[#151927] rounded-2xl p-6 text-white">
        Loading Resume...
      </div>
    );

  }

  return (

    <div className="bg-[#151927] rounded-2xl p-6">

      <h2 className="text-white text-2xl font-bold mb-4">
        Resume Details
      </h2>

      <p className="text-gray-300">
        <b>File:</b> {resume.file_name}
      </p>

      <p className="text-gray-300 mt-4">
        <b>Skills:</b>
      </p>

      <div className="flex flex-wrap gap-2 mt-3">

        {resume.skills?.split(",").map((skill) => (

          <span
            key={skill}
            className="bg-cyan-500 px-3 py-1 rounded-full text-white"
          >
            {skill.trim()}
          </span>

        ))}

      </div>

    </div>

  );

}