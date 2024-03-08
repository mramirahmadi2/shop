import React from "react";
const Button = ({
  body,
  type = "button",
  ClassName,
  Click,
}: {
  body: string;
  type?: "submit" | "reset" | "button";
  ClassName: string;
  Click? : () => void | undefined
}) => {
  return (
    <button type={type} className={`${ClassName}`} onClick={Click}>
      {body}
    </button>
  );
};

export default Button;
