import { useContext } from "react";

import { UserCartContext } from "../../customContexts/CartCtx";
import UserCartComp from "../Global/UserCartComp";

const Page_layout = ({ children }) => {
  const { userCart } = useContext(UserCartContext);

  return (
    <div className="page_layout--WRAPPER">
      <div className="page_content--WRAPPER">{children}</div>
      {userCart?.length ? <UserCartComp /> : ""}
    </div>
  );
};

export default Page_layout;
