import { Box, Stack, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Aiueo } from "./utils/types";

type Props = {
  aiueo: Aiueo;
};

export const AiueoShowSection: FC<Props> = ({ aiueo }) => {
  return (
    <Stack spacing="4">
      {Object.keys(aiueo).map((key) => (
        <Text key={key}>{`${key}：${aiueo[key]}`}</Text>
      ))}
    </Stack>
  );
};
