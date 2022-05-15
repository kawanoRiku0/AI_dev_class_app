// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import kuromoji, { IpadicFeatures } from "kuromoji";
import type { NextApiRequest, NextApiResponse } from "next";
import { Aiueo, Response } from "../../components/utils/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { text } = req.query;

  const aiueo = new AiueoMachine();
  try {
    const result: Aiueo = aiueo.create(text as string);
    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
  }

  // aiueo.load("./data").then(() => {
  //   // const result: string = aiueo.create("タナカ");
  //   // console.log(result);
  // });
}

class AiueoMachine {
  lineToks: IpadicFeatures[][];

  constructor() {
    this.lineToks = [];
    this.init();
  }

  init() {
    const dataPath = "../../data/wagahai.json";
    const fs = require("fs");
    const data = fs.readFileSync(dataPath);
    this.lineToks = JSON.parse(data);
  }

  async load(filePath: string): Promise<void> {
    // console.log("in load");
    // await this.initModel(wagahaiText);
  }

  initModel(src: string): Promise<void> {
    // console.log("in initModal");
    return new Promise(() =>
      kuromoji
        .builder({ dicPath: "../node_modules/kuromoji/dict" })
        .build((err, tokenizer) => {
          if (err) {
            console.log(err);
          } else {
            const lines = src.split("。");
            for (const line of lines) {
              const toks = tokenizer.tokenize(line);

              if (!toks.length) {
                continue;
              }

              this.lineToks.push(toks);
              console.log(1);
            }
            const fs = require("fs");
            const data = JSON.stringify(this.lineToks);
            fs.writeFileSync("../data/wagahai.json", data);
            console.log("終了");
          }
        })
    );
  }

  mergeSurface(toks: IpadicFeatures[]): string {
    // console.log("in mergeSurface");
    let s: string = "";
    for (const tok of toks) {
      s += tok.surface_form;
    }
    return s;
  }

  findLine(acronym: string): string | undefined {
    // console.log("in findLine");

    const randomNum = Math.floor(Math.random() * 4000);

    const lineToks = this.lineToks.slice(randomNum);
    for (const toks of lineToks) {
      const tok = toks[0];

      if (!tok.reading) continue;

      if (tok.reading[0] == acronym) {
        return this.mergeSurface(toks);
      }
    }
    return undefined;
  }

  create(odai: string): Aiueo {
    // console.log("in create");
    const result: Aiueo = {};
    for (const acronym of odai) {
      const line: string | undefined = this.findLine(acronym);
      if (line) {
        result[acronym] = line;
      } else {
        result[acronym] = "作成失敗";
      }
    }
    return result;
  }
}
