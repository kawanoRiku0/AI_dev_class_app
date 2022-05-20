import { Box, Stack, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Aiueo } from "./utils/types";

type Props = {
  aiueo: Aiueo;
};

export const AiueoShowSection: FC<Props> = ({ aiueo }) => {
  return (
    <Stack spacing="4" bg="white" p="4">
      {Object.keys(aiueo).map((key) => (
        <Text fontWeight="bold" key={key}>{`${key}：${aiueo[key]}`}</Text>
      ))}
    </Stack>
  );
};
