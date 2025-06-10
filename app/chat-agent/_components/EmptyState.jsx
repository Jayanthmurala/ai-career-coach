"use client";

const questionList = [
  "What is the best way to start a career in AI?",
  "What skills are essential for a career in AI?",
  "What is the future of AI careers?",
];

const EmptyState = ({ selectedQuestion }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold">start a conversation</h2>
      {questionList.map((question, index) => (
        <div
          key={index}
          className="mt-4 p-2 border rounded-md cursor-pointer hover:bg-gray-100 transition-colors "
        >
          <p onClick={() => selectedQuestion(question)} className="text-lg">
            {question}
          </p>
        </div>
      ))}
    </div>
  );
};

export default EmptyState;
