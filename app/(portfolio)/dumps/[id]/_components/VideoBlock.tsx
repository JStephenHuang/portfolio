import { type DumpContentBlock } from "@/lib/data";

import BlockWrapper from "./BlockWrapper";
import { getBlockLabel } from "./getBlockLabel";
import styles from "./styles.module.scss";

type VideoContentBlock = Extract<DumpContentBlock, { type: "video" }>;

interface VideoBlockProps {
  block: VideoContentBlock;
  id: string;
}

const VideoBlock: React.FC<VideoBlockProps> = ({ block, id }) => (
  <BlockWrapper id={id} label={block.title ?? getBlockLabel(block.src)}>
    <figure className={styles.media}>
      <video
        className={styles.mediaVideo}
        src={block.src}
        poster={block.poster}
        aria-label={block.title}
        controls
        preload="metadata"
      />
      {block.caption && <figcaption className={styles.mediaCaption}>{block.caption}</figcaption>}
    </figure>
  </BlockWrapper>
);

export default VideoBlock;
