import React from "react";

const ResumeAnalysis = ({ data }) => {
  const {
    overall_score,
    overall_feedback,
    summary_comment,
    sections,
    tips_for_improvement,
    whats_good,
    needs_improvement,
  } = data;

  const sectionIcons = {
    contact_info: "fa-user-circle",
    experience: "fa-briefcase",
    education: "fa-graduation-cap",
    skills: "fa-lightbulb",
  };

  const scoreColor = (score) => {
    if (score >= 85) return "green";
    if (score >= 70) return "yellow";
    return "red";
  };

  return (
    <div className="flex flex-col space-y-6 text-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-gray-800">
          AI Analysis Results
        </h2>
      </div>

      {/* Overall Score */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-blue-200 transition-transform duration-300 ease-in-out hover:scale-[1.01]">
        <h3 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
          <i className="fas fa-star text-yellow-500 mr-2"></i> Overall Score
        </h3>
        <div className="flex items-center justify-between mb-4">
          <span className="text-6xl font-extrabold text-blue-600">
            {overall_score}
            <span className="text-2xl">/100</span>
          </span>
          <div className="flex items-center text-green-500 font-bold">
            <i className="fas fa-arrow-up-right mr-2"></i> {overall_feedback}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${overall_score}%` }}
          ></div>
        </div>
        <p className="text-sm">{summary_comment}</p>
      </div>

      {/* Section Ratings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections &&
          Object.entries(sections).map(([key, sec]) => {
            const color = scoreColor(sec.score);
            return (
              <div
                key={key}
                className={`bg-white rounded-lg shadow-md p-5 border border-${color}-200`}
              >
                <h4 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                  <i
                    className={`fas ${sectionIcons[key]} text-gray-500 mr-2`}
                  ></i>{" "}
                  {key
                    .replace("_", " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </h4>
                <span className={`text-4xl font-bold text-${color}-500`}>
                  {sec.score}%
                </span>
                <p className="text-gray-600 mt-2 text-sm">{sec.comment}</p>
              </div>
            );
          })}
      </div>

      {/* Tips for Improvement */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
          <i className="fas fa-lightbulb text-orange-400 mr-2"></i> Tips for
          Improvement
        </h3>
        <ul className="list-none space-y-4">
          {tips_for_improvement?.map((tip, idx) => (
            <li key={idx} className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3">
                <i className="fas fa-check"></i>
              </span>
              <div className="text-sm text-gray-700">{tip}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* What's Good / Needs Improvement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-5 border border-green-200">
          <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center">
            <i className="fas fa-hand-thumbs-up text-green-500 mr-2"></i> What's
            Good
          </h3>
          <ul className="list-disc list-inside text-gray-600 text-sm space-y-2">
            {whats_good?.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow-md p-5 border border-red-200">
          <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center">
            <i className="fas fa-hand-thumbs-down text-red-500 mr-2"></i> Needs
            Improvement
          </h3>
          <ul className="list-disc list-inside text-gray-600 text-sm space-y-2">
            {needs_improvement?.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Call to Action */}
      {/* <div className="bg-blue-600 text-white rounded-lg shadow-md p-6 text-center">
        <h3 className="text-2xl font-bold mb-3">
          Ready to refine your resume? 🧠
        </h3>
        <p className="text-base mb-4">
          Make your application stand out with our premium insights and
          features.
        </p>
        <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-blue-600 bg-white hover:bg-gray-100">
          Upgrade to Premium{" "}
          <i className="fas fa-arrow-right ml-2 text-blue-600"></i>
        </button>
      </div> */}
    </div>
  );
};

export default ResumeAnalysis;
