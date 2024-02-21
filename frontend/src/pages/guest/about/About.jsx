import React from "react";
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
  styled,
  useTheme,
} from "@mui/material";

const BoldBlackText = styled(Typography)`
  && {
    font-weight: bold;
    color: #000000;
  }
`;

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 800,
  margin: "auto",
  marginTop: theme.spacing(4),
  border: `2px solid #0063fd`,
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[3],
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  fontWeight: "bold",
  marginBottom: theme.spacing(2),
  color: "#0063fd",
}));

const StyledSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  fontWeight: "bold",
  marginBottom: theme.spacing(1),
  color: "#0063fd",
}));

const StyledList = styled(List)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const StyledContent = styled("div")(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

export const StyledDisclaimer = styled("div")(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontStyle: "italic",
  color: theme.palette.warning.main,
}));

const About = () => {
  const theme = useTheme();

  return (
    <StyledCard theme={theme}>
      <CardContent>
        <StyledDisclaimer>
          <Typography variant="body1" paragraph>
            This is a portfolio project intended for demonstration purposes
            only. It is not meant for real-world use but rather to showcase my
            skills to potential recruiters and employers.
          </Typography>
        </StyledDisclaimer>
        <StyledDisclaimer>
          PLEASE NOTE: THIS PROJECT IS CURRENTLY UNDER DEVELOPMENT AND
          UNDERGOING CONTINUOUS IMPROVEMENT.
        </StyledDisclaimer>

        <StyledContent>
          <Typography variant="h6" paragraph>
            This application was created using Node.js, Express.js, TypeScript,
            and MongoDB for the backend, while the frontend was developed with
            React.js and Redux
          </Typography>
        </StyledContent>

        <StyledContent>
          <Typography variant="h6" paragraph>
            for images we use{" "}
            <a target="_blank" href="https://unsplash.com" rel="noreferrer">
              https://unsplash.com
            </a>
          </Typography>
        </StyledContent>

        <StyledTypography variant="h5" gutterBottom>
          Welcome to our Dynamic Web Application!
        </StyledTypography>

        <StyledContent>
          <Typography variant="body1" paragraph>
            Where you can effortlessly create and share your thoughts through
            posts and stories. Express yourself freely and connect with friends
            in a personalized environment.
          </Typography>

          <StyledSubtitle variant="h6" gutterBottom>
            Create and Share:
          </StyledSubtitle>

          <Typography variant="body1" paragraph>
            Easily compose posts and stories to share your experiences,
            thoughts, and moments with your friends. Customize your content with
            images, text, and even videos to make it uniquely yours.
          </Typography>
        </StyledContent>

        <StyledSubtitle variant="h6" gutterBottom>
          Distinct Friend Categories:
        </StyledSubtitle>

        <StyledList>
          <StyledListItem style={{ borderLeft: "5px solid rgb(255, 0, 138)" }}>
            <StyledListItemText
              primary="Pink Border:"
              secondary="Mark your posts and stories with a pink border to signify that it's a favorite. Highlight those special moments that hold a special place in your heart."
            />
          </StyledListItem>
          <StyledListItem style={{ borderLeft: "5px solid rgb(30, 255, 30)" }}>
            <StyledListItemText
              primary="Green Border:"
              secondary="Designate posts and stories with a green border for your close friends. Share more intimate moments with the people who matter most to you."
            />
          </StyledListItem>
          <StyledListItem style={{ borderLeft: "5px solid rgb(5, 0, 255)" }}>
            <StyledListItemText
              primary="Blue Border:"
              secondary="Indicate posts and stories with a blue border to share with your broader circle of friends. Keep everyone in the loop about your day-to-day adventures."
            />
          </StyledListItem>
        </StyledList>

        <StyledSubtitle variant="h6" gutterBottom>
          Privacy Features:
        </StyledSubtitle>

        <StyledContent>
          <Typography variant="body1" paragraph>
            Limited Visibility: Only the author of a post or story can view the
            likes and comments. This ensures that your content remains private
            and only shared with those you choose.
          </Typography>

          <Typography variant="body1" paragraph>
            Personal Engagement: Users can only view their own likes and
            comments on both posts and stories. This maintains a personalized
            experience, keeping interactions relevant and meaningful.
          </Typography>
        </StyledContent>

        <StyledSubtitle variant="h6" gutterBottom>
          Social Interactions:
        </StyledSubtitle>

        <StyledContent>
          <Typography variant="body1" paragraph>
            Add/Remove Friends: Manage your connections effortlessly by adding
            or removing friends. Tailor your network to include those with whom
            you want to share your moments.
          </Typography>

          <Typography variant="body1" paragraph>
            User Profiles: Explore user profiles within your friend list. Get to
            know your friends better by viewing their shared content and
            moments.
          </Typography>
        </StyledContent>

        <StyledSubtitle variant="h6" gutterBottom>
          Story Views:
        </StyledSubtitle>

        <StyledContent>
          <Typography variant="body1" paragraph>
            Author's Perspective: In stories, authors have access to view the
            number of views and the specific users who have seen it, enabling
            them to accurately gauge the reach and impact of their shared
            moments.
          </Typography>
        </StyledContent>

        <StyledSubtitle variant="h6" gutterBottom>
          Text Messages:
        </StyledSubtitle>

        <StyledContent>
          <BoldBlackText>
            Please note that the content provided here is for portfolio purposes
            only and should not be used for real communication or messaging.
            It's solely intended to showcase skills and abilities to potential
            recruiters and employers. Thank you for understanding.
          </BoldBlackText>
        </StyledContent>

        <StyledContent>
          <Typography variant="body1" paragraph>
            Private Messaging: Engage in one-on-one conversations with your
            friends through text messages. Keep the conversation flowing and
            share more personal thoughts outside of the public space.
          </Typography>
        </StyledContent>

        <StyledContent>
          <Typography variant="body1">
            Our web application is designed to foster genuine connections and
            provide a platform for you to express yourself freely while
            maintaining control over your privacy. Start sharing your stories,
            connecting with friends, and creating memorable experiences today!
          </Typography>
        </StyledContent>
      </CardContent>
    </StyledCard>
  );
};

export default React.memo(About);
