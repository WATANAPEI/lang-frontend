import * as React from "react";

interface Props {
  text: string;
}

const Body: React.SFC<Props> = (props: Props) => {
  return (
    <div>
      <h2>{props.text}</h2>
    </div>
  );
};

export default Body;
