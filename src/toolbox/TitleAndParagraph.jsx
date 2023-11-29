import React from "react";

function TitleAndParagraph({ title = "Title", paragraph = "Paragraph" }) {
  return (
    <div className="flex flex-col gap-y-1 my-1">
      <p className="text-2xl text-main-active uppercase font-montserrat-bold">
        {title}
      </p>
      <p className="text-lg text-slate-600 font-montserrat-regular">
        {paragraph}
      </p>
    </div>
  );
}

export default TitleAndParagraph;
