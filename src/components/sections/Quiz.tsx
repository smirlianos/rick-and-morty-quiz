import {
    Badge,
    Box,
    Button,
    Card,
    Center,
    HStack,
    RadioCard,
    VStack,
    Text,
} from "@chakra-ui/react";
import { BiCheck, BiGlasses } from "react-icons/bi";
import { toaster } from "../ui/toaster";
import { useState } from "react";
import type { Character, AnswerOption } from "@/types/types";
import { useEffect } from "react";

const TOTAL_CHARACTERS = 826;
const TOTAL_QUESTIONS = 5;

function getCharacterIds(count: number, max: number): number[] {
    const ids = new Set<number>();
    while (ids.size < count) {
        const id = Math.floor(Math.random() * max) + 1;
        ids.add(id);
    }
    return Array.from(ids);
}

async function fetchRandomCharacters(): Promise<Character[]> {
    const ids = getCharacterIds(TOTAL_QUESTIONS, TOTAL_CHARACTERS).join(",");

    const res = await fetch(`https://rickandmortyapi.com/api/character/${ids}`);
    if (!res.ok) {
        throw new Error(`Error fetching characters: ${res.status}`);
    }
    const raw: any[] = await res.json();
    const characters: Character[] = raw.map((char) => ({
        id: char.id,
        name: char.name,
        origin: char.origin,
        location: char.location,
        image: char.image,
    }));
    return characters;
}

function createAnswerOptions(
    characters: Character[],
    correctIndex: number
): AnswerOption[] {
    const correctChar: Character = characters[correctIndex];
    const otherChars: Character[] = characters.filter(
        (_, idx) => idx !== correctIndex
    );
    const shuffled = otherChars.sort(() => 0.5 - Math.random()).slice(0, 4);
    const candidates = [...shuffled, correctChar].sort(
        () => 0.5 - Math.random()
    );

    return candidates.map((char, index) => ({
        label: String.fromCharCode(65 + index),
        name: char.name,
        isCorrect: char.id === correctChar.id,
    }));
}

const hintTexts = [
    "Morty, you're not a smart man. That's not a slight, it's just a biological fact.",
    "Your little peanuts brain can’t handle this level of science, Morty.",
    "You’re like a little dog who keeps thinking the microwave is a portal.",
];

const Quiz = ({
    onNext,
}: {
    onNext: (score: number, total: number) => void;
}) => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [options, setOptions] = useState<AnswerOption[]>([]);
    const [hintLabels, setHintLabels] = useState<string[]>([]);
    const [availableHints, setAvailableHints] = useState(3);

    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<string | null>(null);
    const [score, setScore] = useState(0);

    useEffect(() => {
        setLoading(true);
        fetchRandomCharacters()
            .then((chars) => {
                setCharacters(chars);
                setOptions(createAnswerOptions(chars, 0));
                console.log("Fetched characters:", chars);
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (characters.length) {
            setOptions(createAnswerOptions(characters, questionIndex));
        }
    }, [questionIndex]);

    function HandleHint(options: AnswerOption[]) {
        if (availableHints <= 0) return;

        setAvailableHints((prev) => prev - 1);

        toaster.create({
            description: hintTexts[availableHints - 1],
            type: "info",
        });
        const picked = options
            .filter((opt) => !opt.isCorrect)
            .sort(() => 0.5 - Math.random())
            .slice(0, 2);

        const labels = picked.map((opt) => opt.label);
        setHintLabels(labels);
    }

    function ProceedQuestion() {
        const chosen = options.find((opt) => opt.label === selected);
        setScore((prev) => (chosen?.isCorrect ? prev + 1 : prev));
        if (questionIndex + 1 === TOTAL_QUESTIONS) {
            setAvailableHints(3);
            onNext(score, TOTAL_QUESTIONS);
        }
        setQuestionIndex((prev) => prev + 1);
        setSelected(null);
        setHintLabels([]);
    }

    if (loading || !characters.length || !options.length) {
        return (
            <Card.Root width="3xl" size="lg">
                <Card.Body>
                    <Card.Title mt="2">Loading Quiz...</Card.Title>
                </Card.Body>
            </Card.Root>
        );
    }

    return (
        <Card.Root width="3xl" size="lg">
            <Card.Body>
                <Center gap="2" flexDirection="column">
                    <Card.Title mt="2">Who is this Character?</Card.Title>
                    <Card.Description>
                        Choose the correct option from the options below.
                    </Card.Description>
                    <Box
                        w="200px"
                        h="200px"
                        className="overflow-hidden rounded shadow-xl"
                        mt={2}
                        mb={2}
                    >
                        <img src={characters[questionIndex].image} />
                    </Box>
                    <HStack>
                        <Badge variant="plain">
                            Origin:{" "}
                            <Text fontSize="small">
                                {characters[questionIndex].origin.name}
                            </Text>
                        </Badge>
                        <Badge variant="plain">
                            Location:{" "}
                            <Text fontSize="small">
                                {characters[questionIndex].location.name}
                            </Text>
                        </Badge>
                    </HStack>

                    <RadioCard.Root
                        defaultValue="none"
                        value={selected}
                        w="100%"
                        onValueChange={(e) => setSelected(e.value)}
                    >
                        <VStack gap={3} w="100%">
                            {options.map((option) => (
                                <RadioCard.Item
                                    className="hover:shadow-sm"
                                    key={option.label}
                                    value={option.label}
                                    w="100%"
                                    disabled={hintLabels.includes(option.label)}
                                    borderColor="red.600"
                                    borderWidth={
                                        hintLabels.includes(option.label)
                                            ? 1
                                            : 0
                                    }
                                >
                                    <RadioCard.ItemHiddenInput />
                                    <RadioCard.ItemControl>
                                        <RadioCard.ItemIndicator />
                                        <RadioCard.ItemText>
                                            {option.label}. {option.name}{" "}
                                        </RadioCard.ItemText>
                                    </RadioCard.ItemControl>
                                </RadioCard.Item>
                            ))}
                        </VStack>
                    </RadioCard.Root>
                </Center>
            </Card.Body>
            <Card.Footer>
                {/* <Button variant="outline">View</Button> */}

                <HStack justifyContent="space-between" w="100%">
                    <Badge variant="plain">
                        Question {questionIndex + 1} out of {TOTAL_QUESTIONS}
                    </Badge>
                    <HStack>
                        <Button
                            variant="outline"
                            onClick={() => {
                                HandleHint(options);
                            }}
                            disabled={
                                hintLabels.length > 0 || availableHints === 0
                            }
                        >
                            <BiGlasses />
                            Hint ({availableHints}/3)
                        </Button>
                        <Button
                            disabled={!selected}
                            onClick={() => {
                                ProceedQuestion();
                            }}
                        >
                            <BiCheck />
                            Submit
                        </Button>
                        {score}
                    </HStack>
                </HStack>
            </Card.Footer>
        </Card.Root>
    );
};

export default Quiz;
