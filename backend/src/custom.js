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
  return ret; // not returning the answer
};

/*
 For a given data structure of a question, get the IDs of
 the correct answers (minimum 1).
*/
export const quizQuestionGetCorrectAnswers = question => {
  return question.answers;
};

/*
 For a given data structure of a question, get the Index of
 all of the answers, correct or incorrect.
*/
export const quizQuestionGetAnswers = question => {
  return question.options;
};

/*
 For a given data structure of a question, get the duration
 of the question once it starts. (Seconds)
*/
export const quizQuestionGetDuration = question => {
  // reduce 1 sec to allow player-end to fetch correct answer after completing the timer
  return question.timeLimit - 1; 
};
