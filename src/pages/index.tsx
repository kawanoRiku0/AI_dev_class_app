import { Box, Button, Center, Heading, Input, Text } from "@chakra-ui/react";
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
    <Box w="full">
      <Center>
        <Box mt="16" w="2xl">
          <Heading>あいうえお作文メーカー</Heading>
          <Box>
            <Text>お好きな文字を入力してください</Text>
            <Input value={text} onChange={(e) => setText(e.target.value)} />
            <Button onClick={() => handleOnClick(text, setKeyWard)}>
              作成！
            </Button>
          </Box>

          {data && <AiueoShowSection aiueo={data.result} />}
        </Box>
      </Center>
    </Box>
  );
};

export default Home;
