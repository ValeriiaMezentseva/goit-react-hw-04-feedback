import Section from "./FeedbackSection";
import FeedbackOptions from "./FeedbackButtons";
import FeedbackStatistics from "./FeedbackStatistics";
import Notification from "./FeedbackNotification";
import { useState } from "react";


export const App = () =>  {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0); 
  const [bad, setBad] = useState(0); 

 
  
  const feedbackHandler = (type) => {
    switch (type) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;
      case 'bad':
        setBad(prevState => prevState + 1);
        break;
      default: return;
    };
  };
  
  const totalFeedback = () => {
    return good + neutral + bad; 
  }

  const positiveFeedbackPercentage = () => {
    return Number.parseInt(
      totalFeedback() > 0
        ? (good / totalFeedback()) * 100
        : 0
    );
  };

    const reset = () => {
    setGood(0);
    setNeutral(0);
    setBad(0);
  }
    const totalFeedbackCount = totalFeedback();
  const positiveFeedbackCount = positiveFeedbackPercentage();
  const options = Object.keys({ good, neutral, bad });
    return (
         <>
      <Section title='Please leave feedback'>
          <FeedbackOptions
            buttons={options}
            onLeaveFeedback={feedbackHandler}
            onReset={reset}
          />
        </Section>
        <Section title="Statistics">
        {totalFeedback() === 0
          ? (<Notification message='No feedback given'/>)
          : ( <FeedbackStatistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalFeedbackCount}
            positiveFeedback={positiveFeedbackCount}
            />)}
          </Section>
    </>
    )
};

