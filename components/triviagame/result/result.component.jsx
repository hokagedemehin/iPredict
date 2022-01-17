import React, { useEffect, useState } from 'react';

const ResultComponent = ({ figures, handleSubmit }) => {
  // console.log('results sent: ', res, figures);
  // console.log('result figures: ', figures.correctAnswers);
  useEffect(() => {
    handleSubmit();
  }, []);

  const [comp, setComp] = useState(0);
  // * all responses are correct
  if (figures.correctAnswers == 10) {
    console.log('response = 10: ', figures.correctAnswers);
  }

  // * correct responses are greater than 6 but less than 10
  if (figures.correctAnswers < 10 && figures.correctAnswers > 6) {
    console.log('response > 6: ', figures.correctAnswers);
  }
  // * correct responses are greater than 3 but less than 7
  if (figures.correctAnswers < 7 && figures.correctAnswers > 3) {
    console.log('response > 3: ', figures.correctAnswers);
  }
  // * correct responses are less than 4
  if (figures.correctAnswers < 4) {
    console.log('response < 3: ', figures.correctAnswers);
  }
  return <div>{}</div>;
};

export default ResultComponent;
