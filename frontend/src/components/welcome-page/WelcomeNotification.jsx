import React, { Fragment } from "react";
import MyModal from "../user/modal/MyModal";
import { StyledDisclaimer } from "../../pages/guest/about/About";

const WelcomeNotification = () => {
  return (
    <MyModal
      title="Notification"
      description={
        <Fragment>
          <StyledDisclaimer>
            This is a portfolio project intended for demonstration purposes
            only. It is not meant for real-world use but rather to showcase my
            skills to potential recruiters and employers.
          </StyledDisclaimer>
          <StyledDisclaimer>
            PLEASE NOTE: THIS PROJECT IS CURRENTLY UNDER DEVELOPMENT AND
            UNDERGOING CONTINUOUS IMPROVEMENT.
          </StyledDisclaimer>
        </Fragment>
      }
      openValue={true}
    />
  );
};

export default WelcomeNotification;
