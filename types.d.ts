export interface Team {
  Name: string
  Answers: {
    Text: string
    Wager: number
  }
  id: string
}

export interface Question {
  Answer: string
  Question: string
}

export interface QuestionSet {
  DateCreated: Date
  QuestionSetName: string
  Questions: Question[]
  id: string
}

export interface GameMetadata {
  HasGameStarted: boolean
  QuestionNumber: number
  QuestionSetId: string
}
