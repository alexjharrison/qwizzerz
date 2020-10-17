export interface Team {
  Name: string
  Answers: {
    Text: string
    Wager: number
  }
}

export interface Question {
  Answer: string
  Question: string
}

export interface QuestionSet {
  DateCreated: Date
  QuestionSetName: string
  Questions: Question[]
}

export interface GameMetadata {
  HasGameStarted: boolean
  QuestionNumber: number
  QuestionSetId: string
}
