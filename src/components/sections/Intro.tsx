import { Button, Card } from "@chakra-ui/react";
import { BiPlay } from "react-icons/bi";

const Intro = ({ onNext }: { onNext: () => void }) => {
    return (
        <Card.Root width="3xl" size="lg">
            <Card.Body gap="2">
                <Card.Title mt="2">Welcome to the Quiz!</Card.Title>
                <Card.Description>
                    Test your knowledge of Rick and Morty characters. You'll see
                    some random character images and you need to identify them
                    from multiple choice options.
                </Card.Description>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
                <Button onClick={onNext}>
                    <BiPlay />
                    Start Quiz
                </Button>
            </Card.Footer>
        </Card.Root>
    );
};

export default Intro;
