import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from ".."
import { CloseButton } from "../../CloseButton"
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackRestartRequest: () => void;
  onFeedbackSent: () => void;
}

export function FeedbacksContentStep( { feedbackType, onFeedbackRestartRequest, onFeedbackSent } : FeedbackContentStepProps ) {
  
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState("");

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault();

    console.log({
      screenshot,
      comment,
    })

    onFeedbackSent();
  }
  
  return (
    <>
      <header>
        <button onClick={onFeedbackRestartRequest} type="button" className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100">
          <ArrowLeft weight="bold" className="w-4 h-4"/>
        </button>

        <span className="text-xl leading-6 flex gap-2">
          <img 
            src={feedbackTypeInfo.image.source} 
            alt={feedbackTypeInfo.image.alt} 
            className="w-6 h-6" 
          />
          {feedbackTypeInfo.title}
        </span>

        <CloseButton />
      </header>

      <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
        <textarea 
          className="min-w-[304px] w-full h-28 min-h[112px] text-sm placeholder-zinc-400 text-zinc-100 border-[0.50px] border-zinc-600 bg-transparent rounded-md focus:border-zinc-500 focus:ring-zinc-500 focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin" 
          placeholder="Digite aqui problema..."
          onChange={event => {setComment(event.target.value)}}
        />

        <footer className="flex gap-2 mt-2">

          <ScreenshotButton 
            onSreenshotTook={setScreenshot} 
            screenshot={screenshot}
          />

          <button
            className="p-2 bg-zinc-800 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-zinc-500 transition-colors disabled:opacity-50 disabled:hover:bg-zinc-800"
            type="submit"
            disabled={comment.length === 0}
          >
            Enviar feedback
          </button>
        </footer>
      </form>
    </>
  )
}