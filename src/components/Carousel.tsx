import MUICarousel from "react-material-ui-carousel";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ReactElement } from "react";
import { CarouselProps } from "react-material-ui-carousel/dist/components/types";

const dummyItems = [
  {
    name: "Random Name #1",
    description: "Probably the most random thing you have ever seen!",
  },
  {
    name: "Random Name #2",
    description: "Hello World!",
  },
];

function Item(props: { name: string; description: string }) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>{props.description}</p>
      <button className="CheckButton">Check it out!</button>
    </div>
  );
}

interface Props {
  children?: ReactElement[] | ReactElement;
  carouselOption?: CarouselProps;
  className?: string;
}

function Carousel(props: Props) {
  return (
    <div>
      <MUICarousel
        swipe={true}
        NextIcon={<ChevronRightIcon />}
        PrevIcon={<ChevronLeftIcon />}
        className={props.className}
        indicators={false}
        stopAutoPlayOnHover={true}
        interval={5000}
      >
        {props.children}
        {/* {dummyItems.map((it, i) => (
          <Item key={i} {...it} />
        ))} */}
      </MUICarousel>
    </div>
  );
}

export default Carousel;
