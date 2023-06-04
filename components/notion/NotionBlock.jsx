import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import coldarkDark from "react-syntax-highlighter/dist/cjs/styles/prism/coldark-dark";
import { server } from "../../util/server";
import Image from "next/image";
import { useState, useEffect } from "react";
import useSWR from "swr";

const NotionBlock = ({ slug, block }) => {
  return (
    <div>
      <RenderBlock block={block} key={slug} />
    </div>
  );
};

const RenderBlock = ({ block }) => {
  //console.log(JSON.stringify(block, null, 4));
  switch (block.type) {
    case "paragraph":
      return <Paragraph paragraph={block.paragraph} id={block.id} />;
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
      let notionImageUrl;
      if (block.image.file) {
        notionImageUrl = block.image.file.url;
      } else if (block.image.external.url) {
        notionImageUrl = block.image.external.url;
      } else {
        notionImageUrl =
          "http://4.bp.blogspot.com/-schAhg6joOk/U27Kdt1MfAI/AAAAAAAAVq8/_T1oXM6hPFw/s1600/ping3.png";
      }
      return (
        <CloudinaryImage
          notionImageId={block.id}
          notionImageUrl={notionImageUrl}
        />
      );

    default:
      return <p key={block.id}>TODO blocktype implementation lmao</p>;
  }
};

const Paragraph = ({ paragraph, id }) => {
  return (
    <p key={id}>
      {paragraph.text.map((text) => {
        let textContent = text.text.content;
        if (text.annotations.bold) textContent = <b>{textContent}</b>;
        if (text.annotations.italic) textContent = <i>{textContent}</i>;
        if (text.annotations.underline) textContent = <u>{textContent}</u>;
        if (text.annotations.strikethrough) textContent = <s>{textContent}</s>;
        if (text.text.link) {
          textContent = (
            <Link href={text.text.link.url}>
              <a style={{ color: "blue" }}>{textContent}</a>
            </Link>
          );
        }
        return textContent;
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

const fetcher = (url, notionBodyData) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(notionBodyData),
  }).then((res) => res.json());
};

const CloudinaryImage = ({ notionImageId, notionImageUrl }) => {
  let query = `/api/convertAndGetImage`;
  let notionImageBody = {
    notionImageId: notionImageId,
    notionImageUrl: notionImageUrl,
  };

  // idk wtf is a better syntax than this. but this works. so. yeah.
  const { data, error, isLoading } = useSWR(
    [query, notionImageBody],
    ([query, notionImageBody]) => fetcher(query, notionImageBody)
  );

  if (error) return <FunnyError />;
  if (isLoading) return <p>loading...</p>;

  return (
    <img
      src={data.imageUrl}
      width="600px"
      alt="this is supposed to be an image. refresh and ill assure u it will be. if not. well. i tried."
      srcset=""
      style={{ objectFit: "contain" }}
    />
  );
};

function FunnyError() {
  return (
    <div>
      <p>
        Something went wrong. I'm not sure what. But it's probably my fault.
      </p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src="/images/idk.jpg" alt="" />
      </div>
    </div>
  );
}

export default NotionBlock;
