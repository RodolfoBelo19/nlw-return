import { CloseButton } from "../CloseButton";

import { FeedbacksTypeStep } from "../WidgetForm/Steps/FeedbacksTypeStep"

import bugImage from "../../assets/bug.png"
import ideaImage from "../../assets/idea.png"
import thoughtImage from "../../assets/thought.png"
import { useState } from "react";
import { FeedbacksContentStep } from "./Steps/FeedbacksContentStep";
import { FeedbacksSuccessStep } from "./Steps/FeedbacksSuccessStep";

export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: bugImage,
      alt: 'Imagem de um inseto',
    }
  },
  IDEA: {
    title: 'Ideia',
    image: {
      source: ideaImage,
      alt: 'Imagem de uma lâmpada',
    }
  },
  OTHER: {
    title: 'Outro',
    image: {
      source: thoughtImage,
      alt: 'Imagem de um balão de pensamento',
    }
  }
}

export type FeedbackType = keyof typeof feedbackTypes;

// Object.entries(feedbackTypes) => 
/** 
 * [
 *  ['BUG', {...}],
 *  ['IDEA', {...}],
 *  ['OTHER', {...}],
 * ]
**/

export function WidgetForm() {

  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleRestartFeedback() {
    setFeedbackSent(false);
    setFeedbackType(null);
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">

      {feedbackSent ? (
        <FeedbacksSuccessStep onFeedbackRestartRequest={handleRestartFeedback}/>
      ) : (
        <>
          {!feedbackType ? (
            <FeedbacksTypeStep onFeedbackTypeChanged={setFeedbackType} />
          ) :
            (
              <FeedbacksContentStep
                feedbackType={feedbackType}
                onFeedbackRestartRequest={handleRestartFeedback}
                onFeedbackSent={() => setFeedbackSent(true)}
              />
            )}
        </>
      )
      }

      <footer className="text-xs text-neutral-400">
        together with nlw return <a className="underline underline-offset-2" href="https://rocketseat.com.br">Rocketseat</a>
      </footer>
    </div>
  )
}