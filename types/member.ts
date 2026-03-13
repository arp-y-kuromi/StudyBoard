export type Position = "エンジニア" | "デザイナー";

export type Member = {
  id: number;
  position: Position;
  name: string;
  progress: number; // 研修完了 %
  commits: number; // GitHubコミット数
};
