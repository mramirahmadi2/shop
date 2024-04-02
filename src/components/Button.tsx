import React from "react";
const Button = ({
  body,
  type = "button",
  ClassName,
  Click,
  ref,
}: {
  body: string;
  type?: "submit" | "reset" | "button";
  ClassName: string;
  Click? : () => void | undefined
  ref?:any;
}) => {
  return (
    <button type={type} className={`${ClassName} px-4 py-2 rounded-xl`} onClick={Click} ref={ref}>
      {body}
    </button>
  );
};

export default Button;
