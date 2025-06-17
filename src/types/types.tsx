export interface Character {
    id: number;
    name: string;
    origin: { name: string; url: string };
    location: { name: string; url: string };
    image: string;
}

export interface AnswerOption {
    label: string; // e.g. "A", "B", etc.
    name: string; // Character name shown to user
    isCorrect: boolean; // True for the right answer
}
