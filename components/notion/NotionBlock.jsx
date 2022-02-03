import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import coldarkDark from "react-syntax-highlighter/dist/cjs/styles/prism/coldark-dark";

const NotionBlock = ({ slug, block }) => {
  return (
    <div>
      <RenderBlock block={block} />
    </div>
  );
};

const RenderBlock = ({ block }) => {
  switch (block.type) {
    case "paragraph":
      return <Paragraph paragraph={block.paragraph} id={block.id} />;
      break;
    case "code":
      return (
        <SyntaxHighlighter
          language={block.code.language}
          style={coldarkDark}
          wrapLines={true}
          wrapLongLines={true}
        >
          {block.code.text[0].text.content}
        </SyntaxHighlighter>
      );
    case "heading_1":
      return <Header1 heading_1={block.heading_1} id={block.id} />;
    case "heading_2":
      return <Header2 heading_2={block.heading_2} id={block.id} />;
    case "heading_3":
      return <Header3 heading_3={block.heading_3} id={block.id} />;
    case "bulleted_list_item":
      return (
        <BulletItem
          bulleted_list_item={block.bulleted_list_item}
          id={block.id}
        />
      );
    case "image":
      return (
        <p>
          -Image block currently not supported due to technical difficulties-
        </p>
      );
    default:
      return <p key={block.id}>TODO blocktype implementation lmao</p>;
      break;
  }
};

const Paragraph = ({ paragraph, id }) => {
  return (
    <p key={id}>
      {paragraph.text.map((text) => {
        return text.text.content;
      })}
    </p>
  );
};

const Header1 = ({ heading_1, id }) => {
  return (
    <h1 key={id}>
      {heading_1.text.map((text) => {
        return text.text.content;
      })}
    </h1>
  );
};

const Header2 = ({ heading_2, id }) => {
  return (
    <h2 key={id}>
      {heading_2.text.map((text) => {
        return text.text.content;
      })}
    </h2>
  );
};

const Header3 = ({ heading_3, id }) => {
  return (
    <h3 key={id}>
      {heading_3.text.map((text) => {
        return text.text.content;
      })}
    </h3>
  );
};

const BulletItem = ({ bulleted_list_item, id }) => {
  return (
    <ul key={id} style={{ paddingLeft: "20px" }}>
      <li>
        {bulleted_list_item.text.map((text) => {
          return text.text.content;
        })}
      </li>
    </ul>
  );
};
export default NotionBlock;
