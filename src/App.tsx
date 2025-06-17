import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import "./App.css";
import { Button, Center, Container, Flex, Heading } from "@chakra-ui/react";
import { BiMoon, BiSun } from "react-icons/bi";
import Intro from "./components/sections/Intro";
import Quiz from "./components/sections/Quiz";
import Results from "./components/sections/Results";

function App() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [stage, setStage] = useState<"intro" | "quiz" | "results">("intro");

    const [score, setScore] = useState(0);
    const [totalAnswers, setTotalAnswers] = useState(0);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null; // avoid hydration mismatch

    const isDark = resolvedTheme === "dark";

    return (
        <div className={isDark ? "darkBackground" : "lightBackground"}>
            <Button
                variant="outline"
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="left-4 top-4 aspect-square"
                position="fixed"
            >
                {isDark ? <BiSun /> : <BiMoon />}
            </Button>
            <Container colorPalette="purple" className="h-[100vh]" p={5}>
                <Flex flexDirection="column" h="100%">
                    <Center
                        flexDirection="column"
                        className="h-full"
                        justifyContent="flex-start"
                        gap={10}
                    >
                        <Flex flexDirection="column" alignItems="center">
                            <Heading size="4xl">Rick and Morty</Heading>
                            <Heading size="xl" fontWeight="normal">
                                Character Quiz
                            </Heading>
                        </Flex>

                        {stage === "intro" && (
                            <Intro onNext={() => setStage("quiz")} />
                        )}
                        {stage === "quiz" && (
                            <Quiz
                                onNext={(finalScore, total) => {
                                    setScore(finalScore);
                                    setTotalAnswers(total);
                                    setStage("results");
                                }}
                            />
                        )}
                        {stage === "results" && (
                            <Results
                                score={score}
                                totalAnswers={totalAnswers}
                                onNext={() => {
                                    setScore(0);
                                    setTotalAnswers(0);
                                    setStage("intro");
                                }}
                            />
                        )}
                    </Center>
                </Flex>
            </Container>
        </div>
    );
}

export default App;
