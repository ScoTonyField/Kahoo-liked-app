/*
 For a given data structure of a question, produce another
 object that doesn't contain any important meta data (e.g. the answer)
 to return to a "player"
*/
export const quizQuestionPublicReturn = question => {
  const ret = {
    isSingle: question.isSingle,
    contents: question.contents,
    timeLimit: question.timeLimit,
    points: question.points,
    media: question.media,
    options: question.options,
  };
  console.log(ret);
  return ret; // not returning the answer
};

/*
 For a given data structure of a question, get the IDs of
 the correct answers (minimum 1).
*/
export const quizQuestionGetCorrectAnswers = question => {
  return question.answers; // For a single answer
};

/*
 For a given data structure of a question, get the IDs of
 all of the answers, correct or incorrect.
*/
export const quizQuestionGetAnswers = question => {
  console.log('get answer', question)
  return question.options; // For a single answer
};

/*
 For a given data structure of a question, get the duration
 of the question once it starts. (Seconds)
*/
export const quizQuestionGetDuration = question => {
  // adding 5 sec delay to allow user submit answer in the last sec
  return question.timeLimit + 5; 
};
