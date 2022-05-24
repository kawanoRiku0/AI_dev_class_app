import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { Dispatch, SetStateAction, useState } from "react";
import useSWR from "swr";
import { AiueoShowSection } from "../components/AiueoShowSection";
import { Response } from "../components/utils/types";

const fetcher = (URL: string) => fetch(URL).then((res) => res.json());

const Home: NextPage = () => {
  const [text, setText] = useState("");
  const [keyWard, setKeyWard] = useState("");

  const { data } = useSWR<Response>(
    keyWard ? `http://localhost:3000/api/aiueo?text=${keyWard}` : null,
    fetcher
  );

  const handleOnClick = (
    text: string,
    setState: Dispatch<SetStateAction<string>>
  ) => {
    setState(text);
  };

  // データをレンダリングする
  return (
    <Box w="full" minH="100vh" bg="blackAlpha.50">
      <Center>
        <Stack mt="16" w="2xl" spacing="8">
          <Heading>あいうえお作文メーカー</Heading>
          <Stack>
            <Text>お好きな文字を入力してください</Text>
            <Input
              bg="white"
              borderColor="blackAlpha.500"
              value={text}
              onChange={(e) => setText(e.target.value)}
              _hover={{ opacity: "1.0" }}
            />
            <Button
              bg="blue.900"
              color="white"
              onClick={() => handleOnClick(text, setKeyWard)}
              _hover={{ opacity: "0.8" }}
            >
              作成！
            </Button>
          </Stack>

          {data && <AiueoShowSection aiueo={data.result} />}
        </Stack>
      </Center>
    </Box>
  );
};

export default Home;
