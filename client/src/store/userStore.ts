import {create} from 'zustand'

interface WordCard {
    id: string,
    english: string,
    russian: string,
    progressId: string;
    correctAttempts: number;
}

interface UserState {
    isLoggedIn: boolean,
    username: string | null,

    login:(name: string) => void
    logout:()=> void

    currentCard : WordCard | null,
    cardsToReview: WordCard[],
    isLoading: boolean;

    fetchDueCards: () => Promise<void>,
    setNextCard: () => void,
    submitAnswer: (isCorrect:boolean) => Promise<void>
}

export const useUserStore = create<UserState>((set,get)=>({
    isLoggedIn: false,
    username: null,
    currentCard: null, 
    cardsToReview: [], 
    isLoading: false, 
    login: (name) => {}, 
    logout: () => {}, 
    fetchDueCards: async () => {},
    setNextCard: () => {},
    submitAnswer: async (isCorrect) => {},
}));