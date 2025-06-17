import {
    Badge,
    Box,
    Button,
    Card,
    Center,
    Heading,
    VStack,
    Text,
    Container,
    Flex,
    CloseButton,
    HStack,
} from "@chakra-ui/react";
import { BiDownload, BiExport, BiPrinter, BiReset, BiX } from "react-icons/bi";
import { toPng } from "html-to-image";
import { useState } from "react";
import { useTheme } from "next-themes";

function getAchievementText(score: number, totalAnswers: number) {
    const percentageScore = (score / totalAnswers) * 100;

    if (percentageScore === 100)
        return "Wubba lubba dub-dub! You actually did it!";
    if (percentageScore >= 80) return "Alright Morty, not completely useless.";
    if (percentageScore >= 50)
        return "Meh... you're like, interdimensional average.";
    return "Jeez, Morty... even Jerry scores better than that.";
}

const Results = ({
    onNext,
    score,
    totalAnswers,
}: {
    onNext: () => void;
    score: number;
    totalAnswers: number;
}) => {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    const [showCard, setShowCard] = useState(false);
    const handleDownload = () => {
        const node = document.getElementById("results-card");
        if (!node) return;

        toPng(node)
            .then((dataUrl) => {
                const link = document.createElement("a");
                link.download = "quiz-results.png";
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.error("Failed to generate image", err);
            });
    };

    return (
        <>
            <Card.Root width="3xl" size="lg">
                <Card.Body gap="2">
                    <Center gap="2" flexDirection="column">
                        <Card.Title mt="2">Quiz Complete!</Card.Title>
                        <Card.Description>Here's how you did:</Card.Description>
                        <Heading size="6xl" fontWeight="bold" mt={4} mb={8}>
                            {score} / {totalAnswers}
                        </Heading>
                        <Badge size="lg" variant="outline" mb={8}>
                            {getAchievementText(score, totalAnswers)}
                        </Badge>
                    </Center>
                </Card.Body>
                <Card.Footer justifyContent="flex-end">
                    {/* <Button variant="outline">View</Button> */}

                    <Button onClick={() => setShowCard(true)}>
                        <BiExport />
                        Export Results
                    </Button>
                    <Button onClick={onNext}>
                        <BiReset />
                        Restart
                    </Button>
                </Card.Footer>
            </Card.Root>

            {showCard && (
                <div
                    className={`fixed w-full h-full top-0 left-0 ${
                        isDark ? "bg-black/50" : ""
                    }  backdrop-blur-lg`}
                >
                    <Center className="h-full">
                        <VStack gap={2} alignItems="flex-end">
                            <Box
                                id="results-card"
                                className="bg-gradient-to-br from-purple-800 to-pink-800  text-white rounded-lg"
                                padding={6}
                            >
                                <Center>
                                    <VStack>
                                        <Heading size="2xl">
                                            I just completed the Rick & Morty
                                            Quiz!
                                        </Heading>
                                        <Text fontSize="md">
                                            Here's how I did:
                                        </Text>
                                        <Heading
                                            size="6xl"
                                            fontWeight="bold"
                                            mt={4}
                                            mb={8}
                                        >
                                            {score} / {totalAnswers}
                                        </Heading>
                                        <Box>
                                            Try your luck on: https://site.com
                                        </Box>
                                    </VStack>
                                </Center>
                            </Box>
                            <HStack>
                                <Button
                                    variant="outline"
                                    onClick={() => setShowCard(false)}
                                >
                                    {" "}
                                    <BiX /> Cancel
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={handleDownload}
                                >
                                    {" "}
                                    <BiDownload /> Download
                                </Button>
                            </HStack>
                        </VStack>
                    </Center>
                </div>
            )}
        </>
    );
};

export default Results;
