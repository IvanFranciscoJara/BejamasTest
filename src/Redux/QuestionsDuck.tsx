import { saveStorage, getStorage } from './localStorageUtils'
import * as he from 'he'
import { Action } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { RootState } from './store'
interface Props {
  question: string
  category: string
  correct_answer: boolean
  answer: boolean
}
let initialData: Props[] = []

let SAVE_QUESTIONS = 'SAVE_QUESTIONS'
let RESTORE_STORAGE_QUESTIONS = 'RESTORE_STORAGE_QUESTIONS'
let UPDATE_QUESTION = 'UPDATE_QUESTION'
let CLEAN_QUESTION = 'CLEAN_QUESTION'

export default function reducer(
  state: Props[] = initialData,
  action: {
    type: typeof SAVE_QUESTIONS | typeof RESTORE_STORAGE_QUESTIONS | typeof UPDATE_QUESTION | typeof CLEAN_QUESTION
    payload: any
  },
) {
  switch (action.type) {
    case SAVE_QUESTIONS:
      return action.payload
    case RESTORE_STORAGE_QUESTIONS:
      return action.payload
    case UPDATE_QUESTION:
      return action.payload
    case CLEAN_QUESTION:
      return []
    default:
      return state
  }
}
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

export const SaveQuestions = (value: [{ correct_answer: string; question: string }]): AppThunk => {
  return (dispatch: ThunkDispatch<RootState, void, Action>) => {
    let NewQuestions = value.map((question: { correct_answer: string; question: string }) => ({
      ...question,
      correct_answer: question.correct_answer === 'True',
      question: he.decode(question.question),
      // .replace(/&apos;/g, "'")
      // .replace(/&quot;/g, '"')
      // .replace(/&gt;/g, ">")
      // .replace(/&lt;/g, "<")
      // .replace(/&amp;/g, "&")
      // .replace(/&#039;/g, "'"),
    }))
    saveStorage(NewQuestions)
    dispatch({ type: SAVE_QUESTIONS, payload: NewQuestions })
  }
}

export const UpdateQuestion = (index: number, value: boolean) => (
  dispatch: ThunkDispatch<RootState, void, Action>,
  getstore: () => RootState,
) => {
  let newQuestions: any = [...getstore().questionState]
  newQuestions[index].answer = value
  saveStorage(newQuestions)
  dispatch({ type: UPDATE_QUESTION, payload: newQuestions })
}

export const CleanQuestions = () => (dispatch: ThunkDispatch<RootState, void, Action>) => {
  saveStorage([])
  dispatch({ type: CLEAN_QUESTION })
}

export let restoreStorageQuestionDuck = () => (dispatch: ThunkDispatch<RootState, void, Action>) => {
  let ReduxStore = getStorage()
  if (ReduxStore) {
    dispatch({
      type: RESTORE_STORAGE_QUESTIONS,
      payload: ReduxStore,
    })
  }
}
