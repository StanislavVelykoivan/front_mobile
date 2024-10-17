import { TChatGptMessage } from "@common/types/chatGPT";

export type THeaderProps = {
  avatar_url?: string | null;
  title?: string | null;
  setMessages?: React.Dispatch<React.SetStateAction<TChatGptMessage[]>>;
};
