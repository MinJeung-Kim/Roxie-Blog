import fs from "fs";

interface Header {
  level: number;
  text: string;
  child?: Header[];
}

export const markdownToToc = (filePath: string): Header[] => {
  const content: string = fs.readFileSync(filePath, "utf8");

  const headers: Header[] = content
    .split("\n")
    .filter((line: string) => line.startsWith("#")) // `#`으로 시작하는 모든 행 선택
    .map((line: string) => {
      const level: number = line.split(" ")[0].length - 1; // `#` 개수 - 1로 레벨 계산
      const text: string = line
        .trim()
        .slice(level + 1)
        .trim();
      return { level, text };
    });

  const structuredHeaders: Header[] = [];
  const parentsStack: Header[] = [];

  headers.forEach((header) => {
    let currentLevel = header.level - 1; // 배열 인덱스에 맞게 조정

    while (currentLevel < parentsStack.length) {
      parentsStack.pop();
    }

    if (parentsStack.length === 0) {
      // 최상위 레벨
      structuredHeaders.push(header);
      parentsStack.push(header);
    } else {
      // 하위 레벨
      const parentHeader = parentsStack[parentsStack.length - 1];
      parentHeader.child = parentHeader.child || [];
      parentHeader.child.push(header);
      parentsStack.push(header);
    }
  });

  return structuredHeaders;
};
